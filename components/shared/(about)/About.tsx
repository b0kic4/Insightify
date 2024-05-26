export default function About() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="about">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              About Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Learn More About Our Mission
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              We are committed to helping businesses achieve their marketing
              goals through innovative AI solutions. Our team of experts is
              dedicated to providing the best tools and insights to drive your
              success.
            </p>
          </div>
        </div>
      </div>
    </section>

    // <section className="w-full py-12 md:py-24 lg:py-32">
    //           <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
    //             <div className="space-y-2">
    //               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
    //                 Unlock Your Website's True Potential
    //               </h2>
    //               <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
    //                 Our AI-powered marketing optimization tool provides a
    //                 comprehensive analysis of your website, empowering you to make
    //                 data-driven decisions that drive higher conversions and better
    //                 engagement.
    //               </p>
    //             </div>
    //             <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
    //               <Link
    //                 className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
    //                 href="#"
    //               >
    //                 Get Started
    //               </Link>
    //               <Link
    //                 className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
    //                 href="#"
    //               >
    //                 Learn More
    //               </Link>
    //             </div>
    //           </div>
    //         </section>
  );
}
