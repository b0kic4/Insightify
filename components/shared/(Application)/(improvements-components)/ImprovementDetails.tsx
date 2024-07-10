"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FormValues } from "@/lib";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { saveImprovementsWithUser } from "@/lib/utils/actions/db/improvements/SaveImprovementsToUser";
import { useToast } from "@/components/ui/use-toast";
import { BiReset } from "react-icons/bi";
import { FormDataDisplay } from "./utils/FormDataDisplay";
import { ImageCarousel } from "./utils/ImageCarousel";
import { AIResponseDisplay } from "./utils/AIResponseDisplay";
import { useIncreaseUsageRefetchPlan } from "@/lib/utils/hooks/(react-query)/increaseUsageRefetchPlan";
import { structureRequest } from "@/lib/utils/actions/ai/RequestToAI";

interface ResponseProps {
  isFreePlanInUse?: boolean | null;
  formData: FormValues | null;
  images: string[];
  cachedAiResponse?: string[];
}

export default function ImprovementDetails({
  isFreePlanInUse,
  formData,
  cachedAiResponse,
  images,
}: ResponseProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [aiResponse, setAiResponse] = useState<string[]>(
    cachedAiResponse || [],
  );
  const [threadId, setThreadId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [requestCompleted, setRequestCompleted] = useState<boolean>(false);

  const { user } = useKindeBrowserClient();
  const { handleIncreaseUsage } = useIncreaseUsageRefetchPlan();
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

          if (isFreePlanInUse) {
            handleIncreaseUsage();
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
    [formData, toast, isFreePlanInUse],
  );

  const makeAIRequest = useCallback(
    async (formData: FormValues, images: string[], userId: string) => {
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

        const promptData = await structureRequest({
          url: formData.websiteUrl,
          audience: formData.targetedAudience,
          market: formData.targetedMarket,
          insights: formData.websiteInsights,
          imageUrls: images,
        });

        if (!promptData.success) {
          console.log("Prompt structuring failed");
          return;
        }

        const response = await fetch("/api/stream-openai-response", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: promptData.data.messages,
            formData: formData,
            images: images,
          }),
        });

        if (!response.body) {
          console.error("ReadableStream not supported");
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        const processStream = async () => {
          let aiResponseData = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            aiResponseData += decoder.decode(value, { stream: true });
          }

          // Here we parse the accumulated data
          const cleanedResponse = aiResponseData
            .split("\n\n")
            .filter(Boolean)
            .map((line) => line.replace(/^data: /, ""))
            .join("");

          setAiResponse([cleanedResponse]);
          setRequestCompleted(true);
          setLoading(false);
        };

        processStream();
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
          {savedData && (
            <Button
              onClick={removeLocalStorageData}
              className="relative group"
              size="icon"
              variant="ghost"
            >
              <BiReset className="h-8 w-8 text-red-500" />
              <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-sm bg-gray-800 text-white rounded-md px-2 py-1 shadow-lg">
                Reset
              </span>
            </Button>
          )}
          <Button
            onClick={() =>
              makeAIRequest(formData as FormValues, images, user?.id as string)
            }
          >
            Call
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
