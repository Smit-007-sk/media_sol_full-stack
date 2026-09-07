import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsArray,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AssetReferenceDto {
  @ApiProperty({ description: 'Asset URL or storage link' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ description: 'Asset file name' })
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @ApiPropertyOptional({ description: 'File size in bytes' })
  @IsOptional()
  fileSize?: number;

  @ApiPropertyOptional({ description: 'MIME type' })
  @IsOptional()
  mimeType?: string;
}

export class CreateWebsiteRequestDto {
  @ApiProperty({ description: 'Full Name of the business owner/requester', example: 'Vikram Mehta' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({ description: 'Primary contact email address', example: 'vikram@business.com' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(150)
  email: string;

  @ApiPropertyOptional({ description: 'Primary mobile or WhatsApp number', example: '9876543210' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({ description: 'Alternate mobile number', example: '9876500000' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  alternatePhone?: string;

  @ApiProperty({ description: 'Official Business Name', example: 'Royal Moments Photography' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  businessName: string;

  @ApiPropertyOptional({ description: 'Website Category', example: 'Portfolio & Creative Agency' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  category?: string;

  @ApiPropertyOptional({ description: 'Services or business description' })
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional({ description: 'Instagram handle or URL', example: '@royalmoments' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  instagram?: string;

  @ApiPropertyOptional({ description: 'Facebook handle or URL', example: 'facebook.com/royalmoments' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  facebook?: string;

  @ApiPropertyOptional({ description: 'LinkedIn handle or URL', example: 'linkedin.com/in/royalmoments' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  linkedin?: string;

  @ApiPropertyOptional({ description: 'Special styling or design instructions' })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  specialInstructions?: string;

  @ApiPropertyOptional({ description: 'List of requested features', example: ['Contact Lead Form', 'WhatsApp Chat Button'] })
  @IsArray()
  @IsOptional()
  selectedFeatures?: string[];

  @ApiPropertyOptional({ description: 'Uploaded logo asset references', type: [AssetReferenceDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AssetReferenceDto)
  logoAssets?: AssetReferenceDto[];

  @ApiPropertyOptional({ description: 'Uploaded banner asset references', type: [AssetReferenceDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AssetReferenceDto)
  bannerAssets?: AssetReferenceDto[];
}
