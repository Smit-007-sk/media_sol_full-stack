import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateThemeDto {
  @ApiPropertyOptional({ example: 'https://cdn.example.test/logo.png', description: 'Brand Logo image URL' })
  @IsString()
  @IsOptional()
  logoUrl?: string;

  @ApiPropertyOptional({ example: 'Acme Corp', description: 'Brand or Company Name' })
  @IsString()
  @IsOptional()
  brandName?: string;
  @ApiPropertyOptional({ example: '#FF0000', description: 'Primary brand color' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  primaryColor?: string;

  @ApiPropertyOptional({ example: '#00FF00', description: 'Secondary brand color' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  secondaryColor?: string;

  @ApiPropertyOptional({ example: '#0000FF', description: 'Accent color' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  accentColor?: string;

  @ApiPropertyOptional({ example: '#FFFFFF', description: 'Background color' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  backgroundColor?: string;

  @ApiPropertyOptional({ example: '#111111', description: 'Text color' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  textColor?: string;

  @ApiPropertyOptional({ example: 'Inter', description: 'Heading typography font family' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  headingFont?: string;

  @ApiPropertyOptional({ example: 'Roboto', description: 'Body typography font family' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  bodyFont?: string;

  @ApiPropertyOptional({ example: 'rounded', description: 'Button style variant' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  buttonStyle?: string;

  @ApiPropertyOptional({ example: '8px', description: 'Border radius CSS token' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  borderRadius?: string;

  @ApiPropertyOptional({ example: 'split', description: 'Hero section layout variant' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  heroLayout?: string;

  @ApiPropertyOptional({ example: 'text-image', description: 'About section layout variant' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  aboutLayout?: string;

  @ApiPropertyOptional({ example: 'cards', description: 'Services presentation style' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  servicesStyle?: string;

  @ApiPropertyOptional({ example: 'grid', description: 'Gallery layout style' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  galleryStyle?: string;

  @ApiPropertyOptional({ example: 'cards', description: 'Testimonials presentation style' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  testimonialsStyle?: string;

  @ApiPropertyOptional({ example: 'split', description: 'Contact section presentation style' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  contactStyle?: string;

  @ApiPropertyOptional({ example: 'comfortable', description: 'Global section spacing token' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  sectionSpacing?: string;

  @ApiPropertyOptional({ example: 'standard', description: 'Global container width token' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  containerWidth?: string;

  @ApiPropertyOptional({ example: 'medium', description: 'Button size token' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  buttonSize?: string;

  @ApiPropertyOptional({ example: 'luxury', description: 'Design preset key' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  designPreset?: string;
}
