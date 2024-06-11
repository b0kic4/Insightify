import { CachedAIResponse } from "@/lib";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ListHistoryProps {
  history: CachedAIResponse[];
}

export default function ListHistory({ history }: ListHistoryProps) {
  // NOTE: Add for every improvement:
  // 1. "EX" time
  // 2. delete improvement

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <section className="mb-6 text-gray-700 dark:text-gray-300">
        Please note: The improvements listed in your history are stored based on
        your current subscription plan. Improvements will be available for a
        limited time according to your plan&apos;s retention policy. After this
        period, the improvements will no longer be accessible. Ensure you review
        and save any important data before it expires.
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {history.length > 0 ? (
          history.map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all duration-500 ease-in-out"
            >
              <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-500">
                <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
                  <h3 className="text-xl font-bold">{item.market}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Audience: {item.audience}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {item.insights}
                  </p>
                  <div className="flex justify-end p-4">
                    <Link href={`/history/${item.url}`}>
                      <Button variant="outline">Go to Improvement</Button>
                    </Link>
                  </div>
                </div>
              </div>
              {item.screenshots && item.screenshots.length > 0 && (
                <Image
                  src={item.screenshots[0]}
                  alt="Improvement Screenshot"
                  width={500}
                  height={400}
                  className="object-cover w-full h-64 transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              )}
            </div>
          ))
        ) : (
          <p>No history found for this user.</p>
        )}
      </div>
    </div>
  );
}