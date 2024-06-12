// lib/hooks/useRequestToAI.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestToAI } from "@/lib/utils/actions/RequestToAI";

export const useRequestToAI = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      url: string;
      audience: string;
      market: string;
      insights: string;
      imageUrls: string[];
    }) => RequestToAI(data),
    onSuccess: (data, variables) => {
      // Cache the result with a unique key based on the form values
      queryClient.setQueryData(["aiResponse", variables.url], data);
    },
  });
};
