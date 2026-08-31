import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WebsiteStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateWebsiteDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000', description: 'Associated Client UUID' })
  @IsUUID(undefined, { message: 'clientId must be a valid UUID' })
  @IsNotEmpty({ message: 'clientId is required' })
  clientId: string;

  @ApiProperty({ example: 'aurora-corporate', description: 'Associated Template ID, Slug, or UUID' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'templateId must be a string' })
  @IsNotEmpty({ message: 'templateId is required' })
  templateId: string;

  @ApiProperty({ example: 'Acme Official Portal', description: 'Website name' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Website name is required' })
  name: string;

  @ApiPropertyOptional({ example: 'acme-official-portal', description: 'Unique website slug' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({ enum: WebsiteStatus, default: WebsiteStatus.DRAFT, description: 'Website status (DRAFT, PUBLISHED, ARCHIVED)' })
  @IsEnum(WebsiteStatus, { message: 'status must be a valid WebsiteStatus (DRAFT, PUBLISHED, ARCHIVED)' })
  @IsOptional()
  status?: WebsiteStatus;

  @ApiPropertyOptional({ example: false, description: 'Whether the website is published' })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
