import { ApiPropertyOptional } from '@nestjs/swagger';
import { ClientStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateClientDto {
  @ApiPropertyOptional({ example: 'Updated Acme Corp', description: 'Business or client name' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  businessName?: string;

  @ApiPropertyOptional({ example: 'updated-acme-corp', description: 'Unique URL slug' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({ example: 'Updated client description', description: 'Client business description' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'updated@acme.test', description: 'Primary contact email' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @IsEmail({}, { message: 'Invalid email address' })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: '+1-555-0199', description: 'Contact phone number' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: '123 Tech Blvd', description: 'Street address' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: 'Austin', description: 'City' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ example: 'Texas', description: 'State or Province' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ example: 'USA', description: 'Country' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({ example: '78701', description: 'Postal or Zip Code' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  postalCode?: string;

  @ApiPropertyOptional({ example: '00000000-0000-0000-0000-000000000000', description: 'Client Logo Media UUID' })
  @IsUUID(undefined, { message: 'logoMediaId must be a valid UUID' })
  @IsOptional()
  logoMediaId?: string;

  @ApiPropertyOptional({ enum: ClientStatus, description: 'Client status (ACTIVE, INACTIVE, ARCHIVED)' })
  @IsEnum(ClientStatus, { message: 'Status must be ACTIVE, INACTIVE, or ARCHIVED' })
  @IsOptional()
  status?: ClientStatus;
}
