import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGalleryItemDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000', description: 'Associated Media UUID' })
  @IsString({ message: 'mediaId must be a string' })
  @IsNotEmpty({ message: 'mediaId is required' })
  mediaId: string;

  @ApiPropertyOptional({ example: 'Project Screenshot 1', description: 'Gallery item title' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Homepage design layout', description: 'Gallery item caption/description' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 0, description: 'Display sorting order' })
  @IsInt()
  @IsOptional()
  sortOrder?: number;
}
