/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Plan_saleId_key";

-- DropIndex
DROP INDEX "Plan_subscriptionId_key";

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "canceledAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_productId_key" ON "Plan"("productId");
