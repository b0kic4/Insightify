import React from "react";
import ReactMarkdown from "react-markdown";
import { FaRobot } from "react-icons/fa";
import SkeletonLoaderAIResponse from "@/components/ui/AIResponseSkeletonLoader";

export const AIResponseDisplay = ({
  aiResponseContent,
  loading,
}: {
  aiResponseContent: string[];
  loading: boolean;
}) => (
  <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 lg:p-10 max-h-96 lg:max-h-[30rem] overflow-y-auto w-full lg:w-full lg:px-4">
    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 flex items-center gap-2">
      <FaRobot className="text-blue-500" />
      AI Response
    </h3>
    {loading && aiResponseContent.length === 0 ? (
      <>
        <p className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-6">
          AI is looking for improvements, please be patient...
        </p>
        <SkeletonLoaderAIResponse />
      </>
    ) : (
      aiResponseContent.map((content, index) => (
        <div
          key={index}
          className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4 shadow-md"
        >
          <ReactMarkdown className="prose dark:prose-invert text-lg text-gray-600 dark:text-gray-400">
            {content}
          </ReactMarkdown>
        </div>
      ))
    )}
  </div>
);
