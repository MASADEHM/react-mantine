/**
 * Common types used across the Dubai Building Permits Portal
 */

// User Roles
export type UserRole = "consultant" | "contractor" | "owner" | "admin";

// Application Status
export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "pending_documents"
  | "approved"
  | "rejected"
  | "cancelled";

// Document Status
export type DocumentStatus = "pending" | "uploaded" | "approved" | "rejected";

// Language
export type Language = "en" | "ar";

// Theme
export type Theme = "light" | "dark";

// Service Categories
export type ServiceCategory =
  | "master_plan"
  | "building_permit"
  | "noc"
  | "modification"
  | "maintenance"
  | "demolition"
  | "fit_out";

// Notification Types
export type NotificationType =
  | "application_submitted"
  | "application_approved"
  | "application_rejected"
  | "document_required"
  | "comment_added"
  | "status_changed"
  | "payment_required"
  | "system";

// Payment Status
export type PaymentStatus = "pending" | "paid" | "partial" | "refunded";

// Ownership Type
export type OwnershipType = "individual" | "company";

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
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}

/**
 * API Error response
 */
export interface ApiError {
  message: string;
  messageAr?: string;
  code: string;
  field?: string;
  details?: Record<string, unknown>;
}

/**
 * Bilingual text field
 */
export interface BilingualText {
  en: string;
  ar: string;
}

/**
 * Audit fields common to many entities
 */
export interface AuditFields {
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy?: string;
}

/**
 * Address structure
 */
export interface Address {
  emirate: string;
  area: string;
  street?: string;
  building?: string;
  floor?: string;
  unit?: string;
  poBox?: string;
  makaniNumber?: string;
}

/**
 * Contact information
 */
export interface ContactInfo {
  email: string;
  phone: string;
  mobile?: string;
  fax?: string;
}

/**
 * Coordinates for location
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * File upload information
 */
export interface FileInfo {
  id: string;
  name: string;
  originalName: string;
  size: number;
  mimeType: string;
  url: string;
  uploadedAt: string;
}

/**
 * Select option type for dropdowns
 */
export interface SelectOption<T = string> {
  value: T;
  label: string;
  labelAr?: string;
  disabled?: boolean;
}

/**
 * Table sort configuration
 */
export interface SortConfig {
  field: string;
  order: "asc" | "desc";
}

/**
 * Date range type
 */
export interface DateRange {
  startDate: string;
  endDate: string;
}

/**
 * Common filter base
 */
export interface BaseFilters {
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
