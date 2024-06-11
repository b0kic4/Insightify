import { getSingleWebsiteFromUserCache } from "@/lib/utils/hooks/RedisHooks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getDataFromThreadID } from "@/lib/utils/hooks/GetDataFromThreadId";
import ImprovementDetails from "@/components/shared/(improvements-components)/ImprovementDetails";
import React from "react";
import { FormValues } from "@/lib";

export default async function Slug({ params }: { params: { id: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log("params: ", params);

  // FIXME:
  // 1. Improvement is null
  // 2. Images array are empty
  //

  const responseMessage = await getDataFromThreadID(params.id);

  const improvement = await getSingleWebsiteFromUserCache(
    params.id,
    user?.id as string,
  );

  console.log("improvement: ", improvement);
  console.log("images: ", responseMessage.images);

  const formData: FormValues = {
    websiteUrl: improvement?.url as string,
    websiteInsights: improvement?.insights as string,
    targetedAudience: improvement?.audience as string,
    targetedMarket: improvement?.market as string,
  };
  console.log("formData: ", formData);

  return (
    // <ImprovementDetails
    //   formData={formData}
    //   images={responseMessage.images}
    //   aiResponse={responseMessage.aiResponse}
    //   loading={false}
    //   type="cached"
    // />
    <p>Kurac</p>
  );
}
