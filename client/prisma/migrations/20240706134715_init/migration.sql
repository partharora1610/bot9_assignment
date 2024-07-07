/*
  Warnings:

  - Added the required column `companyName` to the `Bot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Bot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bot" ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL;
