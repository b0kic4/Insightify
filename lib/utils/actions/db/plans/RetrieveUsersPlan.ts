import { Plan, PrismaClient } from "@prisma/client";

interface ResponseSuccess {
  success: true;
  data: {
    plan: Plan;
  };
}

interface ResponseSuccessButNoPlan {
  success: true;
  message: string;
}

interface ResponseFailed {
  success: false;
  error: string;
}

const prisma = new PrismaClient();

export default async function retrieveUsersPlan(userId: string) {
  try {
    if (!userId) {
      return {
        success: false,
        error: "User not authenticated",
      } as ResponseFailed;
    }

    const plan = await prisma.plan.findFirst({
      where: { userId: userId },
      include: { card: true },
    });

    if (plan) {
      return {
        success: true,
        data: {
          plan: {
            ...plan,
            cardBrand: plan.card?.brand || null,
          },
        },
      } as ResponseSuccess;
    } else {
      return {
        success: true,
        message: "No plan found for the user",
      } as ResponseSuccessButNoPlan;
    }
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    } as ResponseFailed;
  }
}
