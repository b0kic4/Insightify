"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getSingleWebsiteFromUserCache } from "@/lib/utils/hooks/(redisHooks)/RedisHooks";
import { FormValues, AIResponse } from "@/lib";
import ImprovementDetails from "@/components/shared/(Application)/(improvements-components)/ImprovementDetails";
import AnalysisModal from "@/components/ui/AnalysisModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWebSocket } from "@/lib/utils/hooks/websockets-hooks/useWebSockets";
import isUsersPlanActive, {
  ResponseSuccess,
  ResponseFailed,
  ResponseFreePlanSucceed,
  ResponseFreePlanFailed,
} from "@/lib/utils/hooks/db/IsActivePlanHook";
import { useToast } from "@/components/ui/use-toast";

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { user } = useKindeBrowserClient();
  const [aiResponse, setAiResponse] = React.useState<
    AIResponse[][] | undefined
  >([]);

  const [isFreePlanAvailable, setIsFreePlanAvailable] = React.useState(false);

  const {
    messages,
    loading,
    error,
    progress,
    analysisCompleted,
    images,
    initializeWebSocket,
    sendMessage,
    formDataRef,
    setAnalysisCompleted,
  } = useWebSocket();

  const { toast } = useToast();

  React.useEffect(() => {
    const savedData = localStorage.getItem("improvementData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      console.log("parsedData: ", parsedData);
      setAnalysisCompleted(true);
      formDataRef.current = parsedData.formData;
      images.current = parsedData.images;
      setAiResponse(parsedData.aiResponse);
    }
  }, [setAnalysisCompleted, formDataRef, images]);

  const onSubmit = async (data: FormValues) => {
    setAnalysisCompleted(false);
    formDataRef.current = data;

    if (user?.id && formDataRef.current?.websiteUrl) {
      const response = await isUsersPlanActive();

      if (response.success) {
        if (
          (response as ResponseSuccess).isActive ||
          (response as ResponseFreePlanSucceed).isFreePlanAvailable
        ) {
          // Active plan or free trial found
          toast({
            title: "Preparing your data",
            description: "Sending the request...",
          });
          const cachedData = await getSingleWebsiteFromUserCache(
            user.id,
            formDataRef.current.websiteUrl,
          );

          if (cachedData !== null) {
            if (
              cachedData.screenshots &&
              cachedData.market &&
              cachedData.audience &&
              cachedData.insights
            ) {
              images.current = cachedData.screenshots;
              formDataRef.current = {
                ...formDataRef.current,
                websiteInsights: cachedData.insights,
                targetedAudience: cachedData.audience,
                targetedMarket: cachedData.market,
              };
              if (
                cachedData.aiResponse &&
                cachedData.aiResponse.length > 0 &&
                cachedData.type
              ) {
                setAiResponse(cachedData.aiResponse);
                setAnalysisCompleted(true);
                return;
              }
              setAnalysisCompleted(true);
              return;
            }
          }

          if (cachedData === null) {
            if (response as ResponseFreePlanSucceed) {
              setIsFreePlanAvailable(
                (response as ResponseFreePlanSucceed).isFreePlanAvailable,
              );
            }

            initializeWebSocket();
            sendMessage({
              url: data.websiteUrl,
            });
          }
        }
      } else {
        const failedResponse = response as
          | ResponseFailed
          | ResponseFreePlanFailed;
        toast({
          title: "Error",
          description: failedResponse.error,
        });
        console.error(
          "User does not have an active plan:",
          failedResponse.error,
        );
        return;
      }
    }

    reset();
  };

  if (analysisCompleted) {
    return (
      <ImprovementDetails
        isFreePlanInUse={isFreePlanAvailable}
        formData={formDataRef.current}
        images={images.current as string[]}
        cachedAiResponse={aiResponse}
      />
    );
  }

  return (
    <section className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            Provide the Targeted Market, Audience, and Insights
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Help us understand your website&apos;s needs so we can provide a
            comprehensive analysis and potential design improvements.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div className="grid gap-4">
            <Label
              className="text-lg text-gray-700 dark:text-gray-300"
              htmlFor="website-url"
            >
              Website URL
            </Label>
            <Input
              className="transition-all duration-300 ease-in-out transform bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:scale-105"
              id="website-url"
              placeholder="https://example.com"
              {...register("websiteUrl", { required: true })}
              type="url"
              onFocus={initializeWebSocket}
            />
            {errors.websiteUrl && (
              <span className="text-red-500">Website URL is required</span>
            )}
          </div>
          <div className="grid gap-4">
            <Label
              className="text-lg text-gray-700 dark:text-gray-300"
              htmlFor="targeted-audience"
            >
              Targeted Audience
            </Label>
            <Textarea
              className="transition-all duration-300 ease-in-out transform bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:scale-105"
              id="targeted-audience"
              placeholder="Describe your target audience"
              {...register("targetedAudience", { required: true })}
              onFocus={initializeWebSocket}
            />
            {errors.targetedAudience && (
              <span className="text-red-500">
                Targeted Audience is required
              </span>
            )}
          </div>
          <div className="grid gap-4">
            <Label
              className="text-lg text-gray-700 dark:text-gray-300"
              htmlFor="targeted-market"
            >
              Targeted Market
            </Label>
            <Textarea
              className="transition-all duration-300 ease-in-out transform bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:scale-105"
              id="targeted-market"
              placeholder="Describe your target market"
              {...register("targetedMarket", { required: true })}
              onFocus={initializeWebSocket}
            />
            {errors.targetedMarket && (
              <span className="text-red-500">Targeted Market is required</span>
            )}
          </div>
          <div className="grid gap-4">
            <Label
              className="text-lg text-gray-700 dark:text-gray-300"
              htmlFor="website-insights"
            >
              Insights about the Website
            </Label>
            <Textarea
              className="transition-all duration-300 ease-in-out transform bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:scale-105"
              id="website-insights"
              placeholder="Provide any insights about your website"
              {...register("websiteInsights", { required: true })}
              onFocus={initializeWebSocket}
            />
            {errors.websiteInsights && (
              <span className="text-red-500">
                Insights about the Website is required
              </span>
            )}
          </div>
          {!loading ? (
            <Button
              className="transition-all duration-300 ease-in-out bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900"
              type="submit"
              disabled={loading}
              onFocus={initializeWebSocket}
            >
              Analyze
            </Button>
          ) : (
            <AnalysisModal messages={messages} progress={progress} />
          )}
        </form>
      </div>
    </section>
  );
}
