-- CreateEnum
CREATE TYPE "WebsiteRequestStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "GenerationJobStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "WebsiteRequest" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "alternatePhone" TEXT,
    "businessName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "linkedin" TEXT,
    "specialInstructions" TEXT,
    "selectedFeatures" JSONB,
    "assetReferences" JSONB,
    "status" "WebsiteRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebsiteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebsiteGenerationJob" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "status" "GenerationJobStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebsiteGenerationJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteGenerationJob_requestId_key" ON "WebsiteGenerationJob"("requestId");

-- AddForeignKey
ALTER TABLE "WebsiteGenerationJob" ADD CONSTRAINT "WebsiteGenerationJob_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "WebsiteRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
