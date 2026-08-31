import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectDto } from './dto/query-project.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryProjectDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.ProjectWhereInput = {};

    if (query.isActive !== undefined) {
      where.isActive = query.isActive;
    }

    if (query.search) {
      const searchTerm = query.search.trim();
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { slug: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.project.count({ where }),
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          templates: {
            where: { isActive: true },
            select: {
              id: true,
              name: true,
              slug: true,
              templateKey: true,
              previewImage: true,
              isActive: true,
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
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        templates: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    return project;
  }

  async create(dto: CreateProjectDto) {
    try {
      return await this.prisma.project.create({
        data: {
          name: dto.name,
          slug: dto.slug.toLowerCase().trim(),
          description: dto.description,
          isActive: dto.isActive !== undefined ? dto.isActive : true,
        },
        include: {
          templates: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Project with slug "${dto.slug}" already exists`);
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);

    try {
      return await this.prisma.project.update({
        where: { id },
        data: {
          ...(dto.name && { name: dto.name }),
          ...(dto.slug && { slug: dto.slug.toLowerCase().trim() }),
          ...(dto.description !== undefined && { description: dto.description }),
          ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        },
        include: {
          templates: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Project with slug "${dto.slug}" already exists`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    // Deterministic soft delete (setting isActive = false) by default
    return this.prisma.project.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
