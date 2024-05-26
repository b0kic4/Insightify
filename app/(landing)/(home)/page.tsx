import Link from "next/link";
import Features from "@/components/shared/(features)/Features";
import About from "@/components/shared/(about)/About";
import Pricing from "@/components/shared/(pricing)/Pricing";
import Landing from "@/components/landing";
import Contact from "@/components/shared/(contact)/Contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        {/* Landing */}
        <Landing />

        {/* Features */}
        <Features />

        {/* About */}
        <About />

        {/* Pricing */}
        <Pricing />

        {/* Contact */}
        <Contact />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Acme Marketing Optimizer. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
