import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { WebsiteGenerationService } from './website-generation.service';
import { DeepseekPromptService } from './deepseek-prompt.service';
import { CreateWebsiteRequestDto } from './dto/create-website-request.dto';
import { QueryWebsiteRequestDto } from './dto/query-website-request.dto';
import { SaveGeneratedWebsiteDto } from './dto/save-generated-website.dto';
import { PublishGeneratedWebsiteDto } from './dto/publish-generated-website.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Website Requests')
@Controller('website-requests')
export class WebsiteRequestController {
  constructor(
    private readonly websiteGenerationService: WebsiteGenerationService,
    private readonly deepseekPromptService: DeepseekPromptService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Public endpoint to submit a website generation request',
  })
  @ApiResponse({
    status: 201,
    description: 'Website request and generation job created successfully in PENDING state',
  })
  async create(@Body() dto: CreateWebsiteRequestDto) {
    const result = await this.websiteGenerationService.createWebsiteRequest(dto);
    return {
      success: true,
      message: 'Website generation request submitted successfully',
      data: result,
    };
  }

  @Get('check-slug')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Admin: Check whether a URL slug is valid and available for publishing',
  })
  @ApiQuery({ name: 'slug', description: 'Desired website slug', type: String })
  @ApiQuery({ name: 'excludeRequestId', description: 'Optional request ID to exclude from uniqueness check', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Slug availability status' })
  @ApiResponse({ status: 400, description: 'Invalid or reserved slug format' })
  async checkSlug(
    @Query('slug') slug: string,
    @Query('excludeRequestId') excludeRequestId?: string,
  ) {
    const result = await this.websiteGenerationService.checkSlugAvailability(slug, excludeRequestId);
    return {
      success: true,
      data: result,
    };
  }

  @Get('public-site/:slug')
  @ApiOperation({
    summary: 'Public endpoint to fetch published generated static website by slug',
  })
  @ApiParam({ name: 'slug', description: 'Published website slug', type: String })
  @ApiResponse({ status: 200, description: 'Published website code payload' })
  @ApiResponse({ status: 404, description: 'Website not found or not published' })
  async getPublicSite(@Param('slug') slug: string) {
    const data = await this.websiteGenerationService.getPublicGeneratedWebsite(slug);
    return {
      success: true,
      data,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Admin: Get all paginated website requests with search and status filter',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of website requests',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Query() query: QueryWebsiteRequestDto) {
    const result = await this.websiteGenerationService.findAllWebsiteRequests(query);
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
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Admin: Get a specific website request by UUID with complete details',
  })
  @ApiParam({ name: 'id', description: 'Website Request UUID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Website request details including job and uploaded assets',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Website request not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.websiteGenerationService.findOneWebsiteRequest(id);
    return {
      success: true,
      data,
    };
  }

  @Post(':id/deepseek-prompt')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Admin: Generate a structured DeepSeek prompt from a WebsiteRequest with Design Diversity Engine',
  })
  @ApiParam({ name: 'id', description: 'Website Request UUID', type: String })
  @ApiQuery({ name: 'variation', description: 'Optional variation index', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'DeepSeek prompt and Design Blueprint generated successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Website request not found' })
  async generateDeepseekPrompt(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('variation') queryVariation?: string,
    @Body('variation') bodyVariation?: number,
    @Body('action') action?: string,
  ) {
    const request = await this.websiteGenerationService.findOneWebsiteRequest(id);
    const persistedVariation = ((request.assetReferences as any)?.promptVariation ?? 0) as number;

    let targetVariation = persistedVariation;

    if (action === 'next') {
      targetVariation = persistedVariation + 1;
      await this.websiteGenerationService.updatePromptVariation(id, targetVariation);
    } else if (bodyVariation !== undefined && typeof bodyVariation === 'number' && bodyVariation >= 0) {
      targetVariation = bodyVariation;
      if (targetVariation !== persistedVariation) {
        await this.websiteGenerationService.updatePromptVariation(id, targetVariation);
      }
    } else if (queryVariation !== undefined && queryVariation !== '') {
      const parsed = parseInt(queryVariation, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        targetVariation = parsed;
        if (targetVariation !== persistedVariation) {
          await this.websiteGenerationService.updatePromptVariation(id, targetVariation);
        }
      }
    }

    const designBlueprint = this.deepseekPromptService.generateDesignProfile(request, targetVariation);
    const prompt = this.deepseekPromptService.generatePrompt(request, targetVariation);

    return {
      success: true,
      prompt,
      variation: targetVariation,
      designBlueprint,
    };
  }

  @Get(':id/generated-website')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Admin: Get the generated website draft code for a WebsiteRequest',
  })
  @ApiParam({ name: 'id', description: 'Website Request UUID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Generated website code workspace details',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Website request or generated workspace not found' })
  async getGeneratedWebsite(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.websiteGenerationService.getGeneratedWebsite(id);
    return {
      success: true,
      data,
    };
  }

  @Post(':id/generated-website')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Admin: Save or update generated website draft code (HTML, CSS, JS)',
  })
  @ApiParam({ name: 'id', description: 'Website Request UUID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Generated website draft saved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Website request not found' })
  async saveGeneratedWebsite(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: SaveGeneratedWebsiteDto,
  ) {
    const data = await this.websiteGenerationService.saveGeneratedWebsite(id, dto);
    return {
      success: true,
      message: 'Draft saved successfully',
      data,
    };
  }

  @Patch(':id/generated-website')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Admin: Partially update generated website draft code (HTML, CSS, JS)',
  })
  @ApiParam({ name: 'id', description: 'Website Request UUID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Generated website draft updated successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Website request not found' })
  async updateGeneratedWebsite(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: SaveGeneratedWebsiteDto,
  ) {
    const data = await this.websiteGenerationService.saveGeneratedWebsite(id, dto);
    return {
      success: true,
      message: 'Draft updated successfully',
      data,
    };
  }

  @Post(':id/generated-website/publish')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Admin: Publish a generated website to a public URL slug',
  })
  @ApiParam({ name: 'id', description: 'Website Request UUID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Generated website published successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid slug or empty HTML' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Slug already in use' })
  async publishGeneratedWebsite(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: PublishGeneratedWebsiteDto,
  ) {
    const data = await this.websiteGenerationService.publishGeneratedWebsite(id, dto.slug);
    return {
      success: true,
      message: 'Website published successfully',
      data,
    };
  }

  @Post(':id/generated-website/unpublish')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Admin: Unpublish a generated website (reverts to DRAFT)',
  })
  @ApiParam({ name: 'id', description: 'Website Request UUID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Website unpublished successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Website request not found' })
  async unpublishGeneratedWebsite(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.websiteGenerationService.unpublishGeneratedWebsite(id);
    return {
      success: true,
      message: data.message,
      data,
    };
  }
}




