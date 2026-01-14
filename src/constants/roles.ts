/**
 * User Roles and Permissions
 */

import type { UserRole, LicenseCategory } from "@/core/store";

/**
 * Role display names
 */
export const ROLE_NAMES: Record<UserRole, { en: string; ar: string }> = {
  consultant_admin: {
    en: "Civil Consultant",
    ar: "استشاري مدني",
  },
  project_engineer: {
    en: "Project Engineer",
    ar: "مهندس مشروع",
  },
  contractor: {
    en: "Contractor",
    ar: "مقاول",
  },
  authority_simulator: {
    en: "Authority Simulator",
    ar: "محاكي السلطة",
  },
};

/**
 * License category display names
 */
export const LICENSE_CATEGORY_NAMES: Record<LicenseCategory, { en: string; ar: string }> = {
  "G+4": {
    en: "G+4 (Up to 4 floors)",
    ar: "أرضي+4 (حتى 4 طوابق)",
  },
  "G+12": {
    en: "G+12 (Up to 12 floors)",
    ar: "أرضي+12 (حتى 12 طابق)",
  },
  "Unlimited": {
    en: "Unlimited",
    ar: "غير محدود",
  },
};

/**
 * License category restrictions
 * Maps what project categories each license can create
 */
export const LICENSE_RESTRICTIONS: Record<LicenseCategory, LicenseCategory[]> = {
  "G+4": ["G+4"],
  "G+12": ["G+4", "G+12"],
  "Unlimited": ["G+4", "G+12", "Unlimited"],
};

/**
 * Role-based permissions
 */
export const PERMISSIONS = {
  // Project permissions
  CREATE_PROJECT: ["consultant_admin"],
  EDIT_PROJECT: ["consultant_admin", "project_engineer"],
  VIEW_PROJECT: ["consultant_admin", "project_engineer", "contractor"],
  DELETE_PROJECT: ["consultant_admin"],

  // Service permissions
  SUBMIT_SERVICE: ["consultant_admin"],
  DRAFT_SERVICE: ["consultant_admin", "project_engineer"],
  VIEW_SERVICE: ["consultant_admin", "project_engineer", "contractor"],

  // Document permissions
  UPLOAD_DOCUMENT: ["consultant_admin", "project_engineer", "contractor"],
  DELETE_DOCUMENT: ["consultant_admin"],
  VIEW_DOCUMENT: ["consultant_admin", "project_engineer", "contractor"],

  // Authority permissions
  APPROVE_SERVICE: ["authority_simulator"],
  REJECT_SERVICE: ["authority_simulator"],

  // Contractor permissions
  SELECT_CONTRACTOR: ["consultant_admin"],
} as const;

/**
 * Check if a role has a specific permission
 */
export const hasPermission = (
  role: UserRole,
  permission: keyof typeof PERMISSIONS
): boolean => {
  const allowedRoles = PERMISSIONS[permission] as readonly string[];
  return allowedRoles.includes(role);
};
