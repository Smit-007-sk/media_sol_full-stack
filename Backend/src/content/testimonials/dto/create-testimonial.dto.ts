import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty({ example: 'Jane Smith', description: 'Name of the person giving testimonial' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

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

  @ApiProperty({ example: 'The website templates delivered by Emperor Smart Solutions transformed our business!', description: 'Testimonial content' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

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
