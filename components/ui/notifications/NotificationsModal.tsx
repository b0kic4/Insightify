"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotifications,
  clearNotifications,
  Notification,
} from "@/lib/utils/hooks/(react-query)/fetchNotifications";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "../button";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { user } = useKindeBrowserClient();

  const { data: notifications = [], isLoading } = useQuery<Notification[]>({
    queryKey: ["notifications", user?.id],
    queryFn: ({ queryKey }) => fetchNotifications(queryKey[1] as string),
    enabled: !!user?.id,
  });

  type ClearNotificationsContext = { previousNotifications: Notification[] };

  const clearMutation = useMutation<
    void,
    Error,
    void,
    ClearNotificationsContext
  >({
    mutationKey: ["clearNotifications", user?.id],
    mutationFn: () => clearNotifications(user?.id as string),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["notifications", user?.id],
      });

      const previousNotifications = queryClient.getQueryData<Notification[]>([
        "notifications",
        user?.id,
      ]);

      queryClient.setQueryData(["notifications", user?.id], () => []);

      return { previousNotifications: previousNotifications || [] };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["notifications", user?.id],
        context?.previousNotifications,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] });
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            Alerts
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            &times;
          </button>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-7 w-7 mx-auto my-2 border-b-2 border-gray-700 dark:border-white/50"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex justify-center items-center">
            <p className="text-gray-700 dark:text-gray-300">
              No new notifications
            </p>
          </div>
        ) : (
          <>
            <ul className="space-y-4 overflow-y-auto">
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow"
                >
                  <p className="text-gray-800 dark:text-gray-200">
                    {notification.message}
                  </p>
                </li>
              ))}
            </ul>
            <Button
              disabled={clearMutation.isPending}
              onClick={() => clearMutation.mutate()}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              {clearMutation.isPending && isLoading
                ? "Clearing..."
                : "Clear All Notifications"}
            </Button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default NotificationModal;
