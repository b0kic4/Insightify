"use client";
import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkeletonLoaderAIResponse from "@/components/ui/AIResponseSkeletonLoader";
import { AIResponse, CachedAIResponse, FormValues } from "@/lib";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { saveImprovementsWithUser } from "@/lib/utils/actions/SaveImprovementsToUser";
import { useToast } from "@/components/ui/use-toast";

interface ResponseProps {
  formData: FormValues | null;
  images: string[];
  aiResponse: AIResponse[][] | CachedAIResponse;
  loading: boolean;
}

const FormDataDisplay = ({ formData }: { formData: FormValues }) => (
  <div className="bg-gray-100 dark:bg-gray-900 flex-col max-h-96 overflow-y-scroll max-w-full w-full rounded-lg shadow-lg p-6 border border-gray-600">
    <h2 className="text-2xl font-bold text-white mb-4">Provided Form Data</h2>
    <div className="space-y-4">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="p-4 rounded-lg shadow-lg shadow-red-900">
          <h3 className="text-lg font-semibold text-gray-300 capitalize">
            {key.replace(/([A-Z])/g, " $1")}:
          </h3>
          <p className="text-gray-400 break-words">{value}</p>
        </div>
      ))}
    </div>
  </div>
);

const ImageCarousel = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
  setImageLoading,
  imageLoading,
}: {
  images: string[];
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  setImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  imageLoading: boolean;
}) => {
  const handleImageChange = (newIndex: number) => {
    setImageLoading(true); // Set loading state to true when changing the image
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="relative mt-10 flex-shrink-0">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">
        Screenshot {currentImageIndex + 1}
      </h3>
      <div className="relative w-[800px] h-[600px]">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white/50"></div>
          </div>
        )}
        <Image
          src={images[currentImageIndex]}
          alt={`Screenshot ${currentImageIndex + 1}`}
          className="rounded-lg shadow-lg"
          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => setImageLoading(false)}
        />
      </div>
      <div className="absolute inset-0 flex items-end justify-between p-4">
        <Button
          variant="ghost"
          onClick={() => handleImageChange(Math.max(currentImageIndex - 1, 0))}
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
          onClick={() =>
            handleImageChange(
              Math.min(currentImageIndex + 1, images.length - 1),
            )
          }
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
  );
};

const AIResponseDisplay = ({
  aiResponseContent,
  loading,
}: {
  aiResponseContent: AIResponse[][];
  loading: boolean;
}) => (
  <div className="flex-grow mt-10 lg:mt-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-h-96 overflow-y-auto w-full">
    <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">
      AI Response
    </h3>
    {loading ? (
      <>
        <p className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-6">
          AI is looking for improvements, please be patient...
        </p>
        <SkeletonLoaderAIResponse />
      </>
    ) : (
      aiResponseContent[0]?.map((content, index) => (
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
);

export default function Response({
  formData,
  aiResponse,
  images,
  loading,
}: ResponseProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [imageLoading, setImageLoading] = React.useState(true);
  const { user } = useKindeBrowserClient();
  const { toast } = useToast();

  console.log("aiResponse: ", aiResponse);

  const aiResponseText = Array.isArray(aiResponse)
    ? aiResponse
    : aiResponse.aiResponse;

  const threadId = Array.isArray(aiResponse) ? "" : aiResponse.threadId;
  const type = Array.isArray(aiResponse) ? "" : aiResponse.type;

  React.useEffect(() => {
    const saveImprovement = async () => {
      if (!loading && type !== "cached" && user?.id) {
        const response = await saveImprovementsWithUser(threadId, user.id);
        if (!response.success) {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
          console.log("response: ", response);
          console.log("response error: ", response.error);
        } else if (!loading && type === "cached" && user?.id) {
          toast({
            title: "Success",
            description: "Your request has been successfully retrieved",
          });
        }
      } else {
        // NOTE: TYPE IS EMPTY
        console.log("type: ", type);
        toast({
          title: "Success",
          description: "Your request has been completed successfully",
        });
      }
    };
    saveImprovement();
  }, [loading, type, threadId, user, toast]);

  return (
    <div className="overflow-hidden">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-center">
          {formData && <FormDataDisplay formData={formData} />}
          <div className="flex flex-col items-center gap-6 overflow-hidden">
            {images.length > 0 && (
              <ImageCarousel
                images={images}
                currentImageIndex={currentImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
                setImageLoading={setImageLoading}
                imageLoading={imageLoading}
              />
            )}
            <AIResponseDisplay
              aiResponseContent={aiResponseText}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
