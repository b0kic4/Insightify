import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockIcon, HomeIcon, SettingsIcon, BarChartIcon } from "lucide-react";
import Link from "next/link";

export default function QuickLinks() {
  return (
    <Card className="h-[450px] bg-white shadow-md rounded-lg dark:bg-gray-800">
      <CardHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <HomeIcon className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Quick Links
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 p-12">
          <Link
            href="/landing"
            className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 flex flex-col items-start gap-2 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            prefetch={false}
          >
            <HomeIcon className="h-6 w-6 text-blue-500 dark:text-blue-300" />
            <span className="font-medium text-gray-800 dark:text-gray-200">
              Landing
            </span>
          </Link>
          <Link
            href="/improvements"
            className="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 flex flex-col items-start gap-2 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
            prefetch={false}
          >
            <BarChartIcon className="h-6 w-6 text-yellow-500 dark:text-yellow-300" />
            <span className="font-medium text-gray-800 dark:text-gray-200">
              Improvements
            </span>
          </Link>
          <Link
            href="/history"
            className="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-4 flex flex-col items-start gap-2 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
            prefetch={false}
          >
            <ClockIcon className="h-6 w-6 text-purple-500 dark:text-purple-300" />
            <span className="font-medium text-gray-800 dark:text-gray-200">
              History
            </span>
          </Link>
          <Link
            href="/settings"
            className="bg-red-100 dark:bg-red-900 rounded-lg p-4 flex flex-col items-start gap-2 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            prefetch={false}
          >
            <SettingsIcon className="h-6 w-6 text-red-500 dark:text-red-300" />
            <span className="font-medium text-gray-800 dark:text-gray-200">
              Settings
            </span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
