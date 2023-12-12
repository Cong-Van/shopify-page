/*
  Warnings:

  - You are about to drop the column `URL` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `pageTitle` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `shop` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `visibilityDate` on the `Page` table. All the data in the column will be lost.
  - Added the required column `adminGraphqlApiId` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyHtml` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handle` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `templateSuffix` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,
    "handle" TEXT NOT NULL,
    "bodyHtml" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "templateSuffix" TEXT NOT NULL,
    "adminGraphqlApiId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAat" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Page" ("createdAt", "id", "title") SELECT "createdAt", "id", "title" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
