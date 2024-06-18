import Link from "next/link";
import { GiArtificialIntelligence } from "react-icons/gi";
import { ModeToggle } from "./ThemeSwitcher";
export default function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center gap-2">
      <Link className="flex items-center gap-12 justify-center" href="/">
        <GiArtificialIntelligence className="h-6 w-6" />
        <p className="text-2xl font-mono font-semibold text-purple-800 dark:text-purple-400 hidden sm:block">
          Insightify
        </p>
        <span className="sr-only">Insightify</span>
      </Link>

      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#works"
        >
          How it works
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#pricing"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#contact"
        >
          Contact
        </Link>

        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#faq"
        >
          FAQ
        </Link>
      </nav>

      <ModeToggle />
    </header>
  );
}
