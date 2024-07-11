import React from "react";
import DashboardComponent from "@/components/shared/(Application)/(dashboard-components)/Dashboard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import NotificationsButton from "@/components/ui/notifications/NotificationsButton";
import { QueryClient } from "@tanstack/react-query";
import { fetchNotifications } from "@/lib/utils/hooks/(react-query)/fetchNotifications";

export const dynamic = "force-dynamic";

const queryClient = new QueryClient();
const { getUser } = getKindeServerSession();

export default async function Dashboard() {
  const user = await getUser();

  // Prefetch messages
  await queryClient.prefetchQuery({
    queryKey: ["notifications", user?.id as string],
    queryFn: ({ queryKey }) => fetchNotifications(queryKey[1] as string),
  });

  return (
    <main className="flex flex-col h-screen">
      <section className="bg-gray-100 dark:bg-gray-900 p-8">
        <div className="flex gap-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Welcome to your Dashboard
          </h1>
          <NotificationsButton />
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Welcome to Dashboard. Here you can preview your information.
        </p>
      </section>
      <p className="flex justify-center text-2xl font-semibold py-4">
        Welcome back{" "}
        <span className="relative text-purple-600 dark:text-purple-400 font-shadows mx-1">
          {user?.given_name}
          <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-500"></span>
        </span>
      </p>
      <DashboardComponent />
    </main>
  );
}
