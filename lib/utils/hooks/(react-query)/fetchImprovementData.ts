import { useQuery } from "@tanstack/react-query";
import { getDataFromThreadID } from "@/lib/utils/hooks/(redisHooks)/GetDataFromThreadId";
import { retrieveUsersImprovements } from "../../actions/db/improvements/RetrieveUsersImprovementByThreadId";

const fetchImprovementDetails = async (threadId: string, userId: string) => {
  const responseMessage = await getDataFromThreadID(threadId);
  const improvementResponse = await retrieveUsersImprovements(threadId, userId);

  if (improvementResponse && improvementResponse.success) {
    const improvement = improvementResponse.data.improvement;
    const formData = {
      websiteUrl: improvement.url,
      websiteInsights: improvement.insights,
      targetedAudience: improvement.audience,
      targetedMarket: improvement.market,
    };

    return {
      formData,
      images: responseMessage.images.sort(),
      cachedAiResponse: responseMessage.aiResponse,
    };
  } else {
    throw new Error(
      improvementResponse?.error || "Failed to fetch improvement details.",
    );
  }
};

export const useImprovementDetails = (threadId: string, userId: string) => {
  return useQuery({
    queryKey: ["improvementDetails", threadId, userId],
    queryFn: () => fetchImprovementDetails(threadId, userId),
  });
};
