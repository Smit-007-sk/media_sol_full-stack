import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SocialPlatform } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSocialLinkDto {
  @ApiProperty({ enum: SocialPlatform, example: SocialPlatform.INSTAGRAM, description: 'Social media platform enum (INSTAGRAM, FACEBOOK, YOUTUBE, LINKEDIN, TWITTER, WHATSAPP, OTHER)' })
  @IsEnum(SocialPlatform, {
    message:
      'platform must be a valid SocialPlatform enum (INSTAGRAM, FACEBOOK, YOUTUBE, LINKEDIN, TWITTER, WHATSAPP, OTHER)',
  })
  @IsNotEmpty({ message: 'platform is required' })
  platform: SocialPlatform;

  @ApiProperty({ example: 'https://instagram.com/emperorsmartsolutions', description: 'Social profile URL' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'url is required' })
  url: string;

  @ApiPropertyOptional({ example: 0, description: 'Display sorting order' })
  @IsInt()
  @IsOptional()
  sortOrder?: number;
}
