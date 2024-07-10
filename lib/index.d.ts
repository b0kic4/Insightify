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
  threadId?: string | undefined;
  type?: string | undefined;
}

export interface ResponseData {
  aiResponse: string[];
  threadId: string;
  type: string;
  market: string;
  audience: string;
  insights: string;
}

export interface CachedAIResponse {
  aiResponse: string[];
  screenshots: string[];
  threadId: string;
  type: string;
  market: string;
  audience: string;
  insights: string;
  url: string;
  expiration?: number | undefined;
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

export interface PlanData {
  sellerId: string;
  productId: string;
  productName: string;
  permalink: string;
  productPermalink: string;
  shortProductId: string;
  email: string;
  price: number;
  gumroadFee: number;
  currency: string;
  quantity: number;
  discoverFeeCharged: boolean;
  canContact: boolean;
  referrer: string;
  renewsAt: Date | null;
  orderNumber: number;
  saleId: string;
  saleTimestamp: Date;
  purchaserId: string;
  subscriptionId: string;
  variant: string;
  test: boolean;
  ipCountry: string;
  recurrence: string;
  isGiftReceiverPurchase: boolean;
  isActive: boolean;
  refunded: boolean;
  disputed: boolean;
  disputeWon: boolean;
  userId: string;
  cardId?: number;
}
