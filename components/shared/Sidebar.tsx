import {
  Grid3x3Icon,
  HomeIcon,
  MountainIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="flex h-screen w-full">
      <div className="group relative flex h-full w-16 flex-col items-center bg-gray-900 transition-all duration-300 hover:w-64 dark:bg-gray-950">
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
            href="#"
          >
            <HomeIcon className="h-5 w-5" />
            <span className="group-hover:block hidden">Home</span>
          </Link>
          <Link
            className="flex w-full items-center gap-4 rounded-md px-4 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white group-hover:justify-start"
            href="#"
          >
            <Grid3x3Icon className="h-5 w-5" />
            <span className="group-hover:block hidden">Dashboard</span>
          </Link>
          <Link
            className="flex w-full items-center gap-4 rounded-md px-4 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white group-hover:justify-start"
            href="#"
          >
            <UsersIcon className="h-5 w-5" />
            <span className="group-hover:block hidden">Users</span>
          </Link>
          <Link
            className="flex w-full items-center gap-4 rounded-md px-4 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white group-hover:justify-start"
            href="#"
          >
            <SettingsIcon className="h-5 w-5" />
            <span className="group-hover:block hidden">Settings</span>
          </Link>
        </nav>
      </div>
      <main className="flex-1 bg-gray-100 dark:bg-gray-900 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Welcome to the Dashboard
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          This is the main content area of the application.
        </p>
      </main>
    </div>
  );
}
