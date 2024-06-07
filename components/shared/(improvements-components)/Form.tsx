"use client";
import React from "react";
import { RequestToAI } from "@/lib/utils/actions/RequestToAI";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Response from "@/components/shared/(improvements-components)/Response";
import { AIResponse } from "@/lib";
import AnalysisModal from "@/components/ui/AnalysisModal";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface FormValues {
  websiteUrl: string;
  targetedAudience: string;
  targetedMarket: string;
  websiteInsights: string;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { getToken } = useKindeBrowserClient();

  const [socket, setSocket] = React.useState<WebSocket | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState<string[]>([]);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [analysisCompleted, setAnalysisCompleted] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [aiResponse, setAiResponse] = React.useState<AIResponse[][]>([]);

  const socketRef = React.useRef<WebSocket | null>(null);
  const formDataRef = React.useRef<FormValues | null>(null);
  const aiResponseLoading = React.useRef<boolean>(false);

  const env = process.env.NODE_ENV;
  const baseWsUrl =
    env === "development"
      ? "ws://localhost:4000/analysis/ws"
      : "wss://insightify-backend-3caf92991e4a.herokuapp.com/analysis/ws";

  const initializeWebSocket = async () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      return;
    }

    const token = getToken();

    if (!token) {
      console.error("Token is null or undefined");
      return;
    }

    const wsUrl = `${baseWsUrl}?token=${token}`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setLoading(false);
      setError(null);
    };

    ws.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        if (typeof data === "object" && data !== null && "type" in data) {
          switch (data.type) {
            case "status":
              setLoading(true);
              setMessages((prevMessages: any) => [...prevMessages, data]);
              break;
            case "images":
              if (Array.isArray(data.content)) {
                setImages(data.content);
                setLoading(false);
                setAnalysisCompleted(true); // Analysis completed, switch to Response component

                // Send the request to the GPT-4 endpoint
                if (formDataRef.current) {
                  aiResponseLoading.current = true;
                  const response = await RequestToAI({
                    url: formDataRef.current.websiteUrl,
                    audience: formDataRef.current.targetedAudience,
                    market: formDataRef.current.targetedMarket,
                    insights: formDataRef.current.websiteInsights,
                    imageUrls: data.content,
                  });

                  aiResponseLoading.current = false;
                  setAiResponse(response as unknown as AIResponse[][]);
                } else {
                  console.error("Form data is null");
                }
              } else {
                console.error("Expected content to be an array:", data.content);
              }
              break;
            case "progress":
              setProgress(Math.trunc(data.content));
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
        setError("Error processing message");
        setLoading(false);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setError("WebSocket error");
      setLoading(false);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setError("WebSocket connection closed");
    };

    socketRef.current = ws;
    setSocket(ws);
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);

    // Initialize WebSocket connection
    await initializeWebSocket();

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected, attempting to reconnect...");
      setError("WebSocket is not connected");
      setLoading(false);
      return;
    }

    formDataRef.current = data;

    socket.send(
      JSON.stringify({
        url: data.websiteUrl,
      }),
    );

    reset();
  };

  if (analysisCompleted) {
    return (
      <Response
        images={images}
        aiResponse={aiResponse}
        loading={aiResponseLoading}
      />
    );
  }

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
            >
              Analyze
            </Button>
          ) : (
            <AnalysisModal messages={messages} progress={progress} />
          )}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </section>
  );
}
