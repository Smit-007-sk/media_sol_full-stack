import { IsString, Matches, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PublishGeneratedWebsiteDto {
  @ApiProperty({
    description: 'Public URL slug for the generated website (lowercase, letters, numbers, hyphens)',
    example: 'royal-moments-photography',
  })
  @IsString()
  @MinLength(3, { message: 'Slug must be at least 3 characters long' })
  @MaxLength(80, { message: 'Slug must not exceed 80 characters' })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must be lowercase and contain only letters, numbers, and hyphens without leading or trailing hyphens',
  })
  slug: string;
}
