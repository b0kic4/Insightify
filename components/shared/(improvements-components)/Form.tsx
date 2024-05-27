import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
export default function Form() {
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-3xl mx-auto space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            Provide the Targeted Market, Audience, and Insights
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Help us understand your website&apos;s needs so we can provide a
            comprehensive analysis and potential design improvements.
          </p>
        </div>
        <form className="grid gap-8">
          <div className="grid gap-4">
            <Label
              className="text-lg text-gray-700 dark:text-gray-300"
              htmlFor="website-url"
            >
              Website URL
            </Label>
            <Input
              className="transition-all duration-300 ease-in-out transform bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:scale-105"
              id="website-url"
              placeholder="https://example.com"
              required
              type="url"
            />
          </div>
          <div className="grid gap-4">
            <Label
              className="text-lg text-gray-700 dark:text-gray-300"
              htmlFor="targeted-audience"
            >
              Targeted Audience
            </Label>
            <Textarea
              className="transition-all duration-300 ease-in-out transform bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:scale-105"
              id="targeted-audience"
              placeholder="Describe your target audience"
              required
            />
          </div>
          <div className="grid gap-4">
            <Label
              className="text-lg text-gray-700 dark:text-gray-300"
              htmlFor="targeted-market"
            >
              Targeted Market
            </Label>
            <Textarea
              className="transition-all duration-300 ease-in-out transform bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:scale-105"
              id="targeted-market"
              placeholder="Describe your target market"
              required
            />
          </div>
          <div className="grid gap-4">
            <Label
              className="text-lg text-gray-700 dark:text-gray-300"
              htmlFor="website-insights"
            >
              Insights about the Website
            </Label>
            <Textarea
              className="transition-all duration-300 ease-in-out transform bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:scale-105"
              id="website-insights"
              placeholder="Provide any insights about your website"
              required
            />
          </div>
          <Button
            className="transition-all duration-300 ease-in-out bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900"
            type="submit"
          >
            Analyze
          </Button>
        </form>
      </div>
    </section>
  );
}
