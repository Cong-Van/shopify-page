/*
  Warnings:

  - You are about to drop the column `title` on the `Tab` table. All the data in the column will be lost.
  - Added the required column `content` to the `Tab` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tab" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Tab" ("createdAt", "id", "shop", "updatedAt") SELECT "createdAt", "id", "shop", "updatedAt" FROM "Tab";
DROP TABLE "Tab";
ALTER TABLE "new_Tab" RENAME TO "Tab";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
