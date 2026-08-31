import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { QueryServiceDto } from './dto/query-service.dto';
import { WebsiteStatus, Prisma } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  private async validateWebsite(websiteId: string) {
    const website = await this.prisma.website.findUnique({
      where: { id: websiteId },
    });

    if (!website) {
      throw new NotFoundException(`Website with ID "${websiteId}" not found`);
    }

    if (website.status === WebsiteStatus.ARCHIVED) {
      throw new BadRequestException(`Cannot manage content for an archived website`);
    }

    return website;
  }

  async findAll(websiteId: string, query: QueryServiceDto) {
    await this.validateWebsite(websiteId);

    const page = query.page || 1;
    const limit = Math.min(query.limit || 10, 100);
    const skip = (page - 1) * limit;

    const where: Prisma.ServiceWhereInput = { websiteId };

    if (query.isActive !== undefined) {
      where.isActive = query.isActive;
    }

    if (query.search) {
      const searchTerm = query.search.trim();
      where.OR = [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { shortDescription: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.service.count({ where }),
      this.prisma.service.findMany({
        where,
        skip,
        take: limit,
        orderBy: { sortOrder: 'asc' },
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

  async findOne(websiteId: string, id: string) {
    await this.validateWebsite(websiteId);

    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service || service.websiteId !== websiteId) {
      throw new NotFoundException(`Service with ID "${id}" not found on Website "${websiteId}"`);
    }

    return service;
  }

  async create(websiteId: string, dto: CreateServiceDto) {
    await this.validateWebsite(websiteId);

    return this.prisma.service.create({
      data: {
        websiteId,
        title: dto.title,
        shortDescription: dto.shortDescription,
        description: dto.description,
        imageId: dto.imageId,
        icon: dto.icon,
        sortOrder: dto.sortOrder !== undefined ? dto.sortOrder : 0,
        isActive: dto.isActive !== undefined ? dto.isActive : true,
      },
    });
  }

  async update(websiteId: string, id: string, dto: UpdateServiceDto) {
    await this.findOne(websiteId, id);

    return this.prisma.service.update({
      where: { id },
      data: dto,
    });
  }

  async remove(websiteId: string, id: string) {
    const service = await this.findOne(websiteId, id);

    // Soft delete / deactivation since isActive exists on Service model
    return this.prisma.service.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
