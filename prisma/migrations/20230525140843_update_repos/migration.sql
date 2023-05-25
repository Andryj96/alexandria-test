/*
  Warnings:

  - You are about to drop the column `url` on the `Repository` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guithubId` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `htmlUrl` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stargazersCount` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "url",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "guithubId" INTEGER NOT NULL,
ADD COLUMN     "htmlUrl" TEXT NOT NULL,
ADD COLUMN     "owner" TEXT,
ADD COLUMN     "stargazersCount" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
