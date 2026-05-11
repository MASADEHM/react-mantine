/**
 * App Header Component
 * Main header with navigation, language switch, and user menu
 */
import React from "react";
import {
  AppShell,
  Group,
  Button,
  Menu,
  Avatar,
  Indicator,
  Text,
  UnstyledButton,
  Anchor,
} from "@mantine/core";
import {
  IconMenu2,
  IconMenuDeep,
  IconBell,
  IconUser,
  IconLogout,
  IconSettings,
  IconWorld,
} from "@tabler/icons-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserStore, useUIStore, useNotificationStore } from "@/core/store";
import { ROUTES } from "@/config/routes";

interface AppHeaderProps {
  showSidebar?: boolean;
  onToggleSidebar?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  showSidebar = false,
  onToggleSidebar,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, getFullName, logout } = useUserStore();
  const { sidebarCollapsed, language, setLanguage } = useUIStore();
  const { getUnreadCount } = useNotificationStore();

  const isHomePage = location.pathname === "/";
  const unreadCount = getUnreadCount();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const handleLanguageChange = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    document.documentElement.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", newLang);
  };

  // Public navigation items
  const publicMenuItems = [
    { key: "/", label: t("common.home"), path: "/" },
    { key: "/about", label: t("common.about"), path: "/about" },
    { key: "/contact", label: t("common.contact"), path: "/contact" },
  ];

  return (
    <AppShell.Header
      style={{
        background: isHomePage ? "transparent" : "#fff",
        position: isHomePage ? "absolute" : "relative",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: isHomePage ? "none" : "0 1px 4px rgba(0, 0, 0, 0.08)",
        borderBottom: "none",
      }}
    >
      <Group
        justify="space-between"
        align="center"
        h="100%"
        px="lg"
      >
        {/* Left: Logo and Sidebar Toggle */}
        <Group gap="sm">
          {showSidebar && onToggleSidebar && (
            <Button
              variant="subtle"
              color={isHomePage ? "white" : "dark"}
              onClick={onToggleSidebar}
              p={8}
            >
              {sidebarCollapsed ? (
                <IconMenuDeep size={18} />
              ) : (
                <IconMenu2 size={18} />
              )}
            </Button>
          )}
          <Anchor
            component={Link}
            to="/"
            underline="never"
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: isHomePage ? "#fff" : "#003366",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {t("common.appName")}
          </Anchor>
        </Group>

        {/* Center: Public Navigation (only on public pages) */}
        {!showSidebar && (
          <Group gap="xl" style={{ flex: 1, justifyContent: "center" }}>
            {publicMenuItems.map((item) => (
              <Anchor
                key={item.key}
                component={Link}
                to={item.path}
                underline="never"
                style={{
                  color: isHomePage ? "#fff" : "#333",
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              >
                {item.label}
              </Anchor>
            ))}
          </Group>
        )}

        {/* Right: Actions */}
        <Group gap="md">
          {/* Language Switch */}
          <Button
            variant="subtle"
            color={isHomePage ? "white" : "dark"}
            leftSection={<IconWorld size={16} />}
            onClick={handleLanguageChange}
            styles={{
              root: {
                fontWeight: 500,
              },
            }}
          >
            {language === "en" ? "العربية" : "English"}
          </Button>

          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <Indicator
                color="red"
                size={16}
                label={unreadCount}
                disabled={unreadCount === 0}
              >
                <Button
                  variant="subtle"
                  color={isHomePage ? "white" : "dark"}
                  p={8}
                >
                  <IconBell size={18} />
                </Button>
              </Indicator>

              {/* User Menu */}
              <Menu
                shadow="md"
                width={200}
                position="bottom-end"
              >
                <Menu.Target>
                  <UnstyledButton>
                    <Group gap="xs">
                      <Avatar
                        size="sm"
                        radius="xl"
                        color={isHomePage ? "white" : "dubaiBlue"}
                        variant={isHomePage ? "outline" : "filled"}
                      >
                        <IconUser size={16} />
                      </Avatar>
                      <Text
                        size="sm"
                        style={{
                          color: isHomePage ? "#fff" : "#333",
                          maxWidth: 120,
                        }}
                        truncate
                      >
                        {getFullName() || user?.email}
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconUser size={14} />}
                    onClick={() => navigate(ROUTES.PROFILE)}
                  >
                    {t("common.profile")}
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconSettings size={14} />}
                    onClick={() => navigate(ROUTES.SETTINGS)}
                  >
                    {t("common.settings")}
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    color="red"
                    leftSection={<IconLogout size={14} />}
                    onClick={handleLogout}
                  >
                    {t("common.logout")}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          ) : (
            <Group gap="sm">
              <Button
                variant={isHomePage ? "outline" : "filled"}
                color={isHomePage ? "white" : "dubaiBlue"}
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                {t("common.login")}
              </Button>
              {isHomePage && (
                <Button
                  variant="filled"
                  color="dubaiBlue"
                  onClick={() => navigate(ROUTES.REGISTER)}
                >
                  {t("common.register")}
                </Button>
              )}
            </Group>
          )}
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default AppHeader;
