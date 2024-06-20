import { lemonSqueezyFetch } from "@/lib/utils/actions/payments/lemonSqueezyFetch";

export const dynamic = "force-dynamic";

export async function POST(req: any) {
  try {
    const reqData = await req.json();

    if (!reqData.productId)
      return new Response(
        JSON.stringify({ message: "productId is required" }),
        { status: 400 },
      );

    const response = await lemonSqueezyFetch("checkouts", {
      method: "POST",
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: {
                user_id: "123",
              },
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: process.env.LEMONSQUEEZY_STORE_ID!.toString(),
              },
            },
            variant: {
              data: {
                type: "variants",
                id: reqData.productId.toString(),
              },
            },
          },
        },
      }),
    });

    const checkoutUrl = response.data.attributes.url;

    console.log(response);

    return new Response(JSON.stringify({ checkoutUrl }));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "An error occurred" }), {
      status: 500,
    });
  }
}
