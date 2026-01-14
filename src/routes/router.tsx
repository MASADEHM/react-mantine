/**
 * Application Router
 * Centralized route configuration for DCCJ Portal
 */
import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Loader, Center } from "@mantine/core";
import { ROUTES } from "@/config/routes";
import { MainLayout, PublicLayout } from "@/shared/components/layout";
import { PrivateRoute, ConsultantRoute } from "@/shared/guards";

// Loading component
const PageLoader: React.FC = () => (
  <Center style={{ height: "100vh" }}>
    <Loader size="lg" color="dubaiBlue" />
  </Center>
);

// Lazy load pages for code splitting
// Public pages
const HomePage = lazy(() => import("@/pages/home"));
const AboutPage = lazy(() => import("@/pages/about"));
const ContactPage = lazy(() => import("@/pages/contactus"));
const LoginPage = lazy(() => import("@/pages/login"));
const SignupPage = lazy(() => import("@/pages/signup"));

// Consultant pages
const ConsultantDashboard = lazy(() => import("@/pages/consultant/DashboardPage"));
const ProjectsPage = lazy(() => import("@/pages/consultant/ApplicationsPage")); // TODO: Rename to ProjectsPage
const NewProjectPage = lazy(() => import("@/pages/consultant/NewApplicationPage")); // TODO: Rename to NewProjectPage
const ProjectDetailPage = lazy(() => import("@/pages/consultant/ApplicationDetailPage")); // TODO: Rename
const ProfilePage = lazy(() => import("@/pages/consultant/ProfilePage"));

// Error pages
const NotFoundPage = lazy(() => 
  Promise.resolve({ 
    default: () => <div style={{ textAlign: "center", padding: 100 }}>
      <h1>404</h1>
      <p>Page not found</p>
    </div> 
  })
);

/**
 * Route configuration
 */
const router = createBrowserRouter([
  // Public Routes with PublicLayout
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <PublicLayout />
      </Suspense>
    ),
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.CONTACT,
        element: <ContactPage />,
      },
    ],
  },

  // Auth Routes (no layout footer)
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <PublicLayout showFooter={false} />
      </Suspense>
    ),
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTER,
        element: <SignupPage />,
      },
    ],
  },

  // Consultant Routes with MainLayout
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <PrivateRoute>
          <ConsultantRoute>
            <MainLayout />
          </ConsultantRoute>
        </PrivateRoute>
      </Suspense>
    ),
    children: [
      {
        path: ROUTES.CONSULTANT.DASHBOARD,
        element: <ConsultantDashboard />,
      },
      {
        path: ROUTES.CONSULTANT.PROJECTS,
        element: <ProjectsPage />,
      },
      {
        path: ROUTES.CONSULTANT.PROJECT_NEW,
        element: <NewProjectPage />,
      },
      {
        path: "/consultant/projects/:id",
        element: <ProjectDetailPage />,
      },
      {
        path: ROUTES.CONSULTANT.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },

  // Legacy routes - redirect to new paths
  {
    path: "/consultant/applications",
    element: <Navigate to={ROUTES.CONSULTANT.PROJECTS} replace />,
  },
  {
    path: "/consultant/applications/:id",
    element: <Navigate to={ROUTES.CONSULTANT.PROJECTS} replace />,
  },

  // 404 Not Found
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
