/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Tasks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_order_key" ON "Tasks"("order");
