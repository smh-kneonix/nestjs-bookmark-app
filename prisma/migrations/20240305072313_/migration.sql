/*
  Warnings:

  - You are about to drop the column `LastName` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "LastName",
ADD COLUMN     "lastName" TEXT;
