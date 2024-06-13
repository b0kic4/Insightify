"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkeletonLoaderAIResponse from "@/components/ui/AIResponseSkeletonLoader";
import { AIResponse, CachedAIResponse, FormValues } from "@/lib";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { saveImprovementsWithUser } from "@/lib/utils/actions/SaveImprovementsToUser";
import { useToast } from "@/components/ui/use-toast";
import { BiReset } from "react-icons/bi";

interface ResponseProps {
  formData: FormValues | null;
  images: string[];
  type?: string | undefined;
  aiResponse: AIResponse[][] | CachedAIResponse;
  threadId: string;
  loading?: boolean | undefined;
}

const FormDataDisplay = ({ formData }: { formData: FormValues }) => (
  <div className="bg-gray-50 dark:bg-gray-800 flex-col max-h-96 overflow-y-scroll max-w-full w-full rounded-lg shadow-lg p-6 border border-gray-300 dark:border-gray-700 mt-4">
    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
      Provided Form Data
    </h2>
    <div className="space-y-2">
      {Object.entries(formData).map(([key, value]) => (
        <div
          key={key}
          className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 shadow-md"
        >
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize">
            {key.replace(/([A-Z])/g, " $1")}:
          </h3>
          <p className="text-gray-600 dark:text-gray-400 break-words text-sm">
            {value}
          </p>
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
    setImageLoading(true);
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="relative flex-shrink-0 w-full lg:w-2/3 xl:w-3/4 mb-8 lg:mb-0 lg:px-4">
      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">
        Screenshot {currentImageIndex + 1}
      </h3>
      <div className="relative w-full h-96 lg:h-[30rem]">
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
  loading?: boolean | undefined;
}) => (
  <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 lg:p-10 max-h-96 lg:max-h-[30rem] overflow-y-auto w-full lg:w-full lg:px-4">
    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
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
      aiResponseContent.flat().map((content, index) => (
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

export default function ImprovementDetails({
  formData,
  threadId,
  aiResponse,
  images,
  loading,
  type,
}: ResponseProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [imageLoading, setImageLoading] = React.useState(true);
  const { user } = useKindeBrowserClient();
  const { toast } = useToast();

  const aiResponseContent = Array.isArray(aiResponse)
    ? aiResponse
    : aiResponse.aiResponse;

  React.useEffect(() => {
    const saveImprovement = async () => {
      if (!loading && user?.id) {
        if (type != "cached") {
          const response = await saveImprovementsWithUser(
            threadId,
            user.id,
            formData,
          );
          if (!response.success) {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          } else if (type == "new") {
            toast({
              title: "Success",
              description: "Your request has been completed successfully",
            });
          }
        } else if (type == "cached") {
          toast({
            title: "Success",
            description: "Your request has been successfully retrieved",
          });
        }
      }
    };
    saveImprovement();
  }, [loading, type, threadId, user, toast, aiResponse, formData, images]);

  const removeLocalStorageData = () => {
    localStorage.removeItem("improvementData");
  };

  return (
    <div className="overflow-auto">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-col gap-8 lg:gap-12 items-center">
          <Button className="relative group" size="icon" variant="ghost">
            <BiReset onClick={removeLocalStorageData} className="h-6 w-6" />
            <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-sm bg-gray-800 text-white rounded-md px-2 py-1">
              Reset
            </span>
          </Button>
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
            aiResponseContent={aiResponseContent}
            loading={loading}
          />
        </div>
        {formData && <FormDataDisplay formData={formData} />}
      </div>
    </div>
  );
}
