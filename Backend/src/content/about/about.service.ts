import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { WebsiteStatus, Prisma, MediaType } from '@prisma/client';

@Injectable()
export class AboutService {
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
        fileName: 'About Image',
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

    const about = await this.prisma.about.findUnique({
      where: { websiteId },
      include: {
        image: true,
      },
    });

    if (!about) {
      throw new NotFoundException(`About section for Website "${websiteId}" not found`);
    }

    return about;
  }

  async create(websiteId: string, dto: CreateAboutDto) {
    await this.validateWebsite(websiteId);

    const existing = await this.prisma.about.findUnique({
      where: { websiteId },
    });

    if (existing) {
      throw new ConflictException(`About section already exists for Website "${websiteId}"`);
    }

    const resolvedImageId = dto.imageId !== undefined ? await this.resolveMediaId(websiteId, dto.imageId) : null;

    const { bgOpacity: cBg, ...createPayload } = dto as any;

    try {
      return await this.prisma.about.create({
        data: {
          websiteId,
          ...createPayload,
          imageId: resolvedImageId,
        },
        include: {
          image: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`About section already exists for Website "${websiteId}"`);
      }
      throw error;
    }
  }

  async update(websiteId: string, dto: UpdateAboutDto) {
    await this.validateWebsite(websiteId);

    const resolvedImageId = dto.imageId !== undefined ? await this.resolveMediaId(websiteId, dto.imageId) : undefined;

    const payload = {
      ...dto,
      ...(dto.imageId !== undefined && { imageId: resolvedImageId }),
    };

    const { bgOpacity, ...dbPayload } = payload as any;

    return this.prisma.about.upsert({
      where: { websiteId },
      create: {
        websiteId,
        ...dbPayload,
      },
      update: dbPayload,
      include: {
        image: true,
      },
    });
  }

  async remove(websiteId: string) {
    await this.findOne(websiteId);

    return this.prisma.about.delete({
      where: { websiteId },
    });
  }
}
