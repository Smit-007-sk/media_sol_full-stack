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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { QueryServiceDto } from './dto/query-service.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('Services')
@ApiBearerAuth('JWT-auth')
@Controller('websites/:websiteId/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get paginated services for a website' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 200, description: 'Paginated list of services' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  async findAll(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Query() query: QueryServiceDto,
  ) {
    const result = await this.servicesService.findAll(websiteId, query);
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
  @ApiOperation({ summary: 'Get a specific service by UUID' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Service UUID', type: String })
  @ApiResponse({ status: 200, description: 'Service details' })
  @ApiResponse({ status: 400, description: 'Invalid UUID format' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Service not found on this website' })
  async findOne(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.servicesService.findOne(websiteId, id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new service for a website (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 201, description: 'Service created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g. Website is archived)' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  async create(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Body() createServiceDto: CreateServiceDto,
  ) {
    const data = await this.servicesService.create(websiteId, createServiceDto);
    return {
      success: true,
      message: 'Service created successfully',
      data,
    };
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update an existing service (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Service UUID', type: String })
  @ApiResponse({ status: 200, description: 'Service updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Service not found on this website' })
  async update(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    const data = await this.servicesService.update(websiteId, id, updateServiceDto);
    return {
      success: true,
      message: 'Service updated successfully',
      data,
    };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Soft delete/deactivate a service (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Service UUID', type: String })
  @ApiResponse({ status: 200, description: 'Service deactivated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Service not found on this website' })
  async remove(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.servicesService.remove(websiteId, id);
    return {
      success: true,
      message: 'Service deactivated successfully',
      data,
    };
  }
}
