"use client";
import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

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
}

interface ResponseProps {
  images: string[];
  aiResponse: AIResponse[][];
}

export default function Response({ aiResponse, images }: ResponseProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleNext = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // NOTE: WORK ON ERROR HANDLING

  const currentImage = images[currentImageIndex];
  return (
    <div className="overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="mt-6 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentImageIndex === 0}
            className={`py-2 px-4 rounded-md font-medium ${
              currentImageIndex === 0
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentImageIndex === images.length - 1}
            className={`py-2 px-4 rounded-md font-medium ${
              currentImageIndex === images.length - 1
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
        <div className="flex flex-col items-center gap-6 overflow-hidden">
          {currentImage && (
            <div className="flex-shrink-0 mt-10">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Screenshot {currentImageIndex + 1}
              </h3>
              <Image
                src={currentImage}
                alt={`Screenshot ${currentImageIndex + 1}`}
                className="rounded-lg shadow-lg"
                width={800}
                height={600}
              />
            </div>
          )}
          <div className="flex-grow mt-10 lg:mt-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-h-96 overflow-y-auto w-full">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              AI Response
            </h3>
            {aiResponse[0]?.map((content, index) => (
              <ReactMarkdown
                key={index}
                className="prose dark:prose-dark text-lg text-gray-600 dark:text-gray-400 mt-4"
              >
                {content?.text?.value ?? ""}
              </ReactMarkdown>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
