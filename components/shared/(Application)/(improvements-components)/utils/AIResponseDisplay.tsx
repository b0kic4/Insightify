import ReactMarkdown from "react-markdown";
import { FaRobot } from "react-icons/fa";
import SkeletonLoaderAIResponse from "@/components/ui/AIResponseSkeletonLoader";

export const AIResponseDisplay = ({ aiResponseContent, loading }: any) => (
  <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 lg:p-10 max-h-96 lg:max-h-[30rem] overflow-y-auto w-full lg:w-full lg:px-4">
    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 flex items-center gap-2">
      <FaRobot className="text-blue-500" />
      AI Response
    </h3>
    {loading ? (
      <>
        <p className="text-lg lg:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
          AI is looking for improvements, please be patient...
        </p>
        <SkeletonLoaderAIResponse />
      </>
    ) : (
      aiResponseContent.flat().map((content: any, index: any) => (
        <div
          key={index}
          className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 lg:p-6 mb-4 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <ReactMarkdown className="prose dark:prose-invert text-xl lg:text-xl text-gray-800 dark:text-gray-300 leading-relaxed">
            {content?.text?.value ?? ""}
          </ReactMarkdown>
        </div>
      ))
    )}
  </div>
);
