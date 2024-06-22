import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WalletIcon, CheckIcon } from "lucide-react";
import { Plan } from "@prisma/client";
import Link from "next/link";

interface CurrentPlanProps {
  plan: Plan | null;
}

export default function CurrentPlan({ plan }: CurrentPlanProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <WalletIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <CardTitle>Your Plan</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {plan ? (
          <div className="flex flex-col space-y-4">
            <div>
              <h3 className="text-2xl font-bold">{plan.productName}</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {plan.price ? plan.price : "N/A"} per month
              </p>
            </div>
            <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-transparent">
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
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">No Plan Found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Please manage your subscription
              </p>
            </div>
            <Button variant="outline">
              <Link href="/dashboard/billing">Explore</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
