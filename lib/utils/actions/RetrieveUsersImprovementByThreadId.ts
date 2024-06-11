"use server";
import prisma from "@/prisma/client";
import { Improvement } from "@prisma/client";

interface SaveImprovementsSuccess {
  success: true;
  data: {
    improvement: Improvement;
  };
}

interface SaveImprovementsError {
  success: false;
  error: string;
}

type SaveImprovementsResponse = SaveImprovementsSuccess | SaveImprovementsError;

export async function retrieveUsersImprovements(
  threadId: string,
  userId: string,
): Promise<SaveImprovementsResponse | undefined> {
  try {
    // Find the user by userId
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // If user not found, return an error response
    if (!user) {
      return {
        success: false,
        error: `User with ID ${userId} not found`,
      };
    }

    // Find the improvement by userId and threadId
    const foundImprovement = await prisma.improvement.findFirst({
      where: {
        userId: user.id,
        threadId: threadId,
      },
    });

    // If improvement not found, return an error response
    if (!foundImprovement) {
      return {
        success: false,
        error: `Improvement with thread ID ${threadId} for user ID ${userId} not found`,
      };
    }

    // If improvement found, return success response with the improvement data
    return {
      success: true,
      data: {
        improvement: foundImprovement,
      },
    };
  } catch (error) {
    // Catch any errors and return an error response
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}
