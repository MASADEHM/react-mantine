import React from "react";
import { Button, Menu, Text } from "@mantine/core";
import { IconWorld, IconCheck } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useUIStore } from "@/store/uiStore";

interface LanguageSwitchProps {
  showLabel?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "subtle" | "outline" | "filled";
}

const languages = [
  { key: "en", label: "English", nativeLabel: "English" },
  { key: "ar", label: "Arabic", nativeLabel: "العربية" },
];

/**
 * LanguageSwitch Component
 * Allows users to switch between English and Arabic
 * Automatically handles RTL switching
 */
export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  showLabel = true,
  size = "sm",
  variant = "subtle",
}) => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useUIStore();

  const handleLanguageChange = (key: string) => {
    const newLang = key as "en" | "ar";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const currentLanguage = languages.find((lang) => lang.key === language);

  return (
    <Menu shadow="md" width={150} position="bottom-end">
      <Menu.Target>
        <Button
          variant={variant}
          size={size}
          leftSection={<IconWorld size={16} />}
        >
          {showLabel && currentLanguage?.nativeLabel}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {languages.map((lang) => (
          <Menu.Item
            key={lang.key}
            onClick={() => handleLanguageChange(lang.key)}
            rightSection={lang.key === language ? <IconCheck size={14} /> : null}
          >
            <Text size="sm">{lang.nativeLabel}</Text>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default LanguageSwitch;
