import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'AI Solutions Project', description: 'Name of the project' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Project name is required' })
  name: string;

  @ApiPropertyOptional({ example: 'ai-solutions-project', description: 'Unique URL slug for the project' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({ example: 'AI powered website templates', description: 'Project description' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: true, description: 'Whether the project is active' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
