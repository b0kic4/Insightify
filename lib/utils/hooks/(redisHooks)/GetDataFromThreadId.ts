"use server";
import OpenAI from "openai";
import { AIResponse } from "@/lib";

export async function getDataFromThreadID(threadId: string) {
  const openai = new OpenAI();
  const thread = await retrieveThread(openai, threadId);
  const responseMessage = await getResponseMessage(openai, thread);
  return responseMessage;
}

async function getResponseMessage(openai: OpenAI, thread: OpenAI.Beta.Thread) {
  const threadMessages = await openai.beta.threads.messages.list(thread.id);
  console.log(
    "Thread messages: ",
    JSON.stringify(threadMessages.data, null, 2),
  );

  const assistantResponseMessages = threadMessages.data
    .filter((msg) => msg.role === "assistant")
    .map((msg) => msg.content);

  const userRequestMessage = threadMessages.data
    .filter((msg) => msg.role === "user")
    .map((msg) => msg.content);

  console.log(
    "Filtered response messages: ",
    JSON.stringify(assistantResponseMessages),
  );

  // Structure the response messages
  const aiResponse: AIResponse[] = [];
  const images: string[] = [];

  assistantResponseMessages.flat().forEach((content) => {
    if (content.type == "text") {
      aiResponse.push({
        type: "text",
        text: {
          value: content.text.value,
          annotations: content.text.annotations,
        },
        threadId: thread.id,
      });
    }
  });
  userRequestMessage.flat().forEach((content) => {
    if (content.type == "image_url") {
      images.push(content.image_url.url);
    }
  });

  return { aiResponse: [aiResponse], images, threadId: thread.id }; // Wrap aiResponse in an array
}

async function retrieveThread(openai: OpenAI, threadId: string) {
  return await openai.beta.threads.retrieve(threadId);
}
