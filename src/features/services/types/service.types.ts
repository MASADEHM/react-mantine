import type { ServiceCategory } from "@/shared/types/common.types";

/**
 * Required Document Template
 */
export interface DocumentTemplate {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  isRequired: boolean;
  acceptedFormats: string[]; // e.g., [".pdf", ".jpg", ".png"]
  maxSizeMB: number;
  templateUrl?: string; // Optional template file to download
  category: string; // e.g., "architectural", "structural", "legal"
  displayOrder: number;
}

/**
 * Service Fee Structure
 */
export interface ServiceFee {
  id: string;
  name: string;
  nameAr: string;
  type: "fixed" | "percentage" | "per_unit" | "calculated";
  amount: number;
  unit?: string; // e.g., "sqm" for per square meter
  description?: string;
  descriptionAr?: string;
  isRefundable: boolean;
}

/**
 * Service Prerequisite
 */
export interface ServicePrerequisite {
  id: string;
  serviceTypeId: string;
  serviceTypeName: string;
  serviceTypeNameAr: string;
  isRequired: boolean;
  description: string;
  descriptionAr: string;
}

/**
 * Service Type Definition
 */
export interface ServiceType {
  id: string;
  code: string; // e.g., "BP-001", "NOC-FITOUT-001"
  name: string;
  nameAr: string;
  shortName: string;
  shortNameAr: string;
  category: ServiceCategory;
  description: string;
  descriptionAr: string;
  
  // Requirements
  requiredDocuments: DocumentTemplate[];
  prerequisites: ServicePrerequisite[];
  
  // Fees
  fees: ServiceFee[];
  estimatedFee: number; // Base estimated fee
  
  // Processing
  estimatedDays: number;
  processingNotes?: string;
  processingNotesAr?: string;
  
  // Eligibility
  eligibleRoles: ("consultant" | "contractor" | "owner")[];
  requiresConsultant: boolean;
  requiresContractor: boolean;
  
  // Status
  isActive: boolean;
  isPopular: boolean;
  displayOrder: number;
  
  // Visual
  icon?: string;
  color?: string;
  
  // Related
  relatedServiceIds?: string[];
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

/**
 * Service Category Definition
 */
export interface ServiceCategoryInfo {
  id: ServiceCategory;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  color: string;
  displayOrder: number;
  services: ServiceType[];
}

/**
 * Service Type Summary (for cards/lists)
 */
export interface ServiceTypeSummary {
  id: string;
  code: string;
  name: string;
  nameAr: string;
  category: ServiceCategory;
  categoryName: string;
  categoryNameAr: string;
  estimatedDays: number;
  estimatedFee: number;
  requiredDocumentsCount: number;
  isPopular: boolean;
  icon?: string;
  color?: string;
}

/**
 * Service Search/Filter
 */
export interface ServiceFilters {
  search?: string;
  category?: ServiceCategory[];
  isActive?: boolean;
  isPopular?: boolean;
  eligibleRole?: "consultant" | "contractor" | "owner";
}

/**
 * All service categories configuration
 */
export const SERVICE_CATEGORIES: Record<ServiceCategory, { name: string; nameAr: string; icon: string; color: string }> = {
  master_plan: {
    name: "Master Plan",
    nameAr: "المخطط الرئيسي",
    icon: "LayoutOutlined",
    color: "#004d99",
  },
  building_permit: {
    name: "Building Permit",
    nameAr: "رخصة البناء",
    icon: "BuildOutlined",
    color: "#0d9f6e",
  },
  noc: {
    name: "No Objection Certificate",
    nameAr: "شهادة عدم ممانعة",
    icon: "SafetyCertificateOutlined",
    color: "#f59e0b",
  },
  modification: {
    name: "Modification",
    nameAr: "تعديل",
    icon: "EditOutlined",
    color: "#8b5cf6",
  },
  maintenance: {
    name: "Maintenance",
    nameAr: "صيانة",
    icon: "ToolOutlined",
    color: "#06b6d4",
  },
  demolition: {
    name: "Demolition",
    nameAr: "هدم",
    icon: "CloseSquareOutlined",
    color: "#dc2626",
  },
  fit_out: {
    name: "Fit-Out",
    nameAr: "تجهيز داخلي",
    icon: "HomeOutlined",
    color: "#ec4899",
  },
};
