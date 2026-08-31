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
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('About')
@ApiBearerAuth('JWT-auth')
@Controller('websites/:websiteId/about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get about section for a website' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 200, description: 'About section details' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Website or About section not found' })
  async findOne(@Param('websiteId', ParseUUIDPipe) websiteId: string) {
    const data = await this.aboutService.findOne(websiteId);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create about section for a website (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 201, description: 'About created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g. Website is archived)' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 409, description: 'About section already exists for this website' })
  async create(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Body() createAboutDto: CreateAboutDto,
  ) {
    const data = await this.aboutService.create(websiteId, createAboutDto);
    return {
      success: true,
      message: 'About created successfully',
      data,
    };
  }

  @Patch()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update about section for a website (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 200, description: 'About updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Website or About section not found' })
  async update(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Body() updateAboutDto: UpdateAboutDto,
  ) {
    const data = await this.aboutService.update(websiteId, updateAboutDto);
    return {
      success: true,
      message: 'About updated successfully',
      data,
    };
  }

  @Delete()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete about section for a website (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 200, description: 'About deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Website or About section not found' })
  async remove(@Param('websiteId', ParseUUIDPipe) websiteId: string) {
    const data = await this.aboutService.remove(websiteId);
    return {
      success: true,
      message: 'About deleted successfully',
      data,
    };
  }
}
