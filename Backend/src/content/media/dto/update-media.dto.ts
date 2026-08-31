import { ApiPropertyOptional } from '@nestjs/swagger';
import { MediaType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateMediaDto {
  @ApiPropertyOptional({ enum: MediaType, example: MediaType.IMAGE, description: 'Media type enum (IMAGE, VIDEO, DOCUMENT)' })
  @IsEnum(MediaType, {
    message: 'type must be a valid MediaType enum (IMAGE, VIDEO, DOCUMENT)',
  })
  @IsOptional()
  type?: MediaType;

  @ApiPropertyOptional({ example: 'https://cdn.example.test/uploads/updated-banner.jpg', description: 'Public URL of media file' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  url?: string;

  @ApiPropertyOptional({ example: 'uploads/2026/updated-banner.jpg', description: 'Cloud storage key or file path' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  storageKey?: string;

  @ApiPropertyOptional({ example: 'updated-banner.jpg', description: 'Original file name' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  fileName?: string;

  @ApiPropertyOptional({ example: 'image/jpeg', description: 'MIME type' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  mimeType?: string;

  @ApiPropertyOptional({ example: 102400, description: 'File size in bytes' })
  @IsInt()
  @IsOptional()
  fileSize?: number;

  @ApiPropertyOptional({ example: 1920, description: 'Image/video width in pixels' })
  @IsInt()
  @IsOptional()
  width?: number;

  @ApiPropertyOptional({ example: 1080, description: 'Image/video height in pixels' })
  @IsInt()
  @IsOptional()
  height?: number;

  @ApiPropertyOptional({ example: 'Updated Banner Alt Text', description: 'Accessibility alt text' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  altText?: string;
}
