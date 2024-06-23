"use server";
import { Card, Plan, PrismaClient } from "@prisma/client";
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
}

interface ResponseFailed {
  success: false;
  error: string;
}

const prisma = new PrismaClient();
const { getUser } = getKindeServerSession();

export default async function retrieveUsersPlan() {
  const user = await getUser();
  try {
    if (!user) {
      console.log("user not auth");
      return {
        success: false,
        error: "User not authenticated",
      } as ResponseFailed;
    }

    const userId = user.id;

    const plan = await prisma.plan.findFirst({
      where: { userId: userId },
      include: { card: true },
    });

    if (plan) {
      return {
        success: true,
        data: {
          plan: plan,
          card: plan.card,
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
