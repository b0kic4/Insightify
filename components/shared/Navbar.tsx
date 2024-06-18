"use client";
import Link from "next/link";
import { GiArtificialIntelligence } from "react-icons/gi";
import { ModeToggle } from "./ThemeSwitcher";
import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center gap-2 bg-gray-100 dark:bg-gray-900">
      <Link className="flex items-center gap-2" href="/">
        <GiArtificialIntelligence className="h-8 w-8 text-purple-800 dark:text-purple-400" />
        <p className="text-2xl font-mono font-semibold text-purple-800 dark:text-purple-400 hidden sm:block">
          Insightify
        </p>
        <span className="sr-only">Insightify</span>
      </Link>

      <nav className="ml-auto hidden sm:flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline underline-offset-4"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline underline-offset-4"
          href="#works"
        >
          How it works
        </Link>
        <Link
          className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline underline-offset-4"
          href="#pricing"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline underline-offset-4"
          href="#contact"
        >
          Contact
        </Link>
        <Link
          className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline underline-offset-4"
          href="#faq"
        >
          FAQ
        </Link>
      </nav>

      <button
        className="sm:hidden ml-auto text-gray-900 dark:text-gray-100"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <FaTimes className="h-6 w-6" />
        ) : (
          <FaBars className="h-6 w-6" />
        )}
      </button>

      {menuOpen && (
        <nav className="absolute top-14 left-0 w-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center gap-4 py-4 sm:hidden z-10">
          <Link
            className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline underline-offset-4"
            href="#features"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline underline-offset-4"
            href="#works"
            onClick={() => setMenuOpen(false)}
          >
            How it works
          </Link>
          <Link
            className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline underline-offset-4"
            href="#pricing"
            onClick={() => setMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline underline-offset-4"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline underline-offset-4"
            href="#faq"
            onClick={() => setMenuOpen(false)}
          >
            FAQ
          </Link>
        </nav>
      )}

      <ModeToggle />
    </header>
  );
}
