"use server";

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
  const prompt = `
Instructions:
1. First Go and analyze the website url provided and them proceed with analyzation of the screenshots: ${url}
2. Review the provided screenshots in relation to the website sections.
3. Identify design errors, evaluate the text, and suggest improvements to ensure the content resonates with hiring managers in the programming field.

Dissect the website not just mechanically but with an artistic and strategic eye.
Narrow down to the essence that makes the website resonate with the target audience (${audience}).
Identify design errors and evaluate the effectiveness of the words used.
After successful navigation of the ${url} and analysis of the provided screenshots, make changes to the text to ensure it is compelling and relatable to the provided market (${market}).
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
Continue this structure for each screenshot provided.
`;

  const request = {
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: prompt,
      },
      // Including image URLs as separate messages
      ...imageUrls.map((url) => ({
        role: "user",
        content: `Screenshot: ${url}`,
      })),
    ],
    max_tokens: 2000,
  };

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(request),
    });

    const data = await res.json();

    if (data.error) {
      console.error("OpenAI API error:", data.error);
      throw new Error(data.error.message);
    }

    const output = data.choices[0]?.message?.content?.trim();
    return output;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw new Error("Failed to get AI response from OpenAI");
  }
}
