"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";

const { getUser } = getKindeServerSession();
const prisma = new PrismaClient();

export default async function increaseUsageOfFreePlan() {
  const user = await getUser();
  if (!user) {
    console.log("User not authenticated");
    return {
      success: false,
      error: "User not authenticated",
    };
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!foundUser) {
      return {
        success: false,
        error: "User not found",
      };
    }

    if (foundUser.daily_free_improvements === 0) {
      return {
        success: false,
        error: "You have reached the maximum number of free improvements.",
      };
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        daily_free_improvements: {
          decrement: 1,
        },
        free_improvement_lastTime_used: new Date(),
      },
    });

    return {
      success: true,
      data: 2 - updatedUser.daily_free_improvements,
    };
  } catch (error) {
    console.error("Error increasing usage of free plan:", error);
    return {
      success: false,
      error:
        (error as Error).message || "Failed to increase usage of free plan",
    };
  } finally {
    await prisma.$disconnect();
  }
}
