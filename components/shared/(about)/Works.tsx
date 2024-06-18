import { ScanIcon } from "lucide-react";
import { GiSettingsKnobs } from "react-icons/gi";
import { MonitorIcon } from "lucide-react";
import Link from "next/link";
export default function Works() {
  return (
    <section id="works" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              A simple 3-step process
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Insightify makes it easy to analyze and optimize your website.
              Here's how it works:
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center text-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <ScanIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Analyze</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our AI-powered application thoroughly analyzes your website from
                provided url, looking at design, layout, and content.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <GiSettingsKnobs className="h-12 w-12 text-gray-500 dark:text-gray-400" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Optimize</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Based on the analysis, our application provides personalized
                recommendations to optimize your website based on provided
                targeted audience, targeted market and insights.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <MonitorIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Response</h3>
              <p className="text-gray-500 dark:text-gray-400">
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
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            prefetch={false}
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
