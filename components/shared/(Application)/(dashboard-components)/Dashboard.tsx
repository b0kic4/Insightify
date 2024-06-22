import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckIcon,
  ClockIcon,
  HomeIcon,
  LightbulbIcon,
  SettingsIcon,
  TrendingUpIcon,
  List,
} from "lucide-react";
import retrieveUsersPlan from "@/lib/utils/actions/db/plans/RetrieveUsersPlan";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CurrentPlan from "./CurrentPlan";

const { getUser } = getKindeServerSession();

export default async function DashboardComponent() {
  const user = await getUser();
  const planResponse = await retrieveUsersPlan(user?.id as string);
  let plan = null;

  if (planResponse.success && "data" in planResponse) {
    plan = planResponse.data.plan;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <CurrentPlan plan={plan} />
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <CardTitle>Usage</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Storage used</p>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">75%</div>
                <Progress value={75} className="flex-1" />
              </div>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Bandwidth used</p>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">60%</div>
                <Progress value={60} className="flex-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <CardTitle>Plan Benefits</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <span>Unlimited storage</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <span>Unlimited bandwidth</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <span>24/7 support</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <span>Advanced analytics</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <List className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <CardTitle>Billing</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Next payment due</span>
              <span className="font-bold">June 15, 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Payment method</span>
              <span className="font-bold">Visa **** 1234</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total paid</span>
              <span className="font-bold">$588</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <CardTitle>Recent Activity</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="font-medium">Uploaded new file</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  May 12, 2024
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="font-medium">Shared a document</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  May 10, 2024
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="font-medium">Invited a new user</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  May 8, 2024
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HomeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <CardTitle>Quick Links</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="#"
              className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-start gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              prefetch={false}
            >
              <HomeIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              href="#"
              className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-start gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              prefetch={false}
            >
              <LightbulbIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <span className="font-medium">Improvements</span>
            </Link>
            <Link
              href="#"
              className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-start gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              prefetch={false}
            >
              <ClockIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <span className="font-medium">History</span>
            </Link>
            <Link
              href="#"
              className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-start gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              prefetch={false}
            >
              <SettingsIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <span className="font-medium">Settings</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
