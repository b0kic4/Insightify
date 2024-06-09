import ListHistory from "@/components/shared/(history-components)/History";
import { getWebsitesFromUserCache } from "@/lib/utils/hooks/RedisHooks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export default async function History() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const history = await getWebsitesFromUserCache(user?.id as string);

  return (
    <main className="flex flex-col h-screen">
      <section className="bg-gray-100 dark:bg-gray-900 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Welcome to History
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          This is the main content area of the application.
        </p>
      </section>
      <ListHistory history={history} />
    </main>
  );
}
