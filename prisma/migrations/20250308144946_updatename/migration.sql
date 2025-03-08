/*
  Warnings:

  - You are about to drop the column `ShortUrl` on the `urlshortener` table. All the data in the column will be lost.
  - You are about to drop the column `longUrl` on the `urlshortener` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[longurl]` on the table `urlshortener` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shorturl]` on the table `urlshortener` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `longurl` to the `urlshortener` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shorturl` to the `urlshortener` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "urlshortener_ShortUrl_key";

-- DropIndex
DROP INDEX "urlshortener_longUrl_key";

-- AlterTable
ALTER TABLE "urlshortener" DROP COLUMN "ShortUrl",
DROP COLUMN "longUrl",
ADD COLUMN     "longurl" TEXT NOT NULL,
ADD COLUMN     "shorturl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "urlshortener_longurl_key" ON "urlshortener"("longurl");

-- CreateIndex
CREATE UNIQUE INDEX "urlshortener_shorturl_key" ON "urlshortener"("shorturl");
