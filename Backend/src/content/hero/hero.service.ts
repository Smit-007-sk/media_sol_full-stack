import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { WebsiteStatus, Prisma, MediaType } from '@prisma/client';

@Injectable()
export class HeroService {
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

  private async resolveMediaId(websiteId: string, mediaInput?: string | null): Promise<string | null> {
    if (!mediaInput || mediaInput.trim() === '') {
      return null;
    }
    const trimmed = mediaInput.trim();

    try {
      const byId = await this.prisma.media.findUnique({
        where: { id: trimmed },
      });
      if (byId) return byId.id;
    } catch {
      // Not a UUID syntax
    }

    const byUrl = await this.prisma.media.findFirst({
      where: { websiteId, url: trimmed },
    });
    if (byUrl) return byUrl.id;

    const newMedia = await this.prisma.media.create({
      data: {
        websiteId,
        type: MediaType.IMAGE,
        fileName: 'Hero Image',
        storageKey: trimmed,
        url: trimmed,
        mimeType: 'image/jpeg',
        fileSize: 0,
      },
    });
    return newMedia.id;
  }

  async findOne(websiteId: string) {
    await this.validateWebsite(websiteId);

    const hero = await this.prisma.hero.findUnique({
      where: { websiteId },
      include: {
        image: true,
        video: true,
      },
    });

    if (!hero) {
      throw new NotFoundException(`Hero section for Website "${websiteId}" not found`);
    }

    return hero;
  }

  async create(websiteId: string, dto: CreateHeroDto) {
    await this.validateWebsite(websiteId);

    const existing = await this.prisma.hero.findUnique({
      where: { websiteId },
    });

    if (existing) {
      throw new ConflictException(`Hero section already exists for Website "${websiteId}"`);
    }

    const resolvedImageId = dto.imageId !== undefined ? await this.resolveMediaId(websiteId, dto.imageId) : null;
    const resolvedVideoId = dto.videoId !== undefined ? await this.resolveMediaId(websiteId, dto.videoId) : null;

    const { bgOpacity, ...createDbPayload } = dto as any;

    try {
      return await this.prisma.hero.create({
        data: {
          websiteId,
          ...createDbPayload,
          imageId: resolvedImageId,
          videoId: resolvedVideoId,
        },
        include: {
          image: true,
          video: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Hero section already exists for Website "${websiteId}"`);
      }
      throw error;
    }
  }

  async update(websiteId: string, dto: UpdateHeroDto) {
    await this.validateWebsite(websiteId);

    const resolvedImageId = dto.imageId !== undefined ? await this.resolveMediaId(websiteId, dto.imageId) : undefined;
    const resolvedVideoId = dto.videoId !== undefined ? await this.resolveMediaId(websiteId, dto.videoId) : undefined;

    const payload = {
      ...dto,
      ...(dto.imageId !== undefined && { imageId: resolvedImageId }),
      ...(dto.videoId !== undefined && { videoId: resolvedVideoId }),
    };

    const { bgOpacity, ...dbPayload } = payload as any;

    return this.prisma.hero.upsert({
      where: { websiteId },
      create: {
        websiteId,
        ...dbPayload,
      },
      update: dbPayload,
      include: {
        image: true,
        video: true,
      },
    });
  }

  async remove(websiteId: string) {
    await this.findOne(websiteId);

    return this.prisma.hero.delete({
      where: { websiteId },
    });
  }
}
