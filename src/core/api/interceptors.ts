/**
 * Axios Interceptors
 * Request and response interceptors for authentication and error handling
 */
import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "@/core/storage";

/**
 * Setup request and response interceptors
 */
export const setupInterceptors = (axiosInstance: AxiosInstance): void => {
  // Request interceptor - Add auth token
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = tokenStorage.getToken();
      
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - Handle errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        // Clear tokens and redirect to login
        tokenStorage.clearTokens();
        
        // Only redirect if not already on login page
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
        console.error("Access forbidden:", error.response.data);
      }

      // Handle 500 Server Error
      if (error.response?.status === 500) {
        console.error("Server error:", error.response.data);
      }

      return Promise.reject(error);
    }
  );
};
