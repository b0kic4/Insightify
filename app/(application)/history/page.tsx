import ListHistory from "@/components/shared/(history-components)/History";
import { getWebsitesFromUserCache } from "@/lib/utils/hooks/(redisHooks)/RedisHooks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function History() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getHistoryList", user?.id],
    queryFn: ({ queryKey }) => getWebsitesFromUserCache(queryKey[1] as string),
  });

  return (
    <main className="flex flex-col h-screen">
      <section className="bg-gray-100 dark:bg-gray-900 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Welcome to History
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          This is where your recent improvements generation are stored
        </p>
      </section>
      <HydrationBoundary>
        <ListHistory />
      </HydrationBoundary>
    </main>
  );
}
