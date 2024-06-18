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
                Insightify provides a detailed, strategic analysis of your
                website&apos;s design, content, and user experience, empowering
                you to make data-driven decisions that drive higher conversions
                and better engagement.
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
                Unlock the full potential of your website
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Insightify analysis provides a comprehensive set of features to
                help you optimize your website for better performance, user
                experience, and conversion rates.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Comprehensive Analysis</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our AI-powered analysis covers every aspect of your website,
                from design and user experience to content and performance.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Actionable Insights</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive detailed insights and recommendations to improve your
                website and achieve your business goals.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Continuous Optimization</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our tool provides ongoing monitoring and analysis to ensure your
                website stays optimized for maximum performance and user
                satisfaction.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Customizable Reporting</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Generate custom reports to track your website's progress and
                share insights with your team.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Competitive Benchmarking</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Compare your website's performance against industry leaders and
                identify areas for improvement.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Seamless Integration</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Easily integrate our tool with your existing marketing and
                analytics platforms for a comprehensive view of your website's
                performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
