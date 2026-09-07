import { Module } from '@nestjs/common';
import { WebsiteGenerationService } from './website-generation.service';
import { TemplateSelectionService } from './template-selection.service';
import { AiContentGenerationService } from './ai-content-generation.service';
import { WebsiteRequestController } from './website-request.controller';

@Module({
  controllers: [WebsiteRequestController],
  providers: [
    WebsiteGenerationService,
    TemplateSelectionService,
    AiContentGenerationService,
  ],
  exports: [
    WebsiteGenerationService,
    TemplateSelectionService,
    AiContentGenerationService,
  ],
})
export class WebsiteGenerationModule {}
