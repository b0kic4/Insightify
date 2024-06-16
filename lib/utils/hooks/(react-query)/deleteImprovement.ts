import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeImprovementData } from "@/lib/utils/hooks/(redisHooks)/DeleteFromCache";
import { useToast } from "@/components/ui/use-toast";

type DeleteImprovementParams = {
  url: string;
  threadId: string;
  screenshots: string[];
};

export function useDeleteImprovement(userId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async ({
      url,
      threadId,
      screenshots,
    }: DeleteImprovementParams) =>
      await removeImprovementData(userId, url, threadId, screenshots),
    onSuccess: (response) => {
      toast({
        title: "Success",
        description: response.message,
      });
      queryClient.invalidateQueries({ queryKey: ["getHistoryList", userId] });
    },
    onError: (error: any) => {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    },
  });

  const handleDeleteImprovement = async (
    url: string,
    threadId: string,
    screenshots: string[],
  ) => {
    deleteMutation.mutate({ url, threadId, screenshots });
  };

  return {
    handleDeleteImprovement,
    isLoading: deleteMutation.isPending,
  };
}
