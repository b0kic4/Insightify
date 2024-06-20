export const LEMON_SQUEEZY_ENDPOINT = "https://api.lemonsqueezy.com/v1/";

const headers = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
  Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
};

export async function lemonSqueezyFetch(
  endpoint: string,
  options: RequestInit = {},
) {
  const response = await fetch(`${LEMON_SQUEEZY_ENDPOINT}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error ${response.status}: ${error.message}`);
  }

  return response.json();
}
