/*
  Warnings:

  - You are about to drop the column `examples` on the `TrainingData` table. All the data in the column will be lost.
  - You are about to drop the column `intent` on the `TrainingData` table. All the data in the column will be lost.
  - Added the required column `key` to the `TrainingData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TrainingData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `TrainingData` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UPLOAD_STATUS" AS ENUM ('PENDING', 'PROCESSING', 'DONE', 'FAILED');

-- AlterTable
ALTER TABLE "TrainingData" DROP COLUMN "examples",
DROP COLUMN "intent",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uploadStatus" "UPLOAD_STATUS" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "url" TEXT NOT NULL;
