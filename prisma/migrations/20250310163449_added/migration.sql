-- CreateEnum
CREATE TYPE "Tier" AS ENUM ('HOBBY', 'ENTERTPRISE');

-- AlterTable
ALTER TABLE "urlshortener" ADD COLUMN     "tier" "Tier" NOT NULL DEFAULT 'HOBBY';
