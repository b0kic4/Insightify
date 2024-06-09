"use server";
import prisma from "@/prisma/client";

interface SaveImprovementsSuccess {
  success: true;
  data: {
    id: number;
    threadId: string;
    userId: string;
  };
}

interface SaveImprovementsError {
  success: false;
  error: string;
}

type SaveImprovementsResponse = SaveImprovementsSuccess | SaveImprovementsError;

export async function saveImprovementsWithUser(
  threadId: string,
  userId: string,
): Promise<SaveImprovementsResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return {
        success: false,
        error: `User with ID ${userId} not found`,
      };
    }

    const foundImprovement = await prisma.improvement.findFirst({
      where: {
        userId: user.id,
        threadId: threadId,
      },
    });

    if (foundImprovement)
      return {
        success: true,
        data: foundImprovement,
      };

    const newImprovement = await prisma.improvement.create({
      data: {
        threadId: threadId,
        userId: userId,
      },
    });

    return {
      success: true,
      data: newImprovement,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}
