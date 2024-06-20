"use client";
import Link from "next/link";
import { GiArtificialIntelligence } from "react-icons/gi";
import { ModeToggle } from "./ThemeSwitcher";
import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#works", label: "How it works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
    { href: "#faq", label: "FAQ" },
  ];

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
        {navItems.map((item) => (
          <Link
            key={item.href}
            className={`text-sm font-medium hover:underline underline-offset-4 ${
              pathname === item.href
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-900 dark:text-gray-100"
            }`}
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
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
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={`text-sm font-medium hover:underline underline-offset-4 ${
                pathname === item.href
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-900 dark:text-gray-100"
              }`}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}

      <ModeToggle />
    </header>
  );
}
