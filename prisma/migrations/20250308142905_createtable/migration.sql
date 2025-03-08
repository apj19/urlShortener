-- CreateTable
CREATE TABLE "urlshortener" (
    "id" SERIAL NOT NULL,
    "longUrl" TEXT NOT NULL,
    "ShortUrl" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "urlshortener_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urlshortener_longUrl_key" ON "urlshortener"("longUrl");

-- CreateIndex
CREATE UNIQUE INDEX "urlshortener_ShortUrl_key" ON "urlshortener"("ShortUrl");
