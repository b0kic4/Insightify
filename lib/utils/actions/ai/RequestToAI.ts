"use server";
import { TextContent, ImageContent, Message } from "@/lib";

export async function structureRequest({
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
    messages: Message[];
    market: string;
    audience: string;
    insights: string;
  };
}> {
  console.log("Structuring the request prompt");

  const initialContent: TextContent = {
    type: "text",
    text: `
**Instructions:**
1. Analyze the website URL and provided screenshots: ${url}
2. Identify design errors, evaluate the text, and suggest improvements for ${audience} in the ${market} field.
3. Consider these insights: ${insights}
4. Focus on providing actionable improvements without mentioning the analysis process.

**Guidelines:**
  - **Current State** 🖥️: Describe the current state.
- **Current Design** 🖌️: Detect the current design style and provide information about the layout's current state, including a creative rating.
- Use Markdown to format the response with the following sections:
  - **Improvements** 🚀: Suggest specific changes, including design tweaks, text revisions, and user experience enhancements.
  - **Examples** 🌐: Provide concrete examples with sources to help visualize the suggested improvements. If the example is a link, make it look like a link with [🔗](Name for the Link).
  - **Severity** ⚠️ : Provide severity ratings for usability and appearance.
- Frame your suggestions in an engaging, creative manner, and use descriptive language to make the recommendations lively.

Add a horizontal line after each section for clear separation like this: **---**.

**Example Response Structure:**
- **Identified Section** (e.g., Screenshot 1):
  - **Current State** 🖥️: Describe the current state.
  - **Current Design** 🖌️: Detect the current design style and provide information about the layout's current state, including a creative rating.
  - **Improvements** 🚀: Suggest specific changes.
  - **Examples** 🌐: Provide examples, if they are links make them look like links with [🔗](Name for the Link).
  - **Severity** ⚠️ : Rate usability and appearance.

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
  - **Current State** 🖥️: Describe the current state.
  - **Current Design** 🖌️: Detect the current design style and provide information about the layout's current state, including a creative rating.
  - **Improvements** 🚀: Suggest specific changes.
  - **Examples** 🌐: Provide examples, if they are links make them look like links with [🔗](Name for the link).
  - **Severity** ⚠️ : Rate usability and appearance.

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

  return {
    success: true,
    data: {
      messages,
      market,
      audience,
      insights,
    },
  };
}
