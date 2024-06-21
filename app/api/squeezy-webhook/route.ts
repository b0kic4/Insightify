import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: any) {
  console.log("WEBHOOK CALLED");
  try {
    // Catch the event type
    const clonedReq = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json();

    // Check signature
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SIGNATURE! as string;
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(await clonedReq.text()).digest("hex"),
      "utf8",
    );
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    console.log("event type: ", eventType);
    console.log("body of the request: ", body);

    // Extract relevant data from the body
    const { data } = body;
    const { attributes } = data;
    const {
      customer_id,
      product_id,
      product_name,
      variant_id,
      status,
      user_email,
      subtotal_formatted,
      renews_at,
      created_at,
      card_last_four,
      card_brand,
    } = attributes;

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: {
        email: user_email,
      },
    });

    if (!user) {
      console.log(`User with email ${user_email} not found.`);
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    if (
      eventType === "subscription_created" ||
      eventType === "subscription_updated"
    ) {
      // Create or update card details
      const card = await prisma.card.upsert({
        where: {
          lastFour_brand_userId: {
            lastFour: card_last_four,
            brand: card_brand,
            userId: user.id,
          },
        },
        update: {},
        create: {
          lastFour: card_last_four,
          brand: card_brand,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      console.log(`Card created or updated for user ${user_email}`);

      // Update the user's plan
      await prisma.plan.upsert({
        where: {
          variantId: variant_id,
        },
        update: {
          productId: product_id,
          productName: product_name,
          status: status,
          renewsAt: new Date(renews_at),
          lastFour: card_last_four,
          cardId: card.id,
        },
        create: {
          productId: product_id,
          productName: product_name,
          variantId: variant_id,
          name: product_name,
          user: {
            connect: {
              id: user.id,
            },
          },
          status: status,
          createdAt: new Date(created_at),
          renewsAt: new Date(renews_at),
          lastFour: card_last_four,
          card: {
            connect: {
              id: card.id,
            },
          },
        },
      });

      console.log(`Subscription ${status} for user ${user_email}`);
    } else if (eventType === "subscription_payment_success") {
      // Update the plan price on payment success
      await prisma.plan.updateMany({
        where: {
          variantId: variant_id,
          userId: user.id,
        },
        data: {
          price: subtotal_formatted,
        },
      });

      console.log(
        `Plan price updated to ${subtotal_formatted} for user ${user_email}`,
      );
    } else if (eventType === "subscription_cancelled") {
      // Handle subscription cancellation
      await prisma.plan.deleteMany({
        where: {
          variantId: variant_id,
          userId: user.id,
        },
      });

      console.log(`Subscription cancelled for user ${user_email}`);
    }

    return new Response(JSON.stringify({ message: "Webhook received" }));
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}