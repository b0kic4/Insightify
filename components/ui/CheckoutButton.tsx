"use client";
import usePaddle from "@/lib/utils/hooks/(paddle-hooks)/usePaddle";
import { Button } from "./button";
export default function CheckoutButton() {
  const paddle = usePaddle();

  const openCheckout = () => {
    paddle?.Checkout.open({
      items: [
        {
          priceId: "pri_1234567890", // you can find it in the product catalog
          quantity: 1,
        },
      ],
      customer: {
        email: "customer@email.com",
      },
      customData: {
        // other custom metadata you want to pass
      },
      settings: {
        // settings like successUrl and theme
      },
    });
  };

  return (
    <Button variant="secondary" onClick={openCheckout}>
      Checkout
    </Button>
  );
}
