/**
 * API Helpers
 * Utility functions for API calls with error handling
 */
import { AxiosError, AxiosResponse } from "axios";

/**
 * Standard API error structure
 */
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  code?: string;
}

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Wrapper for API calls with standardized error handling
 * @param request - The axios request promise
 * @returns The response data
 * @throws ApiError
 */
export async function apiCall<T>(
  request: () => Promise<AxiosResponse<T>>
): Promise<T> {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message || "An error occurred",
        status: error.response?.status || 500,
        errors: error.response?.data?.errors,
        code: error.code,
      };
      throw apiError;
    }
    throw error;
  }
}

/**
 * Check if an error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "status" in error
  );
}

/**
 * Extract error message from any error type
 */
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}
