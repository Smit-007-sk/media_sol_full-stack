import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WebsiteGenerationService } from './website-generation.service';
import { CreateWebsiteRequestDto } from './dto/create-website-request.dto';

@ApiTags('Website Requests')
@Controller('website-requests')
export class WebsiteRequestController {
  constructor(
    private readonly websiteGenerationService: WebsiteGenerationService,
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
}
