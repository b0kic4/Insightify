"use client";
import React from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useImprovementDetails } from "@/lib/utils/hooks/(react-query)/fetchImprovementData";
import ImprovementDetails from "@/components/shared/(Application)/(improvements-components)/ImprovementDetails";
import { useDeleteImprovement } from "@/lib/utils/hooks/(react-query)/deleteImprovement";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormValues } from "@/lib";

export default function Improvement({ params }: { params: { id: string } }) {
  const { user } = useKindeBrowserClient();
  const { data, isLoading, error } = useImprovementDetails(
    params.id,
    user?.id as string,
  );
  const { handleDeleteImprovement } = useDeleteImprovement(user?.id as string);

  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    if (!params.id) {
      toast({
        title: "Error",
        description: "Invalid improvement ID. Redirecting...",
      });
      router.back();
    }
  }, [params.id, router, toast]);

  if (isLoading) {
    return (
      <main className="flex flex-col h-screen">
        <section className="bg-gray-100 dark:bg-gray-900 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Your Improvement
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Screenshots might not be sorted properly so pay attention :)
          </p>
        </section>
        <div className="animate-spin rounded-full h-7 w-7 mx-auto my-2 border-b-2 border-gray-700 dark:border-white/50"></div>
      </main>
    );
  }

  if (error) {
    handleDeleteImprovement(
      data?.formData.websiteUrl as string,
      params.id,
      data?.images as string[],
    );
    return (
      <main className="flex flex-col h-screen">
        <section className="bg-gray-100 dark:bg-gray-900 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Your Improvement
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Screenshots might not be sorted properly so pay attention :)
          </p>
        </section>
        <div>Error: {error.message}</div>
      </main>
    );
  }

  return (
    <main className="flex flex-col h-screen">
      <section className="bg-gray-100 dark:bg-gray-900 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Your Improvement
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Screenshots might not be sorted properly so pay attention :)
        </p>
      </section>
      <ImprovementDetails
        formData={data?.formData as FormValues}
        images={data?.images as string[]}
        cachedAiResponse={data?.cachedAiResponse}
      />
    </main>
  );
}
