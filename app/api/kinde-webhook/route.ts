import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/client";

// The Kinde issuer URL should already be in your `.env` file
// from when you initially set up Kinde. This will fetch your
// public JSON web keys file
const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
  try {
    // Get the token from the request
    const token = await req.text();

    // Decode the token
    const { header }: any = jwt.decode(token, { complete: true });
    const { kid } = header;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = (await jwt.verify(token, signingKey)) as any;

    console.log("event: ", event);

    // Handle various events
    switch (event?.type) {
      case "user.updated":
        // Handle user updated event
        console.log(event.data);
        await prisma.user.update({
          where: { id: event.data.user.id },
          data: {
            email: event.data.user.email,
            firstName: event.data.user.first_name,
            lastName: event.data.user.last_name,
          },
        });
        break;

      case "user.created":
        console.log(event.data);
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
          where: { id: event.data.user.id },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              id: event.data.user.id,
              email: event.data.user.email,
              firstName: event.data.user.first_name,
              lastName: event.data.user.last_name,
            },
          });
        } else {
          console.log(`User with ID ${event.data.user.id} already exists`);
        }
        break;

      default:
        // Handle other events that we don't handle
        break;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}
