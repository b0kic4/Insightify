export const GUMROAD_ENDPOINT = "https://api.gumroad.com/v2/";

const headers = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
  Authorization: `Bearer ${process.env.ACCESS_TOKEN_PROD}`,
};

export async function gumRoadFetch(
  endpoint: string,
  options: RequestInit = {},
) {
  const response = await fetch(`${GUMROAD_ENDPOINT}${endpoint}`, {
    cache: "no-cache",
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
