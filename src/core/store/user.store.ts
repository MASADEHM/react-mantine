/**
 * User Store
 * Manages user authentication state
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { tokenStorage } from "@/core/storage";

/**
 * User roles for DCCJ Portal
 */
export type UserRole =
  | "consultant_admin"    // Full project & submission management
  | "project_engineer"    // View & draft access
  | "contractor"          // Limited view/submit for assigned projects
  | "authority_simulator"; // Mock approval interface

/**
 * Consultant license categories
 */
export type LicenseCategory = "G+4" | "G+12" | "Unlimited";

/**
 * User interface
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  firstNameAr?: string;
  lastNameAr?: string;
  phone: string;
  emiratesId?: string;
  role: UserRole;
  avatar?: string;
  companyName?: string;
  companyNameAr?: string;
  licenseNumber?: string;
  licenseCategory?: LicenseCategory; // For consultants
  excellenceRating?: number; // DM Excellence Rating (1-5)
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  // User data
  user: User | null;

  // Auth state
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User) => void;
  login: (user: User, accessToken: string, refreshToken?: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;

  // Getters
  getFullName: () => string;
  getFullNameAr: () => string;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  canCreateProject: (projectCategory: LicenseCategory) => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: true }),

      login: (user, accessToken, refreshToken) => {
        // Store tokens
        tokenStorage.setToken(accessToken);
        if (refreshToken) {
          tokenStorage.setRefreshToken(refreshToken);
        }
        
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        // Clear tokens
        tokenStorage.clearTokens();
        
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      setLoading: (loading) => set({ isLoading: loading }),

      // Getters
      getFullName: () => {
        const user = get().user;
        if (!user) return "";
        return `${user.firstName} ${user.lastName}`;
      },

      getFullNameAr: () => {
        const user = get().user;
        if (!user) return "";
        return `${user.firstNameAr || user.firstName} ${user.lastNameAr || user.lastName}`;
      },

      hasRole: (roles) => {
        const user = get().user;
        if (!user) return false;
        const rolesArray = Array.isArray(roles) ? roles : [roles];
        return rolesArray.includes(user.role);
      },

      /**
       * Check if user can create a project of given category
       * Based on license category restrictions
       */
      canCreateProject: (projectCategory) => {
        const user = get().user;
        if (!user || user.role !== "consultant_admin") return false;
        
        const licenseCategory = user.licenseCategory;
        if (!licenseCategory) return false;

        // License restrictions
        const allowedCategories: Record<LicenseCategory, LicenseCategory[]> = {
          "G+4": ["G+4"],
          "G+12": ["G+4", "G+12"],
          "Unlimited": ["G+4", "G+12", "Unlimited"],
        };

        return allowedCategories[licenseCategory].includes(projectCategory);
      },
    }),
    {
      name: "dccj-user",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
