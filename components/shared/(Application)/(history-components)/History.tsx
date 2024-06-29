"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import { getWebsitesFromUserCache } from "@/lib/utils/hooks/(redisHooks)/RedisHooks";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useDeleteImprovement } from "@/lib/utils/hooks/(react-query)/deleteImprovement";

export default function ListHistory() {
  const { user } = useKindeBrowserClient();
  const { handleDeleteImprovement } = useDeleteImprovement(user?.id as string);

  const { data: history, isLoading } = useQuery({
    queryKey: ["getHistoryList", user?.id],
    queryFn: ({ queryKey }) => getWebsitesFromUserCache(queryKey[1] as string),
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <section className="mb-6 text-gray-700 dark:text-gray-300 text-sm lg:text-base font-semibold">
        Please note: Generated Improvements will be available for a limited time
        according to your plan&apos;s retention policy. After this period, the
        improvements will no longer be accessible. Ensure you review and save
        any important data before it expires.
      </section>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-7 w-7 mx-auto my-2 border-b-2 border-gray-700 dark:border-white/50"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {history && history.length > 0 ? (
            history.map((item, index) => {
              const hours = Math.round((item.expiration ?? 0) / 3600);
              return (
                <div
                  key={index}
                  className="relative group overflow-hidden text-xs font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out"
                >
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-80 dark:bg-gray-950 dark:bg-opacity-80 p-6 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-full max-w-md space-y-4">
                      <h3 className="text-xl font-bold">{item.market}</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Audience: {item.audience}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {item.insights}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-red-600 dark:text-red-600 font-bold">
                          Expires in: {hours}h
                        </p>
                        <div className="flex justify-end p-4">
                          <Link href={`/history/${item.threadId}`}>
                            <Button
                              className="cursor-pointer"
                              variant="outline"
                            >
                              Go to Improvement
                            </Button>
                          </Link>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <TrashIcon />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your improvement and remove
                                your data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteImprovement(
                                    item.url,
                                    item.threadId,
                                    item.screenshots,
                                  )
                                }
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                  {item.screenshots && item.screenshots.length > 0 && (
                    <Image
                      src={item.screenshots[0]}
                      alt="Improvement Screenshot"
                      loading="lazy"
                      width={500}
                      height={400}
                      className="object-cover w-full h-64 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:blur-sm"
                    />
                  )}
                </div>
              );
            })
          ) : (
            <p>No history found for this user.</p>
          )}
        </div>
      )}
    </div>
  );
}
