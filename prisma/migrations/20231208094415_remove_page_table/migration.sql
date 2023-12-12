/*
  Warnings:

  - You are about to drop the column `updatedAat` on the `Page` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Tab" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "bodyHtml" TEXT NOT NULL,
    "pageTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Page" ("bodyHtml", "content", "createdAt", "description", "id", "pageTitle", "publishedAt", "shop", "title") SELECT "bodyHtml", "content", "createdAt", "description", "id", "pageTitle", "publishedAt", "shop", "title" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
