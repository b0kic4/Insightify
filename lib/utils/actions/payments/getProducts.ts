import { lemonSqueezyFetch } from "@/lib/utils/actions/payments/lemonSqueezyFetch";

export async function getProducts() {
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;

  if (!storeId) {
    throw new Error("LEMON_SQUEEZY_STORE_ID is not set");
  }

  const endpoint = `products?filter[store_id]=${storeId}`;
  return lemonSqueezyFetch(endpoint);
}
