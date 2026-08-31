import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto';
import { WebsiteStatus } from '@prisma/client';

@Injectable()
export class SocialLinksService {
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

  async findAll(websiteId: string) {
    await this.validateWebsite(websiteId);

    return this.prisma.socialLink.findMany({
      where: { websiteId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOne(websiteId: string, id: string) {
    await this.validateWebsite(websiteId);

    const socialLink = await this.prisma.socialLink.findUnique({
      where: { id },
    });

    if (!socialLink || socialLink.websiteId !== websiteId) {
      throw new NotFoundException(`Social link with ID "${id}" not found on Website "${websiteId}"`);
    }

    return socialLink;
  }

  async create(websiteId: string, dto: CreateSocialLinkDto) {
    await this.validateWebsite(websiteId);

    return this.prisma.socialLink.create({
      data: {
        websiteId,
        platform: dto.platform,
        url: dto.url,
        sortOrder: dto.sortOrder !== undefined ? dto.sortOrder : 0,
      },
    });
  }

  async update(websiteId: string, id: string, dto: UpdateSocialLinkDto) {
    await this.findOne(websiteId, id);

    return this.prisma.socialLink.update({
      where: { id },
      data: dto,
    });
  }

  async remove(websiteId: string, id: string) {
    await this.findOne(websiteId, id);

    return this.prisma.socialLink.delete({
      where: { id },
    });
  }
}
