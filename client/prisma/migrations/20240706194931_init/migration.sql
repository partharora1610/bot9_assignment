-- CreateEnum
CREATE TYPE "MESSAGE_ROLE" AS ENUM ('USER', 'BOT');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "role" "MESSAGE_ROLE" NOT NULL DEFAULT 'USER';
