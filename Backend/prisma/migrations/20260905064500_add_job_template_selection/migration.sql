-- AlterTable
ALTER TABLE "WebsiteGenerationJob" ADD COLUMN     "selectedTemplateId" TEXT,
ADD COLUMN     "templateSelectionMetadata" JSONB;

-- AddForeignKey
ALTER TABLE "WebsiteGenerationJob" ADD CONSTRAINT "WebsiteGenerationJob_selectedTemplateId_fkey" FOREIGN KEY ("selectedTemplateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;
