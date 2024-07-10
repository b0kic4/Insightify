"use server";
import Redis from "ioredis";
import { AIResponse, FormValues } from "@/lib";
import { CachedAIResponse } from "@/lib";

let redisClient: Redis | null = null;

export async function getRedisInstance() {
  if (!redisClient) {
    console.log("new redis client created");
    redisClient = new Redis({
      host: process.env.REDIS_ADD!.split(":")[0],
      port: parseInt(process.env.REDIS_ADD!.split(":")[1]),
      password: process.env.REDIS_PW,
    });

    // Add error handling
    redisClient.on("error", (err) => {
      console.error("[ioredis] Unhandled error event:", err);
    });
  }
  return redisClient;
}

export async function saveScreenshotsToRedis(
  userId: string,
  formData: FormValues,
  screenshots: string[],
) {
  const redis = await getRedisInstance();
  const key = `${userId}:${formData.websiteUrl}`;
  const newData = {
    screenshots: screenshots,
    url: formData.websiteUrl,
    market: formData.targetedMarket,
    audience: formData.targetedAudience,
    insights: formData.websiteInsights,
  };
  await redis.set(key, JSON.stringify(newData), "EX", 86400);
}

export async function getSingleWebsiteFromUserCache(
  userId: string,
  url: string,
): Promise<{
  screenshots?: string[];
  url?: string;
  market?: string;
  audience?: string;
  insights?: string;
  type?: string;
  aiResponse?: string[];
} | null> {
  const redis = await getRedisInstance();
  const key = `${userId}:${url}`;
  const result = await redis.get(key);
  if (result) {
    console.log("Data found in Redis:", result);
    const data = JSON.parse(result);
    return data;
  }
  console.log("No data found in Redis");
  return null;
}

export async function getWebsitesFromUserCache(
  userId: string,
): Promise<CachedAIResponse[]> {
  const redis = await getRedisInstance();
  const pattern = `${userId}:*`;
  const keys = await redis.keys(pattern);

  if (keys.length === 0) {
    return [];
  }

  const data = await redis.mget(keys);
  const ttlPromises = keys.map((key) => redis.ttl(key));
  const ttls = await Promise.all(ttlPromises);

  return data.map((item, index) => {
    const cachedResponse = JSON.parse(item as string) as CachedAIResponse;
    return { ...cachedResponse, expiration: ttls[index] };
  });
}
