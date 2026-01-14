import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "consultant" | "contractor" | "owner" | "admin";

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
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  // User data
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  // Auth state
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;

  // Getters
  getFullName: () => string;
  getFullNameAr: () => string;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: true }),

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      login: (user, accessToken, refreshToken) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

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
    }),
    {
      name: "dubai-portal-user",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
