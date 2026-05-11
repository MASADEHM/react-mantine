/**
 * Application Router
 */
import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Loader, Center } from "@mantine/core";
import { ROUTES } from "@/config/routes";
import { MainLayout, PublicLayout } from "@/shared/components/layout";
import { PrivateRoute } from "@/shared/guards";

const PageLoader: React.FC = () => (
  <Center style={{ height: "100vh" }}>
    <Loader size="lg" />
  </Center>
);

// Public pages
const HomePage = lazy(() => import("@/pages/home"));
const AboutPage = lazy(() => import("@/pages/about"));
const ContactPage = lazy(() => import("@/pages/contactus"));
const LoginPage = lazy(() => import("@/pages/login"));
const SignupPage = lazy(() => import("@/pages/signup"));

// Authenticated pages
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const SettingsPage = lazy(() => import("@/pages/settings"));

// Error pages
const NotFoundPage = lazy(() => import("@/pages/not-found"));

const router = createBrowserRouter([
  // Public routes
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <PublicLayout />
      </Suspense>
    ),
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
    ],
  },

  // Auth routes (no footer)
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <PublicLayout showFooter={false} />
      </Suspense>
    ),
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <SignupPage /> },
    ],
  },

  // Authenticated routes
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      </Suspense>
    ),
    children: [
      { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
      { path: ROUTES.PROFILE, element: <ProfilePage /> },
      { path: ROUTES.SETTINGS, element: <SettingsPage /> },
    ],
  },

  // 404
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

export default router;
