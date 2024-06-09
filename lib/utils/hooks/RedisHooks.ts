"use server";
import Redis from "ioredis";
import { AIResponse } from "@/lib";
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
  url: string,
  screenshots: string[],
) {
  const redis = await getRedisInstance();
  const key = `${userId}:${url}`;
  await redis.set(key, JSON.stringify({ screenshots }));
}

export async function getSingleWebsiteFromUserCache(
  userId: string,
  url: string,
): Promise<{
  screenshots?: string[];
  market?: string;
  audience?: string;
  insights?: string;
  type: string;
  aiResponse?: AIResponse[][];
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
  return data.map((item) => JSON.parse(item as string) as CachedAIResponse);
}
