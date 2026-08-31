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
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('Theme')
@ApiBearerAuth('JWT-auth')
@Controller('websites/:websiteId/theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get theme settings for a website' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 200, description: 'Theme settings details' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Website or Theme not found' })
  async findOne(@Param('websiteId', ParseUUIDPipe) websiteId: string) {
    const data = await this.themeService.findOne(websiteId);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create theme settings for a website (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 201, description: 'Theme created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g. Website is archived)' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 409, description: 'Theme already exists for this website' })
  async create(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Body() createThemeDto: CreateThemeDto,
  ) {
    const data = await this.themeService.create(websiteId, createThemeDto);
    return {
      success: true,
      message: 'Theme created successfully',
      data,
    };
  }

  @Patch()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update theme settings for a website (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 200, description: 'Theme updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Website or Theme not found' })
  async update(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Body() updateThemeDto: UpdateThemeDto,
  ) {
    const data = await this.themeService.update(websiteId, updateThemeDto);
    return {
      success: true,
      message: 'Theme updated successfully',
      data,
    };
  }

  @Delete()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete theme settings for a website (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 200, description: 'Theme deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Website or Theme not found' })
  async remove(@Param('websiteId', ParseUUIDPipe) websiteId: string) {
    const data = await this.themeService.remove(websiteId);
    return {
      success: true,
      message: 'Theme deleted successfully',
      data,
    };
  }
}
