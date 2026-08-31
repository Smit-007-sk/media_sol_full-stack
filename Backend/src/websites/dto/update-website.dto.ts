import { ApiPropertyOptional } from '@nestjs/swagger';
import { WebsiteStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateWebsiteDto {
  @ApiPropertyOptional({ example: '00000000-0000-0000-0000-000000000000', description: 'Associated Client UUID' })
  @IsUUID(undefined, { message: 'clientId must be a valid UUID' })
  @IsOptional()
  clientId?: string;

  @ApiPropertyOptional({ example: 'aurora-corporate', description: 'Associated Template ID, Slug, or UUID' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'templateId must be a string' })
  @IsOptional()
  templateId?: string;

  @ApiPropertyOptional({ example: 'Updated Website Name', description: 'Website name' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'updated-website-slug', description: 'Unique website slug' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({ enum: WebsiteStatus, description: 'Website status (DRAFT, PUBLISHED, ARCHIVED)' })
  @IsEnum(WebsiteStatus, { message: 'status must be a valid WebsiteStatus (DRAFT, PUBLISHED, ARCHIVED)' })
  @IsOptional()
  status?: WebsiteStatus;

  @ApiPropertyOptional({ example: true, description: 'Whether the website is published' })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
