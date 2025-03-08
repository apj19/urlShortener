-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UrlShortener" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "longUrl" TEXT NOT NULL,
    "ShortUrl" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_UrlShortener" ("ShortUrl", "id", "longUrl") SELECT "ShortUrl", "id", "longUrl" FROM "UrlShortener";
DROP TABLE "UrlShortener";
ALTER TABLE "new_UrlShortener" RENAME TO "UrlShortener";
CREATE UNIQUE INDEX "UrlShortener_longUrl_key" ON "UrlShortener"("longUrl");
CREATE UNIQUE INDEX "UrlShortener_ShortUrl_key" ON "UrlShortener"("ShortUrl");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
