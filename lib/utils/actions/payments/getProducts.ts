import { gumRoadFetch } from "@/lib/utils/actions/payments/gumRoadFetch";

export async function getProducts() {
  const endpoint = "/products";
  return gumRoadFetch(endpoint);
}
