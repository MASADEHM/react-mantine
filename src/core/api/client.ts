/**
 * HTTP Client
 * Axios instance with base configuration
 */
import axios, { AxiosInstance } from "axios";
import { env } from "@/config/env";
import { setupInterceptors } from "./interceptors";

/**
 * Create and configure the Axios HTTP client
 */
const httpClient: AxiosInstance = axios.create({
  baseURL: env.apiUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Setup request/response interceptors
setupInterceptors(httpClient);

export { httpClient };
export default httpClient;
