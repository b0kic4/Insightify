"use server";
import OpenAI from "openai";
import { TextContent, ImageContent, Content, Message } from "../..";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getRedisInstance } from "../hooks/(redisHooks)/RedisHooks";

// Define retry parameters
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // in milliseconds

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
  console.log("RequestToAI called");
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
**Instructions:**
1. Analyze the website URL and provided screenshots: ${url}
2. Identify design errors, evaluate the text, and suggest improvements for ${audience} in the ${market} field.
3. Consider these insights: ${insights}
4. Focus on providing actionable improvements without mentioning the analysis process.

**Guidelines:**
- **Current Design**: Detect the current design style and provide information about the layout's current state, including a creative rating.
- Use Markdown to format the response with the following sections:
  - **Current State**: Describe the current state of the section.
  - **Improvements**: Suggest specific changes, including design tweaks, text revisions, and user experience enhancements.
  - **Examples**: Provide concrete examples with sources to help visualize the suggested improvements.
  - **Severity**: Provide severity ratings for usability and appearance.
- Frame your suggestions in an engaging, creative manner, and use descriptive language to make the recommendations lively.

Add a horizontal line after each section for clear separation like this: **---**.

**Example Response Structure:**
- **Identified Section** (e.g., Screenshot 1):
  - **Current State**: Describe the current state.
  - **Improvements**: Suggest specific changes.
  - **Examples**: Provide examples.
  - **Severity**: Rate usability and appearance.

Add a horizontal line after each section for clear separation like this: **---**.

**Detailed Analysis:**
Identify design errors and evaluate the effectiveness of the words used. After successful navigation of ${url} and analysis of the provided screenshots, make changes to the text to ensure it is compelling and relatable to the provided market (${market}). Review the site's layout, images, text efficiency, user experience, etc., and provide a comprehensive report.

Connect the provided screenshots (sections) with the respective parts of the website where improvements are needed. For each part of the website that requires improvement, reference the corresponding section and suggest enhancements.

**Example Response Structure:**
- **Identified Section** (e.g., Screenshot 1):
  - **Current State**: Describe the current state.
  - **Improvements**: Suggest specific changes.
  - **Examples**: Provide examples.
  - **Severity**: Rate usability and appearance.

Add a horizontal line after each section for clear separation like this: **---**.`,
  };

  const imageContents: ImageContent[] = imageUrls.map((url) => ({
    type: "image_url",
    image_url: { url },
  }));

  const finalContent: TextContent = {
    type: "text",
    text: `Review the site (${url}), analyze the provided screenshots, and suggest improvements to ensure it resonates with the provided market (${market}). Connect each screenshot with the respective part of the website, providing enhancements as needed. Focus on providing actionable improvements without mentioning the analysis process.

**Example Response Structure:**
- **Identified Section**:
  - **Current State**: Describe the current state.
  - **Improvements**: Suggest specific changes.
  - **Examples**: Provide examples.
  - **Severity**: Rate usability and appearance.

Add a horizontal line after each section for clear separation like this: **---**.`,
  };

  const messages: Message[] = [
    { role: "user", content: [initialContent] },
    ...imageContents.map((content) => ({
      role: "user" as const,
      content: [content],
    })),
    { role: "user", content: [finalContent] },
  ];

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
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
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else {
        return {
          success: false,
          data: {
            aiResponse: [],
            type: "failed",
            threadId: "",
            market,
            audience,
            insights,
          },
        };
      }
    }
  }

  return {
    success: false,
    data: {
      aiResponse: [],
      type: "failed",
      threadId: "",
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
  const responseMessages = threadMessages.data
    .filter((msg) => msg.role === "assistant")
    .map((msg) => msg.content);

  return { aiResponse: responseMessages, threadId: thread.id };
}
