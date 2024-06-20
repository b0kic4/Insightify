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
import { FaRocket, FaCrown } from "react-icons/fa";

export default function ListPlans({ products }: any) {
  return (
    <section className="flex-1 overflow-y-auto p-4 md:p-6" id="pricing">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-blue-200 px-3 py-1 text-sm dark:bg-blue-700 text-blue-900 dark:text-blue-100">
            Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50 mt-4">
            Pricing to Fit Your Needs
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-4">
            Choose the plan that works best for you.
          </p>
        </div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-12">
          {products.map((product: any) => (
            <Card
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-shadow duration-300 transform hover:-translate-y-2 hover:shadow-xl border-t-4 border-blue-500 dark:border-blue-700"
            >
              <CardHeader className="p-8">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                    {product.attributes.name}
                  </CardTitle>
                  {product.attributes.slug === "advanced-subscription" ? (
                    <FaCrown className="text-yellow-500 w-8 h-8" />
                  ) : (
                    <FaRocket className="text-blue-500 w-8 h-8" />
                  )}
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400 mt-4">
                  {product.attributes.slug === "advanced-subscription"
                    ? "For growing businesses and marketing teams."
                    : "For small businesses and startups."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 grid gap-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-5xl font-bold text-gray-900 dark:text-gray-50">
                      {product.attributes.price_formatted}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      /mo
                    </span>
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-900">
                    <Link href={product.attributes.buy_now_url}>Buy Now</Link>
                  </Button>
                </div>
                <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 mt-6">
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-blue-500" />
                    Website audit and analysis
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-blue-500" />
                    Conversion rate optimization
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-blue-500" />
                    Personalized recommendations
                  </li>
                  {product.attributes.slug === "advanced-subscription" && (
                    <>
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-blue-500" />
                        Advanced reporting and analytics
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-blue-500" />
                        A/B testing and experimentation
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-blue-500" />
                        Dedicated support
                      </li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
