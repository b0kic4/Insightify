import { NextResponse } from "next/server";
import amqplib, { Channel } from "amqplib";

let channel: Channel;

interface Notification {
  userId: string;
  message: string;
}

const connectRabbitMQ = async (): Promise<Channel> => {
  if (channel) return channel;

  const connection = await amqplib.connect(process.env.CLOUDAMQP_URL!);
  channel = await connection.createChannel();
  await channel.assertQueue("notifications_queue", { durable: true });

  return channel;
};

const fetchMessages = async (userId: string): Promise<Notification[]> => {
  const channel = await connectRabbitMQ();

  return new Promise((resolve) => {
    const messages: Notification[] = [];

    channel.consume(
      "notifications_queue",
      (msg) => {
        if (msg !== null) {
          const content = JSON.parse(msg.content.toString());
          if (content.userId === userId) {
            messages.push(content);
          }
          channel.ack(msg);
        } else {
          resolve(messages);
        }
      },
      { noAck: false },
    );
  });
};

export async function GET(request: Request) {
  console.log("I am called");
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const messages = await fetchMessages(userId);
    console.log("messages: ", messages);
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}
