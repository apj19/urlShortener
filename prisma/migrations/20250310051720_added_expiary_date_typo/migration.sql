/*
  Warnings:

  - You are about to drop the column `expiary_date` on the `urlshortener` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "urlshortener" DROP COLUMN "expiary_date",
ADD COLUMN     "expiry_date" TIMESTAMP(3);
