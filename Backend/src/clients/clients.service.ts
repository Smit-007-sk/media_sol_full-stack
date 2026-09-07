import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { QueryClientDto } from './dto/query-client.dto';
import { ClientStatus, Prisma } from '@prisma/client';
import { WebsiteGenerationService } from '../website-generation/website-generation.service';

@Injectable()
export class ClientsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly websiteGenerationService: WebsiteGenerationService,
  ) {}

  async findAll(query: QueryClientDto) {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 10, 100);
    const skip = (page - 1) * limit;

    const where: Prisma.ClientWhereInput = {};

    // Default status filter: exclude ARCHIVED unless explicitly requested
    if (query.status) {
      where.status = query.status;
    } else {
      where.status = { not: ClientStatus.ARCHIVED };
    }

    if (query.search) {
      const searchTerm = query.search.trim();
      where.OR = [
        { businessName: { contains: searchTerm, mode: 'insensitive' } },
        { slug: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
        { phone: { contains: searchTerm, mode: 'insensitive' } },
        { city: { contains: searchTerm, mode: 'insensitive' } },
        { state: { contains: searchTerm, mode: 'insensitive' } },
        { country: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.client.count({ where }),
      this.prisma.client.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          logoMedia: {
            select: {
              id: true,
              url: true,
              fileName: true,
            },
          },
          websites: {
            include: {
              media: true,
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

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        logoMedia: {
          select: {
            id: true,
            url: true,
            fileName: true,
          },
        },
        websites: {
          include: {
            media: true,
            hero: true,
            about: true,
            services: true,
          },
        },
      },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }

    return client;
  }

  async create(dto: CreateClientDto) {
    try {
      return await this.prisma.client.create({
        data: {
          businessName: dto.businessName.trim(),
          slug: dto.slug.toLowerCase().trim(),
          description: dto.description ? dto.description.trim() : null,
          logoMediaId: dto.logoMediaId || null,
          phone: dto.phone ? dto.phone.trim() : null,
          email: dto.email ? dto.email.toLowerCase().trim() : null,
          address: dto.address ? dto.address.trim() : null,
          city: dto.city ? dto.city.trim() : null,
          state: dto.state ? dto.state.trim() : null,
          country: dto.country ? dto.country.trim() : null,
          status: dto.status || ClientStatus.ACTIVE,
        },
        include: {
          logoMedia: {
            select: {
              id: true,
              url: true,
              fileName: true,
            },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Client with slug "${dto.slug}" already exists`);
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateClientDto) {
    await this.findOne(id); // Throws NotFoundException if not exists

    try {
      return await this.prisma.client.update({
        where: { id },
        data: {
          ...(dto.businessName && { businessName: dto.businessName.trim() }),
          ...(dto.slug && { slug: dto.slug.toLowerCase().trim() }),
          ...(dto.description !== undefined && {
            description: dto.description ? dto.description.trim() : null,
          }),
          ...(dto.logoMediaId !== undefined && { logoMediaId: dto.logoMediaId }),
          ...(dto.phone !== undefined && { phone: dto.phone ? dto.phone.trim() : null }),
          ...(dto.email !== undefined && {
            email: dto.email ? dto.email.toLowerCase().trim() : null,
          }),
          ...(dto.address !== undefined && {
            address: dto.address ? dto.address.trim() : null,
          }),
          ...(dto.city !== undefined && { city: dto.city ? dto.city.trim() : null }),
          ...(dto.state !== undefined && { state: dto.state ? dto.state.trim() : null }),
          ...(dto.country !== undefined && {
            country: dto.country ? dto.country.trim() : null,
          }),
          ...(dto.status && { status: dto.status }),
        },
        include: {
          logoMedia: {
            select: {
              id: true,
              url: true,
              fileName: true,
            },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Client with slug "${dto.slug}" already exists`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    const client = await this.findOne(id);

    // Transition status to ARCHIVED (archival / soft delete strategy only)
    if (client.status === ClientStatus.ARCHIVED) {
      return client;
    }

    return this.prisma.client.update({
      where: { id },
      data: { status: ClientStatus.ARCHIVED },
    });
  }

  async submitLead(dto: import('./dto/submit-lead.dto').SubmitLeadDto) {
    return await this.websiteGenerationService.createWebsiteRequest({
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      alternatePhone: dto.altPhone,
      businessName: dto.businessName,
      category: dto.category,
      description: dto.servicesDescription,
      instagram: dto.instagram,
      facebook: dto.facebook,
      linkedin: dto.linkedin,
      specialInstructions: dto.notes,
      selectedFeatures: dto.selectedFeatures,
      logoAssets: dto.logoAssets,
      bannerAssets: dto.bannerAssets,
    });
  }
}

