import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUIStore } from "@/store/uiStore";

/**
 * Custom hook for language management
 * Syncs i18next with Zustand store and handles RTL
 */
export const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const { language, setLanguage } = useUIStore();

  // Sync i18next with store on mount
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  // Update document direction when language changes
  useEffect(() => {
    const isRTL = language === "ar";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = useCallback(
    (newLanguage: "en" | "ar") => {
      setLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
    },
    [i18n, setLanguage]
  );

  const toggleLanguage = useCallback(() => {
    const newLanguage = language === "en" ? "ar" : "en";
    changeLanguage(newLanguage);
  }, [language, changeLanguage]);

  const isRTL = language === "ar";
  const isArabic = language === "ar";
  const isEnglish = language === "en";

  return {
    language,
    isRTL,
    isArabic,
    isEnglish,
    changeLanguage,
    toggleLanguage,
    t,
    i18n,
  };
};

export default useLanguage;
