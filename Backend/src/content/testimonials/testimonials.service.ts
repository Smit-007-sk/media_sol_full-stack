import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { QueryTestimonialDto } from './dto/query-testimonial.dto';
import { WebsiteStatus, Prisma } from '@prisma/client';

@Injectable()
export class TestimonialsService {
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

  async findAll(websiteId: string, query: QueryTestimonialDto) {
    await this.validateWebsite(websiteId);

    const page = query.page || 1;
    const limit = Math.min(query.limit || 10, 100);
    const skip = (page - 1) * limit;

    const where: Prisma.TestimonialWhereInput = { websiteId };

    if (query.isActive !== undefined) {
      where.isActive = query.isActive;
    }

    if (query.search) {
      const searchTerm = query.search.trim();
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { company: { contains: searchTerm, mode: 'insensitive' } },
        { content: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.testimonial.count({ where }),
      this.prisma.testimonial.findMany({
        where,
        skip,
        take: limit,
        orderBy: { sortOrder: 'asc' },
        include: {
          avatarMedia: {
            select: {
              id: true,
              url: true,
              type: true,
              fileName: true,
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

  async findOne(websiteId: string, id: string) {
    await this.validateWebsite(websiteId);

    const testimonial = await this.prisma.testimonial.findUnique({
      where: { id },
      include: {
        avatarMedia: {
          select: {
            id: true,
            url: true,
            type: true,
            fileName: true,
          },
        },
      },
    });

    if (!testimonial || testimonial.websiteId !== websiteId) {
      throw new NotFoundException(`Testimonial with ID "${id}" not found on Website "${websiteId}"`);
    }

    return testimonial;
  }

  async create(websiteId: string, dto: CreateTestimonialDto) {
    await this.validateWebsite(websiteId);

    return this.prisma.testimonial.create({
      data: {
        websiteId,
        name: dto.name,
        role: dto.role,
        company: dto.company,
        content: dto.content,
        avatarMediaId: dto.avatarMediaId,
        sortOrder: dto.sortOrder !== undefined ? dto.sortOrder : 0,
        isActive: dto.isActive !== undefined ? dto.isActive : true,
      },
    });
  }

  async update(websiteId: string, id: string, dto: UpdateTestimonialDto) {
    await this.findOne(websiteId, id);

    return this.prisma.testimonial.update({
      where: { id },
      data: dto,
    });
  }

  async remove(websiteId: string, id: string) {
    await this.findOne(websiteId, id);

    // Soft delete / deactivation since isActive exists on Testimonial model
    return this.prisma.testimonial.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
