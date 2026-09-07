-- AlterTable
ALTER TABLE "WebsiteGenerationJob" ADD COLUMN     "clientId" TEXT,
ADD COLUMN     "websiteId" TEXT;

-- AddForeignKey
ALTER TABLE "WebsiteGenerationJob" ADD CONSTRAINT "WebsiteGenerationJob_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteGenerationJob" ADD CONSTRAINT "WebsiteGenerationJob_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;
