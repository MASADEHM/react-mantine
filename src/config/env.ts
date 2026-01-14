/**
 * Environment Configuration
 * Centralized access to environment variables
 */

export const env = {
  /**
   * API base URL
   */
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3001/api",

  /**
   * Application name
   */
  appName: import.meta.env.VITE_APP_NAME || "DCCJ Portal",

  /**
   * Application version
   */
  appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",

  /**
   * Is development mode
   */
  isDev: import.meta.env.DEV,

  /**
   * Is production mode
   */
  isProd: import.meta.env.PROD,

  /**
   * Base URL for the app
   */
  baseUrl: import.meta.env.BASE_URL || "/",

  /**
   * Enable mock API (for prototype)
   */
  useMockApi: import.meta.env.VITE_USE_MOCK_API !== "false",

  /**
   * Default language
   */
  defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || "en",
} as const;

export default env;
