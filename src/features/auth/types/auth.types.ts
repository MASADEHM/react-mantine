/**
 * Auth Types
 * Authentication and user-related types
 */
import type { AuditFields } from "@/types";
import type { UserRole, LicenseCategory } from "@/core/store";

/**
 * User interface for auth
 */
export interface AuthUser extends AuditFields {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  firstNameAr?: string;
  lastNameAr?: string;
  phone: string;
  emiratesId?: string;
  role: UserRole;
  avatar?: string;
  
  // Consultant-specific
  companyName?: string;
  companyNameAr?: string;
  licenseNumber?: string;
  licenseCategory?: LicenseCategory;
  excellenceRating?: number; // 1-5 stars
  
  // Contractor-specific
  contractorGrade?: string;
  specializations?: string[];
  
  isVerified: boolean;
  isActive: boolean;
}

/**
 * Login request
 */
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Login response
 */
export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Registration request
 */
export interface RegistrationRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  firstNameAr?: string;
  lastNameAr?: string;
  phone: string;
  emiratesId?: string;
  role: UserRole;
  
  // Consultant fields
  companyName?: string;
  companyNameAr?: string;
  licenseNumber?: string;
  licenseCategory?: LicenseCategory;
  
  // Contractor fields
  contractorGrade?: string;
  specializations?: string[];
  
  termsAccepted: boolean;
}

/**
 * Registration response
 */
export interface RegistrationResponse {
  user: AuthUser;
  message: string;
  verificationRequired: boolean;
}

/**
 * Password reset request
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Password reset confirm
 */
export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * UAE Pass auth request
 */
export interface UAEPassAuthRequest {
  code: string;
  state: string;
}

/**
 * UAE Pass auth response
 */
export interface UAEPassAuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
}

/**
 * Update profile request
 */
export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  firstNameAr?: string;
  lastNameAr?: string;
  phone?: string;
  avatar?: string;
  companyName?: string;
  companyNameAr?: string;
}

/**
 * Change password request
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
