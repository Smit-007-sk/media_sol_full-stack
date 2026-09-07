import { Module } from '@nestjs/common';
import { WebsiteGenerationService } from './website-generation.service';
import { TemplateSelectionService } from './template-selection.service';
import { AiContentGenerationService } from './ai-content-generation.service';
import { DeepseekPromptService } from './deepseek-prompt.service';
import { WebsiteRequestController } from './website-request.controller';

@Module({
  controllers: [WebsiteRequestController],
  providers: [
    WebsiteGenerationService,
    TemplateSelectionService,
    AiContentGenerationService,
    DeepseekPromptService,
  ],
  exports: [
    WebsiteGenerationService,
    TemplateSelectionService,
    AiContentGenerationService,
    DeepseekPromptService,
  ],
})
export class WebsiteGenerationModule {}

