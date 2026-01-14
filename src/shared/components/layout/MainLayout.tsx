/**
 * Main Layout Component
 * Full-width layout for authenticated pages (no sidebar)
 */
import React from "react";
import { AppShell, Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import bgDashboard from "@/assets/bg_dashboardbp.png";

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <AppShell
      header={{ height: 64 }}
      padding={0}
      styles={{
        main: {
          minHeight: "100vh",
          backgroundImage: `url(${bgDashboard})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        },
      }}
    >
      {/* Header */}
      <AppHeader />

      {/* Main Content - Full Width */}
      <AppShell.Main>
        <Box
          style={{
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {children || <Outlet />}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
