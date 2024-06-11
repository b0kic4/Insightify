"use server";
import OpenAI from "openai";

export async function getDataFromThreadID(threadId: string) {
  const openai = new OpenAI();
  const thread = await retrieveThead(openai, threadId);
  const response = await getResponseMessage(openai, thread);
  console.log("response: ", response);
}

async function getResponseMessage(openai: OpenAI, thread: OpenAI.Beta.Thread) {
  const threadMessages = await openai.beta.threads.messages.list(thread.id);
  console.log(
    "Thread messages: ",
    JSON.stringify(threadMessages.data, null, 2),
  );

  const responseMessages = threadMessages.data
    .filter((msg) => msg.role === "assistant")
    .map((msg) => msg.content);

  console.log("Filtered response messages: ", JSON.stringify(responseMessages));
  return { aiResponse: responseMessages, threadId: thread.id };
}

async function retrieveThead(openai: OpenAI, threadId: string) {
  return await openai.beta.threads.retrieve(threadId);
}
