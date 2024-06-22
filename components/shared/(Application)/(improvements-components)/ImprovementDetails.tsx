"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { AIResponse, FormValues } from "@/lib";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { saveImprovementsWithUser } from "@/lib/utils/actions/db/improvements/SaveImprovementsToUser";
import { useToast } from "@/components/ui/use-toast";
import { BiReset } from "react-icons/bi";
import { FormDataDisplay } from "./utils/FormDataDisplay";
import { ImageCarousel } from "./utils/ImageCarousel";
import { AIResponseDisplay } from "./utils/AIResponseDisplay";
import { RequestToAI } from "@/lib/utils/actions/ai/RequestToAI";

interface ResponseProps {
  formData: FormValues | null;
  images: string[];
  cachedAiResponse?: AIResponse[][] | undefined;
}

export default function ImprovementDetails({
  formData,
  cachedAiResponse,
  images,
}: ResponseProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [aiResponse, setAiResponse] = useState<AIResponse[][]>(
    cachedAiResponse || [],
  );
  const [threadId, setThreadId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [requestCompleted, setRequestCompleted] = useState<boolean>(false);

  const { user } = useKindeBrowserClient();
  const { toast } = useToast();

  const savedData = localStorage.getItem("improvementData");

  const saveImprovement = useCallback(
    async (threadId: string, userId: string) => {
      if (!threadId) {
        return console.log("no threadId");
      }

      try {
        const response = await saveImprovementsWithUser(
          threadId,
          userId,
          formData,
        );

        if (!response.success) {
          toast({
            title: "Uh oh! Something went wrong.",
            description: response.error,
          });
          console.log(response.error);
        } else {
          toast({
            title: "Success",
            description: response.message,
          });

          if (aiResponse.length <= 0) {
            window.location.reload();
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while saving the improvement.",
        });
        console.log("Error saving improvement: ", error);
      }
    },
    [formData, toast, user],
  );

  const makeAIRequest = useCallback(
    async (formData: FormValues, images: string[], userId: string) => {
      console.log("Make AI Request is called");
      try {
        if (!formData || images.length === 0) {
          console.log("formData or images are missing");
          return;
        }

        localStorage.setItem(
          "improvementData",
          JSON.stringify({
            formData,
            images,
          }),
        );

        const response = await RequestToAI({
          url: formData.websiteUrl,
          audience: formData.targetedAudience,
          market: formData.targetedMarket,
          insights: formData.websiteInsights,
          imageUrls: images,
        });

        if (!response.success) {
          setLoading(false);
          console.log("error occurred: ", response);
          return;
        }

        setAiResponse(response.data.aiResponse as AIResponse[][]);
        setThreadId(response.data.threadId);

        localStorage.setItem(
          "improvementData",
          JSON.stringify({
            formData,
            images,
            type: response.data.type,
            aiResponse: response.data.aiResponse,
            threadId: response.data.threadId,
            aiResLoading: false,
          }),
        );

        saveImprovement(response.data.threadId, userId);

        console.log("request completed");
        setRequestCompleted(true);
        setLoading(false);
      } catch (error) {
        console.log("error: ", error);
        setLoading(false);
        setRequestCompleted(true);
      }
    },
    [saveImprovement],
  );

  useEffect(() => {
    const parsedData = savedData ? JSON.parse(savedData) : null;

    if (parsedData && parsedData.threadId) {
      setThreadId(parsedData.threadId);
    }

    if (cachedAiResponse && cachedAiResponse.length > 0) {
      setAiResponse(cachedAiResponse);
      setLoading(false);
    } else if (parsedData) {
      if (parsedData.threadId) {
        setAiResponse(parsedData.aiResponse || []);
        setThreadId(parsedData.threadId);
        setLoading(parsedData.aiResLoading);
      }
    }

    if (
      user &&
      formData &&
      images.length > 0 &&
      !parsedData &&
      (cachedAiResponse?.length == 0 || !cachedAiResponse)
    ) {
      makeAIRequest(formData, images, user.id);
    }
  }, [cachedAiResponse, formData, images, makeAIRequest, threadId, user]);

  const removeLocalStorageData = () => {
    localStorage.removeItem("improvementData");
    window.location.reload();
  };

  return (
    <div className="overflow-auto">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-col gap-8 lg:gap-12 items-center">
          <Button className="relative group" size="icon" variant="ghost">
            <BiReset
              onClick={removeLocalStorageData}
              className="h-8 w-8 text-red-500"
            />
            <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-sm bg-gray-800 text-white rounded-md px-2 py-1 shadow-lg">
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
          <AIResponseDisplay aiResponseContent={aiResponse} loading={loading} />
        </div>
        {formData && <FormDataDisplay formData={formData} />}
      </div>
    </div>
  );
}
