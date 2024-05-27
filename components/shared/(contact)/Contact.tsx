import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Experience the Power of AI-Driven Website Optimization
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Our AI-powered marketing optimization tool analyzes your
            website&apos;s design, content, and user experience to uncover
            hidden opportunities and drive higher conversions.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <form className="flex space-x-2">
            <Input
              className="max-w-lg flex-1"
              placeholder="Enter your email"
              type="email"
            />
            <Button type="submit">Get Started</Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Sign up to experience the power of our AI-driven website
            optimization tool.
            <Link className="underline underline-offset-2" href="#">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
