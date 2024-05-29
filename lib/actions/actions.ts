"use server";
import { FormValues } from "@/components/shared/(improvements-components)/Form";

export async function SendData(data: FormValues) {
  //
  // NOTE: We can implement here sending
  // data to:
  // 1. backend
  // 2. openai endpoint
  //
  // NOTE: First call to a backend for handling:
  // 1. Screenshoting the website
  // 2. Extracting the code of the website
  // NOTE: Provide the websiteUrl, market, audience, insights
  // to the configured prompt for the gpt-4o to analyse the website
  // FIXME: IMPROTANT: DO NOT CALL GPT-4O Without good prompt and implement caching

  console.log("data: ", data);
  // Here you can add the logic to handle the data, such as sending it to a server, database, etc.
  // For example:
  // const response = await fetch('/api/analyze', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // });

  // if (!response.ok) {
  //   throw new Error('Failed to send data');
  // }

  return data; // Or return some other meaningful response
}
