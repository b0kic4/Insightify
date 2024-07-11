import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: { message: string }[];
  onClear: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onClear,
}) => {
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
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Alerts</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} className="border-b py-2">
              {notification.message}
            </li>
          ))}
        </ul>
        <button
          onClick={onClear}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Clear Notifications
        </button>
      </motion.div>
    </div>
  );
};

export default NotificationModal;
