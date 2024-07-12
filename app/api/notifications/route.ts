import { NextResponse } from "next/server";
import amqplib, { Channel, ConsumeMessage } from "amqplib";
import prisma from "@/prisma/client";

let channel: Channel;

interface Notification {
  userId: string;
  message: string;
}

const connectRabbitMQ = async (): Promise<Channel> => {
  console.log("connecting to rabbitmq");
  if (channel) return channel;

  const connection = await amqplib.connect(process.env.CLOUDAMQP_URL!);
  channel = await connection.createChannel();
  await channel.assertQueue("notifications_queue", { durable: true });

  return channel;
};

const consumeMessages = async (userId: string): Promise<void> => {
  const channel = await connectRabbitMQ();

  console.log("consuming messages");
  return new Promise((resolve, reject) => {
    channel.consume(
      "notifications_queue",
      async (msg: ConsumeMessage | null) => {
        try {
          if (msg !== null) {
            const content = JSON.parse(msg.content.toString());
            console.log("content: ", content);
            if (content.data.userId === userId) {
              await prisma.notification.create({
                data: {
                  userId: content.data.userId,
                  message: content.data.message,
                },
              });
            }
            channel.ack(msg);
          }
        } catch (error) {
          reject(error);
        }
      },
      { noAck: false },
    );

    setTimeout(() => {
      resolve();
    }, 5000);
  });
};

export async function GET(request: Request) {
  console.log("Route called");
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId query parameter is required" },
      { status: 400 },
    );
  }

  try {
    await consumeMessages(userId);

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    console.log("notifications: ", notifications);

    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId query parameter is required" },
      { status: 400 },
    );
  }

  await prisma.notification.deleteMany({
    where: { userId },
  });

  return NextResponse.json({ success: true });
}
