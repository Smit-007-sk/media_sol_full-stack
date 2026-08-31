import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateServiceDto {
  @ApiPropertyOptional({ example: 'Web Development', description: 'Service title' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Custom full-stack web solutions', description: 'Short summary' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  shortDescription?: string;

  @ApiPropertyOptional({ example: 'Detailed description of web development capabilities...', description: 'Full service description' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: '00000000-0000-0000-0000-000000000000', description: 'Associated Media image UUID' })
  @IsString()
  @IsOptional()
  imageId?: string;

  @ApiPropertyOptional({ example: 'code', description: 'Icon name or identifier' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({ example: 0, description: 'Display sorting order' })
  @IsInt()
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({ example: true, description: 'Whether the service is active' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
