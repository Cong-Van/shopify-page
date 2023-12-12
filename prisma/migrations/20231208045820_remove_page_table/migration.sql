/*
  Warnings:

  - You are about to drop the column `adminGraphqlApiId` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `handle` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `shopId` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `templateSuffix` on the `Page` table. All the data in the column will be lost.
  - Added the required column `content` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageTitle` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "bodyHtml" TEXT NOT NULL,
    "pageTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAat" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Page" ("bodyHtml", "createdAt", "id", "publishedAt", "title", "updatedAat") SELECT "bodyHtml", "createdAt", "id", "publishedAt", "title", "updatedAat" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
