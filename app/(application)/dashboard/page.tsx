import Sidebar from "@/components/shared/Sidebar";
export default function Dashboard() {
  return (
    <main className="flex-1 bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
        Welcome to the Dashboard
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        This is the main content area of the application.
      </p>
    </main>
  );
}
