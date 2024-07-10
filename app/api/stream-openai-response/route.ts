import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getRedisInstance } from "@/lib/utils/hooks/(redisHooks)/RedisHooks";
import { FormValues } from "@/lib";

export const config = {
  runtime: "edge",
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});

const { getUser } = getKindeServerSession();

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    prompt,
    formData,
    images,
  }: { prompt: any; formData: FormValues; images: any } = await req.json();

  if (!prompt || !formData || !images) {
    return NextResponse.json(
      { error: "Prompt, FormData, and Images are required" },
      { status: 400 },
    );
  }

  const structuredPrompt = prompt.map((item: any) => ({
    role: item.role,
    content: JSON.stringify(item.content),
  }));

  console.log("structured prompt in api route: ", structuredPrompt);

  const redis = await getRedisInstance();
  const user = await getUser();
  const key = user?.id + ":" + formData.websiteUrl;

  const responseStream = await openai.chat.completions.create({
    model: "gpt-4",
    messages: structuredPrompt,
    stream: true,
  });

  console.log("responseStream: ", responseStream);

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      const responseChunks: string[] = [];
      let systemFingerprint = "";

      for await (const chunk of responseStream) {
        console.log("chunk: ", chunk);
        const { choices } = chunk;
        console.log("choices: ", choices);
        const content = choices[0]?.delta?.content || "";
        console.log("content: ", content);
        responseChunks.push(content);

        if (chunk.system_fingerprint) {
          systemFingerprint = chunk.system_fingerprint;
        }

        controller.enqueue(encoder.encode(`data: ${content}\n\n`));
      }

      controller.close();

      const aiResponse = responseChunks.join("");
      const newData = {
        screenshots: images,
        aiResponse,
        url: formData.websiteUrl,
        threadId: systemFingerprint,
        type: "cached",
        market: formData.targetedMarket,
        audience: formData.targetedAudience,
        insights: formData.websiteInsights,
      };
      await redis.set(key, JSON.stringify(newData), "EX", 86400);
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
