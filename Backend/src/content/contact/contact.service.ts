import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { WebsiteStatus, Prisma } from '@prisma/client';

@Injectable()
export class ContactService {
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

    const contact = await this.prisma.contact.findUnique({
      where: { websiteId },
    });

    if (!contact) {
      throw new NotFoundException(`Contact section for Website "${websiteId}" not found`);
    }

    return contact;
  }

  async create(websiteId: string, dto: CreateContactDto) {
    await this.validateWebsite(websiteId);

    const existing = await this.prisma.contact.findUnique({
      where: { websiteId },
    });

    if (existing) {
      throw new ConflictException(`Contact section already exists for Website "${websiteId}"`);
    }

    try {
      return await this.prisma.contact.create({
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
        throw new ConflictException(`Contact section already exists for Website "${websiteId}"`);
      }
      throw error;
    }
  }

  async update(websiteId: string, dto: UpdateContactDto) {
    await this.validateWebsite(websiteId);

    return this.prisma.contact.upsert({
      where: { websiteId },
      create: {
        websiteId,
        ...dto,
      },
      update: dto,
    });
  }

  async remove(websiteId: string) {
    await this.findOne(websiteId);

    return this.prisma.contact.delete({
      where: { websiteId },
    });
  }
}
