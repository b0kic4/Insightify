"use client";
import React, { MutableRefObject } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkeletonLoaderAIResponse from "@/components/ui/AIResponseSkeletonLoader";
import { AIResponse } from "@/lib";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { saveImprovementsWithUser } from "@/lib/utils/actions/SaveImprovementsToUser";
import { useToast } from "@/components/ui/use-toast";

interface ResponseProps {
  threadId: string;
  images: string[];
  aiResponse: AIResponse[][];
  loading: MutableRefObject<boolean>;
}

export default function Response({
  threadId,
  aiResponse,
  images,
  loading,
}: ResponseProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [imageLoading, setImageLoading] = React.useState(true);
  const { user } = useKindeBrowserClient();
  const { toast } = useToast();

  console.log("thread id: ", threadId);

  const handleNext = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setImageLoading(true);
    }
  };

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setImageLoading(true);
    }
  };

  React.useEffect(() => {
    const saveImprovement = async () => {
      if (!loading.current && threadId !== "cached" && user?.id) {
        const response = await saveImprovementsWithUser(threadId, user.id);
        if (!response.success) {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }
        toast({
          title: "Success",
          description: "Your request has been completed successfully",
        });
      }
    };
    saveImprovement();
  }, [loading.current, threadId, user]);

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
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                  <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white/50 mx-auto my-2"></div>
                </div>
              )}
              <Image
                src={currentImage}
                alt={`Screenshot ${currentImageIndex + 1}`}
                className="rounded-lg shadow-lg"
                width={800}
                height={600}
                onLoadingComplete={() => setImageLoading(false)}
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
            {loading.current ? (
              <>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-6">
                  AI is looking for improvements, please be patient...
                </p>
                <SkeletonLoaderAIResponse />
              </>
            ) : (
              aiResponse[0]?.map((content, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4 shadow-md"
                >
                  <ReactMarkdown className="prose dark:prose-invert text-lg text-gray-600 dark:text-gray-400">
                    {content?.text?.value ?? ""}
                  </ReactMarkdown>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
