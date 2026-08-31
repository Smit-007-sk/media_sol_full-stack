import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTestimonialDto {
  @ApiPropertyOptional({ example: 'Jane Smith', description: 'Name of the person giving testimonial' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Chief Technology Officer', description: 'Role or designation' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  role?: string;

  @ApiPropertyOptional({ example: 'TechCorp Solutions', description: 'Company name' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  company?: string;

  @ApiPropertyOptional({ example: 'Updated testimonial text...', description: 'Testimonial content' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({ example: '00000000-0000-0000-0000-000000000000', description: 'Avatar image Media UUID' })
  @IsString()
  @IsOptional()
  avatarMediaId?: string;

  @ApiPropertyOptional({ example: 0, description: 'Display sorting order' })
  @IsInt()
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({ example: true, description: 'Whether the testimonial is active' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
