import { ApiPropertyOptional } from '@nestjs/swagger';
import { WebsiteRequestStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum WebsiteLifecycleFilter {
  NO_WEBSITE = 'NO_WEBSITE',
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export class QueryWebsiteRequestDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number for pagination' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: 'Items per page (max 100)' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(100, { message: 'limit cannot exceed 100' })
  limit?: number = 10;

  @ApiPropertyOptional({ example: 'Acme', description: 'Search query for business name, client name, email, phone, category, slug' })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: WebsiteRequestStatus, description: 'Filter by request status (PENDING, PROCESSING, COMPLETED, FAILED)' })
  @IsOptional()
  @IsEnum(WebsiteRequestStatus, { message: 'Status must be PENDING, PROCESSING, COMPLETED, or FAILED' })
  status?: WebsiteRequestStatus;

  @ApiPropertyOptional({ enum: WebsiteLifecycleFilter, description: 'Filter by generated website lifecycle status (NO_WEBSITE, DRAFT, PUBLISHED)' })
  @IsOptional()
  @IsEnum(WebsiteLifecycleFilter, { message: 'Website status must be NO_WEBSITE, DRAFT, or PUBLISHED' })
  websiteStatus?: WebsiteLifecycleFilter;
}
