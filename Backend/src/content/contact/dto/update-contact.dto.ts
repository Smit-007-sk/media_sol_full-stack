import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
  @ApiPropertyOptional({ example: 'contact@websitea.test', description: 'Contact email address' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: '+1-555-0100', description: 'Contact phone number' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: '+1-555-0101', description: 'WhatsApp contact number' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  whatsapp?: string;

  @ApiPropertyOptional({ example: '100 Innovation Way', description: 'Physical street address' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: 'San Francisco', description: 'City' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ example: 'California', description: 'State' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ example: 'USA', description: 'Country' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({ example: 'https://maps.google.com/?q=San+Francisco', description: 'Google Maps embed or location URL' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  mapUrl?: string;
}
