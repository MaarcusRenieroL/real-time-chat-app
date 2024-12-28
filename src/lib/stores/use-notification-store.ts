import { create } from "zustand";
import { Notification } from "../types";

type NotificationStore = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAllAsRead: () => void;
  markAsRead: (id: number) => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({
        ...n,
        unread: false,
      })),
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, unread: false } : n,
      ),
    })),
}));
