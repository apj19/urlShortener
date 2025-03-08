-- CreateTable
CREATE TABLE "UrlShortener" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "longUrl" TEXT NOT NULL,
    "ShortUrl" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UrlShortener_longUrl_key" ON "UrlShortener"("longUrl");

-- CreateIndex
CREATE UNIQUE INDEX "UrlShortener_ShortUrl_key" ON "UrlShortener"("ShortUrl");
