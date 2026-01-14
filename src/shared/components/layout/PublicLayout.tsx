/**
 * Public Layout Component
 * Layout for public pages (home, about, contact, login, etc.)
 */
import React from "react";
import { AppShell, Box } from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";
import bgDashboard from "@/assets/bg_dashboardbp.png";

interface PublicLayoutProps {
  children?: React.ReactNode;
  showFooter?: boolean;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
  children,
  showFooter = true,
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <AppShell
      header={{ height: 64 }}
      padding={0}
      styles={{
        main: {
          minHeight: "100vh",
          ...(isHomePage
            ? { background: "transparent" }
            : {
                backgroundImage: `url(${bgDashboard})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
              }),
        },
      }}
    >
      {/* Header - Fixed on home, relative on other pages */}
      <AppHeader />

      {/* Main Content */}
      <AppShell.Main>
        <Box
          style={{
            marginTop: isHomePage ? 0 : 64,
            flex: 1,
          }}
        >
          {children || <Outlet />}
        </Box>

        {/* Footer - Don't show on home page as it has its own CTA section */}
        {showFooter && !isHomePage && <AppFooter />}
      </AppShell.Main>
    </AppShell>
  );
};

export default PublicLayout;
