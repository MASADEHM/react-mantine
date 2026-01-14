/**
 * TanStack Query Client Configuration
 * Optimized for the DCCJ Portal
 */
import { QueryClient } from "@tanstack/react-query";

/**
 * Query client instance with default options
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes before considering it stale
      staleTime: 5 * 60 * 1000,

      // Keep unused data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,

      // Only retry once on failure
      retry: 1,

      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Don't refetch on window focus for better UX
      refetchOnWindowFocus: false,

      // Refetch on reconnect
      refetchOnReconnect: "always",

      // Network mode - always try to fetch
      networkMode: "always",
    },
    mutations: {
      // Retry mutations once
      retry: 1,

      // Network mode for mutations
      networkMode: "always",
    },
  },
});

/**
 * Query keys factory for type-safe query keys
 */
export const queryKeys = {
  // Auth
  auth: {
    all: ["auth"] as const,
    user: () => [...queryKeys.auth.all, "user"] as const,
  },

  // Projects
  projects: {
    all: ["projects"] as const,
    lists: () => [...queryKeys.projects.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.projects.lists(), filters] as const,
    details: () => [...queryKeys.projects.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.projects.details(), id] as const,
  },

  // Services
  services: {
    all: ["services"] as const,
    byProject: (projectId: string) =>
      [...queryKeys.services.all, "project", projectId] as const,
    detail: (serviceId: string) =>
      [...queryKeys.services.all, "detail", serviceId] as const,
  },

  // Documents
  documents: {
    all: ["documents"] as const,
    byProject: (projectId: string) =>
      [...queryKeys.documents.all, "project", projectId] as const,
  },

  // Contractors
  contractors: {
    all: ["contractors"] as const,
    list: () => [...queryKeys.contractors.all, "list"] as const,
    detail: (id: string) => [...queryKeys.contractors.all, "detail", id] as const,
  },

  // Notifications
  notifications: {
    all: ["notifications"] as const,
    unread: () => [...queryKeys.notifications.all, "unread"] as const,
  },
};

export default queryClient;
