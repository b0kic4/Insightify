"use client";
import {
  Grid3x3Icon,
  HomeIcon,
  MountainIcon,
  SettingsIcon,
  BarChartIcon,
} from "lucide-react";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { usePathname } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
  return (
    <aside className="group relative flex h-screen w-16 flex-col items-center bg-gray-900 transition-all duration-300 hover:w-64 dark:bg-gray-950">
      <Link
        className="flex h-16 w-full items-center justify-center border-b border-gray-800 dark:border-gray-800"
        href="#"
      >
        <MountainIcon className="h-6 w-6 text-white" />
        <span className="ml-2 text-lg font-semibold text-white group-hover:block hidden">
          Acme Inc
        </span>
      </Link>
      <nav className="flex flex-1 flex-col items-start justify-start gap-2 overflow-auto p-4">
        <Link
          className="flex w-full items-center gap-4 rounded-md px-4 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white group-hover:justify-start"
          href="/"
        >
          <HomeIcon className="h-5 w-5" />
          <span className="group-hover:block hidden">Landing</span>
        </Link>
        <Link
          className="flex w-full items-center gap-4 rounded-md px-4 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white group-hover:justify-start"
          href="/dashboard"
        >
          <Grid3x3Icon className="h-5 w-5" />
          <span className="group-hover:block hidden">Dashboard</span>
        </Link>
        <Link
          className="flex w-full items-center gap-4 rounded-md px-4 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white group-hover:justify-start"
          href="#"
        >
          <BarChartIcon className="h-5 w-5" />
          <span className="group-hover:block hidden">Improvements</span>
        </Link>
        <Link
          className="flex w-full items-center gap-4 rounded-md px-4 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white group-hover:justify-start"
          href="#"
        >
          <SettingsIcon className="h-5 w-5" />
          <span className="group-hover:block hidden">Settings</span>
        </Link>
      </nav>
      <div className="flex flex-col items-center p-4 border-t border-gray-800 dark:border-gray-800 w-full">
        {isLoading && !(pathname === "/") && (
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white/50 mx-auto my-2"></div>
        )}
        {user?.picture && (
          <Image
            src={user.picture}
            alt="Profile picture"
            className="rounded-full"
            width={50}
            height={50}
          />
        )}
        {user && !user.picture && (
          <div className="h-7 w-7 rounded-full mx-auto my-2 bg-zic-800 text-xs flex- justify-center items-center">
            {user?.given_name?.[0]}
          </div>
        )}
        {user?.email && (
          <p className="group-hover:block hidden text-center text-xs mb-3">
            Logged in as {user.email}
          </p>
        )}
        {isAuthenticated && (
          <LogoutLink>
            <span className="group-hover:block hidden">Log out</span>
          </LogoutLink>
        )}
      </div>
    </aside>
  );
}
