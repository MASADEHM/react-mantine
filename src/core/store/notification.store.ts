/**
 * Notification Store
 * Manages application notifications
 */
import { create } from "zustand";

/**
 * Notification types for DCCJ Portal
 */
export type NotificationType =
  | "project_created"
  | "service_submitted"
  | "service_approved"
  | "service_rejected"
  | "document_required"
  | "stage_unlocked"
  | "inspection_scheduled"
  | "comment_added"
  | "contractor_assigned"
  | "permit_issued"
  | "system";

/**
 * Notification interface
 */
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  projectId?: string;
  serviceId?: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationState {
  // Notifications list
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Getters
  getUnreadCount: () => number;
  getUnreadNotifications: () => Notification[];
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  // Initial state
  notifications: [],
  isLoading: false,
  error: null,

  // Actions
  setNotifications: (notifications) => set({ notifications }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearAll: () => set({ notifications: [] }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Getters
  getUnreadCount: () => {
    return get().notifications.filter((n) => !n.isRead).length;
  },

  getUnreadNotifications: () => {
    return get().notifications.filter((n) => !n.isRead);
  },
}));
