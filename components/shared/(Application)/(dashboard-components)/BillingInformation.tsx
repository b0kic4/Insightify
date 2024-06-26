import { Card as BillingCard, Plan } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  List,
  CreditCard,
  Calendar,
  DollarSign,
  RefreshCw,
} from "lucide-react";

interface Props {
  plan: Plan;
  card: BillingCard;
}

export default function BillingInfo({ plan, card }: Props) {
  let formattedDateRenewsAt = "N/A";
  let formattedDatePurchasedAt = "N/A";

  if (plan && plan.createdAt && plan.renewsAt) {
    formattedDatePurchasedAt = plan.createdAt
      ? new Date(plan.createdAt).toLocaleDateString()
      : "N/A";

    formattedDateRenewsAt = plan.renewsAt
      ? new Date(plan.renewsAt).toLocaleDateString()
      : "N/A";
  }

  return (
    <Card className="h-[450px] p-4 bg-white shadow-md rounded-lg dark:bg-gray-800 flex flex-col justify-between">
      <CardHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <List className="h-6 w-6 text-blue-500" />
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Billing
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-2 space-y-6">
        <div className="flex items-center justify-between bg-green-100 p-3 rounded-lg shadow-inner dark:bg-green-900 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-green-500" />
            <span className="text-gray-800 font-semibold dark:text-gray-300">
              Plan purchased:
            </span>
          </div>
          <span className="font-bold text-gray-900 dark:text-gray-100">
            {formattedDatePurchasedAt}
          </span>
        </div>
        <div className="flex items-center justify-between bg-yellow-100 p-3 rounded-lg shadow-inner dark:bg-yellow-900 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-yellow-500" />
            <span className="text-gray-800 font-semibold dark:text-gray-300">
              Payment method:
            </span>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-900 dark:text-gray-100">
              {card?.type ? card.type : ""}
            </div>
            <div className="font-bold text-gray-900 dark:text-gray-100">
              {card?.visual ? card.visual : ""}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-purple-100 p-3 rounded-lg shadow-inner dark:bg-purple-900 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-purple-500" />
            <span className="text-gray-800 font-semibold dark:text-gray-300">
              Next payment:
            </span>
          </div>
          <span className="font-bold text-gray-900 dark:text-gray-100">
            {plan?.price ? plan.price : ""}
          </span>
        </div>
        <div className="flex items-center justify-between bg-red-100 p-3 rounded-lg shadow-inner dark:bg-red-900 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-6 w-6 text-red-500" />
            <span className="text-gray-800 font-semibold dark:text-gray-300">
              Renews at:
            </span>
          </div>
          <span className="font-bold text-gray-900 dark:text-gray-100">
            {formattedDateRenewsAt}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
