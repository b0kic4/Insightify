"use client";
import React, { MutableRefObject } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkeletonLoaderAIResponse from "@/components/ui/AIResponseSkeletonLoader";

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
  loading: MutableRefObject<boolean>;
}

export default function Response({
  aiResponse,
  images,
  loading,
}: ResponseProps) {
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

  const currentImage = images[currentImageIndex];
  return (
    <div className="overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 overflow-hidden">
          {currentImage && (
            <div className="relative flex-shrink-0 mt-10">
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
              <div className="absolute inset-0 flex items-end p-2 justify-between px-4">
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentImageIndex === 0}
                  className={`py-2 px-4 rounded-md font-medium text-2xl ${
                    currentImageIndex === 0
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-700"
                  }`}
                >
                  <ArrowLeft />
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleNext}
                  disabled={currentImageIndex === images.length - 1}
                  className={`py-2 px-4 rounded-md font-medium text-2xl ${
                    currentImageIndex === images.length - 1
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-700"
                  }`}
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          )}
          <div className="flex-grow mt-10 lg:mt-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-h-96 overflow-y-auto w-full">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              AI Response
            </h3>
            {loading.current == true ? (
              <SkeletonLoaderAIResponse />
            ) : (
              aiResponse[0]?.map((content, index) => (
                <ReactMarkdown
                  key={index}
                  className="prose dark:prose-dark text-lg text-gray-600 dark:text-gray-400 mt-4"
                >
                  {content?.text?.value ?? ""}
                </ReactMarkdown>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
