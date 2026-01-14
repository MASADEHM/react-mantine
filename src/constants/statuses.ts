/**
 * Status Definitions
 * Status values for projects, services, and documents
 */

/**
 * Service status
 */
export type ServiceStatus =
  | "not_started"
  | "draft"
  | "submitted"
  | "under_review"
  | "additional_info_required"
  | "approved"
  | "rejected"
  | "issued";

/**
 * Project status
 */
export type ProjectStatus =
  | "draft"
  | "active"
  | "on_hold"
  | "completed"
  | "cancelled";

/**
 * Document status
 */
export type DocumentStatus =
  | "pending"
  | "verified"
  | "rejected"
  | "expired";

/**
 * Service status display configuration
 */
export const SERVICE_STATUS_CONFIG: Record<ServiceStatus, {
  nameEn: string;
  nameAr: string;
  color: string;
  bgColor: string;
  icon: string;
}> = {
  not_started: {
    nameEn: "Not Started",
    nameAr: "لم يبدأ",
    color: "#8c8c8c",
    bgColor: "#f5f5f5",
    icon: "MinusCircleOutlined",
  },
  draft: {
    nameEn: "Draft",
    nameAr: "مسودة",
    color: "#722ed1",
    bgColor: "#f9f0ff",
    icon: "EditOutlined",
  },
  submitted: {
    nameEn: "Submitted",
    nameAr: "مقدم",
    color: "#1890ff",
    bgColor: "#e6f7ff",
    icon: "SendOutlined",
  },
  under_review: {
    nameEn: "Under Review",
    nameAr: "قيد المراجعة",
    color: "#fa8c16",
    bgColor: "#fff7e6",
    icon: "ClockCircleOutlined",
  },
  additional_info_required: {
    nameEn: "Info Required",
    nameAr: "مطلوب معلومات إضافية",
    color: "#faad14",
    bgColor: "#fffbe6",
    icon: "ExclamationCircleOutlined",
  },
  approved: {
    nameEn: "Approved",
    nameAr: "موافق عليه",
    color: "#52c41a",
    bgColor: "#f6ffed",
    icon: "CheckCircleOutlined",
  },
  rejected: {
    nameEn: "Rejected",
    nameAr: "مرفوض",
    color: "#ff4d4f",
    bgColor: "#fff2f0",
    icon: "CloseCircleOutlined",
  },
  issued: {
    nameEn: "Issued",
    nameAr: "صادر",
    color: "#13c2c2",
    bgColor: "#e6fffb",
    icon: "FileDoneOutlined",
  },
};

/**
 * Project status display configuration
 */
export const PROJECT_STATUS_CONFIG: Record<ProjectStatus, {
  nameEn: string;
  nameAr: string;
  color: string;
}> = {
  draft: {
    nameEn: "Draft",
    nameAr: "مسودة",
    color: "default",
  },
  active: {
    nameEn: "Active",
    nameAr: "نشط",
    color: "processing",
  },
  on_hold: {
    nameEn: "On Hold",
    nameAr: "معلق",
    color: "warning",
  },
  completed: {
    nameEn: "Completed",
    nameAr: "مكتمل",
    color: "success",
  },
  cancelled: {
    nameEn: "Cancelled",
    nameAr: "ملغي",
    color: "error",
  },
};

/**
 * Get status display name based on language
 */
export const getServiceStatusName = (
  status: ServiceStatus,
  language: "en" | "ar" = "en"
): string => {
  return language === "ar"
    ? SERVICE_STATUS_CONFIG[status].nameAr
    : SERVICE_STATUS_CONFIG[status].nameEn;
};
