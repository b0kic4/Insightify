import SettingsComponent from "@/components/shared/(Application)/(settings)/SettingsComponent";

export default function Settings() {
  return (
    <main className="flex flex-col h-screen overflow-hidden">
      <section className="bg-gray-100 dark:bg-gray-900 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Welcome to History
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Welcome to your Settings. This is where you configure your settings.
        </p>
      </section>
      <SettingsComponent />
    </main>
  );
}
