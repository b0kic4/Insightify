"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { IoIosNotifications } from "react-icons/io";
import NotificationModal from "./NotificationsModal";
import { useQuery } from "@tanstack/react-query";
import {
  fetchNotifications,
  Notification,
} from "@/lib/utils/hooks/(react-query)/fetchNotifications";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const NotificationsButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { user } = useKindeBrowserClient();

  const { data: notifications = [] } = useQuery<Notification[]>({
    queryKey: ["notifications", user?.id],
    queryFn: () => fetchNotifications(user?.id as string),
    enabled: !!user?.id,
  });

  return (
    <>
      <Button
        variant="ghost"
        className="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        onClick={toggleModal}
      >
        <IoIosNotifications className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <span className="hidden md:block text-gray-900 dark:text-gray-50">
          Alerts
        </span>
      </Button>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        notifications={notifications}
      />
    </>
  );
};

export default NotificationsButton;
