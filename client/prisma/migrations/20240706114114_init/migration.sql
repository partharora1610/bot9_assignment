-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_botId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "botId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
