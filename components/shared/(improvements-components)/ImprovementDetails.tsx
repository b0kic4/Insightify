"use client";
import React, { useEffect, useState, useCallback } from "react";
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
  const [aiResponse, setAiResponse] = useState<AIResponse[][]>(
    cachedAiResponse || [],
  );
  const [threadId, setThreadId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useKindeBrowserClient();
  const { toast } = useToast();

  const saveImprovement = useCallback(
    async (threadId: string) => {
      console.log(
        "proceeding with saving the improvement with threadId: ",
        threadId,
      );
      if (!threadId) {
        return console.log("no threadId");
      }
      if (!user) {
        console.log("user: ", user);
        return console.log("no user");
      }
      if (!user.id) {
        console.log("userid: ", user.id);
        return console.log("no userId");
      }

      try {
        const response = await saveImprovementsWithUser(
          threadId,
          user.id,
          formData,
        );
        console.log("saveImprovement response: ", response);

        if (!response.success) {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
          console.log(response.error);
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
    },
    [formData, toast, user],
  );

  const makeAIRequest = useCallback(
    async (formData: FormValues, images: string[]) => {
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

        console.log("success of the response: ", response.success);
        console.log("response data: ", response.data);

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

        console.log("request completed");

        setLoading(false);
      } catch (error) {
        console.log("error: ", error);
        setLoading(false);
      }
    },
    [saveImprovement],
  );

  useEffect(() => {
    const savedData = localStorage.getItem("improvementData");
    const parsedData = savedData ? JSON.parse(savedData) : null;

    console.log("threadId: ", threadId);
    console.log("parsedData: ", parsedData);

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

    if (formData && images.length > 0 && !parsedData) {
      console.log(
        "Making AI request because cachedAiResponse is empty and no localStorage data found",
      );
      makeAIRequest(formData, images);
    }
  }, [cachedAiResponse, formData, images, makeAIRequest, threadId]);

  useEffect(() => {
    if (user && threadId) {
      console.log("User is available, calling saveImprovement");
      saveImprovement(threadId);
    }
  }, [user, threadId, saveImprovement]);

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
          <AIResponseDisplay aiResponseContent={aiResponse} loading={loading} />
        </div>
        {formData && <FormDataDisplay formData={formData} />}
      </div>
    </div>
  );
}
