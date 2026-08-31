import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  @ApiPropertyOptional({ example: 'Updated Project Name', description: 'Name of the project' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'updated-project-slug', description: 'Unique URL slug for the project' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({ example: 'Updated project description', description: 'Project description' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: true, description: 'Whether the project is active' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
