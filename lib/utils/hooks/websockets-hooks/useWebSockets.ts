"use client";
import React from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { saveScreenshotsToRedis } from "@/lib/utils/hooks/(redisHooks)/RedisHooks";
import { FormValues } from "@/lib";

export const useWebSocket = () => {
  const { getToken, user } = useKindeBrowserClient();

  const [messages, setMessages] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [analysisCompleted, setAnalysisCompleted] = React.useState(false);

  const socketRef = React.useRef<WebSocket | null>(null);
  const formDataRef = React.useRef<FormValues | null>(null);
  const images = React.useRef<string[]>([]);

  const token = getToken();

  const env = process.env.NODE_ENV;
  const baseWsUrl =
    env === "development"
      ? "ws://localhost:4000/analysis/ws"
      : "wss://insightify-backend-3caf92991e4a.herokuapp.com/analysis/ws";

  const initializeWebSocket = React.useCallback(() => {
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
        console.log("data: ", data);
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
                    formDataRef.current,
                    data.content,
                  );
                }

                setLoading(false);
                setAnalysisCompleted(true);
              } else {
                console.error("Expected content to be an array:", data.content);
              }
              break;
            case "progress":
              setProgress(Math.trunc(data.content));
              break;
            case "error":
              setError(data.content);
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

  React.useEffect(() => {
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
    images,
    initializeWebSocket,
    sendMessage,
    formDataRef,
    setAnalysisCompleted,
  };
};
