/**
 * Settings Page
 * Generic app settings.
 */
import React from "react";
import {
  Box,
  Card,
  Title,
  Text,
  Stack,
  Switch,
  Select,
  Divider,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useUIStore } from "@/core/store";

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage, theme, setTheme } = useUIStore();

  const handleLanguageChange = (value: string | null) => {
    const next = (value ?? "en") as "en" | "ar";
    setLanguage(next);
    i18n.changeLanguage(next);
    document.documentElement.setAttribute("dir", next === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", next);
  };

  return (
    <Box style={{ maxWidth: 720, margin: "0 auto" }} p="lg">
      <Title order={2} mb="lg">
        {t("common.settings")}
      </Title>

      <Card shadow="sm" radius="md" withBorder p="xl">
        <Stack gap="lg">
          <Box>
            <Text fw={600} mb="xs">
              Appearance
            </Text>
            <Switch
              label="Dark mode"
              checked={theme === "dark"}
              onChange={(e) =>
                setTheme(e.currentTarget.checked ? "dark" : "light")
              }
            />
          </Box>

          <Divider />

          <Box>
            <Text fw={600} mb="xs">
              Language
            </Text>
            <Select
              value={language}
              onChange={handleLanguageChange}
              data={[
                { value: "en", label: "English" },
                { value: "ar", label: "العربية" },
              ]}
              maw={240}
            />
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default SettingsPage;
