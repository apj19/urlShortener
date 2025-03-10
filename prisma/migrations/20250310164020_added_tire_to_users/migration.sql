/*
  Warnings:

  - You are about to drop the column `tier` on the `urlshortener` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "urlshortener" DROP COLUMN "tier";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "tier" "Tier" NOT NULL DEFAULT 'HOBBY';
