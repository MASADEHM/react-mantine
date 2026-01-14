/**
 * Mantine Configuration Provider
 * Provides theme, locale, and RTL support
 */
import React, { useEffect } from "react";
import { MantineProvider, DirectionProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { dubaiGovTheme, rtlFontFamily } from "@/app/styles/theme";
import { useUIStore } from "@/core/store";

interface MantineConfigProviderProps {
  children: React.ReactNode;
}

export const MantineConfigProvider: React.FC<MantineConfigProviderProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useUIStore();

  const isArabic = i18n.language === "ar";
  const direction = isArabic ? "rtl" : "ltr";

  // Sync language with i18n
  useEffect(() => {
    const newDirection = isArabic ? "rtl" : "ltr";

    // Update document attributes
    document.documentElement.setAttribute("dir", newDirection);
    document.documentElement.setAttribute("lang", i18n.language);
    document.body.classList.toggle("rtl", isArabic);
    document.body.classList.toggle("ltr", !isArabic);

    // Sync store if different
    if ((isArabic && language !== "ar") || (!isArabic && language !== "en")) {
      setLanguage(isArabic ? "ar" : "en");
    }
  }, [i18n.language, language, setLanguage, isArabic]);

  // Create theme with RTL font if Arabic
  const theme = isArabic
    ? {
        ...dubaiGovTheme,
        fontFamily: rtlFontFamily,
        headings: {
          ...dubaiGovTheme.headings,
          fontFamily: rtlFontFamily,
        },
      }
    : dubaiGovTheme;

  return (
    <DirectionProvider initialDirection={direction} detectDirection={false}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <Notifications position="top-right" />
        {children}
      </MantineProvider>
    </DirectionProvider>
  );
};

export default MantineConfigProvider;
