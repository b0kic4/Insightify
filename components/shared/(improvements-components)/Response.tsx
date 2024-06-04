"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface AIResponse {
  id: string;
  object: string;
  created_at: number;
  assistant_id: string | null;
  thread_id: string;
  run_id: string | null;
  role: "user" | "assistant";
  content: Array<{
    type: "text" | "image_url";
    text?: {
      value: string;
      annotations: Array<unknown>;
    };
    image_url?: {
      url: string;
      detail: string;
    };
  }>;
  attachments: Array<unknown>;
  metadata: Record<string, unknown>;
}

interface ResponseProps {
  aiResponse: AIResponse[];
}

export default function Response({ aiResponse }: ResponseProps) {
  const [parsedResponse, setParsedResponse] = useState<{
    text: string[];
    images: string[];
  }>({ text: [], images: [] });

  useEffect(() => {
    const textParts: string[] = [];
    const imageUrls: string[] = [];

    aiResponse.forEach((message) => {
      message.content.forEach((content) => {
        if (content.type === "text" && content.text) {
          textParts.push(content.text.value);
        } else if (content.type === "image_url" && content.image_url) {
          imageUrls.push(content.image_url.url);
        }
      });
    });

    setParsedResponse({ text: textParts, images: imageUrls });
  }, [aiResponse]);

  return (
    <div className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-3xl mx-auto space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            Analysis Results
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Analysis result:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {parsedResponse.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Screenshot ${index + 1}`}
              className="rounded-lg shadow-lg"
              width={500}
              height={500}
            />
          ))}
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            AI Response
          </h3>
          {parsedResponse.text.map((text, index) => (
            <ReactMarkdown
              key={index}
              className="text-lg text-gray-600 dark:text-gray-400 mt-4"
            >
              {text}
            </ReactMarkdown>
          ))}
        </div>
      </div>
    </div>
  );
}
