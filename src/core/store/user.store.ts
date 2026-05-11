/**
 * User Store
 * Manages user authentication state
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { tokenStorage } from "@/core/storage";

export type UserRole = "admin" | "user" | "guest";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User) => void;
  login: (user: User, accessToken: string, refreshToken?: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;

  getFullName: () => string;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      login: (user, accessToken, refreshToken) => {
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

      getFullName: () => {
        const user = get().user;
        if (!user) return "";
        return `${user.firstName} ${user.lastName}`;
      },

      hasRole: (roles) => {
        const user = get().user;
        if (!user) return false;
        const rolesArray = Array.isArray(roles) ? roles : [roles];
        return rolesArray.includes(user.role);
      },
    }),
    {
      name: "app-user",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
