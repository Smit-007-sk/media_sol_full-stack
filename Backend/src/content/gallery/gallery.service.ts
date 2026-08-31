import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { QueryGalleryDto } from './dto/query-gallery.dto';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from './dto/update-gallery-item.dto';
import { WebsiteStatus, Prisma } from '@prisma/client';

@Injectable()
export class GalleryService {
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

  // --- GALLERY METHODS ---

  async findAllGalleries(websiteId: string, query: QueryGalleryDto) {
    await this.validateWebsite(websiteId);

    const page = query.page || 1;
    const limit = Math.min(query.limit || 10, 100);
    const skip = (page - 1) * limit;

    const where: Prisma.GalleryWhereInput = { websiteId };

    if (query.search) {
      const searchTerm = query.search.trim();
      where.OR = [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.gallery.count({ where }),
      this.prisma.gallery.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            orderBy: { sortOrder: 'asc' },
            include: {
              media: {
                select: {
                  id: true,
                  url: true,
                  type: true,
                  fileName: true,
                  altText: true,
                },
              },
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

  async findOneGallery(websiteId: string, id: string) {
    await this.validateWebsite(websiteId);

    const gallery = await this.prisma.gallery.findUnique({
      where: { id },
      include: {
        items: {
          orderBy: { sortOrder: 'asc' },
          include: {
            media: {
              select: {
                id: true,
                url: true,
                type: true,
                fileName: true,
                altText: true,
              },
            },
          },
        },
      },
    });

    if (!gallery || gallery.websiteId !== websiteId) {
      throw new NotFoundException(`Gallery with ID "${id}" not found on Website "${websiteId}"`);
    }

    return gallery;
  }

  async createGallery(websiteId: string, dto: CreateGalleryDto) {
    await this.validateWebsite(websiteId);

    return this.prisma.gallery.create({
      data: {
        websiteId,
        title: dto.title,
        description: dto.description,
      },
      include: {
        items: true,
      },
    });
  }

  async updateGallery(websiteId: string, id: string, dto: UpdateGalleryDto) {
    await this.findOneGallery(websiteId, id);

    return this.prisma.gallery.update({
      where: { id },
      data: dto,
      include: {
        items: true,
      },
    });
  }

  async removeGallery(websiteId: string, id: string) {
    await this.findOneGallery(websiteId, id);

    return this.prisma.gallery.delete({
      where: { id },
    });
  }

  // --- GALLERY ITEM METHODS ---

  async findGalleryItems(websiteId: string, galleryId: string) {
    await this.findOneGallery(websiteId, galleryId);

    return this.prisma.galleryItem.findMany({
      where: { galleryId },
      orderBy: { sortOrder: 'asc' },
      include: {
        media: {
          select: {
            id: true,
            url: true,
            type: true,
            fileName: true,
            altText: true,
          },
        },
      },
    });
  }

  async findOneGalleryItem(websiteId: string, galleryId: string, itemId: string) {
    await this.findOneGallery(websiteId, galleryId);

    const item = await this.prisma.galleryItem.findUnique({
      where: { id: itemId },
      include: {
        media: {
          select: {
            id: true,
            url: true,
            type: true,
            fileName: true,
            altText: true,
          },
        },
      },
    });

    if (!item || item.galleryId !== galleryId) {
      throw new NotFoundException(`GalleryItem with ID "${itemId}" not found in Gallery "${galleryId}"`);
    }

    return item;
  }

  async createGalleryItem(websiteId: string, galleryId: string, dto: CreateGalleryItemDto) {
    await this.findOneGallery(websiteId, galleryId);

    // Verify media exists
    const media = await this.prisma.media.findUnique({
      where: { id: dto.mediaId },
    });

    if (!media) {
      throw new NotFoundException(`Media with ID "${dto.mediaId}" not found`);
    }

    return this.prisma.galleryItem.create({
      data: {
        galleryId,
        mediaId: dto.mediaId,
        title: dto.title,
        description: dto.description,
        sortOrder: dto.sortOrder !== undefined ? dto.sortOrder : 0,
      },
      include: {
        media: {
          select: {
            id: true,
            url: true,
            type: true,
            fileName: true,
            altText: true,
          },
        },
      },
    });
  }

  async updateGalleryItem(
    websiteId: string,
    galleryId: string,
    itemId: string,
    dto: UpdateGalleryItemDto,
  ) {
    await this.findOneGalleryItem(websiteId, galleryId, itemId);

    if (dto.mediaId) {
      const media = await this.prisma.media.findUnique({
        where: { id: dto.mediaId },
      });

      if (!media) {
        throw new NotFoundException(`Media with ID "${dto.mediaId}" not found`);
      }
    }

    return this.prisma.galleryItem.update({
      where: { id: itemId },
      data: dto,
      include: {
        media: {
          select: {
            id: true,
            url: true,
            type: true,
            fileName: true,
            altText: true,
          },
        },
      },
    });
  }

  async removeGalleryItem(websiteId: string, galleryId: string, itemId: string) {
    await this.findOneGalleryItem(websiteId, galleryId, itemId);

    return this.prisma.galleryItem.delete({
      where: { id: itemId },
    });
  }
}
