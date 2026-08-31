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
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { QueryTestimonialDto } from './dto/query-testimonial.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('Testimonials')
@ApiBearerAuth('JWT-auth')
@Controller('websites/:websiteId/testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get paginated testimonials for a website' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 200, description: 'Paginated list of testimonials' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  async findAll(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Query() query: QueryTestimonialDto,
  ) {
    const result = await this.testimonialsService.findAll(websiteId, query);
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
  @ApiOperation({ summary: 'Get a specific testimonial by UUID' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Testimonial UUID', type: String })
  @ApiResponse({ status: 200, description: 'Testimonial details' })
  @ApiResponse({ status: 400, description: 'Invalid UUID format' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Testimonial not found on this website' })
  async findOne(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.testimonialsService.findOne(websiteId, id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new testimonial for a website (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiResponse({ status: 201, description: 'Testimonial created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g. Website is archived)' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  async create(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Body() createTestimonialDto: CreateTestimonialDto,
  ) {
    const data = await this.testimonialsService.create(websiteId, createTestimonialDto);
    return {
      success: true,
      message: 'Testimonial created successfully',
      data,
    };
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update an existing testimonial (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Testimonial UUID', type: String })
  @ApiResponse({ status: 200, description: 'Testimonial updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Testimonial not found on this website' })
  async update(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ) {
    const data = await this.testimonialsService.update(websiteId, id, updateTestimonialDto);
    return {
      success: true,
      message: 'Testimonial updated successfully',
      data,
    };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Soft delete/deactivate a testimonial (ADMIN only)' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID', type: String })
  @ApiParam({ name: 'id', description: 'Testimonial UUID', type: String })
  @ApiResponse({ status: 200, description: 'Testimonial deactivated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Testimonial not found on this website' })
  async remove(
    @Param('websiteId', ParseUUIDPipe) websiteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.testimonialsService.remove(websiteId, id);
    return {
      success: true,
      message: 'Testimonial deactivated successfully',
      data,
    };
  }
}
