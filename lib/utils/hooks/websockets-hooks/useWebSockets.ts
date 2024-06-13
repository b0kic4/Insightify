"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { saveScreenshotsToRedis } from "@/lib/utils/hooks/(redisHooks)/RedisHooks";
import { RequestToAI } from "@/lib/utils/actions/RequestToAI";
import { FormValues, AIResponse } from "@/lib";

export const useWebSocket = () => {
  const queryClient = useQueryClient();
  const { getToken, user } = useKindeBrowserClient();

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [dataType, setDataType] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<AIResponse[][]>([]);

  const socketRef = useRef<WebSocket | null>(null);
  const threadId = useRef<string>("");
  const formDataRef = useRef<FormValues | null>(null);
  const aiResponseLoading = useRef<boolean>(false);
  const images = useRef<string[]>([]);

  const token = getToken();

  const env = process.env.NODE_ENV;
  const baseWsUrl =
    env === "development"
      ? "ws://localhost:4000/analysis/ws"
      : "wss://insightify-backend-3caf92991e4a.herokuapp.com/analysis/ws";

  const initializeWebSocket = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      return;
    }

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
              setMessages((prevMessages) => [...prevMessages, data]);
              break;
            case "images":
              if (Array.isArray(data.content)) {
                images.current = data.content;
                if (user?.id && formDataRef.current?.websiteUrl) {
                  await saveScreenshotsToRedis(
                    user.id,
                    formDataRef.current.websiteUrl,
                    data.content,
                  );
                }
                setLoading(false);
                setAnalysisCompleted(true);

                const formData = formDataRef.current;

                localStorage.setItem(
                  "improvementData",
                  JSON.stringify({
                    formData,
                    images,
                    type: "new",
                    aiResponse: "",
                    aiResLoading: true,
                  }),
                );

                if (formData) {
                  aiResponseLoading.current = true;
                  const response = await RequestToAI({
                    url: formData.websiteUrl,
                    audience: formData.targetedAudience,
                    market: formData.targetedMarket,
                    insights: formData.websiteInsights,
                    imageUrls: data.content,
                  });

                  threadId.current = response.threadId;

                  aiResponseLoading.current = false;

                  setAiResponse(
                    response.aiResponse as unknown as AIResponse[][],
                  );

                  const { market, insights, audience, type, aiResponse } =
                    response;
                  const images = data.content;

                  localStorage.setItem(
                    "improvementData",
                    JSON.stringify({
                      formData,
                      images,
                      type: type,
                      threadId: threadId.current,
                      aiResponse: aiResponse,
                      aiResLoading: aiResponseLoading.current,
                    }),
                  );

                  setDataType(response.type);
                  if (market && insights && audience) {
                    Object.assign(formData, {
                      websiteInsights: insights,
                      targetedAudience: audience,
                      targetedMarket: market,
                    });
                  }
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
  }, [token, baseWsUrl, user?.id]);

  useEffect(() => {
    initializeWebSocket();

    return () => {
      socketRef.current?.close();
    };
  }, [initializeWebSocket]);

  const sendMessage = (message: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return {
    messages,
    loading,
    error,
    progress,
    analysisCompleted,
    dataType,
    aiResponse,
    images,
    initializeWebSocket,
    sendMessage,
    formDataRef,
    threadId,
    aiResponseLoading,
    setAnalysisCompleted,
    setAiResponse,
    setDataType,
  };
};
