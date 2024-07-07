/*
  Warnings:

  - Added the required column `botId` to the `Converstaion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bot" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Converstaion" ADD COLUMN     "botId" TEXT NOT NULL,
ADD COLUMN     "email" TEXT;

-- CreateTable
CREATE TABLE "Tools" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "botId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tools_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Converstaion" ADD CONSTRAINT "Converstaion_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
