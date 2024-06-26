import { gumRoadFetch } from "./gumRoadFetch";

export async function getProducts() {
  const endpoint = "/products";
  return gumRoadFetch(endpoint);
}
