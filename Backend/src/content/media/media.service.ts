import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { QueryMediaDto } from './dto/query-media.dto';
import { WebsiteStatus, Prisma } from '@prisma/client';

const MEDIA_SELECT_FIELDS = {
  id: true,
  websiteId: true,
  type: true,
  url: true,
  storageKey: true,
  fileName: true,
  mimeType: true,
  fileSize: true,
  width: true,
  height: true,
  altText: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class MediaService {
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

  async findAll(websiteId: string, query: QueryMediaDto) {
    await this.validateWebsite(websiteId);

    const page = query.page || 1;
    const limit = Math.min(query.limit || 10, 100);
    const skip = (page - 1) * limit;

    const where: Prisma.MediaWhereInput = { websiteId };

    if (query.type) {
      where.type = query.type;
    }

    if (query.mimeType) {
      where.mimeType = { contains: query.mimeType.trim(), mode: 'insensitive' };
    }

    if (query.search) {
      const searchTerm = query.search.trim();
      where.OR = [
        { fileName: { contains: searchTerm, mode: 'insensitive' } },
        { altText: { contains: searchTerm, mode: 'insensitive' } },
        { storageKey: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.media.count({ where }),
      this.prisma.media.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: MEDIA_SELECT_FIELDS,
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

    const media = await this.prisma.media.findUnique({
      where: { id },
      select: MEDIA_SELECT_FIELDS,
    });

    if (!media || media.websiteId !== websiteId) {
      throw new NotFoundException(`Media record with ID "${id}" not found on Website "${websiteId}"`);
    }

    return media;
  }

  async create(websiteId: string, dto: CreateMediaDto) {
    await this.validateWebsite(websiteId);

    return this.prisma.media.create({
      data: {
        websiteId,
        type: dto.type,
        url: dto.url,
        storageKey: dto.storageKey,
        fileName: dto.fileName,
        mimeType: dto.mimeType,
        fileSize: dto.fileSize,
        width: dto.width,
        height: dto.height,
        altText: dto.altText,
      },
      select: MEDIA_SELECT_FIELDS,
    });
  }

  async update(websiteId: string, id: string, dto: UpdateMediaDto) {
    await this.findOne(websiteId, id);

    return this.prisma.media.update({
      where: { id },
      data: dto,
      select: MEDIA_SELECT_FIELDS,
    });
  }

  async remove(websiteId: string, id: string) {
    await this.findOne(websiteId, id);

    return this.prisma.media.delete({
      where: { id },
      select: MEDIA_SELECT_FIELDS,
    });
  }
}
