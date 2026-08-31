import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { QueryGalleryDto } from './dto/query-gallery.dto';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from './dto/update-gallery-item.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiBearerAuth('JWT-auth')
@Controller('websites/:websiteId/gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  // --- GALLERY ENDPOINTS ---

  @ApiTags('Gallery')
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get paginated galleries for a website' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 200, description: 'Paginated list of galleries' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  async findAllGalleries(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Query() query: QueryGalleryDto,
  ) {
    const result = await this.galleryService.findAllGalleries(websiteId, query);
    return {
      success: true,
      data: {
        items: result.items,
        meta: result.meta,
      },
    };
  }

  @ApiTags('Gallery')
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a gallery by UUID' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Gallery UUID', type: String })
  @ApiResponse({ status: 200, description: 'Gallery details' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Gallery not found on this website' })
  async findOneGallery(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.galleryService.findOneGallery(websiteId, id);
    return {
      success: true,
      data,
    };
  }

  @ApiTags('Gallery')
  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new gallery for a website (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 201, description: 'Gallery created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  async createGallery(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Body() createGalleryDto: CreateGalleryDto,
  ) {
    const data = await this.galleryService.createGallery(websiteId, createGalleryDto);
    return {
      success: true,
      message: 'Gallery created successfully',
      data,
    };
  }

  @ApiTags('Gallery')
  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update an existing gallery (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Gallery UUID', type: String })
  @ApiResponse({ status: 200, description: 'Gallery updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Gallery not found on this website' })
  async updateGallery(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    const data = await this.galleryService.updateGallery(websiteId, id, updateGalleryDto);
    return {
      success: true,
      message: 'Gallery updated successfully',
      data,
    };
  }

  @ApiTags('Gallery')
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete a gallery (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Gallery UUID', type: String })
  @ApiResponse({ status: 200, description: 'Gallery deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Gallery not found on this website' })
  async removeGallery(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.galleryService.removeGallery(websiteId, id);
    return {
      success: true,
      message: 'Gallery deleted successfully',
      data,
    };
  }

  // --- GALLERY ITEM ENDPOINTS ---

  @ApiTags('Gallery Items')
  @Get(':galleryId/items')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all items in a gallery' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'galleryId', description: 'Gallery UUID', type: String })
  @ApiResponse({ status: 200, description: 'List of gallery items' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Gallery not found' })
  async findGalleryItems(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('galleryId', ParseUUIDPipe) galleryId: string,
  ) {
    const data = await this.galleryService.findGalleryItems(websiteId, galleryId);
    return {
      success: true,
      data,
    };
  }

  @ApiTags('Gallery Items')
  @Post(':galleryId/items')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a new item to a gallery (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'galleryId', description: 'Gallery UUID', type: String })
  @ApiResponse({ status: 201, description: 'Gallery item created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Gallery or Media not found' })
  async createGalleryItem(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('galleryId', ParseUUIDPipe) galleryId: string,
    @Body() createGalleryItemDto: CreateGalleryItemDto,
  ) {
    const data = await this.galleryService.createGalleryItem(
      websiteId,
      galleryId,
      createGalleryItemDto,
    );
    return {
      success: true,
      message: 'Gallery item created successfully',
      data,
    };
  }

  @ApiTags('Gallery Items')
  @Patch(':galleryId/items/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update an existing gallery item (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'galleryId', description: 'Gallery UUID', type: String })
  @ApiParam({ name: 'id', description: 'Gallery Item UUID', type: String })
  @ApiResponse({ status: 200, description: 'Gallery item updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Gallery item not found in gallery' })
  async updateGalleryItem(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('galleryId', ParseUUIDPipe) galleryId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGalleryItemDto: UpdateGalleryItemDto,
  ) {
    const data = await this.galleryService.updateGalleryItem(
      websiteId,
      galleryId,
      id,
      updateGalleryItemDto,
    );
    return {
      success: true,
      message: 'Gallery item updated successfully',
      data,
    };
  }

  @ApiTags('Gallery Items')
  @Delete(':galleryId/items/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete a gallery item (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'galleryId', description: 'Gallery UUID', type: String })
  @ApiParam({ name: 'id', description: 'Gallery Item UUID', type: String })
  @ApiResponse({ status: 200, description: 'Gallery item deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Gallery item not found in gallery' })
  async removeGalleryItem(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('galleryId', ParseUUIDPipe) galleryId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.galleryService.removeGalleryItem(websiteId, galleryId, id);
    return {
      success: true,
      message: 'Gallery item deleted successfully',
      data,
    };
  }
}
