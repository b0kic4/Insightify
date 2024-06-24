"use server";
import { PrismaClient } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const prisma = new PrismaClient();
const { getUser } = getKindeServerSession();

export interface ResponseSuccess {
  success: true;
  isActive: boolean;
}

export interface ResponseFailed {
  success: false;
  error: string;
}

export default async function isUsersPlanActive(): Promise<
  ResponseSuccess | ResponseFailed
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

    const subscription = await prisma.plan.findFirst({
      where: {
        userId: user.id,
        isActive: true,
      },
    });

    return {
      success: true,
      isActive: !!subscription,
    };
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
