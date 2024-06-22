import { CheckIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Pricing() {
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
      id="pricing"
    >
      <div className="container mx-auto flex flex-col items-center justify-center space-y-8 text-center">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-green-200 px-3 py-1 text-sm dark:bg-green-700 text-green-900 dark:text-green-100">
            Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-5xl text-gray-900 dark:text-gray-50">
            Pricing to Fit Your Needs
          </h2>
          <p className="max-w-xl mx-auto text-gray-700 dark:text-gray-300 md:text-lg">
            Subscription Plan that works best for you.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-1">
          <Card className="bg-white dark:bg-gray-700 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <CardHeader className="bg-purple-100 dark:bg-purple-900 p-6 rounded-t-lg">
              <CardTitle className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                Subscription Plan
              </CardTitle>
              <CardDescription className="text-purple-700 dark:text-purple-300 mt-2">
                Insightify&apos;s subscription plan
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-4xl font-bold text-purple-900 dark:text-purple-100">
                    $4.19
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/mo</span>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-800 transition-transform transform hover:scale-110">
                  <Link href="/dashboard/billing">Buy Now</Link>
                </Button>
              </div>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                  Website Audit and Analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                  Comprehensive Artistic, Strategic, and Mechanical Evaluation
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                  Content Analysis and Recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                  Text Analysis and Suggestions
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                  Image Analysis and Suggestions
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                  Website Layout Analysis and Recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                  Personalized Recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                  Reporting and Analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                  Usability and Appearance Severity Ratings
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <Button
          variant="default"
          className="mt-8 bg-green-500 hover:bg-green-700 text-white dark:bg-green-600 dark:hover:bg-green-800 transition-transform transform hover:scale-110"
        >
          <Link href="/dashboard/billing">Proceed to pricing</Link>
        </Button>
      </div>
    </section>
  );
}
