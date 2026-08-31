import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTemplateDto {
  @ApiPropertyOptional({ example: '00000000-0000-0000-0000-000000000000', description: 'Parent Project UUID' })
  @IsUUID(undefined, { message: 'projectId must be a valid UUID' })
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({ example: 'Updated Template Name', description: 'Template name' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'updated-template-slug', description: 'Unique template slug' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({ example: 'template-agency-02', description: 'Unique template key identifier' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  templateKey?: string;

  @ApiPropertyOptional({ example: 'Updated template description', description: 'Template description' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: '/previews/updated-preview.jpg', description: 'Preview image URL' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  previewImage?: string;

  @ApiPropertyOptional({ example: true, description: 'Whether the template is active' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
