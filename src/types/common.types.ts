/**
 * Common Types
 * Shared types used across the DCCJ Portal
 */

/**
 * Language
 */
export type Language = "en" | "ar";

/**
 * Theme
 */
export type Theme = "light" | "dark";

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
  createdBy?: string;
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
