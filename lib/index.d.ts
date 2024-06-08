export interface FormValues {
  websiteUrl: string;
  targetedAudience: string;
  targetedMarket: string;
  websiteInsights: string;
}

export interface AIResponse {
  type: "text" | "image_url";
  text?: {
    value: string;
    annotations: Array<unknown>;
  };
  image_url?: {
    url: string;
    detail: string;
  };
  threadId: string;
}

export interface CachedAIResponse {
  aiResponse: AIResponse[][];
  threadId: string;
  market: string;
  audience: string;
  insights: string;
  url: string;
}

export interface ImageURL {
  url: string;
}

export interface TextContent {
  type: "text";
  text: string;
}

export interface ImageContent {
  type: "image_url";
  image_url: ImageURL;
}

export type Content = TextContent | ImageContent;

export interface Message {
  role: "user" | "assistant";
  content: Content[];
}
