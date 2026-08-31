import { ApiPropertyOptional } from '@nestjs/swagger';
import { MediaType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class QueryMediaDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number' })
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

  @ApiPropertyOptional({ example: 'banner', description: 'Search query for fileName, altText, or storageKey' })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: MediaType, description: 'Filter by MediaType (IMAGE, VIDEO, DOCUMENT)' })
  @IsOptional()
  @IsEnum(MediaType, {
    message: 'type must be a valid MediaType enum (IMAGE, VIDEO, DOCUMENT)',
  })
  type?: MediaType;

  @ApiPropertyOptional({ example: 'image/jpeg', description: 'Filter by exact or partial mimeType' })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  mimeType?: string;
}
