import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WalletIcon } from "lucide-react";
import { Plan } from "@prisma/client";

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
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{plan.productName}</h3>
              <p className="text-gray-500 dark:text-gray-400">
                ${plan.price ? plan.price : "N/A"} per month
              </p>
            </div>
            <Button variant="outline">Upgrade</Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">No Plan Found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Please select a plan
              </p>
            </div>
            <Button variant="outline">Upgrade</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
