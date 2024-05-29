"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export interface FormValues {
  websiteUrl: string;
  targetedAudience: string;
  targetedMarket: string;
  websiteInsights: string;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [socket, setSocket] = React.useState<WebSocket | null>(null);
  const [loading, setLoading] = React.useState(false);

  const env = process.env.NODE_ENV;
  const wsUrl =
    env === "development"
      ? "ws://localhost:4000/analysis/ws"
      : "ws://your-heroku-app.herokuapp.com/analysis/ws";

  console.log("ws url: ", wsUrl);

  React.useEffect(() => {
    const ws = new WebSocket(wsUrl);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (typeof data === "object" && data !== null && "type" in data) {
          console.log("Data received:", data);

          switch (data.type) {
            case "status":
              setLoading(true);
              // setMessages((prev) => [...prev, data.content] as any);
              break;
            case "images":
              if (Array.isArray(data.content)) {
                // setImages(data.content);
                setLoading(false);
              } else {
                console.error(
                  "Expected  content to be an array:",
                  data.content,
                );
              }
              break;
            case "ai_response":
              // setAiResponse(data.content);
              console.log(data.content);
              break;
            default:
              console.error("Received unknown message type:", data.type);
              setLoading(false);
          }
        } else {
          throw new Error("Invalid message format");
        }
      } catch (error) {
        console.error("Error processing message:", error);
        setLoading(false);
      }
    };

    setSocket(ws);
    return () => ws.close();
  }, []);

  const onSubmit = (data: any) => {
    setLoading(true);
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected, attempting to reconnect...");
      const newSocket = new WebSocket("ws://localhost:4000/analysis/ws");
      setSocket(newSocket);
      setLoading(false);
      return; // Optionally delay the submission until the socket is ready
    }

    socket.send(
      JSON.stringify({
        url: data.website,
        market: data.market,
        audience: data.audience,
        insights: data.insights,
        bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME,
      }),
    );
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32">
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
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
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
            />
            {errors.websiteInsights && (
              <span className="text-red-500">
                Insights about the Website is required
              </span>
            )}
          </div>
          <Button
            className="transition-all duration-300 ease-in-out bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900"
            type="submit"
          >
            {loading ? "Loading..." : "Analyze"}
          </Button>
        </form>
      </div>
    </section>
  );
}
