/*
  Warnings:

  - You are about to drop the column `brand` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `lastFour` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `interval` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `intervalCount` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `isUsageBased` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `lastFour` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `sort` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `trialInterval` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `trialIntervalCount` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `Plan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bin,userId]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[saleId]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subscriptionId]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bin` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiryMonth` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiryYear` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visual` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canContact` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discoverFeeCharged` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disputeWon` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disputed` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gumroadFee` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipCountry` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isGiftReceiverPurchase` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderNumber` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permalink` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productPermalink` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaserId` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurrence` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referrer` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refunded` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saleId` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saleTimestamp` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortProductId` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `test` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Made the column `productName` on table `Plan` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `price` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `Plan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subscriptionId` on table `Plan` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Card_lastFour_brand_userId_key";

-- DropIndex
DROP INDEX "Plan_variantId_key";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "brand",
DROP COLUMN "lastFour",
ADD COLUMN     "bin" TEXT NOT NULL,
ADD COLUMN     "expiryMonth" TEXT NOT NULL,
ADD COLUMN     "expiryYear" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "visual" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "description",
DROP COLUMN "interval",
DROP COLUMN "intervalCount",
DROP COLUMN "isActive",
DROP COLUMN "isUsageBased",
DROP COLUMN "lastFour",
DROP COLUMN "name",
DROP COLUMN "sort",
DROP COLUMN "status",
DROP COLUMN "trialInterval",
DROP COLUMN "trialIntervalCount",
DROP COLUMN "variantId",
ADD COLUMN     "canContact" BOOLEAN NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "discoverFeeCharged" BOOLEAN NOT NULL,
ADD COLUMN     "disputeWon" BOOLEAN NOT NULL,
ADD COLUMN     "disputed" BOOLEAN NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gumroadFee" INTEGER NOT NULL,
ADD COLUMN     "ipCountry" TEXT NOT NULL,
ADD COLUMN     "isGiftReceiverPurchase" BOOLEAN NOT NULL,
ADD COLUMN     "orderNumber" INTEGER NOT NULL,
ADD COLUMN     "permalink" TEXT NOT NULL,
ADD COLUMN     "productPermalink" TEXT NOT NULL,
ADD COLUMN     "purchaserId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "recurrence" TEXT NOT NULL,
ADD COLUMN     "referrer" TEXT NOT NULL,
ADD COLUMN     "refunded" BOOLEAN NOT NULL,
ADD COLUMN     "saleId" TEXT NOT NULL,
ADD COLUMN     "saleTimestamp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sellerId" TEXT NOT NULL,
ADD COLUMN     "shortProductId" TEXT NOT NULL,
ADD COLUMN     "test" BOOLEAN NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "variant" TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "productName" SET NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "subscriptionId" SET NOT NULL,
ALTER COLUMN "subscriptionId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Card_bin_userId_key" ON "Card"("bin", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_saleId_key" ON "Plan"("saleId");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_subscriptionId_key" ON "Plan"("subscriptionId");
