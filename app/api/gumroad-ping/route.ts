import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { PlanData } from "@/lib";

export async function POST(req: Request) {
  // NOTE:
  // resource_name -> determines the type of the Resource subscriptions
  // recurrence -> determines when is the new renewal
  try {
    const data = await req.formData();
    const payload = Object.fromEntries(data.entries());
    console.log("Gumroad Webhook Payload: ", payload);

    if (!payload) {
      console.log("Payload is empty: ", payload);
      return NextResponse.json(
        {
          status: "failed",
          message: "No payload found",
        },
        { status: 405 },
      );
    }

    const userEmail = payload["email"] as string;

    const resourceName = payload["resource_name"] as string;
    const recurrence = payload["recurrence"] as string;
    const refunded = payload["refunded"] as string;

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      console.log("user not found");
      return NextResponse.json(
        {
          status: "failed",
          message:
            "User not found. Please ensure you are using the same email address that is used on Insightify application when making a purchase so we can assign the new subscription plan to you.",
        },
        { status: 404 },
      );
    }

    switch (resourceName) {
      case "sale":
        const saleTimestamp = new Date(payload["sale_timestamp"] as string);
        const planData: PlanData = {
          sellerId: payload["seller_id"] as string,
          productId: payload["product_id"] as string,
          productName: payload["product_name"] as string,
          permalink: payload["permalink"] as string,
          productPermalink: payload["product_permalink"] as string,
          shortProductId: payload["short_product_id"] as string,
          email: payload["email"] as string,
          price: parseInt(payload["price"] as string),
          gumroadFee: parseInt(payload["gumroad_fee"] as string),
          currency: payload["currency"] as string,
          quantity: parseInt(payload["quantity"] as string),
          discoverFeeCharged:
            (payload["discover_fee_charged"] as string) === "true",
          canContact: (payload["can_contact"] as string) === "true",
          referrer: payload["referrer"] as string,
          renewsAt: calculateNextRenewal(saleTimestamp, recurrence),
          orderNumber: parseInt(payload["order_number"] as string),
          saleId: payload["sale_id"] as string,
          saleTimestamp: saleTimestamp,
          purchaserId: payload["purchaser_id"] as string,
          subscriptionId: payload["subscription_id"] as string,
          variant: payload["variants[Tier]"] as string,
          test: (payload["test"] as string) === "true",
          ipCountry: payload["ip_country"] as string,
          recurrence: recurrence,
          isGiftReceiverPurchase:
            (payload["is_gift_receiver_purchase"] as string) === "true",
          refunded: refunded === "true",
          disputed: (payload["disputed"] as string) === "true",
          disputeWon: (payload["dispute_won"] as string) === "true",
          userId: user.id,
        };

        const cardData = {
          visual: payload["card[visual]"] as string,
          type: payload["card[type]"] as string,
          bin: payload["card[bin]"] as string,
          expiryMonth: payload["card[expiry_month]"] as string,
          expiryYear: payload["card[expiry_year]"] as string,
          userId: user.id,
        };

        const card = await prisma.card.upsert({
          where: { bin_userId: { bin: cardData.bin, userId: cardData.userId } },
          update: cardData,
          create: cardData,
        });

        planData["cardId"] = card.id;

        await prisma.plan.create({
          data: planData,
        });
        break;
    }

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error processing Gumroad webhook: ", error);
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 },
    );
  }
}

function calculateNextRenewal(
  startDate: Date,
  interval: string | undefined,
): Date | null {
  if (!interval) return null;

  const nextDate = new Date(startDate);
  switch (interval.toLowerCase()) {
    case "monthly":
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case "quarterly":
      nextDate.setMonth(nextDate.getMonth() + 3);
      break;
    case "every 6 months":
      nextDate.setMonth(nextDate.getMonth() + 6);
      break;
    case "yearly":
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
    default:
      return null;
  }
  return nextDate;
}
