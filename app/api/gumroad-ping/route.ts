import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const payload = Object.fromEntries(data.entries());

    console.log("Gumroad Webhook Payload: ", payload);

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error processing Gumroad webhook: ", error);
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 },
    );
  }
}
