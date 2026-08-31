import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateHeroDto {
  @ApiPropertyOptional({ example: 'WELCOME TO OUR PLATFORM', description: 'Small top eyebrow tag' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  eyebrow?: string;

  @ApiPropertyOptional({ example: 'Build Smart Websites Faster', description: 'Hero section main headline' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Empowering businesses with modern templates', description: 'Hero section subtitle or body description' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'Get Started', description: 'Primary CTA button label' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  primaryButtonText?: string;

  @ApiPropertyOptional({ example: 'https://example.test/start', description: 'Primary CTA button URL' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  primaryButtonUrl?: string;

  @ApiPropertyOptional({ example: 'Learn More', description: 'Secondary CTA button label' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  secondaryButtonText?: string;

  @ApiPropertyOptional({ example: 'https://example.test/about', description: 'Secondary CTA button URL' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  secondaryButtonUrl?: string;

  @ApiPropertyOptional({ example: 'https://images.unsplash.com/photo-123', description: 'Media URL or UUID for hero image' })
  @IsString()
  @IsOptional()
  imageId?: string;

  @ApiPropertyOptional({ example: '0.25', description: 'Background image opacity (0.10 to 1.0)' })
  @IsString()
  @IsOptional()
  bgOpacity?: string;

  @ApiPropertyOptional({ example: 'https://example.test/video.mp4', description: 'Media URL or UUID for hero video' })
  @IsString()
  @IsOptional()
  videoId?: string;
}
