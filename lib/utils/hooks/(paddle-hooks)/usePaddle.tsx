"use client";
import {
  initializePaddle,
  InitializePaddleOptions,
  Paddle,
} from "@paddle/paddle-js";
import React from "react";

export default function usePaddle() {
  const [paddle, setPaddle] = React.useState<Paddle>();
  const env = process.env.PADDLE_ENV === "sandbox" ? "sandbox" : "production";
  const sellerIdEnvString = process.env.PADDLE_SELLER_ID;
  const numberSellerId = Number(sellerIdEnvString);

  React.useEffect(() => {
    initializePaddle({
      environment: env,
      token: process.env.PADDLE_CLIENT_TOKEN!,
      seller: numberSellerId,
    } as unknown as InitializePaddleOptions).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      },
    );
  }, []);

  return paddle;
}
