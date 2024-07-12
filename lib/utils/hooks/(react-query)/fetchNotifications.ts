export interface Notification {
  userId: string;
  message: string;
}

export const fetchNotifications = async (
  userId: string,
): Promise<Notification[]> => {
  const response = await fetch(`/api/notifications?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }
  return response.json();
};

export const clearNotifications = async (userId: string): Promise<void> => {
  const response = await fetch(`/api/notifications?userId=${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to clear notifications");
  }
};
