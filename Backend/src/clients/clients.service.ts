import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { QueryClientDto } from './dto/query-client.dto';
import { ClientStatus, Prisma } from '@prisma/client';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryClientDto) {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 10, 100);
    const skip = (page - 1) * limit;

    const where: Prisma.ClientWhereInput = {};

    // Default status filter: exclude ARCHIVED unless explicitly requested
    if (query.status) {
      where.status = query.status;
    } else {
      where.status = { not: ClientStatus.ARCHIVED };
    }

    if (query.search) {
      const searchTerm = query.search.trim();
      where.OR = [
        { businessName: { contains: searchTerm, mode: 'insensitive' } },
        { slug: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
        { phone: { contains: searchTerm, mode: 'insensitive' } },
        { city: { contains: searchTerm, mode: 'insensitive' } },
        { state: { contains: searchTerm, mode: 'insensitive' } },
        { country: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.client.count({ where }),
      this.prisma.client.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          logoMedia: {
            select: {
              id: true,
              url: true,
              fileName: true,
            },
          },
          websites: {
            include: {
              media: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 0;

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        logoMedia: {
          select: {
            id: true,
            url: true,
            fileName: true,
          },
        },
        websites: {
          include: {
            media: true,
            hero: true,
            about: true,
            services: true,
          },
        },
      },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }

    return client;
  }

  async create(dto: CreateClientDto) {
    try {
      return await this.prisma.client.create({
        data: {
          businessName: dto.businessName.trim(),
          slug: dto.slug.toLowerCase().trim(),
          description: dto.description ? dto.description.trim() : null,
          logoMediaId: dto.logoMediaId || null,
          phone: dto.phone ? dto.phone.trim() : null,
          email: dto.email ? dto.email.toLowerCase().trim() : null,
          address: dto.address ? dto.address.trim() : null,
          city: dto.city ? dto.city.trim() : null,
          state: dto.state ? dto.state.trim() : null,
          country: dto.country ? dto.country.trim() : null,
          status: dto.status || ClientStatus.ACTIVE,
        },
        include: {
          logoMedia: {
            select: {
              id: true,
              url: true,
              fileName: true,
            },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Client with slug "${dto.slug}" already exists`);
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateClientDto) {
    await this.findOne(id); // Throws NotFoundException if not exists

    try {
      return await this.prisma.client.update({
        where: { id },
        data: {
          ...(dto.businessName && { businessName: dto.businessName.trim() }),
          ...(dto.slug && { slug: dto.slug.toLowerCase().trim() }),
          ...(dto.description !== undefined && {
            description: dto.description ? dto.description.trim() : null,
          }),
          ...(dto.logoMediaId !== undefined && { logoMediaId: dto.logoMediaId }),
          ...(dto.phone !== undefined && { phone: dto.phone ? dto.phone.trim() : null }),
          ...(dto.email !== undefined && {
            email: dto.email ? dto.email.toLowerCase().trim() : null,
          }),
          ...(dto.address !== undefined && {
            address: dto.address ? dto.address.trim() : null,
          }),
          ...(dto.city !== undefined && { city: dto.city ? dto.city.trim() : null }),
          ...(dto.state !== undefined && { state: dto.state ? dto.state.trim() : null }),
          ...(dto.country !== undefined && {
            country: dto.country ? dto.country.trim() : null,
          }),
          ...(dto.status && { status: dto.status }),
        },
        include: {
          logoMedia: {
            select: {
              id: true,
              url: true,
              fileName: true,
            },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Client with slug "${dto.slug}" already exists`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    const client = await this.findOne(id);

    // Transition status to ARCHIVED (archival / soft delete strategy only)
    if (client.status === ClientStatus.ARCHIVED) {
      return client;
    }

    return this.prisma.client.update({
      where: { id },
      data: { status: ClientStatus.ARCHIVED },
    });
  }

  async submitLead(dto: import('./dto/submit-lead.dto').SubmitLeadDto) {
    let baseSlug = (dto.businessName || dto.fullName)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (!baseSlug) baseSlug = 'lead-client';
    let slug = baseSlug;
    let counter = 1;

    while (await this.prisma.client.findFirst({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const featureList = dto.selectedFeatures?.length ? dto.selectedFeatures.join(', ') : 'None';
    const socialList = [
      dto.instagram ? `Instagram: ${dto.instagram}` : '',
      dto.facebook ? `Facebook: ${dto.facebook}` : '',
      dto.linkedin ? `LinkedIn: ${dto.linkedin}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    const description = [
      `Lead Contact: ${dto.fullName}`,
      `Category: ${dto.category || 'General'}`,
      dto.servicesDescription ? `Services/Requirements: ${dto.servicesDescription}` : '',
      `Features Requested: ${featureList}`,
      socialList ? `Social Media: ${socialList}` : '',
      dto.altPhone ? `Alt Phone: ${dto.altPhone}` : '',
      dto.notes ? `Notes: ${dto.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const client = await this.prisma.client.create({
      data: {
        businessName: dto.businessName.trim(),
        slug,
        email: dto.email.toLowerCase().trim(),
        phone: dto.phone.trim(),
        description,
        status: ClientStatus.ACTIVE,
      },
    });

    let createdWebsite: any = null;

    try {
      const firstTemplate = await this.prisma.template.findFirst();

      if (firstTemplate) {
        let siteSlug = `${slug}-site`;
        let siteCounter = 1;
        while (await this.prisma.website.findFirst({ where: { slug: siteSlug } })) {
          siteSlug = `${slug}-site-${siteCounter}`;
          siteCounter++;
        }

        createdWebsite = await this.prisma.website.create({
          data: {
            name: `${dto.businessName} Website`,
            slug: siteSlug,
            clientId: client.id,
            templateId: firstTemplate.id,
            status: 'DRAFT',
            isPublished: false,
          },
        });
      }
    } catch (err) {
      console.warn('Auto website creation for lead skipped:', err);
    }

    let primaryLogoMediaId: string | null = null;
    let primaryBannerMediaId: string | null = null;

    // Process uploaded logo assets
    if (dto.logoAssets && dto.logoAssets.length > 0) {
      for (const logo of dto.logoAssets) {
        if (logo.url && logo.fileName) {
          try {
            const createdMedia = await this.prisma.media.create({
              data: {
                type: 'IMAGE',
                url: logo.url,
                fileName: logo.fileName,
                storageKey: `client-logos/${Date.now()}-${logo.fileName}`,
                mimeType: logo.mimeType || 'image/png',
                fileSize: logo.fileSize || 102400,
                altText: `${dto.businessName} Logo`,
                websiteId: createdWebsite?.id || null,
              },
            });
            if (!primaryLogoMediaId) {
              primaryLogoMediaId = createdMedia.id;
            }
          } catch (e) {
            console.error('Error saving logo media:', e);
          }
        }
      }
    }

    // Process uploaded banner assets
    if (dto.bannerAssets && dto.bannerAssets.length > 0) {
      for (const banner of dto.bannerAssets) {
        if (banner.url && banner.fileName) {
          try {
            const createdMedia = await this.prisma.media.create({
              data: {
                type: 'IMAGE',
                url: banner.url,
                fileName: banner.fileName,
                storageKey: `client-banners/${Date.now()}-${banner.fileName}`,
                mimeType: banner.mimeType || 'image/jpeg',
                fileSize: banner.fileSize || 204800,
                altText: `${dto.businessName} Banner Photo`,
                websiteId: createdWebsite?.id || null,
              },
            });
            if (!primaryBannerMediaId) {
              primaryBannerMediaId = createdMedia.id;
            }
          } catch (e) {
            console.error('Error saving banner media:', e);
          }
        }
      }
    }

    // Link primary logo to client
    if (primaryLogoMediaId) {
      await this.prisma.client.update({
        where: { id: client.id },
        data: { logoMediaId: primaryLogoMediaId },
      });
    }

    // Initialize Hero section on website with banner image
    if (createdWebsite) {
      try {
        await this.prisma.hero.upsert({
          where: { websiteId: createdWebsite.id },
          update: {
            title: dto.businessName,
            description: dto.servicesDescription || `Welcome to ${dto.businessName}`,
            ...(primaryBannerMediaId && { imageId: primaryBannerMediaId }),
          },
          create: {
            websiteId: createdWebsite.id,
            eyebrow: dto.category || 'Official Website',
            title: dto.businessName,
            description: dto.servicesDescription || `Welcome to ${dto.businessName}`,
            primaryButtonText: 'Contact Us',
            primaryButtonUrl: '#contact',
            imageId: primaryBannerMediaId || null,
          },
        });
      } catch (e) {
        console.warn('Hero section setup skipped:', e);
      }
    }

    return this.findOne(client.id);
  }
}

