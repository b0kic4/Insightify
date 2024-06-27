-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "subscriptionEndedAt" TIMESTAMP(3),
ADD COLUMN     "subscriptionRefundedAt" TIMESTAMP(3),
ADD COLUMN     "subscriptionRestartedAt" TIMESTAMP(3);
