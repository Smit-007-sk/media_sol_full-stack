import { ApiPropertyOptional } from '@nestjs/swagger';
import { SocialPlatform } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateSocialLinkDto {
  @ApiPropertyOptional({ enum: SocialPlatform, example: SocialPlatform.LINKEDIN, description: 'Social media platform enum' })
  @IsEnum(SocialPlatform, {
    message:
      'platform must be a valid SocialPlatform enum (INSTAGRAM, FACEBOOK, YOUTUBE, LINKEDIN, TWITTER, WHATSAPP, OTHER)',
  })
  @IsOptional()
  platform?: SocialPlatform;

  @ApiPropertyOptional({ example: 'https://linkedin.com/company/emperorsmartsolutions', description: 'Social profile URL' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  url?: string;

  @ApiPropertyOptional({ example: 0, description: 'Display sorting order' })
  @IsInt()
  @IsOptional()
  sortOrder?: number;
}
