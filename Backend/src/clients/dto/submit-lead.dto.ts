import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsArray } from 'class-validator';

export class UploadedAssetDto {
  @ApiProperty({ description: 'File data URL or image URL' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ description: 'Original file name' })
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

export class SubmitLeadDto {
  @ApiProperty({ description: 'Full Name of the client', example: 'Smit Khatri' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: 'Email address of the client', example: 'smitkhatri272@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Primary 10-digit mobile or WhatsApp number', example: '8888888888' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ description: 'Alternate contact number', example: '8855555522' })
  @IsString()
  @IsOptional()
  altPhone?: string;

  @ApiProperty({ description: 'Business Name', example: 'Acme Media Solution' })
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @ApiPropertyOptional({ description: 'Business Category', example: 'Corporate / Business' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: 'Services description / requirements' })
  @IsString()
  @IsOptional()
  servicesDescription?: string;

  @ApiPropertyOptional({ description: 'Instagram handle / link' })
  @IsString()
  @IsOptional()
  instagram?: string;

  @ApiPropertyOptional({ description: 'Facebook handle / link' })
  @IsString()
  @IsOptional()
  facebook?: string;

  @ApiPropertyOptional({ description: 'LinkedIn handle / link' })
  @IsString()
  @IsOptional()
  linkedin?: string;

  @ApiPropertyOptional({ description: 'Selected website features', example: ['Contact Lead Form', 'WhatsApp Chat Button'] })
  @IsArray()
  @IsOptional()
  selectedFeatures?: string[];

  @ApiPropertyOptional({ description: 'Additional client notes or comments' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ description: 'Uploaded logo files' })
  @IsArray()
  @IsOptional()
  logoAssets?: UploadedAssetDto[];

  @ApiPropertyOptional({ description: 'Uploaded banner and media files' })
  @IsArray()
  @IsOptional()
  bannerAssets?: UploadedAssetDto[];
}

