import {
  FaPalette,
  FaRegLightbulb,
  FaCogs,
  FaChartLine,
  FaBolt,
  FaNetworkWired,
} from "react-icons/fa";

export default function Features() {
  return (
    <section id="features">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-blue-200 px-3 py-1 text-sm dark:bg-blue-700 text-blue-900 dark:text-blue-100">
                Comprehensive Analysis
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Elevate Your Website to New Heights
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Insightify provides a detailed, strategic analysis of your
                website&apos;s design, content, and user experience, empowering
                you to make data-driven decisions that drive higher conversions
                and better engagement.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-start bg-blue-100 p-6 rounded-lg h-full dark:bg-blue-900">
              <FaPalette className="h-12 w-12 text-blue-600 dark:text-blue-300" />
              <h3 className="mt-4 text-xl font-bold text-blue-900 dark:text-blue-100">
                Design Analysis
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Our tool examines your website&apos;s visual design, identifying
                areas for improvement to enhance user engagement and conversion
                rates.
              </p>
            </div>
            <div className="flex flex-col items-start bg-green-100 p-6 rounded-lg h-full dark:bg-green-900">
              <FaRegLightbulb className="h-12 w-12 text-green-600 dark:text-green-300" />
              <h3 className="mt-4 text-xl font-bold text-green-900 dark:text-green-100">
                Content Optimization
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                We analyze your website&apos;s content, providing strategic
                recommendations to make your messaging more compelling and
                relatable to your target audience.
              </p>
            </div>
            <div className="flex flex-col items-start bg-purple-100 p-6 rounded-lg h-full dark:bg-purple-900">
              <FaCogs className="h-12 w-12 text-purple-600 dark:text-purple-300" />
              <h3 className="mt-4 text-xl font-bold text-purple-900 dark:text-purple-100">
                User Experience Insights
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Our tool evaluates your website&apos;s overall user experience,
                suggesting layout and navigation improvements to enhance
                usability and drive higher conversions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-blue-200 px-3 py-1 text-sm dark:bg-blue-700 text-blue-900 dark:text-blue-100">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Unlock the Full Potential of Your Website
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Insightify analysis provides a comprehensive set of features to
                help you optimize your website for better performance, user
                experience, and conversion rates.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-start bg-blue-100 p-6 rounded-lg h-full dark:bg-blue-900">
              <FaChartLine className="h-12 w-12 text-blue-600 dark:text-blue-300" />
              <h3 className="mt-4 text-lg font-bold text-blue-900 dark:text-blue-100">
                Comprehensive Analysis
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Our AI-powered analysis covers every aspect of your website,
                from design and user experience to content and performance.
              </p>
            </div>
            <div className="flex flex-col items-start bg-green-100 p-6 rounded-lg h-full dark:bg-green-900">
              <FaRegLightbulb className="h-12 w-12 text-green-600 dark:text-green-300" />
              <h3 className="mt-4 text-lg font-bold text-green-900 dark:text-green-100">
                Actionable Insights
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Receive detailed insights and recommendations to improve your
                website and achieve your business goals.
              </p>
            </div>
            <div className="flex flex-col items-start bg-purple-100 p-6 rounded-lg h-full dark:bg-purple-900">
              <FaBolt className="h-12 w-12 text-purple-600 dark:text-purple-300" />
              <h3 className="mt-4 text-lg font-bold text-purple-900 dark:text-purple-100">
                Continuous Optimization
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Our tool provides ongoing monitoring and analysis to ensure your
                website stays optimized for maximum performance and user
                satisfaction.
              </p>
            </div>
            <div className="flex flex-col items-start bg-red-100 p-6 rounded-lg h-full dark:bg-red-900">
              <FaChartLine className="h-12 w-12 text-red-600 dark:text-red-300" />
              <h3 className="mt-4 text-lg font-bold text-red-900 dark:text-red-100">
                Customizable Reporting
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Generate custom reports to track your website&apos;s progress
                and share insights with your team.
              </p>
            </div>
            <div className="flex flex-col items-start bg-yellow-100 p-6 rounded-lg h-full dark:bg-yellow-900">
              <FaChartLine className="h-12 w-12 text-yellow-600 dark:text-yellow-300" />
              <h3 className="mt-4 text-lg font-bold text-yellow-900 dark:text-yellow-100">
                Competitive Benchmarking
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Compare your website&apos;s performance against industry leaders
                and identify areas for improvement.
              </p>
            </div>
            <div className="flex flex-col items-start bg-teal-100 p-6 rounded-lg h-full dark:bg-teal-900">
              <FaNetworkWired className="h-12 w-12 text-teal-600 dark:text-teal-300" />
              <h3 className="mt-4 text-lg font-bold text-teal-900 dark:text-teal-100">
                Seamless Integration
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Easily integrate our tool with your existing marketing and
                analytics platforms for a comprehensive view of your
                website&apos;s performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
