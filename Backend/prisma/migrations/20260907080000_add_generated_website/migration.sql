-- CreateEnum
CREATE TYPE "GeneratedWebsiteStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "GeneratedWebsite" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "slug" TEXT,
    "html" TEXT NOT NULL DEFAULT '',
    "css" TEXT NOT NULL DEFAULT '',
    "javascript" TEXT NOT NULL DEFAULT '',
    "assetMappings" JSONB,
    "publishedSnapshot" JSONB,
    "status" "GeneratedWebsiteStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneratedWebsite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedWebsite_requestId_key" ON "GeneratedWebsite"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedWebsite_slug_key" ON "GeneratedWebsite"("slug");

-- AddForeignKey
ALTER TABLE "GeneratedWebsite" ADD CONSTRAINT "GeneratedWebsite_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "WebsiteRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
