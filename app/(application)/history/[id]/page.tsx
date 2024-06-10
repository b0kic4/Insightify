import { getSingleWebsiteFromUserCache } from "@/lib/utils/hooks/RedisHooks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// NOTE: Display data for the improvement just like
// in ImprovementDetails component
export default async function Slug({ params }: { params: { id: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const improvement = await getSingleWebsiteFromUserCache(
    params.id,
    user?.id as string,
  );

  return <div>Slug + {params.id}</div>;
}
