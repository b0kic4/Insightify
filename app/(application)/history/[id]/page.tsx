import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getDataFromThreadID } from "@/lib/utils/hooks/GetDataFromThreadId";
import ImprovementDetails from "@/components/shared/(improvements-components)/ImprovementDetails";
import React from "react";
import { FormValues } from "@/lib";
import { retrieveUsersImprovements } from "@/lib/utils/actions/RetrieveUsersImprovementByThreadId";

export default async function Improvement({
  params,
}: {
  params: { id: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const responseMessage = await getDataFromThreadID(params.id);

  const improvementResponse = await retrieveUsersImprovements(
    params.id,
    user?.id as string,
  );

  if (improvementResponse && improvementResponse.success) {
    const improvement = improvementResponse.data.improvement;
    const formData: FormValues = {
      websiteUrl: improvement.url as string,
      websiteInsights: improvement.insights as string,
      targetedAudience: improvement.audience as string,
      targetedMarket: improvement.market as string,
    };

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
          formData={formData}
          images={responseMessage.images.sort()}
          aiResponse={responseMessage.aiResponse}
          threadId={responseMessage.threadId}
          loading={false}
          type="cached"
        />
      </main>
    );
  } else {
    return <div>Error: {improvementResponse?.error}</div>;
  }
}
