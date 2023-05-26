/*
  Warnings:

  - A unique constraint covering the columns `[repositoryId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorite_repositoryId_key" ON "Favorite"("repositoryId");
