/**
 * Application Configuration
 * Global app settings for the DCCJ Portal
 */

export const appConfig = {
  /**
   * Application name
   */
  name: "Dubai Civil Consultant Journey Portal",
  shortName: "DCCJ Portal",

  /**
   * Supported languages
   */
  languages: ["en", "ar"] as const,
  defaultLanguage: "en" as const,

  /**
   * Date/time formats
   */
  dateFormat: "DD/MM/YYYY",
  dateTimeFormat: "DD/MM/YYYY HH:mm",
  timeFormat: "HH:mm",

  /**
   * Pagination defaults
   */
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
  },

  /**
   * File upload settings
   */
  upload: {
    maxFileSize: 50 * 1024 * 1024, // 50MB
    maxFiles: 10,
    acceptedImageFormats: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    acceptedDocumentFormats: [".pdf", ".doc", ".docx", ".xls", ".xlsx"],
    acceptedCADFormats: [".dwg", ".dxf"],
    acceptedBIMFormats: [".ifc", ".rvt", ".rfa"],
  },

  /**
   * Session settings
   */
  session: {
    tokenRefreshThreshold: 5 * 60 * 1000, // 5 minutes before expiry
    inactivityTimeout: 30 * 60 * 1000, // 30 minutes
  },

  /**
   * Debounce delays
   */
  debounce: {
    search: 300,
    autosave: 2000,
  },

  /**
   * Toast/notification settings
   */
  notification: {
    duration: 4, // seconds
    maxStack: 3,
  },
} as const;

export default appConfig;
