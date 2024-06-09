"use server";
import Redis from "ioredis";
import { AIResponse } from "@/lib";

let redisClient: Redis;

export async function getRedisInstance() {
  if (!redisClient) {
    redisClient = new Redis({
      host: process.env.REDIS_ADD!.split(":")[0],
      port: parseInt(process.env.REDIS_ADD!.split(":")[1]),
      password: process.env.REDIS_PW,
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
// NOTE: I am getting here all of the data
// from redis
export async function getCache(
  userId: string,
  url: string,
): Promise<{
  screenshots?: string[];
  market?: string;
  audience?: string;
  insights?: string;
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
