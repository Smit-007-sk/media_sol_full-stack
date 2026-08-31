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
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { QueryMediaDto } from './dto/query-media.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('Media')
@ApiBearerAuth('JWT-auth')
@Controller('websites/:websiteId/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get paginated media items for a website' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 200, description: 'Paginated list of media items' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  async findAll(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Query() query: QueryMediaDto,
  ) {
    const result = await this.mediaService.findAll(websiteId, query);
    return {
      success: true,
      data: {
        items: result.items,
        meta: result.meta,
      },
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a specific media item by UUID' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Media UUID', type: String })
  @ApiResponse({ status: 200, description: 'Media item details' })
  @ApiResponse({ status: 400, description: 'Invalid UUID format' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Media record not found on this website' })
  async findOne(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.mediaService.findOne(websiteId, id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Upload/register a new media record (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 201, description: 'Media record created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g. Website is archived)' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  async create(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Body() createMediaDto: CreateMediaDto,
  ) {
    const data = await this.mediaService.create(websiteId, createMediaDto);
    return {
      success: true,
      message: 'Media record created successfully',
      data,
    };
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update an existing media record (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Media UUID', type: String })
  @ApiResponse({ status: 200, description: 'Media record updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Media record not found on this website' })
  async update(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    const data = await this.mediaService.update(websiteId, id, updateMediaDto);
    return {
      success: true,
      message: 'Media record updated successfully',
      data,
    };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete a media record (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Media UUID', type: String })
  @ApiResponse({ status: 200, description: 'Media record deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Media record not found on this website' })
  async remove(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.mediaService.remove(websiteId, id);
    return {
      success: true,
      message: 'Media record deleted successfully',
      data,
    };
  }
}
