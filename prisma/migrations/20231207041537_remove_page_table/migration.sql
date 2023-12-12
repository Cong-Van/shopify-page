/*
  Warnings:

  - Added the required column `shop` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "pageTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "visibility" TEXT NOT NULL,
    "visibilityDate" DATETIME NOT NULL,
    "URL" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Page" ("URL", "content", "createdAt", "description", "id", "pageTitle", "title", "visibility", "visibilityDate") SELECT "URL", "content", "createdAt", "description", "id", "pageTitle", "title", "visibility", "visibilityDate" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
