"use server";

import OpenAI from "openai";
import { TextContent, ImageContent, Content, Message } from "../..";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getRedisInstance } from "../hooks/(redisHooks)/RedisHooks";

// FIXME: Handle Failed Request

export async function RequestToAI({
  url,
  audience,
  market,
  insights,
  imageUrls,
}: {
  url: string;
  audience: string;
  market: string;
  insights: string;
  imageUrls: string[];
}): Promise<{
  success: boolean;
  data: {
    aiResponse: OpenAI.Beta.Threads.Messages.MessageContent[][];
    type: string;
    threadId: string;
    market: string;
    audience: string;
    insights: string;
  };
}> {
  const redis = await getRedisInstance();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const key = user?.id + ":" + url;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION,
  });

  const initialContent: TextContent = {
    type: "text",
    text: `
Instructions:
1. Analyze the website URL and provided screenshots: ${url}
2. Identify design errors, evaluate the text, and suggest improvements to ensure the content resonates with ${audience} in the ${market} field.
3. Consider these insights: ${insights}

Focus on providing actionable improvements without mentioning the analysis process.

Before proceeding to the detailed instructions, detect the current design style and provide some information about the current state of the layout, giving it a creative rating that will be useful for continued analysis.
- **Current Design** in bold
Add a horizontal line 


Use Markdown to format the following key aspects:
- **Current State:** in bold
- **Improvements:** in bold 
- **Severity:** in bold 

Add a horizontal line after each section for clear separation.

Example Response Structure:
**Identified Section of the website with the Screenshot number/s that indecates that section: in bold**

**Current State:** Describe the current state of the section.
**Improvements:** Suggest specific changes, including design tweaks, text revisions, and user experience enhancements.
**Examples:** Provide concrete examples with sources to help visualize the suggested improvements.
**Severity:** Severity Ratings for Usability and appearance

Nice horizontal line seperating next section

Continue this structure for each section provided.`,
  };
  const imageContents: ImageContent[] = imageUrls.map((url) => ({
    type: "image_url",
    image_url: { url },
  }));

  const finalContent: TextContent = {
    type: "text",
    text: `Identify design errors and evaluate the effectiveness of the words used. After successful navigation of ${url} and analysis of the provided screenshots, make changes to the text to ensure it is compelling and relatable to the provided market (${market}). Review the site's layout, images, text efficiency, user experience, etc., and provide a comprehensive report.

Also, connect the provided screenshots - (sections) with the respective parts of the website where improvements are needed. For each part of the website that requires improvement, reference the corresponding section and suggest enhancements.

Example Response Structure:
Identified Section of the website:

Current State: Describe the current state of the section.
Improvements: Suggest specific changes, including design tweaks, text revisions, and user experience enhancements.
Examples: Provide concrete examples with sources to help visualize the suggested improvements.
Severity: Severity Ratings for Usability and appearance

Continue this structure for each section provided.`,
  };

  const messages: Message[] = [
    { role: "user", content: [initialContent] },
    ...imageContents.map((content) => ({
      role: "user" as const,
      content: [content],
    })),
    { role: "user", content: [finalContent] },
  ];

  const myAssistant = await getAssistant(openai);
  const newThread = await createThread(openai);

  for (const message of messages) {
    await createMessage(openai, newThread, message);
  }

  const newRun = await createRun(openai, newThread, myAssistant);
  await loopUntilCompleted(openai, newThread.id, newRun.id);
  const responseMessage = await getResponseMessage(openai, newThread);

  // Cache the AI response in Redis with an expiration time of 24 hours (86400 seconds)
  const newData = {
    screenshots: imageUrls,
    aiResponse: responseMessage.aiResponse,
    url: url,
    threadId: newRun.thread_id,
    type: "cached",
    market,
    audience,
    insights,
  };
  await redis.set(key, JSON.stringify(newData), "EX", 86400);

  return {
    success: true,
    data: {
      aiResponse: responseMessage.aiResponse,
      threadId: responseMessage.threadId,
      type: "new",
      market,
      audience,
      insights,
    },
  };
}

async function getAssistant(openai: OpenAI) {
  return await openai.beta.assistants.retrieve(
    process.env.ASSISTANT_ID as string,
  );
}

async function createThread(openai: OpenAI) {
  return await openai.beta.threads.create();
}

async function createMessage(
  openai: OpenAI,
  thread: OpenAI.Beta.Thread,
  message: { role: "user" | "assistant"; content: Content[] },
) {
  return openai.beta.threads.messages.create(thread.id, message);
}

async function createRun(
  openai: OpenAI,
  thread: OpenAI.Beta.Thread,
  assistant: OpenAI.Beta.Assistant,
) {
  return openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });
}

async function loopUntilCompleted(
  openai: OpenAI,
  threadId: string,
  runId: string,
) {
  let status = "running";

  while (!["completed", "failed", "requires_action"].includes(status)) {
    const runObj = await openai.beta.threads.runs.retrieve(threadId, runId);
    status = runObj.status;
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("request status: ", runObj.status);
  }
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
