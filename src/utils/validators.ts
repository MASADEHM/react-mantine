/**
 * Validation utility functions
 * For use with Ant Design Form rules
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate UAE phone number
 * Accepts formats: +971XXXXXXXXX, 971XXXXXXXXX, 0XXXXXXXXX, XXXXXXXXX
 */
export const isValidUAEPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  
  // +971 or 971 followed by 9 digits
  if (/^(\+?971)?[0-9]{9}$/.test(cleaned)) return true;
  
  // 0 followed by 9 digits (local format)
  if (/^0[0-9]{9}$/.test(cleaned)) return true;
  
  return false;
};

/**
 * Validate Emirates ID format (784-XXXX-XXXXXXX-X)
 */
export const isValidEmiratesId = (emiratesId: string): boolean => {
  const cleaned = emiratesId.replace(/[\s\-]/g, "");
  
  // Must be 15 digits and start with 784
  if (!/^784[0-9]{12}$/.test(cleaned)) return false;
  
  return true;
};

/**
 * Validate password strength
 * Requirements: min 8 chars, at least 1 uppercase, 1 lowercase, 1 number
 */
export const isStrongPassword = (password: string): boolean => {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  return minLength && hasUppercase && hasLowercase && hasNumber;
};

/**
 * Get password strength level
 */
export const getPasswordStrength = (
  password: string
): "weak" | "medium" | "strong" => {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  if (strength <= 2) return "weak";
  if (strength <= 4) return "medium";
  return "strong";
};

/**
 * Validate file type
 */
export const isValidFileType = (
  file: File,
  acceptedTypes: string[]
): boolean => {
  const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
  return acceptedTypes.some(
    (type) => type.toLowerCase() === extension.toLowerCase()
  );
};

/**
 * Validate file size (in MB)
 */
export const isValidFileSize = (file: File, maxSizeMB: number): boolean => {
  const fileSizeMB = file.size / (1024 * 1024);
  return fileSizeMB <= maxSizeMB;
};

/**
 * Validate required field
 */
export const isRequired = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

/**
 * Validate minimum length
 */
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

/**
 * Validate maximum length
 */
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

/**
 * Validate number range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Validate positive number
 */
export const isPositiveNumber = (value: number): boolean => {
  return value > 0;
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Ant Design Form rule generators
 */
export const formRules = {
  required: (message: string = "This field is required") => ({
    required: true,
    message,
  }),
  
  email: (message: string = "Please enter a valid email") => ({
    type: "email" as const,
    message,
  }),
  
  phone: (message: string = "Please enter a valid phone number") => ({
    validator: (_: unknown, value: string) => {
      if (!value || isValidUAEPhone(value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(message));
    },
  }),
  
  emiratesId: (message: string = "Please enter a valid Emirates ID") => ({
    validator: (_: unknown, value: string) => {
      if (!value || isValidEmiratesId(value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(message));
    },
  }),
  
  minLength: (min: number, message?: string) => ({
    min,
    message: message || `Minimum ${min} characters required`,
  }),
  
  maxLength: (max: number, message?: string) => ({
    max,
    message: message || `Maximum ${max} characters allowed`,
  }),
  
  password: (message: string = "Password must be at least 8 characters with uppercase, lowercase, and number") => ({
    validator: (_: unknown, value: string) => {
      if (!value || isStrongPassword(value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(message));
    },
  }),
  
  confirmPassword: (
    getFieldValue: (field: string) => unknown,
    message: string = "Passwords do not match"
  ) => ({
    validator: (_: unknown, value: string) => {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(message));
    },
  }),
};
