"use client";
import React  from "react";
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
import increaseUsageOfFreePlan from "@/lib/utils/hooks/db/freePlanUsageCalc";

interface ResponseProps {
  isFreePlanInUse?: boolean | null;
  formData: FormValues | null;
  images: string[];
  cachedAiResponse?: AIResponse[][] | undefined;
}

export default function ImprovementDetails({
  isFreePlanInUse,
  formData,
  cachedAiResponse,
  images,
}: ResponseProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [imageLoading, setImageLoading] = React.useState(true);
  const [aiResponse, setAiResponse] = React.useState<AIResponse[][]>(
    cachedAiResponse || [],
  );
  const [threadId, setThreadId] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [requestCompleted, setRequestCompleted] = React.useState<boolean>(false);

  const { user } = useKindeBrowserClient();
  const { toast } = useToast();

  const savedData = localStorage.getItem("improvementData");

  const saveImprovement = React.useCallback(
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
            const response = await increaseUsageOfFreePlan();
            if (response.success) {
              toast({
                title: "Free Plan",
                description: `You have ${response.data} free improvements left.`,
              });
            } else {
              toast({
                title: "Error",
                description: response.error,
              });
            }
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

  const makeAIRequest = React.useCallback(
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

  React.useEffect(() => {
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
              // disabled={loading}
              onClick={removeLocalStorageData}
              className="relative group"
              size="icon"
              variant="ghost"
            >
              <BiReset
                className="h-8 w-8 text-red-500"
              />
              <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-sm bg-gray-800 text-white rounded-md px-2 py-1 shadow-lg">
                Reset
              </span>
            </Button>
          )}
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
