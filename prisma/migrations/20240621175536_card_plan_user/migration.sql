-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "cardId" INTEGER,
ADD COLUMN     "lastFour" TEXT,
ADD COLUMN     "renewsAt" TIMESTAMP(3),
ALTER COLUMN "price" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "lastFour" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_lastFour_brand_userId_key" ON "Card"("lastFour", "brand", "userId");

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
