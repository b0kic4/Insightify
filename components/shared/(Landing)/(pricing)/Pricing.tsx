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
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-3">
          <div className="inline-block rounded-lg bg-blue-200 px-3 py-1 text-sm dark:bg-blue-700 text-blue-900 dark:text-blue-100">
            Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Pricing to Fit Your Needs
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Choose the plan that works best for you
          </p>
        </div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-700 shadow-md">
            <CardHeader className="bg-blue-100 dark:bg-blue-900 p-4 rounded-t-lg">
              <CardTitle className="text-blue-900 dark:text-blue-100">
                Starter
              </CardTitle>
              <CardDescription className="text-blue-700 dark:text-blue-300"></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 p-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-4xl font-bold text-blue-900 dark:text-blue-100">
                    $6.99
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/mo</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-blue-500" />
                  Website audit and analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-blue-500" />
                  Conversion rate optimization
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-blue-500" />
                  Personalized recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-blue-500" />
                  Basic reporting and analytics
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-700 shadow-md">
            <CardHeader className="bg-green-100 dark:bg-green-900 p-4 rounded-t-lg">
              <CardTitle className="text-green-900 dark:text-green-100">
                Advanced
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300"></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 p-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-4xl font-bold text-green-900 dark:text-green-100">
                    $10.99
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/mo</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-green-500" />
                  Website audit and analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-green-500" />
                  Conversion rate optimization
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-green-500" />
                  Personalized recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-green-500" />
                  Advanced reporting and analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-green-500" />
                  A/B testing and experimentation
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-green-500" />
                  Dedicated support
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <Button variant="default">
          <Link href="/dashboard/billing">Go To Pricing Page</Link>
        </Button>
      </div>
    </section>
  );
}
