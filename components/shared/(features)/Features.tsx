export default function Features() {
  return (
    <section id="features">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm dark:bg-gray-700">
                Comprehensive Analysis
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Elevate Your Website to New Heights
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our AI-powered marketing optimization tool provides a detailed,
                strategic analysis of your website&apos;s design, content, and
                user experience, empowering you to make data-driven decisions
                that drive higher conversions and better engagement.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <img
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="310"
              src="/placeholder.svg"
              width="550"
            />
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Design Analysis</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Our tool examines your website&apos;s visual design,
                      identifying areas for improvement to enhance user
                      engagement and conversion rates.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Content Optimization</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      We analyze your website&apos;s content, providing
                      strategic recommendations to make your messaging more
                      compelling and relatable to your target audience.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">
                      User Experience Insights
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Our tool evaluates your website&apos;s overall user
                      experience, suggesting layout and navigation improvements
                      to enhance usability and drive higher conversions.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm dark:bg-gray-700">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Powerful Features to Boost Your Marketing
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our AI-powered marketing optimization tool provides a suite of
                features to help you improve your website&apos;s performance and
                drive more conversions.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Website Audit and Analysis</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our AI-powered tool analyzes your website and provides
                personalized recommendations to improve your marketing
                performance.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">
                Conversion Rate Optimization
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Identify and address friction points in your customer journey to
                boost your conversion rates.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">
                Personalized Recommendations
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get tailored suggestions to optimize your website content,
                design, and user experience.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">
                A/B Testing and Experimentation
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Easily set up A/B tests and experiments to validate your
                optimization ideas.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Reporting and Analytics</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Track the impact of your optimizations with detailed performance
                reports and analytics.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Seamless Integration</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Integrate our tool with your existing marketing stack for a
                streamlined optimization workflow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
