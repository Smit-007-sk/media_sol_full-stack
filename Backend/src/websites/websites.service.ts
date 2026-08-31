import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { QueryWebsiteDto } from './dto/query-website.dto';
import { ClientStatus, WebsiteStatus, Prisma } from '@prisma/client';

@Injectable()
export class WebsitesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryWebsiteDto) {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 10, 100);
    const skip = (page - 1) * limit;

    const where: Prisma.WebsiteWhereInput = {};

    if (query.clientId) {
      where.clientId = query.clientId;
    }

    if (query.templateId) {
      where.templateId = query.templateId;
    }

    if (query.isPublished !== undefined) {
      where.isPublished = query.isPublished;
    }

    // Default status filter: exclude ARCHIVED unless explicitly requested
    if (query.status) {
      where.status = query.status;
    } else {
      where.status = { not: WebsiteStatus.ARCHIVED };
    }

    if (query.search) {
      const searchTerm = query.search.trim();
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { slug: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.website.count({ where }),
      this.prisma.website.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          client: {
            select: {
              id: true,
              businessName: true,
              slug: true,
              status: true,
            },
          },
          template: {
            select: {
              id: true,
              name: true,
              slug: true,
              templateKey: true,
              isActive: true,
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
    const website = await this.prisma.website.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            businessName: true,
            slug: true,
            status: true,
          },
        },
        template: {
          select: {
            id: true,
            name: true,
            slug: true,
            templateKey: true,
            isActive: true,
          },
        },
      },
    });

    if (!website) {
      throw new NotFoundException(`Website with ID "${id}" not found`);
    }

    return website;
  }

  async create(dto: CreateWebsiteDto) {
    // 1. Validate Client
    const client = await this.prisma.client.findUnique({
      where: { id: dto.clientId },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID "${dto.clientId}" not found`);
    }

    if (client.status !== ClientStatus.ACTIVE) {
      throw new BadRequestException(`Cannot create website for inactive or archived client`);
    }

    // 2. Validate & Resolve Template
    const template = await this.resolveTemplateRecord(dto.templateId);

    if (!template) {
      throw new NotFoundException(`Template with identifier "${dto.templateId}" not found`);
    }

    if (!template.isActive) {
      throw new BadRequestException(`Cannot create website for inactive template`);
    }

    // 3. Centralized Publishing Rules
    const wantsPublish =
      dto.status === WebsiteStatus.PUBLISHED || dto.isPublished === true;

    const status = wantsPublish ? WebsiteStatus.PUBLISHED : dto.status || WebsiteStatus.DRAFT;
    const isPublished = wantsPublish;
    const publishedAt = wantsPublish ? new Date() : null;

    try {
      return await this.prisma.website.create({
        data: {
          clientId: dto.clientId,
          templateId: template.id,
          name: dto.name.trim(),
          slug: dto.slug.toLowerCase().trim(),
          status,
          isPublished,
          publishedAt,
        },
        include: {
          client: {
            select: {
              id: true,
              businessName: true,
              slug: true,
              status: true,
            },
          },
          template: {
            select: {
              id: true,
              name: true,
              slug: true,
              templateKey: true,
              isActive: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Website with slug "${dto.slug}" already exists`);
        }
        if (error.code === 'P2003') {
          throw new NotFoundException(`Referenced Client or Template not found`);
        }
      }
      throw error;
    }
  }

  private async resolveTemplateRecord(identifier: string) {
    if (!identifier) return null;
    
    // 1. Direct ID lookup
    try {
      const byId = await this.prisma.template.findUnique({
        where: { id: identifier },
      });
      if (byId) return byId;
    } catch {
      // Identifier was not a UUID syntax, proceed to slug/key lookup
    }

    // 2. Slug lookup
    const bySlug = await this.prisma.template.findFirst({
      where: { slug: identifier.toLowerCase().trim() },
    });
    if (bySlug) return bySlug;

    // 3. TemplateKey lookup
    const byKey = await this.prisma.template.findFirst({
      where: { templateKey: identifier.toLowerCase().trim() },
    });
    if (byKey) return byKey;

    // 4. Smart keyword mapping
    const all = await this.prisma.template.findMany();
    const idLower = identifier.toLowerCase();
    if (idLower.includes('aurora') || idLower.includes('corporate')) {
      return all.find((t) => t.templateKey === 'template-01') || all[0];
    }
    if (idLower.includes('obsidian') || idLower.includes('studio')) {
      return all.find((t) => t.templateKey === 'template-02') || all[0];
    }
    if (idLower.includes('terra') || idLower.includes('estate')) {
      return all.find((t) => t.templateKey === 'template-03') || all[0];
    }
    if (idLower.includes('nova') || idLower.includes('ai')) {
      return all.find((t) => t.templateKey === 'template-04') || all[0];
    }
    if (idLower.includes('maison') || idLower.includes('atelier')) {
      return all.find((t) => t.templateKey === 'template-05') || all[0];
    }

    return all[0] || null;
  }

  async update(id: string, dto: UpdateWebsiteDto) {
    const existing = await this.findOne(id); // Throws NotFoundException if not exists

    const targetClientId = dto.clientId || existing.clientId;

    // Validate client if changed
    const client = await this.prisma.client.findUnique({
      where: { id: targetClientId },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID "${targetClientId}" not found`);
    }

    if (dto.clientId && client.status !== ClientStatus.ACTIVE) {
      throw new BadRequestException(`Cannot reassign website to inactive or archived client`);
    }

    // Validate & Resolve template if changed
    const targetRawTemplateId = dto.templateId || existing.templateId;
    const template = await this.resolveTemplateRecord(targetRawTemplateId);

    if (!template) {
      throw new NotFoundException(`Template with identifier "${targetRawTemplateId}" not found`);
    }

    if (dto.templateId && !template.isActive) {
      throw new BadRequestException(`Cannot reassign website to inactive template`);
    }

    // Determine publishing intent
    let wantsPublish = false;
    if (dto.status === WebsiteStatus.PUBLISHED || dto.isPublished === true) {
      wantsPublish = true;
    } else if (dto.status === WebsiteStatus.DRAFT || dto.status === WebsiteStatus.ARCHIVED || dto.isPublished === false) {
      wantsPublish = false;
    } else {
      wantsPublish = existing.isPublished;
    }

    if (wantsPublish) {
      // Validate that associated client and template are currently active
      if (client.status !== ClientStatus.ACTIVE) {
        throw new BadRequestException(`Cannot publish website because associated client is not ACTIVE`);
      }
      if (!template.isActive) {
        throw new BadRequestException(`Cannot publish website because associated template is inactive`);
      }
    }

    const status = dto.status
      ? dto.status
      : wantsPublish
      ? WebsiteStatus.PUBLISHED
      : existing.status === WebsiteStatus.PUBLISHED
      ? WebsiteStatus.DRAFT
      : existing.status;

    const isPublished = status === WebsiteStatus.PUBLISHED;
    const publishedAt = isPublished
      ? existing.publishedAt || new Date()
      : null;

    try {
      return await this.prisma.website.update({
        where: { id },
        data: {
          ...(dto.clientId && { clientId: dto.clientId }),
          ...(dto.templateId && { templateId: template.id }),
          ...(dto.name && { name: dto.name.trim() }),
          ...(dto.slug && { slug: dto.slug.toLowerCase().trim() }),
          status,
          isPublished,
          publishedAt,
        },
        include: {
          client: {
            select: {
              id: true,
              businessName: true,
              slug: true,
              status: true,
            },
          },
          template: {
            select: {
              id: true,
              name: true,
              slug: true,
              templateKey: true,
              isActive: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Website with slug "${dto.slug}" already exists`);
        }
        if (error.code === 'P2003') {
          throw new NotFoundException(`Referenced Client or Template not found`);
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    const website = await this.findOne(id);

    // Transition status to ARCHIVED and isPublished to false (archival / soft delete strategy)
    if (website.status === WebsiteStatus.ARCHIVED) {
      return website;
    }

    return this.prisma.website.update({
      where: { id },
      data: {
        status: WebsiteStatus.ARCHIVED,
        isPublished: false,
      },
    });
  }
}
