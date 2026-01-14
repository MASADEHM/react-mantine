/**
 * Route Path Constants
 * Centralized route definitions for the DCCJ Portal
 */

export const ROUTES = {
  // Public routes
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  
  // Auth routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  UAE_PASS_CALLBACK: "/uae-pass/callback",

  // Consultant routes
  CONSULTANT: {
    DASHBOARD: "/consultant/dashboard",
    PROJECTS: "/consultant/projects",
    PROJECT_NEW: "/consultant/projects/new",
    PROJECT_DETAIL: (id: string) => `/consultant/projects/${id}`,
    PROJECT_SERVICE: (projectId: string, serviceId: string) =>
      `/consultant/projects/${projectId}/service/${serviceId}`,
    PROFILE: "/consultant/profile",
  },

  // Engineer routes
  ENGINEER: {
    DASHBOARD: "/engineer/dashboard",
    PROJECTS: "/engineer/projects",
    PROJECT_DETAIL: (id: string) => `/engineer/projects/${id}`,
  },

  // Contractor routes
  CONTRACTOR: {
    DASHBOARD: "/contractor/dashboard",
    PROJECTS: "/contractor/projects",
    PROJECT_DETAIL: (id: string) => `/contractor/projects/${id}`,
  },

  // Authority simulator routes
  AUTHORITY: {
    DASHBOARD: "/authority/dashboard",
    PENDING: "/authority/pending",
    REVIEW: (id: string) => `/authority/review/${id}`,
  },

  // Error routes
  NOT_FOUND: "/404",
  UNAUTHORIZED: "/401",
} as const;

export default ROUTES;
