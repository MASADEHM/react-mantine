/**
 * i18n Configuration
 * Internationalization setup for English and Arabic
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { env } from "./env";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    debug: env.isDev,
    
    interpolation: {
      escapeValue: false, // React already escapes
    },
    
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "dccj_language",
    },
    
    react: {
      useSuspense: true,
    },
  });

export default i18n;
