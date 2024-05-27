import Form from "@/components/shared/(improvements-components)/Form";
export default function Improvements() {
  return (
    <main className="flex-1">
      <section className="flex-1 bg-gray-100 dark:bg-gray-900 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Welcome to the Improvements
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          This is the content area of the application where magic happens.
        </p>
      </section>
      <Form />
    </main>
  );
}
