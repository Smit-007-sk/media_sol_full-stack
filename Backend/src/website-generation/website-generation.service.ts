import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  GenerationJobStatus,
  WebsiteRequest,
  WebsiteRequestStatus,
  ClientStatus,
  WebsiteStatus,
} from '@prisma/client';
import { TemplateSelectionService, TemplateSelectionResult } from './template-selection.service';
import { AiContentGenerationService } from './ai-content-generation.service';
import { AiGeneratedWebsiteContent, AiGenerationMetadata } from './ai-content-schema';
import { TEMPLATE_DEFAULT_THEMES } from './template-defaults';
import { CreateWebsiteRequestDto } from './dto/create-website-request.dto';

@Injectable()
export class WebsiteGenerationService {
  private readonly logger = new Logger(WebsiteGenerationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly templateSelectionService: TemplateSelectionService,
    private readonly aiContentGenerationService: AiContentGenerationService,
  ) {}

  /**
   * Public creation of WebsiteRequest and associated WebsiteGenerationJob.
   * Includes idempotency check: if an identical request was submitted recently, returns existing.
   */
  async createWebsiteRequest(dto: CreateWebsiteRequestDto) {
    const emailNorm = dto.email.toLowerCase().trim();
    const businessNameNorm = dto.businessName.trim();

    // Idempotency check: check if same request exists in PENDING or PROCESSING status within 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const existing = await this.prisma.websiteRequest.findFirst({
      where: {
        email: emailNorm,
        businessName: businessNameNorm,
        createdAt: { gte: fiveMinutesAgo },
        status: { in: [WebsiteRequestStatus.PENDING, WebsiteRequestStatus.PROCESSING] },
      },
      include: { job: true },
    });

    if (existing && existing.job) {
      this.logger.log(`Idempotent request detected for "${businessNameNorm}" (${emailNorm}). Reusing job ${existing.job.id}`);
      return {
        requestId: existing.id,
        jobId: existing.job.id,
        status: existing.job.status,
        isExisting: true,
      };
    }

    const assetReferences = {
      logoAssets: dto.logoAssets || [],
      bannerAssets: dto.bannerAssets || [],
    };

    const request: any = await this.prisma.websiteRequest.create({
      data: {
        fullName: dto.fullName.trim(),
        email: emailNorm,
        phone: dto.phone ? dto.phone.trim() : null,
        alternatePhone: dto.alternatePhone ? dto.alternatePhone.trim() : null,
        businessName: businessNameNorm,
        category: dto.category ? dto.category.trim() : 'Corporate / Business',
        description: dto.description ? dto.description.trim() : null,
        instagram: dto.instagram ? dto.instagram.trim() : null,
        facebook: dto.facebook ? dto.facebook.trim() : null,
        linkedin: dto.linkedin ? dto.linkedin.trim() : null,
        specialInstructions: dto.specialInstructions ? dto.specialInstructions.trim() : null,
        selectedFeatures: dto.selectedFeatures || [],
        assetReferences: assetReferences as any,
        status: WebsiteRequestStatus.PENDING,
        job: {
          create: {
            status: GenerationJobStatus.PENDING,
          },
        },
      },
      include: {
        job: true,
      },
    });

    this.logger.log(`Created new WebsiteRequest ${request.id} with Job ${request.job?.id}`);

    return {
      requestId: request.id,
      jobId: request.job?.id,
      status: request.job?.status,
      isExisting: false,
    };
  }

  /**
   * Finds pending website generation jobs up to the specified limit.
   */
  async findPendingJobs(limit = 5) {
    return this.prisma.websiteGenerationJob.findMany({
      where: {
        status: GenerationJobStatus.PENDING,
      },
      take: limit,
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        request: true,
      },
    });
  }

  /**
   * Atomically claims a job by transitioning its status from PENDING to PROCESSING.
   * Returns true if this worker successfully claimed the job, false otherwise.
   */
  async claimJob(jobId: string): Promise<boolean> {
    const result = await this.prisma.websiteGenerationJob.updateMany({
      where: {
        id: jobId,
        status: GenerationJobStatus.PENDING,
      },
      data: {
        status: GenerationJobStatus.PROCESSING,
        startedAt: new Date(),
        attempts: {
          increment: 1,
        },
      },
    });

    if (result.count > 0) {
      const job = await this.prisma.websiteGenerationJob.findUnique({
        where: { id: jobId },
        select: { requestId: true },
      });
      if (job?.requestId) {
        await this.prisma.websiteRequest.update({
          where: { id: job.requestId },
          data: { status: WebsiteRequestStatus.PROCESSING },
        });
      }
      return true;
    }

    return false;
  }

  /**
   * Selects the best template for the job request and persists the selection on the job record.
   */
  async selectAndPersistTemplate(
    jobId: string,
    request: WebsiteRequest,
  ): Promise<TemplateSelectionResult> {
    const selection = await this.templateSelectionService.selectTemplate(request);

    await this.prisma.websiteGenerationJob.update({
      where: { id: jobId },
      data: {
        selectedTemplateId: selection.templateId,
        templateSelectionMetadata: {
          method: selection.method,
          templateKey: selection.templateKey,
          score: selection.score,
          reasons: selection.reasons,
        },
      },
    });

    return selection;
  }

  /**
   * Generates and persists AI-crafted structured website content.
   * Ensures idempotency: if content is already generated on this job, re-generation is skipped.
   */
  async generateAndPersistAiContent(
    jobId: string,
    request: WebsiteRequest,
    templateKey: string,
  ): Promise<{ content: AiGeneratedWebsiteContent; metadata: AiGenerationMetadata }> {
    const existingJob = await this.prisma.websiteGenerationJob.findUnique({
      where: { id: jobId },
      select: { aiGeneratedContent: true, aiGenerationMetadata: true },
    });

    if (existingJob?.aiGeneratedContent && existingJob?.aiGenerationMetadata) {
      this.logger.log(`Job ${jobId} already has generated AI content. Skipping duplicate generation.`);
      return {
        content: existingJob.aiGeneratedContent as unknown as AiGeneratedWebsiteContent,
        metadata: existingJob.aiGenerationMetadata as unknown as AiGenerationMetadata,
      };
    }

    const { content, metadata } =
      await this.aiContentGenerationService.generateWebsiteContent(request, templateKey);

    await this.prisma.websiteGenerationJob.update({
      where: { id: jobId },
      data: {
        aiGeneratedContent: content as any,
        aiGenerationMetadata: metadata as any,
      },
    });

    this.logger.log(`Saved generated AI content for job ${jobId}`);

    return { content, metadata };
  }

  /**
   * Creates a draft Client, Website, and full CMS records in a single transactional unit.
   * On completion, transitions the WebsiteGenerationJob and WebsiteRequest to COMPLETED.
   */
  async createDraftWebsite(jobId: string) {
    const job = await this.prisma.websiteGenerationJob.findUnique({
      where: { id: jobId },
      include: {
        request: true,
        selectedTemplate: true,
      },
    });

    if (!job || !job.request) {
      throw new Error(`Job ${jobId} or its associated WebsiteRequest does not exist`);
    }

    const request = job.request;
    const templateKey =
      (job.templateSelectionMetadata as any)?.templateKey ||
      job.selectedTemplate?.templateKey ||
      'aurora-corporate';

    let aiContent = job.aiGeneratedContent as unknown as AiGeneratedWebsiteContent;
    if (!aiContent) {
      const generated = await this.generateAndPersistAiContent(job.id, request, templateKey);
      aiContent = generated.content;
    }

    this.logger.log(`Creating draft website for job ${jobId} using template "${templateKey}"`);

    // Execute website and CMS creation inside a single transactional block
    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Generate unique Client slug
      let baseClientSlug = (request.businessName || request.fullName)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      if (!baseClientSlug) baseClientSlug = 'client';

      let clientSlug = baseClientSlug;
      let cIdx = 1;
      while (await tx.client.findUnique({ where: { slug: clientSlug } })) {
        clientSlug = `${baseClientSlug}-${cIdx}`;
        cIdx++;
      }

      // 2. Create Client record
      const client = await tx.client.create({
        data: {
          businessName: request.businessName.trim(),
          slug: clientSlug,
          email: request.email.toLowerCase().trim(),
          phone: request.phone ? request.phone.trim() : null,
          description: request.description ? request.description.trim() : null,
          status: ClientStatus.ACTIVE,
        },
      });

      // 3. Resolve Template record ID
      let templateId = job.selectedTemplateId;
      if (!templateId) {
        const found = await tx.template.findFirst({
          where: {
            OR: [
              { slug: { contains: templateKey } },
              { templateKey: templateKey },
            ],
          },
        });
        templateId = found ? found.id : (await tx.template.findFirst())?.id;
      }

      if (!templateId) {
        throw new Error('No template available in database to link website');
      }

      // 4. Generate unique Website slug
      let baseSiteSlug = clientSlug;
      let siteSlug = baseSiteSlug;
      let sIdx = 1;
      while (await tx.website.findUnique({ where: { slug: siteSlug } })) {
        siteSlug = `${baseSiteSlug}-${sIdx}`;
        sIdx++;
      }

      // 5. Create Website record in DRAFT status
      const website = await tx.website.create({
        data: {
          clientId: client.id,
          templateId,
          name: `${request.businessName.trim()} Website`,
          slug: siteSlug,
          status: WebsiteStatus.DRAFT,
          isPublished: false,
          publishedAt: null,
        },
      });

      // 6. Create Theme record from template defaults
      const defaultTheme =
        TEMPLATE_DEFAULT_THEMES[templateKey] || TEMPLATE_DEFAULT_THEMES['aurora-corporate'];

      await tx.theme.create({
        data: {
          websiteId: website.id,
          primaryColor: defaultTheme.primaryColor,
          secondaryColor: defaultTheme.secondaryColor,
          accentColor: defaultTheme.accentColor || null,
          backgroundColor: defaultTheme.backgroundColor,
          textColor: defaultTheme.textColor,
          headingFont: defaultTheme.headingFont,
          bodyFont: defaultTheme.bodyFont,
          heroLayout: defaultTheme.heroLayout || 'split',
          aboutLayout: defaultTheme.aboutLayout || 'text-image',
          servicesStyle: defaultTheme.servicesStyle || 'cards',
          galleryStyle: defaultTheme.galleryStyle || 'grid',
          testimonialsStyle: defaultTheme.testimonialsStyle || 'cards',
          contactStyle: defaultTheme.contactStyle || 'split',
          sectionSpacing: defaultTheme.sectionSpacing || 'spacious',
          containerWidth: defaultTheme.containerWidth || 'wide',
          buttonSize: defaultTheme.buttonSize || 'medium',
          designPreset: defaultTheme.designPreset || templateKey,
        },
      });

      // 7. Process and create uploaded logo Media (if provided)
      const assetRefs = request.assetReferences as any;
      const logoAssets = assetRefs?.logoAssets || [];
      if (Array.isArray(logoAssets) && logoAssets.length > 0 && logoAssets[0]?.url) {
        const logo = logoAssets[0];
        const logoMedia = await tx.media.create({
          data: {
            websiteId: website.id,
            type: 'IMAGE',
            url: logo.url,
            fileName: logo.fileName || 'logo.png',
            storageKey: `client-logos/${Date.now()}-${logo.fileName || 'logo.png'}`,
            mimeType: logo.mimeType || 'image/png',
            fileSize: logo.fileSize || 102400,
            altText: `${request.businessName} Logo`,
          },
        });
        await tx.client.update({
          where: { id: client.id },
          data: { logoMediaId: logoMedia.id },
        });
      }

      // 8. Create Hero record
      await tx.hero.create({
        data: {
          websiteId: website.id,
          eyebrow: aiContent.hero.eyebrow,
          title: aiContent.hero.title,
          description: aiContent.hero.description,
          primaryButtonText: aiContent.hero.primaryButtonText || 'Get Started',
          primaryButtonUrl: aiContent.hero.primaryButtonUrl || '#contact',
          secondaryButtonText: aiContent.hero.secondaryButtonText || 'Our Services',
          secondaryButtonUrl: aiContent.hero.secondaryButtonUrl || '#services',
        },
      });

      // 9. Create About record
      await tx.about.create({
        data: {
          websiteId: website.id,
          eyebrow: aiContent.about.eyebrow,
          title: aiContent.about.title,
          description: aiContent.about.description,
        },
      });

      // 10. Create Services records
      if (Array.isArray(aiContent.services)) {
        for (let i = 0; i < aiContent.services.length; i++) {
          const s = aiContent.services[i];
          await tx.service.create({
            data: {
              websiteId: website.id,
              title: s.title,
              shortDescription: s.shortDescription || s.title,
              description: s.description || s.title,
              icon: s.icon || 'CheckCircle',
              sortOrder: i,
              isActive: true,
            },
          });
        }
      }

      // 11. Create Gallery record and associated Media items (if provided)
      const gallery = await tx.gallery.create({
        data: {
          websiteId: website.id,
          title: aiContent.gallery?.title || 'Featured Showcase',
          description: aiContent.gallery?.description || 'Explore our work and highlights',
        },
      });

      const bannerAssets = assetRefs?.bannerAssets || [];
      if (Array.isArray(bannerAssets) && bannerAssets.length > 0) {
        for (let i = 0; i < bannerAssets.length; i++) {
          const banner = bannerAssets[i];
          if (banner.url) {
            const media = await tx.media.create({
              data: {
                websiteId: website.id,
                type: 'IMAGE',
                url: banner.url,
                fileName: banner.fileName || `banner-${i + 1}.jpg`,
                storageKey: `website-banners/${Date.now()}-${banner.fileName || `banner-${i + 1}.jpg`}`,
                mimeType: banner.mimeType || 'image/jpeg',
                fileSize: banner.fileSize || 204800,
                altText: `${request.businessName} Showcase ${i + 1}`,
              },
            });
            await tx.galleryItem.create({
              data: {
                galleryId: gallery.id,
                mediaId: media.id,
                title: banner.fileName || `Showcase ${i + 1}`,
                sortOrder: i,
              },
            });
          }
        }
      }

      // 12. Create Contact record with explicit client data
      await tx.contact.create({
        data: {
          websiteId: website.id,
          email: request.email,
          phone: request.phone || null,
          whatsapp: request.phone || null,
          mapUrl: null,
        },
      });

      // 13. Create SocialLinks records with explicit client URLs
      if (request.instagram) {
        await tx.socialLink.create({
          data: {
            websiteId: website.id,
            platform: 'INSTAGRAM',
            url: request.instagram,
            sortOrder: 0,
          },
        });
      }
      if (request.facebook) {
        await tx.socialLink.create({
          data: {
            websiteId: website.id,
            platform: 'FACEBOOK',
            url: request.facebook,
            sortOrder: 1,
          },
        });
      }
      if (request.linkedin) {
        await tx.socialLink.create({
          data: {
            websiteId: website.id,
            platform: 'LINKEDIN',
            url: request.linkedin,
            sortOrder: 2,
          },
        });
      }

      // 14. Transition Job and Request status to COMPLETED
      await tx.websiteGenerationJob.update({
        where: { id: jobId },
        data: {
          clientId: client.id,
          websiteId: website.id,
          status: GenerationJobStatus.COMPLETED,
          completedAt: new Date(),
        },
      });

      await tx.websiteRequest.update({
        where: { id: request.id },
        data: {
          status: WebsiteRequestStatus.COMPLETED,
        },
      });

      return { client, website };
    });

    this.logger.log(
      `Successfully generated draft website: "${result.website.slug}" (Client: "${result.client.businessName}")`,
    );

    return result;
  }

  /**
   * Marks a job as FAILED with an error message safely.
   */
  async markJobFailed(jobId: string, errorMessage: string) {
    const job = await this.prisma.websiteGenerationJob.update({
      where: { id: jobId },
      data: {
        status: GenerationJobStatus.FAILED,
        errorMessage,
      },
      select: { requestId: true },
    });

    if (job?.requestId) {
      await this.prisma.websiteRequest.update({
        where: { id: job.requestId },
        data: { status: WebsiteRequestStatus.FAILED },
      });
    }
  }
}
