"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/prisma/client";

const { getUser } = getKindeServerSession();

export interface ResponseSuccess {
  success: true;
  isActive: boolean;
}

export interface ResponseFailed {
  success: false;
  error: string;
}

export interface ResponseFreePlanSucceed {
  success: true;
  isActive: false;
  isFreePlanAvailable: true;
}

export interface ResponseFreePlanFailed {
  success: false;
  isActive: false;
  isFreePlanAvailable: false;
  error: string;
}

export default async function isUsersPlanActive(): Promise<
  | ResponseSuccess
  | ResponseFailed
  | ResponseFreePlanSucceed
  | ResponseFreePlanFailed
> {
  try {
    const user = await getUser();
    if (!user) {
      console.log("User not authenticated");
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    const foundUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!foundUser) {
      console.log("User not found");
      return {
        success: false,
        error: "User not found",
      };
    }

    const subscription = await prisma.plan.findFirst({
      where: {
        userId: user.id,
        isActive: true,
      },
    });

    if (subscription && subscription.isActive === true) {
      return {
        success: true,
        isActive: !!subscription,
      };
    }

    // Check if daily_free_improvements is less than 2
    if (!subscription && foundUser.daily_free_improvements > 0) {
      return {
        success: true,
        isActive: false,
        isFreePlanAvailable: true,
      };
    } else {
      return {
        success: false,
        isActive: false,
        isFreePlanAvailable: false,
        error: "No improvements left",
      };
    }
  } catch (error) {
    console.error("Error checking user plan:", error);
    return {
      success: false,
      error: (error as Error).message || "Failed to check user plan",
    };
  } finally {
    await prisma.$disconnect();
  }
}
