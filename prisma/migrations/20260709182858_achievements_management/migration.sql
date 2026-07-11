/*
  Warnings:

  - Added the required column `date` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Achievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "metric" TEXT,
    "description" TEXT NOT NULL,
    "achievementType" TEXT NOT NULL DEFAULT 'Achievement',
    "organization" TEXT,
    "date" TEXT NOT NULL,
    "imageUrl" TEXT,
    "externalLink" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Achievement" ("createdAt", "description", "id", "metric", "order", "title", "updatedAt") SELECT "createdAt", "description", "id", "metric", "order", "title", "updatedAt" FROM "Achievement";
DROP TABLE "Achievement";
ALTER TABLE "new_Achievement" RENAME TO "Achievement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
