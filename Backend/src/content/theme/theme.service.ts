import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { WebsiteStatus, Prisma } from '@prisma/client';

@Injectable()
export class ThemeService {
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

  async findOne(websiteId: string) {
    await this.validateWebsite(websiteId);

    const theme = await this.prisma.theme.findUnique({
      where: { websiteId },
    });

    if (!theme) {
      throw new NotFoundException(`Theme for Website "${websiteId}" not found`);
    }

    return theme;
  }

  async create(websiteId: string, dto: CreateThemeDto) {
    await this.validateWebsite(websiteId);

    const existing = await this.prisma.theme.findUnique({
      where: { websiteId },
    });

    if (existing) {
      throw new ConflictException(`Theme already exists for Website "${websiteId}"`);
    }

    try {
      return await this.prisma.theme.create({
        data: {
          websiteId,
          ...dto,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Theme already exists for Website "${websiteId}"`);
      }
      throw error;
    }
  }

  async update(websiteId: string, dto: UpdateThemeDto) {
    await this.validateWebsite(websiteId);

    try {
      return await this.prisma.theme.upsert({
        where: { websiteId },
        create: {
          websiteId,
          ...dto,
        },
        update: dto,
      });
    } catch {
      const {
        heroLayout, aboutLayout, servicesStyle, galleryStyle, testimonialsStyle,
        contactStyle, sectionSpacing, containerWidth, buttonSize, designPreset,
        logoUrl, brandName,
        ...coreFields
      } = dto as any;

      return await this.prisma.theme.upsert({
        where: { websiteId },
        create: {
          websiteId,
          ...coreFields,
        },
        update: coreFields,
      });
    }
  }

  async remove(websiteId: string) {
    await this.findOne(websiteId);

    return this.prisma.theme.delete({
      where: { websiteId },
    });
  }
}
