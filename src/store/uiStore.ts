import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";
export type Language = "en" | "ar";

interface UIState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Sidebar
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Modals
  activeModal: string | null;
  modalData: Record<string, unknown> | null;
  openModal: (modalId: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;

  // Notifications
  unreadNotificationsCount: number;
  setUnreadCount: (count: number) => void;
  incrementUnreadCount: () => void;
  decrementUnreadCount: () => void;

  // Loading states
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Theme
      theme: "light",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),

      // Sidebar
      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      // Language
      language: "en",
      setLanguage: (language) => set({ language }),

      // Modals
      activeModal: null,
      modalData: null,
      openModal: (modalId, data = {}) =>
        set({ activeModal: modalId, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: null }),

      // Notifications
      unreadNotificationsCount: 0,
      setUnreadCount: (count) => set({ unreadNotificationsCount: count }),
      incrementUnreadCount: () =>
        set((state) => ({
          unreadNotificationsCount: state.unreadNotificationsCount + 1,
        })),
      decrementUnreadCount: () =>
        set((state) => ({
          unreadNotificationsCount: Math.max(
            0,
            state.unreadNotificationsCount - 1
          ),
        })),

      // Loading states
      globalLoading: false,
      setGlobalLoading: (loading) => set({ globalLoading: loading }),
    }),
    {
      name: "dubai-portal-ui",
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
