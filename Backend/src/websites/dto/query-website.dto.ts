import { ApiPropertyOptional } from '@nestjs/swagger';
import { WebsiteStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class QueryWebsiteDto {
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

  @ApiPropertyOptional({ example: 'Acme', description: 'Search query for name or slug' })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: '00000000-0000-0000-0000-000000000000', description: 'Filter by Client UUID' })
  @IsOptional()
  @IsUUID(undefined, { message: 'clientId must be a valid UUID' })
  clientId?: string;

  @ApiPropertyOptional({ example: 'aurora-corporate', description: 'Filter by Template UUID, Slug, or Key' })
  @IsOptional()
  @IsString()
  templateId?: string;

  @ApiPropertyOptional({ enum: WebsiteStatus, description: 'Filter by WebsiteStatus (DRAFT, PUBLISHED, ARCHIVED)' })
  @IsOptional()
  @IsEnum(WebsiteStatus, { message: 'status must be a valid WebsiteStatus (DRAFT, PUBLISHED, ARCHIVED)' })
  status?: WebsiteStatus;

  @ApiPropertyOptional({ example: true, description: 'Filter by published status' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isPublished?: boolean;
}
