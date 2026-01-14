import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";

// Extend dayjs with plugins
dayjs.extend(relativeTime);

/**
 * Format a number as currency (AED by default)
 */
export const formatCurrency = (
  amount: number,
  currency: string = "AED",
  locale: string = "en-AE"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a number with thousand separators
 */
export const formatNumber = (
  value: number,
  locale: string = "en-AE"
): string => {
  return new Intl.NumberFormat(locale).format(value);
};

/**
 * Format a date string
 */
export const formatDate = (
  date: string | Date,
  format: string = "DD MMM YYYY",
  locale: string = "en"
): string => {
  return dayjs(date).locale(locale).format(format);
};

/**
 * Format a date with time
 */
export const formatDateTime = (
  date: string | Date,
  format: string = "DD MMM YYYY, HH:mm",
  locale: string = "en"
): string => {
  return dayjs(date).locale(locale).format(format);
};

/**
 * Format a date as relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (
  date: string | Date,
  locale: string = "en"
): string => {
  return dayjs(date).locale(locale).fromNow();
};

/**
 * Format a file size in bytes to human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format a phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // UAE phone number format
  if (cleaned.startsWith("971")) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }

  // Generic format
  return phone;
};

/**
 * Format Emirates ID for display (XXX-XXXX-XXXXXXX-X)
 */
export const formatEmiratesId = (emiratesId: string): string => {
  const cleaned = emiratesId.replace(/\D/g, "");
  if (cleaned.length !== 15) return emiratesId;

  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 14)}-${cleaned.slice(14)}`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (
  text: string,
  maxLength: number,
  suffix: string = "..."
): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * Format area in square meters
 */
export const formatArea = (sqm: number, locale: string = "en"): string => {
  const formatted = formatNumber(sqm, locale);
  return locale === "ar" ? `${formatted} م²` : `${formatted} sqm`;
};

/**
 * Get initials from a name
 */
export const getInitials = (name: string, maxInitials: number = 2): string => {
  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, maxInitials)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
  return initials;
};

/**
 * Format a reference number for display
 */
export const formatReferenceNumber = (ref: string): string => {
  // Already formatted
  if (ref.includes("-")) return ref;
  
  // Format as DM-YYYY-XXXXXX
  if (ref.length >= 10) {
    return `DM-${ref.slice(0, 4)}-${ref.slice(4)}`;
  }
  
  return ref;
};
