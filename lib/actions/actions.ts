"use server";
import { FormValues } from "@/components/shared/(improvements-components)/Form";

export async function SendRequestToGpt() {
  // FIXME: Fix this prompt
  const prompt = `
You are a tool designed to dissect the website not just mechanically but with an artistic and strategic eye,
narrowing on the essence that makes a website resonate with its target audience.
Look for design errors, and analyze the effectiveness of the words used.
Provide changes to the text to make it compelling and relatable to the audience.
Review the site's layout and images used, analyze, and give the full report.

Review the sites layout and images used, analyse and give the full report. 
Website URL: [url]

Targeted Audience: [audience]
Targeted Market: [market]
Insights of the Website: [insights]

Your analysis should cover the following aspects:

1. Visual Appeal and Design:
Overall aesthetics: Is the design modern, clean, and professional, and what can be improved in that aspect?
Color scheme: Are the colors harmonious and do they align with the brand’s identity and what can be potential improvements?
Images and media: Are high-quality images and media used effectively?
Provide improvements and mockups

2. Layout and Navigation:
Structure: Is the website layout logical and easy to follow, and how can the layout be improved?
Navigation: Are menus and links intuitive and user-friendly, and how can it be improved?
Mobile responsiveness: How does the website perform on different screen sizes?
Provide improvements and mockups

3. Content Quality:
Text: Is the content clear, concise, and engaging? Is it free of grammatical errors?
Headlines: Are headlines compelling and do they capture attention?
Calls to Action (CTAs): Are CTAs well-placed and do they encourage user interaction?
Provide improvements and mockups

4. SEO and Performance:
Meta tags: Are title tags, meta descriptions, and keywords optimized?
Loading speed: How fast does the website load? Are there any elements slowing it down?
Accessibility: Is the website accessible to users with disabilities?
Provide improvements and mockups of what can be utilized for improvement of the website


5. User Experience (UX):
User journey: Is the user journey smooth from landing on the page to completing a desired action?
Forms and interactions: Are forms easy to fill out and are interactions seamless?
Trust signals: Are there elements like testimonials, reviews, and certifications to build trust?
Provide improvements and mockups of what can be utilized for improvement of the website


6. Overall Impression and Recommendations:
Strengths: What are the strong points of the website?
Weaknesses: What areas need improvement?
Specific suggestions: Provide actionable recommendations to enhance the website’s effectiveness.

Provide improvements and mockups of what can be utilized for improvement of the website


Please present your findings in a structured format, highlighting key points and providing detailed explanations for each aspect analyzed.
`;
}
