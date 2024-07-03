import { useMutation, useQueryClient } from "@tanstack/react-query";
import increaseUsageOfFreePlan from "../db/freePlanUsageCalc";
import { useToast } from "@/components/ui/use-toast";

export function useIncreaseUsageRefetchPlan() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: increaseUsageOfFreePlan,
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: "Free Plan",
          description: `You have ${response.data} free improvements left.`,
        });
        queryClient.invalidateQueries({ queryKey: ["getUsersPlan"] });
      } else {
        toast({
          title: "Error",
          description: response.error,
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    },
  });

  const handleIncreaseUsage = async () => {
    mutation.mutate();
  };

  return {
    handleIncreaseUsage,
    isLoading: mutation.isPending,
  };
}
