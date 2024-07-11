import { NextResponse } from "next/server";
import amqplib, { Channel, ConsumeMessage } from "amqplib";

let channel: Channel;
let temporaryStore: Notification[] = [];

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
          console.log("content: ", content);
          if (content.data.userId === userId) {
            messages.push(content.data);
          }
          // Do not acknowledge here to simulate storing messages
        }
      },
      { noAck: true }, // Ensure we do not ack automatically
    );

    setTimeout(() => {
      // Save messages to temporary store
      temporaryStore = messages;
      resolve(messages);
    }, 5000); // Fetch messages for 500 ms and then resolve
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

export async function DELETE(request: Request) {
  temporaryStore = [];
  return NextResponse.json({ success: true });
}
