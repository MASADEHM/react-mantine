/**
 * API Types
 * Types for API requests and responses
 */

/**
 * Pagination interface for list responses
 */
export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
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
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
  success: boolean;
}

/**
 * API Error response
 */
export interface ApiError {
  message: string;
  messageAr?: string;
  code?: string;
  status: number;
  field?: string;
  errors?: Record<string, string[]>;
  details?: Record<string, unknown>;
}

/**
 * List query parameters
 */
export interface ListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: unknown;
}

/**
 * Mutation response
 */
export interface MutationResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
}

/**
 * Delete response
 */
export interface DeleteResponse {
  success: boolean;
  message: string;
}
