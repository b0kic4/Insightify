import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUpIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Usage() {
  return (
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
  );
}
