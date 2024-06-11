import { getSingleWebsiteFromUserCache } from "@/lib/utils/hooks/RedisHooks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getDataFromThreadID } from "@/lib/utils/hooks/GetDataFromThreadId";

export default async function Slug({ params }: { params: { id: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log("params: ", params);

  await getDataFromThreadID(params.id);

  const improvement = await getSingleWebsiteFromUserCache(
    params.id,
    user?.id as string,
  );
  // NOTE: Render Improvement Details Component

  return <div>Slug + {params.id}</div>;
}
