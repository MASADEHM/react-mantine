/**
 * Central export for all Zustand stores
 * Use these hooks directly in components
 */

export { useUIStore } from "./uiStore";
export type { Theme, Language } from "./uiStore";

export { useUserStore } from "./userStore";
export type { User, UserRole } from "./userStore";

export { useNotificationStore } from "./notificationStore";
export type { Notification, NotificationType } from "./notificationStore";
