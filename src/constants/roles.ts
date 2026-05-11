/**
 * User Roles and Permissions
 */

import type { UserRole } from "@/core/store";

export const ROLE_NAMES: Record<UserRole, string> = {
  admin: "Administrator",
  user: "User",
  guest: "Guest",
};

export const PERMISSIONS = {
  VIEW_DASHBOARD: ["admin", "user"],
  MANAGE_USERS: ["admin"],
  EDIT_SETTINGS: ["admin", "user"],
} as const;

export const hasPermission = (
  role: UserRole,
  permission: keyof typeof PERMISSIONS
): boolean => {
  const allowedRoles = PERMISSIONS[permission] as readonly string[];
  return allowedRoles.includes(role);
};
