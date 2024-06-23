import React from "react";
import DashboardComponent from "@/components/shared/(Application)/(dashboard-components)/Dashboard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const dynamic = "force-dynamic";

const { getUser } = getKindeServerSession();

export default async function Dashboard() {
  const user = await getUser();
  return (
    <main className="flex flex-col h-screen">
      <section className="bg-gray-100 dark:bg-gray-900 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Welcome to the Dashboard
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Welcome to your Dashboard. Here you can preview your information.
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
