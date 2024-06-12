"use server";
import { getRedisInstance } from "./RedisHooks";
import prisma from "@/prisma/client";
import { bucket } from "../firebaseAdminSDK";

export async function removeImprovementData(
  userId: string,
  url: string,
  threadId: string,
  screenshots: string[],
): Promise<{ success: boolean; message: string }> {
  const redis = await getRedisInstance();
  try {
    const key = `${userId}:${url}`;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const improvement = await prisma.improvement.findFirst({
      where: {
        userId: user.id,
        threadId: threadId,
      },
    });

    if (!improvement) {
      return { success: false, message: "Improvement not found" };
    }

    // Removing from redis
    const remove = await redis.del(key);

    // Removing from supabase
    await prisma.improvement.delete({
      where: {
        id: improvement.id,
      },
    });

    // Remove images from firebase cloud storage
    const deletePromises = screenshots.map((screenshotUrl: string) => {
      const fileName = screenshotUrl.split("/").slice(-2).join("/"); // Extract file path from URL
      return bucket.file(fileName).delete();
    });

    await Promise.all(deletePromises);

    if (remove === 1) {
      return { success: true, message: "Improvement deleted successfully" };
    } else {
      return { success: false, message: "Improvement already deleted" };
    }
  } catch (error) {
    console.error("Error deleting from cache:", error);
    return {
      success: false,
      message: "Error ocurred while deleting the improvement",
    };
  }
}
