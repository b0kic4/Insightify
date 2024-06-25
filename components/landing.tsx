import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Landing() {
  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="relative mx-auto w-full pb-[calc(93.23962516733602%+41px)] h-0 overflow-hidden rounded-xl lg:order-last">
            <iframe
              src="https://demo.arcade.software/AmeyJ8PkyzbMZFlfH42U?embed&show_copy_link=true"
              title="Insightify"
              frameBorder="0"
              loading="lazy"
              allowFullScreen
              allow="clipboard-write"
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-gray-900 dark:text-gray-50">
                Unlock Your Website&apos;s True Potential with{" "}
                <span className="relative text-purple-600 dark:text-purple-400 font-shadows">
                  Insightify
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-500"></span>
                </span>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Insightify is an AI-powered optimization tool that analyzes your
                website&apos;s design, content, and user experience to uncover
                hidden opportunities and drive higher conversions.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50"
                href={`${isAuth ? "/dashboard" : "/welcome"}`}
              >
                Get Started
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 dark:focus-visible:ring-gray-600"
                href="#works"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
