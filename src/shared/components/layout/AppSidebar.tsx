/**
 * App Sidebar Component
 * Main navigation sidebar for authenticated users
 */
import React from "react";
import { AppShell, NavLink, Text, Box, Divider, ScrollArea } from "@mantine/core";
import {
  IconDashboard,
  IconFolder,
  IconFolderPlus,
  IconFileText,
  IconUsers,
  IconBell,
  IconSettings,
  IconShieldCheck,
  IconFolders,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserStore, useUIStore } from "@/core/store";
import { ROUTES } from "@/config/routes";

interface AppSidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  collapsed,
}) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { user, hasRole } = useUserStore();
  const { sidebarCollapsed } = useUIStore();

  const isCollapsed = collapsed ?? sidebarCollapsed;

  // Check if path is active
  const isActive = (path: string) => {
    if (path === location.pathname) return true;
    // Match parent paths for nested routes
    if (location.pathname.startsWith(path) && path !== "/") return true;
    return false;
  };

  return (
    <AppShell.Navbar
      p="md"
      style={{
        background: "#fff",
        borderRight: "1px solid #f0f0f0",
      }}
    >
      {/* User Info */}
      {!isCollapsed && (
        <Box
          pb="md"
          mb="md"
          style={{
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Text fw={600} c="#003366" size="sm">
            {user?.companyName || t("common.consultant")}
          </Text>
          <Text size="xs" c="dimmed">
            {user?.licenseNumber}
          </Text>
        </Box>
      )}

      {/* Navigation Menu */}
      <ScrollArea style={{ flex: 1 }}>
        {/* Consultant/Engineer menu */}
        {hasRole(["consultant_admin", "project_engineer"]) && (
          <>
            <NavLink
              component={Link}
              to={ROUTES.CONSULTANT.DASHBOARD}
              label={!isCollapsed ? t("nav.dashboard") : undefined}
              leftSection={<IconDashboard size={18} />}
              active={isActive(ROUTES.CONSULTANT.DASHBOARD)}
              variant="light"
              color="dubaiBlue"
            />

            <NavLink
              label={!isCollapsed ? t("nav.projects") : undefined}
              leftSection={<IconFolders size={18} />}
              childrenOffset={28}
              defaultOpened={location.pathname.includes("/projects")}
            >
              <NavLink
                component={Link}
                to={ROUTES.CONSULTANT.PROJECTS}
                label={t("nav.allProjects")}
                leftSection={<IconFolder size={16} />}
                active={isActive(ROUTES.CONSULTANT.PROJECTS)}
                variant="light"
                color="dubaiBlue"
              />
              <NavLink
                component={Link}
                to={ROUTES.CONSULTANT.PROJECT_NEW}
                label={t("nav.newProject")}
                leftSection={<IconFolderPlus size={16} />}
                active={isActive(ROUTES.CONSULTANT.PROJECT_NEW)}
                variant="light"
                color="dubaiBlue"
              />
            </NavLink>

            <NavLink
              label={!isCollapsed ? t("nav.documents") : undefined}
              leftSection={<IconFileText size={18} />}
              variant="light"
            />

            <NavLink
              label={!isCollapsed ? t("nav.contractors") : undefined}
              leftSection={<IconUsers size={18} />}
              variant="light"
            />
          </>
        )}

        {/* Contractor menu */}
        {hasRole(["contractor"]) && (
          <>
            <NavLink
              component={Link}
              to={ROUTES.CONTRACTOR.DASHBOARD}
              label={!isCollapsed ? t("nav.dashboard") : undefined}
              leftSection={<IconDashboard size={18} />}
              active={isActive(ROUTES.CONTRACTOR.DASHBOARD)}
              variant="light"
              color="dubaiBlue"
            />
            <NavLink
              component={Link}
              to={ROUTES.CONTRACTOR.PROJECTS}
              label={!isCollapsed ? t("nav.assignedProjects") : undefined}
              leftSection={<IconFolder size={18} />}
              active={isActive(ROUTES.CONTRACTOR.PROJECTS)}
              variant="light"
              color="dubaiBlue"
            />
          </>
        )}

        {/* Authority Simulator menu */}
        {hasRole(["authority_simulator"]) && (
          <>
            <NavLink
              component={Link}
              to={ROUTES.AUTHORITY.DASHBOARD}
              label={!isCollapsed ? t("nav.dashboard") : undefined}
              leftSection={<IconDashboard size={18} />}
              active={isActive(ROUTES.AUTHORITY.DASHBOARD)}
              variant="light"
              color="dubaiBlue"
            />
            <NavLink
              component={Link}
              to={ROUTES.AUTHORITY.PENDING}
              label={!isCollapsed ? t("nav.pendingReview") : undefined}
              leftSection={<IconShieldCheck size={18} />}
              active={isActive(ROUTES.AUTHORITY.PENDING)}
              variant="light"
              color="dubaiBlue"
            />
          </>
        )}

        <Divider my="md" />

        {/* Common items */}
        <NavLink
          label={!isCollapsed ? t("nav.notifications") : undefined}
          leftSection={<IconBell size={18} />}
          variant="light"
        />
        <NavLink
          label={!isCollapsed ? t("nav.settings") : undefined}
          leftSection={<IconSettings size={18} />}
          variant="light"
        />
      </ScrollArea>
    </AppShell.Navbar>
  );
};

export default AppSidebar;
