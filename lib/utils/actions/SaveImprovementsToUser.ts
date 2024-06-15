"use server";
import { FormValues } from "@/lib";
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
  formData: FormValues | null,
): Promise<SaveImprovementsResponse> {
  try {
    console.log("threadId: ", threadId);
    console.log("userId: ", userId);
    console.log("formData: ", formData);
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
        url: formData?.websiteUrl,
        market: formData?.targetedMarket,
        audience: formData?.targetedAudience,
        insights: formData?.websiteInsights,
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
