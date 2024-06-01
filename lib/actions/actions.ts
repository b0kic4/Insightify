"use server";

export async function RequestToAI({ url, audience, market }: any) {
  // NOTE: The gpt on the website is just analysing the screenshots provided
  // but not navigating to the website
  // when the screenshots are not provided gpt is successfully navigating
  const prompt = `
Instructions:
1. Go and analyze the website: ${url}
2. Review the provided screenshots in relation to the website sections.
3. Identify design errors, evaluate the text, and suggest improvements to ensure the content resonates with hiring managers in the programming field.

Dissect the website not just mechanically but with an artistic and strategic eye.
Narrow down to the essence that makes the website resonate with the target audience (${audience}).
Identify design errors and evaluate the effectiveness of the words used.
After successful navigation of the ${url} and analyzation of the screenshots provided, make changes to the text to ensure it is compelling and relatable to the provided market (${market}).
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
}
