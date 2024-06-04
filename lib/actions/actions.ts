"use server";
import OpenAI from "openai";

interface ImageURL {
  url: string;
}

interface TextContent {
  type: "text";
  text: string;
}

interface ImageContent {
  type: "image_url";
  image_url: ImageURL;
}

type Content = TextContent | ImageContent;

interface Message {
  role: "user" | "assistant";
  content: Content[];
}

export async function RequestToAI({
  url,
  audience,
  market,
  imageUrls,
}: {
  url: string;
  audience: string;
  market: string;
  imageUrls: string[];
}) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION,
  });

  const initialContent: TextContent = {
    type: "text",
    text: `
Instructions:
1. First, go and analyze the website URL provided and then proceed with the analysis of the screenshots: ${url}
2. Review the provided screenshots in relation to the website sections.
3. Identify design errors, evaluate the text, and suggest improvements to ensure the content resonates with ${audience} in the ${market} field.

Dissect the website not just mechanically but with an artistic and strategic eye.
Narrow down to the essence that makes the website resonate with the target audience (${audience}).
Identify design errors and evaluate the effectiveness of the words used.
After successful navigation of ${url} and analysis of the provided screenshots, make changes to the text to ensure it is compelling and relatable to the provided market (${market}).
Review the site's layout, images, text efficiency, user experience, etc.,
and provide a comprehensive report.

Also, connect the provided screenshots with the respective parts of the website where
improvements are needed. For each part of the website that requires improvement, 
reference the corresponding screenshot and suggest enhancements.

Example Response Structure:
Screenshot: [Screenshot URL]

Current State: Describe the current state of the section.
Improvements: Suggest specific changes, including design tweaks,
text revisions, and user experience enhancements.
Screenshot: [Screenshot URL]

Current State: Describe the current state of the section.
Improvements: Suggest specific changes, including design tweaks,
text revisions, and user experience enhancements.
Continue this structure for each screenshot provided.`,
  };

  const imageContents: ImageContent[] = imageUrls.map((url) => ({
    type: "image_url",
    image_url: { url },
  }));

  const finalContent: TextContent = {
    type: "text",
    text: `Identify design errors and evaluate the effectiveness of the words used. After successful navigation of ${url} and analysis of the provided screenshots, make changes to the text to ensure it is compelling and relatable to the provided market (${market}). Review the site's layout, images, text efficiency, user experience, etc., and provide a comprehensive report.

Also, connect the provided screenshots with the respective parts of the website where improvements are needed. For each part of the website that requires improvement, reference the corresponding screenshot and suggest enhancements.

Example Response Structure:
Screenshot: [Screenshot URL]

Current State: Describe the current state of the section.
Improvements: Suggest specific changes, including design tweaks, text revisions, and user experience enhancements.
Screenshot: [Screenshot URL]

Current State: Describe the current state of the section.
Improvements: Suggest specific changes, including design tweaks, text revisions, and user experience enhancements.
Continue this structure for each screenshot provided.`,
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

  return responseMessage;
}

async function getAssistant(openai: OpenAI) {
  return await openai.beta.assistants.retrieve(
    process.env.ASSISTANT_ID as string,
  );
}

async function createThread(openai: OpenAI) {
  return openai.beta.threads.create();
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
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds
    console.log(runObj.status);
  }
}

async function getResponseMessage(openai: OpenAI, thread: OpenAI.Beta.Thread) {
  const threadMessages = await openai.beta.threads.messages.list(thread.id);

  // Log the entire response to see its structure
  console.log(
    "Thread messages: ",
    JSON.stringify(threadMessages.data, null, 2),
  );

  const responseMessage = threadMessages.data
    .filter((msg) => msg.role === "assistant")
    .map((msg) => {
      console.log("Assistant message content: ", msg.content);
      return msg.content;
    })
    .join("\n");

  console.log("Concatenated response message: ", responseMessage);
  return responseMessage;
}
