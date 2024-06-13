"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { AIResponse, FormValues } from "@/lib";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { saveImprovementsWithUser } from "@/lib/utils/actions/SaveImprovementsToUser";
import { useToast } from "@/components/ui/use-toast";
import { BiReset } from "react-icons/bi";
import { FormDataDisplay } from "./utils/FormDataDisplay";
import { ImageCarousel } from "./utils/ImageCarousel";
import { AIResponseDisplay } from "./utils/AIResponseDisplay";
import { RequestToAI } from "@/lib/utils/actions/RequestToAI";

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
  const [aiResponse, setAiResponse] = useState<AIResponse[][]>([]);
  const [threadId, setThreadId] = useState<string>("");
  const loading = useRef<boolean>(false);

  const { user } = useKindeBrowserClient();
  const { toast } = useToast();

  // FIXME: Fix when user navigates from the improvement

  useEffect(() => {
    if (cachedAiResponse && cachedAiResponse.length > 0) {
      setAiResponse(cachedAiResponse);
      toast({
        title: "Success",
        description: "Your request has been successfully retrieved",
      });
    } else if (formData && images.length > 0 && aiResponse.length === 0) {
      makeAIRequest(formData, images);
    }
  }, [cachedAiResponse, formData, images, aiResponse.length, toast]);

  const makeAIRequest = async (formData: FormValues, images: string[]) => {
    try {
      if (!formData || images.length === 0) {
        console.log("formData or images are missing");
        return;
      }
      if (loading.current) {
        console.log("Request is already in progress");
        return;
      }
      loading.current = true;

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
        loading.current = false;
        console.log("error occurred: ", response);
        return;
      }

      setAiResponse(response.data.aiResponse as unknown as AIResponse[][]);
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

      loading.current = false;
    } catch (error) {
      console.log("error: ", error);
      loading.current = false;
    }
  };

  useEffect(() => {
    if (threadId && aiResponse.length > 0) {
      saveImprovement(threadId);
    }
  }, [threadId, aiResponse]);

  const saveImprovement = async (threadId: string) => {
    if (!user?.id || aiResponse.length === 0) {
      return;
    }
    try {
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
      } else {
        toast({
          title: "Success",
          description: "Your request has been completed successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the improvement.",
      });
      console.log("Error saving improvement: ", error);
    }
  };

  const removeLocalStorageData = () => {
    localStorage.removeItem("improvementData");
    window.location.reload();
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
            aiResponseContent={aiResponse}
            loading={loading.current}
          />
        </div>
        {formData && <FormDataDisplay formData={formData} />}
      </div>
    </div>
  );
}
