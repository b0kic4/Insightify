import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WalletIcon, CheckIcon } from "lucide-react";
import { Plan } from "@prisma/client";
import Link from "next/link";

interface CurrentPlanProps {
  plan: Plan | null;
  freeImprovementsLeft: number | null;
}

const getIntervalDisplay = (interval: string) => {
  switch (interval.toLowerCase()) {
    case "monthly":
      return "per month";
    case "quarterly":
      return "per quarter";
    case "biannually":
      return "per half-year";
    case "yearly":
      return "per year";
    default:
      return "";
  }
};

export default function CurrentPlan({
  plan,
  freeImprovementsLeft,
}: CurrentPlanProps) {
  return (
    <Card className="h-[450px] p-4 bg-white shadow-md rounded-lg dark:bg-gray-800 flex flex-col justify-between">
      <CardHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <WalletIcon className="h-6 w-6 text-blue-500" />
          <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Your Plan
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-2">
        {plan ? (
          <div className="flex flex-col space-y-4">
            <div className="bg-green-100 p-4 rounded-lg shadow-inner dark:bg-green-900">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {plan.productName}
              </h3>
              <p className="text-gray-800 font-semibold dark:text-gray-300">
                ${plan.price ? (plan.price / 100).toFixed(2) : "N/A"}{" "}
                {getIntervalDisplay(plan.recurrence ? plan.recurrence : "")}
              </p>
            </div>
            <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-transparent p-4 rounded-lg shadow-inner bg-white dark:bg-gray-700">
              <ul className="space-y-2 text-gray-800 dark:text-gray-300">
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
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-red-100 p-4 rounded-lg shadow-inner dark:bg-red-900">
            <div className="p-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                No Plan Found
              </h3>
              <div className="mt-2 p-2 bg-red-200 rounded-lg dark:bg-red-950">
                <p className="text-gray-800 dark:text-gray-300">
                  <strong>Note:</strong> After a successful purchase, it may
                  take a few seconds to a minute for the application to update.
                </p>
              </div>
              <p className="mt-2 text-gray-800 dark:text-gray-300">
                Please manage your subscription.
              </p>
              {freeImprovementsLeft !== null && (
                <div className="mt-4 p-2 bg-green-100 rounded-lg dark:bg-green-950">
                  <p className="text-gray-800 dark:text-gray-300">
                    <strong>Free Improvements Left:</strong>{" "}
                    {freeImprovementsLeft}
                  </p>
                  <p className="text-gray-800 dark:text-gray-300">
                    These reset every 6 hours.
                  </p>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              className="text-gray-800 dark:text-gray-300"
            >
              <Link href="/dashboard/billing">Explore</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
