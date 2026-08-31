import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTemplateDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000', description: 'Parent Project UUID' })
  @IsUUID(undefined, { message: 'projectId must be a valid UUID' })
  @IsNotEmpty({ message: 'projectId is required' })
  projectId: string;

  @ApiProperty({ example: 'Modern Agency Template', description: 'Template name' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Template name is required' })
  name: string;

  @ApiPropertyOptional({ example: 'modern-agency-template', description: 'Unique template slug' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ example: 'template-agency-01', description: 'Unique template key identifier' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'templateKey is required' })
  templateKey: string;

  @ApiPropertyOptional({ example: 'A sleek template for agency websites', description: 'Template description' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: '/previews/template-01.jpg', description: 'Preview image URL' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  previewImage?: string;

  @ApiPropertyOptional({ example: true, description: 'Whether the template is active' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
