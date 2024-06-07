import React from "react";
import DashboardComponent from "@/components/shared/(dashboard-components)/Dashboard";

export default function Dashboard() {
  return (
    <main className="flex-1">
      <section className="flex-1 bg-gray-100 dark:bg-gray-900 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Welcome to the Dashboard
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          This is the main content area of the application.
        </p>
      </section>
      <section className="p-8">
        <DashboardComponent />
      </section>
    </main>
  );
}
