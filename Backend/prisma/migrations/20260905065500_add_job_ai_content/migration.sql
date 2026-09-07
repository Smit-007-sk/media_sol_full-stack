-- AlterTable
ALTER TABLE "WebsiteGenerationJob" ADD COLUMN     "aiGeneratedContent" JSONB,
ADD COLUMN     "aiGenerationMetadata" JSONB;
