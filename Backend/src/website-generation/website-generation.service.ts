import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  GenerationJobStatus,
  WebsiteRequest,
  WebsiteRequestStatus,
  ClientStatus,
  WebsiteStatus,
  GeneratedWebsite,
  GeneratedWebsiteStatus,
  Prisma,
} from '@prisma/client';
import { SaveGeneratedWebsiteDto } from './dto/save-generated-website.dto';

export const RESERVED_SLUGS = new Set([
  'admin',
  'api',
  'login',
  'dashboard',
  'website-requests',
  'settings',
  'auth',
  'site',
  'work',
  'services',
  'why-us',
  'offer',
  'templates',
  'admin-templates',
  'clients',
  'websites',
  'media',
  'projects',
  'null',
  'undefined',
  'public',
  'static',
]);

import { TemplateSelectionService, TemplateSelectionResult } from './template-selection.service';
import { AiContentGenerationService } from './ai-content-generation.service';
import { AiGeneratedWebsiteContent, AiGenerationMetadata } from './ai-content-schema';
import { TEMPLATE_DEFAULT_THEMES } from './template-defaults';
import { CreateWebsiteRequestDto } from './dto/create-website-request.dto';
import { QueryWebsiteRequestDto } from './dto/query-website-request.dto';

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
   * Admin: List all paginated website requests with search, request-status, and website-status filtering.
   */
  async findAllWebsiteRequests(query: QueryWebsiteRequestDto) {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 10, 100);
    const skip = (page - 1) * limit;

    const where: Prisma.WebsiteRequestWhereInput = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.websiteStatus) {
      if (query.websiteStatus === 'NO_WEBSITE') {
        where.generatedWebsite = null;
      } else if (query.websiteStatus === 'DRAFT') {
        where.generatedWebsite = { status: GeneratedWebsiteStatus.DRAFT };
      } else if (query.websiteStatus === 'PUBLISHED') {
        where.generatedWebsite = { status: GeneratedWebsiteStatus.PUBLISHED };
      }
    }

    if (query.search) {
      const s = query.search;
      where.OR = [
        { businessName: { contains: s, mode: 'insensitive' } },
        { fullName: { contains: s, mode: 'insensitive' } },
        { email: { contains: s, mode: 'insensitive' } },
        { phone: { contains: s, mode: 'insensitive' } },
        { category: { contains: s, mode: 'insensitive' } },
        { generatedWebsite: { slug: { contains: s, mode: 'insensitive' } } },
      ];
    }

    const [filteredTotal, items, totalAllRequests, draftWebsitesCount, publishedWebsitesCount] = await Promise.all([
      this.prisma.websiteRequest.count({ where }),
      this.prisma.websiteRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          generatedWebsite: {
            select: {
              id: true,
              requestId: true,
              slug: true,
              status: true,
              publishedAt: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          job: {
            select: {
              id: true,
              status: true,
              selectedTemplateId: true,
              clientId: true,
              websiteId: true,
              createdAt: true,
              completedAt: true,
              errorMessage: true,
            },
          },
        },
      }),
      this.prisma.websiteRequest.count(),
      this.prisma.generatedWebsite.count({ where: { status: GeneratedWebsiteStatus.DRAFT } }),
      this.prisma.generatedWebsite.count({ where: { status: GeneratedWebsiteStatus.PUBLISHED } }),
    ]);

    const noWebsiteCount = Math.max(0, totalAllRequests - draftWebsitesCount - publishedWebsitesCount);

    return {
      items,
      meta: {
        page,
        limit,
        total: filteredTotal,
        totalPages: Math.ceil(filteredTotal / limit) || 1,
        metrics: {
          total: totalAllRequests,
          noWebsite: noWebsiteCount,
          draft: draftWebsitesCount,
          published: publishedWebsitesCount,
        },
      },
    };
  }

  /**
   * Admin: Get a specific website request by ID with complete details.
   */
  async findOneWebsiteRequest(id: string) {
    const request = await this.prisma.websiteRequest.findUnique({
      where: { id },
      include: {
        generatedWebsite: {
          select: {
            id: true,
            requestId: true,
            slug: true,
            status: true,
            publishedAt: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        job: {
          include: {
            selectedTemplate: {
              select: {
                id: true,
                name: true,
                slug: true,
                templateKey: true,
              },
            },
            client: {
              select: {
                id: true,
                businessName: true,
                slug: true,
              },
            },
            website: {
              select: {
                id: true,
                name: true,
                slug: true,
                status: true,
                isPublished: true,
              },
            },
          },
        },
      },
    });

    if (!request) {
      throw new NotFoundException(`Website request with ID "${id}" not found`);
    }

    return request;
  }

  /**
   * Helper: Validates and sanitizes asset mappings against the specific request's uploaded assets.
   * Enforces server-side ownership so Client A assets cannot be mapped to Client B.
   */
  private validateAndSanitizeAssetMappings(
    mappings: Record<string, string> | undefined | null,
    requestAssetReferences: any,
  ): Record<string, string> {
    if (!mappings || typeof mappings !== 'object') {
      return {};
    }

    const validUrls = new Set<string>();
    const assetRefs = requestAssetReferences || {};
    if (Array.isArray(assetRefs.logoAssets)) {
      assetRefs.logoAssets.forEach((a: any) => {
        if (a?.url && typeof a.url === 'string') validUrls.add(a.url);
      });
    }
    if (Array.isArray(assetRefs.bannerAssets)) {
      assetRefs.bannerAssets.forEach((a: any) => {
        if (a?.url && typeof a.url === 'string') validUrls.add(a.url);
      });
    }

    const sanitized: Record<string, string> = {};

    for (const [rawKey, rawVal] of Object.entries(mappings)) {
      if (!rawKey || !rawVal || typeof rawVal !== 'string') continue;

      const trimmedKey = rawKey.trim();
      const key = trimmedKey.startsWith('{{') && trimmedKey.endsWith('}}')
        ? trimmedKey
        : `{{${trimmedKey}}}`;

      const val = rawVal.trim();
      const lowerVal = val.toLowerCase();
      if (
        lowerVal.startsWith('javascript:') ||
        lowerVal.startsWith('vbscript:') ||
        lowerVal.startsWith('file:')
      ) {
        continue;
      }

      // If client uploaded assets exist, ensure the mapped asset strictly belongs to this request
      if (validUrls.size > 0 && !validUrls.has(val)) {
        continue;
      }

      sanitized[key] = val;
    }

    return sanitized;
  }

  /**
   * Helper: Resolves placeholders in HTML safely from asset mappings.
   * Authoritative: Uses the exact assetMappings captured in the published snapshot.
   * Does NOT dynamically inject unmapped assets or fake images.
   */
  private resolveHtmlPlaceholders(
    rawHtml: string,
    assetMappings: Record<string, string> | null | undefined,
    requestAssetReferences?: any,
  ): string {
    if (!rawHtml) return '';
    let resolvedHtml = rawHtml;

    const mappings = assetMappings || {};

    const validUrls = new Set<string>();
    if (requestAssetReferences) {
      const assetRefs = requestAssetReferences as any;
      if (Array.isArray(assetRefs.logoAssets)) {
        assetRefs.logoAssets.forEach((a: any) => {
          if (a?.url) validUrls.add(a.url.trim());
        });
      }
      if (Array.isArray(assetRefs.bannerAssets)) {
        assetRefs.bannerAssets.forEach((b: any) => {
          if (b?.url) validUrls.add(b.url.trim());
        });
      }
    }

    // Resolve explicit asset mappings
    for (const [placeholder, url] of Object.entries(mappings)) {
      if (!url || typeof url !== 'string') continue;
      const trimmedUrl = url.trim();
      const lowerUrl = trimmedUrl.toLowerCase();
      if (
        lowerUrl.startsWith('javascript:') ||
        lowerUrl.startsWith('vbscript:') ||
        lowerUrl.startsWith('file:')
      ) {
        continue;
      }

      // If client uploaded assets exist, verify ownership strictly against this request
      if (validUrls.size > 0 && !validUrls.has(trimmedUrl)) {
        continue;
      }

      const escapedPlaceholder = placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      resolvedHtml = resolvedHtml.replace(new RegExp(escapedPlaceholder, 'g'), trimmedUrl);
    }

    return resolvedHtml;
  }

  /**
   * Admin: Retrieve the generated website code workspace for a WebsiteRequest.
   * Returns draft version.
   */
  async getGeneratedWebsite(requestId: string): Promise<GeneratedWebsite> {
    const request = await this.prisma.websiteRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException(`Website request with ID "${requestId}" not found`);
    }

    const generatedWebsite = await this.prisma.generatedWebsite.findUnique({
      where: { requestId },
    });

    if (!generatedWebsite) {
      throw new NotFoundException(`Generated website workspace not found for request "${requestId}"`);
    }

    return generatedWebsite;
  }

  /**
   * Admin: Save or update generated website draft code (HTML, CSS, JS, assetMappings, slug).
   * Note: Does NOT modify publishedSnapshot, maintaining true draft/live isolation.
   */
  async saveGeneratedWebsite(
    requestId: string,
    dto: SaveGeneratedWebsiteDto,
  ) {
    const request = await this.prisma.websiteRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException(`Website request with ID "${requestId}" not found`);
    }

    const html = dto.html !== undefined ? dto.html : '';
    const css = dto.css !== undefined ? dto.css : '';
    const javascript = dto.javascript !== undefined ? dto.javascript : '';
    const status = dto.status || GeneratedWebsiteStatus.DRAFT;
    const slug = dto.slug ? dto.slug.trim().toLowerCase() : undefined;

    if (slug) {
      this.validateSlug(slug);
      const isAvailable = await this.checkSlugAvailability(slug, requestId);
      if (!isAvailable.available) {
        throw new ConflictException('Slug already exists. Please choose another slug.');
      }
    }

    const sanitizedMappings = dto.assetMappings !== undefined
      ? this.validateAndSanitizeAssetMappings(dto.assetMappings, request.assetReferences)
      : undefined;

    const generatedWebsite = await this.prisma.generatedWebsite.upsert({
      where: { requestId },
      create: {
        requestId,
        html,
        css,
        javascript,
        status: dto.status || GeneratedWebsiteStatus.DRAFT,
        slug: slug || null,
        assetMappings: sanitizedMappings ? (sanitizedMappings as any) : null,
      },
      update: {
        html,
        css,
        javascript,
        ...(dto.status ? { status: dto.status } : {}),
        ...(slug ? { slug } : {}),
        ...(sanitizedMappings !== undefined ? { assetMappings: sanitizedMappings as any } : {}),
      },
    });

    this.logger.log(`Saved generated website workspace for request ${requestId} (status: ${status})`);

    return generatedWebsite;
  }

  /**
   * Validates slug syntax and checks against reserved application keywords.
   */
  validateSlug(slug: string): void {
    const s = (slug || '').trim().toLowerCase();
    if (!s || s.length < 3) {
      throw new BadRequestException('Slug must be at least 3 characters long');
    }
    if (s.length > 80) {
      throw new BadRequestException('Slug must not exceed 80 characters');
    }
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(s)) {
      throw new BadRequestException(
        'Slug must be lowercase and contain only alphanumeric characters separated by single hyphens (no leading or trailing hyphens).',
      );
    }
    if (RESERVED_SLUGS.has(s)) {
      throw new BadRequestException(`"${s}" is a reserved system path and cannot be used as a website slug.`);
    }
  }

  /**
   * Checks whether a slug is available across all GeneratedWebsites and legacy Websites.
   */
  async checkSlugAvailability(slug: string, excludeRequestId?: string): Promise<{ available: boolean; slug: string }> {
    const s = (slug || '').trim().toLowerCase();
    this.validateSlug(s);

    const existingGenerated = await this.prisma.generatedWebsite.findFirst({
      where: {
        slug: s,
        ...(excludeRequestId ? { NOT: { requestId: excludeRequestId } } : {}),
      },
      select: { id: true },
    });

    if (existingGenerated) {
      return { available: false, slug: s };
    }

    const existingLegacy = await this.prisma.website.findUnique({
      where: { slug: s },
      select: { id: true },
    });

    if (existingLegacy) {
      return { available: false, slug: s };
    }

    return { available: true, slug: s };
  }

  /**
   * Admin: Publish a generated website with an explicit, verified slug and create an immutable published snapshot.
   */
  async publishGeneratedWebsite(requestId: string, slug: string) {
    const s = (slug || '').trim().toLowerCase();
    this.validateSlug(s);

    return this.prisma.$transaction(async (tx) => {
      const request = await tx.websiteRequest.findUnique({
        where: { id: requestId },
      });
      if (!request) {
        throw new NotFoundException(`Website request with ID "${requestId}" not found`);
      }

      const generated = await tx.generatedWebsite.findUnique({
        where: { requestId },
      });
      if (!generated) {
        throw new NotFoundException(`Generated website workspace not found for request "${requestId}"`);
      }
      if (!generated.html || !generated.html.trim()) {
        throw new BadRequestException('Cannot publish website: HTML content is empty. Please paste and save HTML code first.');
      }

      const existingGen = await tx.generatedWebsite.findFirst({
        where: {
          slug: s,
          NOT: { requestId },
        },
      });
      if (existingGen) {
        throw new ConflictException('Slug already exists. Please choose another slug.');
      }

      const existingLegacy = await tx.website.findUnique({
        where: { slug: s },
      });
      if (existingLegacy) {
        throw new ConflictException('Slug already exists. Please choose another slug.');
      }

      const now = new Date();

      // Snapshot the current draft state for live visitors
      const publishedSnapshot = {
        html: generated.html,
        css: generated.css,
        javascript: generated.javascript,
        assetMappings: generated.assetMappings || {},
        slug: s,
        publishedAt: now.toISOString(),
      };

      const updated = await tx.generatedWebsite.update({
        where: { requestId },
        data: {
          slug: s,
          status: GeneratedWebsiteStatus.PUBLISHED,
          publishedAt: now,
          publishedSnapshot: publishedSnapshot as any,
        },
      });

      await tx.websiteRequest.update({
        where: { id: requestId },
        data: { status: WebsiteRequestStatus.COMPLETED },
      });

      this.logger.log(`Published generated website "${s}" for request ${requestId}`);

      return {
        success: true,
        slug: s,
        url: `/site/${s}`,
        status: updated.status,
        publishedAt: updated.publishedAt,
      };
    });
  }

  /**
   * Admin: Unpublish a generated website (reverts status to DRAFT).
   */
  async unpublishGeneratedWebsite(requestId: string) {
    const request = await this.prisma.websiteRequest.findUnique({
      where: { id: requestId },
    });
    if (!request) {
      throw new NotFoundException(`Website request with ID "${requestId}" not found`);
    }

    const generated = await this.prisma.generatedWebsite.findUnique({
      where: { requestId },
    });
    if (!generated) {
      throw new NotFoundException(`Generated website workspace not found for request "${requestId}"`);
    }

    const updated = await this.prisma.generatedWebsite.update({
      where: { requestId },
      data: {
        status: GeneratedWebsiteStatus.DRAFT,
      },
    });

    this.logger.log(`Unpublished generated website "${updated.slug || requestId}" for request ${requestId}`);

    return {
      success: true,
      message: 'Website unpublished successfully. Public access is now offline.',
      status: updated.status,
      slug: updated.slug,
    };
  }

  /**
   * Public: Retrieve published GeneratedWebsite by slug.
   * Serves the isolated publishedSnapshot and resolves mapped asset placeholders.
   */
  async getPublicGeneratedWebsite(slug: string) {
    const s = (slug || '').trim().toLowerCase();
    if (!s) {
      throw new NotFoundException('Website not found');
    }

    const website = await this.prisma.generatedWebsite.findFirst({
      where: {
        slug: s,
        status: GeneratedWebsiteStatus.PUBLISHED,
      },
      select: {
        id: true,
        slug: true,
        status: true,
        publishedAt: true,
        publishedSnapshot: true,
        html: true,
        css: true,
        javascript: true,
        assetMappings: true,
        request: {
          select: {
            businessName: true,
            category: true,
            assetReferences: true,
          },
        },
      },
    });

    if (!website) {
      throw new NotFoundException(`Published website with slug "${s}" not found`);
    }

    // Read from publishedSnapshot to ensure draft edits never bleed into the live public website
    const snapshot = (website.publishedSnapshot as any) || null;
    const rawHtml = snapshot?.html !== undefined ? snapshot.html : website.html;
    const rawCss = snapshot?.css !== undefined ? snapshot.css : website.css;
    const rawJs = snapshot?.javascript !== undefined ? snapshot.javascript : website.javascript;
    const mappings = snapshot?.assetMappings !== undefined ? snapshot.assetMappings : (website.assetMappings as any);

    const resolvedHtml = this.resolveHtmlPlaceholders(
      rawHtml,
      mappings,
      website.request?.assetReferences,
    );

    return {
      slug: website.slug,
      businessName: website.request?.businessName || 'Official Website',
      category: website.request?.category || 'Business',
      html: resolvedHtml,
      css: rawCss,
      javascript: rawJs,
      publishedAt: website.publishedAt,
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

  /**
   * Updates and persists the prompt variation index for a website request.
   */
  async updatePromptVariation(id: string, variation: number): Promise<number> {
    const request = await this.prisma.websiteRequest.findUnique({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Website request with ID "${id}" not found`);
    }
    const assetRefs = (request.assetReferences as any) || {};
    const updatedAssetRefs = {
      ...assetRefs,
      promptVariation: variation,
    };
    await this.prisma.websiteRequest.update({
      where: { id },
      data: { assetReferences: updatedAssetRefs },
    });
    return variation;
  }
}

