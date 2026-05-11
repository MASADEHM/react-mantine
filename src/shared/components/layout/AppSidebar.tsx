/**
 * App Sidebar Component
 * Main navigation sidebar for authenticated users.
 */
import React from "react";
import { AppShell, NavLink, ScrollArea } from "@mantine/core";
import {
  IconDashboard,
  IconUser,
  IconSettings,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUIStore } from "@/core/store";
import { ROUTES } from "@/config/routes";

interface AppSidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { sidebarCollapsed } = useUIStore();

  const isCollapsed = collapsed ?? sidebarCollapsed;

  const isActive = (path: string) => {
    if (path === location.pathname) return true;
    if (location.pathname.startsWith(path) && path !== "/") return true;
    return false;
  };

  const items = [
    {
      to: ROUTES.DASHBOARD,
      label: t("common.dashboard", "Dashboard"),
      icon: <IconDashboard size={18} />,
    },
    {
      to: ROUTES.PROFILE,
      label: t("common.profile"),
      icon: <IconUser size={18} />,
    },
    {
      to: ROUTES.SETTINGS,
      label: t("common.settings"),
      icon: <IconSettings size={18} />,
    },
  ];

  return (
    <AppShell.Navbar
      p="md"
      style={{
        background: "#fff",
        borderRight: "1px solid #f0f0f0",
      }}
    >
      <ScrollArea style={{ flex: 1 }}>
        {items.map((item) => (
          <NavLink
            key={item.to}
            component={Link}
            to={item.to}
            label={!isCollapsed ? item.label : undefined}
            leftSection={item.icon}
            active={isActive(item.to)}
            variant="light"
          />
        ))}
      </ScrollArea>
    </AppShell.Navbar>
  );
};

export default AppSidebar;
