import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateAboutDto {
  @ApiPropertyOptional({ example: 'OUR STORY', description: 'About section eyebrow tag' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  eyebrow?: string;

  @ApiPropertyOptional({ example: 'Pioneering Digital Solutions Since 2020', description: 'About section title' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'We are dedicated to building state-of-the-art websites.', description: 'About section detailed description' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'https://images.unsplash.com/photo-123', description: 'Media URL or UUID for about section image' })
  @IsString()
  @IsOptional()
  imageId?: string;

  @ApiPropertyOptional({ example: '0.25', description: 'Background image opacity (0.10 to 1.0)' })
  @IsString()
  @IsOptional()
  bgOpacity?: string;
}
