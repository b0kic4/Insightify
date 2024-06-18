import { CheckIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  // NOTE: Calculate the usage and then show it
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
      id="pricing"
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-3">
          <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm dark:bg-gray-600">
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
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>
                For small businesses and startups.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-4xl font-bold">$6.99</span>
                  <span className="text-gray-500 dark:text-gray-400">/mo</span>
                </div>
                <Button variant="secondary">Get Started</Button>
              </div>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Website audit and analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Conversion rate optimization
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Personalized recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Basic reporting and analytics
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Advanced</CardTitle>
              <CardDescription>
                For growing businesses and marketing teams.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-4xl font-bold">$10.99</span>
                  <span className="text-gray-500 dark:text-gray-400">/mo</span>
                </div>
                <Button variant="secondary">Get Started</Button>
              </div>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Website audit and analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Conversion rate optimization
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Personalized recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Advanced reporting and analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  A/B testing and experimentation
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Dedicated support
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
