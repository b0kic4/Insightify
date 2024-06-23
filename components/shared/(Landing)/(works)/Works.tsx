import { ScanIcon } from "lucide-react";
import { GiSettingsKnobs } from "react-icons/gi";
import { MonitorIcon } from "lucide-react";
import Link from "next/link";

export default function Works() {
  return (
    <section
      id="works"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-blue-200 px-3 py-1 text-sm dark:bg-blue-700 text-blue-900 dark:text-blue-100">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              A simple 3-step process
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Insightify makes it easy to analyze and optimize your website.
              Here&apos;s how it works:
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center justify-between space-y-4 text-center bg-blue-100 dark:bg-blue-800 p-6 rounded-lg h-full">
            <ScanIcon className="h-12 w-12 text-blue-600 dark:text-blue-300" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
                Analyze
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our AI-powered application thoroughly analyzes your website from
                provided URL, looking at design, layout and content.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between space-y-4 text-center bg-green-100 dark:bg-green-800 p-6 rounded-lg h-full">
            <GiSettingsKnobs className="h-12 w-12 text-green-600 dark:text-green-300" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-green-900 dark:text-green-100">
                Optimize
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Based on the analysis, our application provides personalized
                recommendations to optimize your website based on provided
                targeted audience, targeted market and insights.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between space-y-4 text-center bg-purple-100 dark:bg-purple-800 p-6 rounded-lg h-full">
            <MonitorIcon className="h-12 w-12 text-purple-600 dark:text-purple-300" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100">
                Implement
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our application provides instant, actionable insights to
                optimize your website. For example, it might suggest enhancing
                content layout or targeting specific keywords to better engage
                your audience and boost conversions.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-md bg-pink-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus-visible:ring-red-300"
            prefetch={false}
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
