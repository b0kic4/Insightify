"use server";
import { Card, Plan } from "@prisma/client";
import prisma from "@/prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface ResponseSuccess {
  success: true;
  data: {
    plan: Plan;
    card: Card;
  };
}

interface ResponseSuccessButNoPlan {
  success: true;
  message: string;
  freeImprovementsLeft: number;
}

interface ResponseFailed {
  success: false;
  error: string;
}

const { getUser } = getKindeServerSession();

export default async function retrieveUsersPlan() {
  const user = await getUser();
  try {
    if (!user) {
      console.log("User not authenticated");
      return {
        success: false,
        error: "User not authenticated",
      } as ResponseFailed;
    }

    const userId = user.id;

    const foundUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { plans: true, cards: true },
    });

    if (!foundUser) {
      return {
        success: false,
        error: "User not found",
      } as ResponseFailed;
    }

    const plan = foundUser.plans[0] || null;
    const card = foundUser.cards[0] || null;
    const dailyFreeImprovements = foundUser.daily_free_improvements;

    if (plan && !plan.refunded) {
      return {
        success: true,
        data: {
          plan: plan,
          card: card,
        },
      } as ResponseSuccess;
    } else if (plan && plan.refunded) {
      return {
        success: true,
        message: "Your plan has been refunded",
        freeImprovementsLeft: dailyFreeImprovements,
      } as ResponseSuccessButNoPlan;
    } else {
      return {
        success: true,
        message: "No plan found for the user",
        freeImprovementsLeft: dailyFreeImprovements,
      } as ResponseSuccessButNoPlan;
    }
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    } as ResponseFailed;
  } finally {
    await prisma.$disconnect();
  }
}
