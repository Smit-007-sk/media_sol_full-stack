import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { QueryTemplateDto } from './dto/query-template.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryTemplateDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.TemplateWhereInput = {};

    if (query.projectId) {
      where.projectId = query.projectId;
    }

    if (query.isActive !== undefined) {
      where.isActive = query.isActive;
    }

    if (query.search) {
      const searchTerm = query.search.trim();
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { slug: { contains: searchTerm, mode: 'insensitive' } },
        { templateKey: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.template.count({ where }),
      this.prisma.template.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          project: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

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
    const template = await this.prisma.template.findUnique({
      where: { id },
      include: {
        project: true,
      },
    });

    if (!template) {
      throw new NotFoundException(`Template with ID "${id}" not found`);
    }

    return template;
  }

  async findByProjectId(projectId: string, isActiveOnly = true) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${projectId}" not found`);
    }

    const where: Prisma.TemplateWhereInput = { projectId };
    if (isActiveOnly) {
      where.isActive = true;
    }

    const templates = await this.prisma.template.findMany({
      where,
      orderBy: { createdAt: 'asc' },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return templates;
  }

  async create(dto: CreateTemplateDto) {
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project) {
      throw new NotFoundException(`Referenced Project with ID "${dto.projectId}" not found`);
    }

    try {
      return await this.prisma.template.create({
        data: {
          projectId: dto.projectId,
          name: dto.name,
          slug: dto.slug.toLowerCase().trim(),
          templateKey: dto.templateKey.toLowerCase().trim(),
          description: dto.description,
          previewImage: dto.previewImage,
          isActive: dto.isActive !== undefined ? dto.isActive : true,
        },
        include: {
          project: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const target = (error.meta?.target as string[]) || [];
        if (target.includes('slug')) {
          throw new ConflictException(`Template with slug "${dto.slug}" already exists`);
        }
        throw new ConflictException(
          `Template with key "${dto.templateKey}" already exists in project "${project.name}"`,
        );
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateTemplateDto) {
    await this.findOne(id);

    if (dto.projectId) {
      const project = await this.prisma.project.findUnique({
        where: { id: dto.projectId },
      });

      if (!project) {
        throw new NotFoundException(`Referenced Project with ID "${dto.projectId}" not found`);
      }
    }

    try {
      return await this.prisma.template.update({
        where: { id },
        data: {
          ...(dto.projectId && { projectId: dto.projectId }),
          ...(dto.name && { name: dto.name }),
          ...(dto.slug && { slug: dto.slug.toLowerCase().trim() }),
          ...(dto.templateKey && { templateKey: dto.templateKey.toLowerCase().trim() }),
          ...(dto.description !== undefined && { description: dto.description }),
          ...(dto.previewImage !== undefined && { previewImage: dto.previewImage }),
          ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        },
        include: {
          project: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Duplicate template slug or templateKey constraint error`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    // Deterministic soft delete (deactivation) by default
    return this.prisma.template.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
