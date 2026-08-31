import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MediaType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({ enum: MediaType, example: MediaType.IMAGE, description: 'Media type enum (IMAGE, VIDEO, DOCUMENT)' })
  @IsEnum(MediaType, {
    message: 'type must be a valid MediaType enum (IMAGE, VIDEO, DOCUMENT)',
  })
  @IsNotEmpty({ message: 'type is required' })
  type: MediaType;

  @ApiProperty({ example: 'https://cdn.example.test/uploads/banner.jpg', description: 'Public URL of media file' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'url is required' })
  url: string;

  @ApiProperty({ example: 'uploads/2026/banner.jpg', description: 'Cloud storage key or file path' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'storageKey is required' })
  storageKey: string;

  @ApiProperty({ example: 'banner.jpg', description: 'Original file name' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'fileName is required' })
  fileName: string;

  @ApiProperty({ example: 'image/jpeg', description: 'MIME type' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'mimeType is required' })
  mimeType: string;

  @ApiProperty({ example: 102400, description: 'File size in bytes' })
  @IsInt()
  @IsNotEmpty({ message: 'fileSize is required' })
  fileSize: number;

  @ApiPropertyOptional({ example: 1920, description: 'Image/video width in pixels' })
  @IsInt()
  @IsOptional()
  width?: number;

  @ApiPropertyOptional({ example: 1080, description: 'Image/video height in pixels' })
  @IsInt()
  @IsOptional()
  height?: number;

  @ApiPropertyOptional({ example: 'Company Banner Image', description: 'Accessibility alt text' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  altText?: string;
}
