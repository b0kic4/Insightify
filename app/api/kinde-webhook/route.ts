import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";

// The Kinde issuer URL should already be in your `.env` file
// from when you initially set up Kinde. This will fetch your
// public JSON web keys file
const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
  console.log("I am called");
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
        // handle user updated event
        // e.g update database with event.data
        console.log(event.data);
        break;
      case "user.created":
        console.log(event.data);
        await prisma?.user.create({
          data: {
            id: event.data.user.id,
            email: event.data.user.email,
            firstName: event.data.user.first_name,
            lastName: event.data.user.last_name,
          },
        });
        break;
      default:
        // other events that we don't handle
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
