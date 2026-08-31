import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { SocialLinksService } from './social-links.service';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('Social Links')
@ApiBearerAuth('JWT-auth')
@Controller('websites/:websiteId/social-links')
export class SocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all social links for a website' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 200, description: 'List of social links' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  async findAll(@Param('websiteId', ParseUUIDPipe) websiteId: string) {
    const data = await this.socialLinksService.findAll(websiteId);
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a specific social link by UUID' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Social Link UUID', type: String })
  @ApiResponse({ status: 200, description: 'Social link details' })
  @ApiResponse({ status: 400, description: 'Invalid UUID format' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Social link not found on this website' })
  async findOne(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.socialLinksService.findOne(websiteId, id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new social link for a website (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 201, description: 'Social link created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid platform enum or website archived' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  async create(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Body() createSocialLinkDto: CreateSocialLinkDto,
  ) {
    const data = await this.socialLinksService.create(websiteId, createSocialLinkDto);
    return {
      success: true,
      message: 'Social link created successfully',
      data,
    };
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update an existing social link (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Social Link UUID', type: String })
  @ApiResponse({ status: 200, description: 'Social link updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Social link not found on this website' })
  async update(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSocialLinkDto: UpdateSocialLinkDto,
  ) {
    const data = await this.socialLinksService.update(websiteId, id, updateSocialLinkDto);
    return {
      success: true,
      message: 'Social link updated successfully',
      data,
    };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete a social link (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Social Link UUID', type: String })
  @ApiResponse({ status: 200, description: 'Social link deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Social link not found on this website' })
  async remove(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.socialLinksService.remove(websiteId, id);
    return {
      success: true,
      message: 'Social link deleted successfully',
      data,
    };
  }
}
