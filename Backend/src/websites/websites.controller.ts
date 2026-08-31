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
import { WebsitesService } from './websites.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { QueryWebsiteDto } from './dto/query-website.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Websites')
@ApiBearerAuth('JWT-auth')
@Controller('websites')
export class WebsitesController {
  constructor(private readonly websitesService: WebsitesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all paginated websites with filters and search' })
  @ApiResponse({ status: 200, description: 'Paginated list of websites' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Query() query: QueryWebsiteDto) {
    const result = await this.websitesService.findAll(query);
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
  @ApiOperation({ summary: 'Get a website by UUID' })
  @ApiParam({ name: 'id', description: 'Website UUID', type: String })
  @ApiResponse({ status: 200, description: 'Website details' })
  @ApiResponse({ status: 400, description: 'Invalid UUID format' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.websitesService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new website (ADMIN only)' })
  @ApiResponse({ status: 201, description: 'Website created successfully' })
  @ApiResponse({ status: 400, description: 'Client or Template inactive or invalid' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 409, description: 'Website slug already exists' })
  async create(@Body() createWebsiteDto: CreateWebsiteDto) {
    const data = await this.websitesService.create(createWebsiteDto);
    return {
      success: true,
      message: 'Website created successfully',
      data,
    };
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update an existing website (ADMIN only)' })
  @ApiParam({ name: 'id', description: 'Website UUID', type: String })
  @ApiResponse({ status: 200, description: 'Website updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWebsiteDto: UpdateWebsiteDto,
  ) {
    const data = await this.websitesService.update(id, updateWebsiteDto);
    return {
      success: true,
      message: 'Website updated successfully',
      data,
    };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Archive a website (ADMIN only)' })
  @ApiParam({ name: 'id', description: 'Website UUID', type: String })
  @ApiResponse({ status: 200, description: 'Website archived successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.websitesService.remove(id);
    return {
      success: true,
      message: 'Website archived successfully',
      data,
    };
  }
}
