/*
  Warnings:

  - A unique constraint covering the columns `[saleId]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subscriptionId]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Plan_saleId_key" ON "Plan"("saleId");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_subscriptionId_key" ON "Plan"("subscriptionId");
