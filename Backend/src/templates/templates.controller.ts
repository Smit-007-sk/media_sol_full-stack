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
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { QueryTemplateDto } from './dto/query-template.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Templates')
@ApiBearerAuth('JWT-auth')
@Controller()
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get('templates')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all paginated templates with search and filters' })
  @ApiResponse({ status: 200, description: 'Paginated list of templates' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Query() query: QueryTemplateDto) {
    const result = await this.templatesService.findAll(query);
    return {
      success: true,
      data: {
        items: result.items,
        meta: result.meta,
      },
    };
  }

  @Get('templates/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a template by UUID' })
  @ApiParam({ name: 'id', description: 'Template UUID', type: String })
  @ApiResponse({ status: 200, description: 'Template details' })
  @ApiResponse({ status: 400, description: 'Invalid UUID format' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.templatesService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Get('projects/:projectId/templates')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get templates for a specific project UUID' })
  @ApiParam({ name: 'projectId', description: 'Project UUID', type: String })
  @ApiResponse({ status: 200, description: 'List of project templates' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async findByProjectId(@Param('projectId', ParseUUIDPipe) projectId: string) {
    const data = await this.templatesService.findByProjectId(projectId, true);
    return {
      success: true,
      data,
    };
  }

  @Post('templates')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new template under a project (ADMIN only)' })
  @ApiResponse({ status: 201, description: 'Template created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 409, description: 'Template key or slug already exists' })
  async create(@Body() createTemplateDto: CreateTemplateDto) {
    const data = await this.templatesService.create(createTemplateDto);
    return {
      success: true,
      message: 'Template created successfully',
      data,
    };
  }

  @Patch('templates/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update an existing template (ADMIN only)' })
  @ApiParam({ name: 'id', description: 'Template UUID', type: String })
  @ApiResponse({ status: 200, description: 'Template updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    const data = await this.templatesService.update(id, updateTemplateDto);
    return {
      success: true,
      message: 'Template updated successfully',
      data,
    };
  }

  @Delete('templates/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Soft delete/deactivate a template (ADMIN only)' })
  @ApiParam({ name: 'id', description: 'Template UUID', type: String })
  @ApiResponse({ status: 200, description: 'Template deactivated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.templatesService.remove(id);
    return {
      success: true,
      message: 'Template deactivated successfully',
      data,
    };
  }
}
