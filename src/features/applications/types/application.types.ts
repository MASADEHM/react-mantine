import type {
  ApplicationStatus,
  DocumentStatus,
  ServiceCategory,
  PaymentStatus,
  AuditFields,
  Coordinates,
  BaseFilters,
} from "@/shared/types/common.types";

/**
 * Service Type - defines available services
 */
export interface ServiceType {
  id: string;
  code: string;
  name: string;
  nameAr: string;
  category: ServiceCategory;
  description: string;
  descriptionAr: string;
  requiredDocuments: RequiredDocument[];
  estimatedDays: number;
  estimatedFee?: number;
  isActive: boolean;
  icon?: string;
}

/**
 * Required Document Definition
 */
export interface RequiredDocument {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  isRequired: boolean;
  acceptedFormats: string[];
  maxSizeMB: number;
  category?: string;
}

/**
 * Project Location Information
 */
export interface ProjectLocation {
  emirate: string;
  area: string;
  street?: string;
  plotNumber: string;
  makaniNumber?: string;
  dmNumber?: string; // Dubai Municipality number
  coordinates?: Coordinates;
}

/**
 * Owner Information (for applications)
 */
export interface OwnerInfo {
  id: string;
  name: string;
  nameAr?: string;
  email: string;
  phone: string;
  emiratesId?: string;
  type: "individual" | "company";
  tradeLicenseNumber?: string;
  companyName?: string;
  companyNameAr?: string;
}

/**
 * Consultant Information (for applications)
 */
export interface ConsultantInfo {
  id: string;
  name: string;
  nameAr?: string;
  companyName: string;
  companyNameAr?: string;
  licenseNumber: string;
  email: string;
  phone: string;
  category?: string;
}

/**
 * Contractor Information (for applications)
 */
export interface ContractorInfo {
  id: string;
  name: string;
  nameAr?: string;
  companyName: string;
  companyNameAr?: string;
  licenseNumber: string;
  email: string;
  phone: string;
  gradeClassification?: string;
}

/**
 * Application Document (uploaded document)
 */
export interface ApplicationDocument {
  id: string;
  name: string;
  nameAr?: string;
  documentTypeId: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  mimeType: string;
  status: DocumentStatus;
  uploadedAt: string;
  uploadedBy: string;
  uploadedByName: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewedByName?: string;
  rejectionReason?: string;
  rejectionReasonAr?: string;
}

/**
 * Status History Item
 */
export interface StatusHistoryItem {
  id: string;
  status: ApplicationStatus;
  comment?: string;
  commentAr?: string;
  createdAt: string;
  createdBy: string;
  createdByName: string;
  createdByRole: string;
}

/**
 * Application Comment
 */
export interface ApplicationComment {
  id: string;
  text: string;
  textAr?: string;
  isInternal: boolean; // Internal comments not visible to applicants
  attachments?: ApplicationDocument[];
  createdAt: string;
  createdBy: string;
  createdByName: string;
  createdByRole: string;
  createdByAvatar?: string;
}

/**
 * Fee Item
 */
export interface FeeItem {
  id: string;
  name: string;
  nameAr: string;
  amount: number;
  type: "fixed" | "percentage" | "calculated";
}

/**
 * Payment Record
 */
export interface PaymentRecord {
  id: string;
  amount: number;
  method: string;
  transactionId: string;
  paidAt: string;
  receiptUrl?: string;
}

/**
 * Main Application Interface
 */
export interface Application extends AuditFields {
  id: string;
  referenceNumber: string;
  serviceType: ServiceType;
  status: ApplicationStatus;

  // Project Details
  projectName: string;
  projectNameAr?: string;
  projectLocation: ProjectLocation;
  projectDescription: string;
  projectDescriptionAr?: string;

  // Building Details (if applicable)
  numberOfFloors?: number;
  totalBuiltUpArea?: number; // in sq meters
  landArea?: number; // in sq meters
  buildingType?: string;
  buildingUse?: string;

  // Owner Information
  owner: OwnerInfo;

  // Consultant (who submitted)
  consultant: ConsultantInfo;

  // Contractor (if assigned)
  contractor?: ContractorInfo;

  // Documents
  documents: ApplicationDocument[];

  // Timeline & History
  statusHistory: StatusHistoryItem[];
  comments: ApplicationComment[];

  // Fees & Payment
  fees: FeeItem[];
  totalFee: number;
  paidAmount: number;
  paymentStatus: PaymentStatus;
  payments: PaymentRecord[];

  // Important Dates
  submittedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  expiresAt?: string;
  targetCompletionDate?: string;

  // Related Applications
  parentApplicationId?: string;
  relatedApplicationIds?: string[];

  // Tags & Categories
  tags?: string[];
  priority?: "low" | "normal" | "high" | "urgent";
}

/**
 * Application List Item (simplified for table view)
 */
export interface ApplicationListItem {
  id: string;
  referenceNumber: string;
  serviceTypeName: string;
  serviceTypeNameAr: string;
  serviceCategory: ServiceCategory;
  projectName: string;
  projectNameAr?: string;
  status: ApplicationStatus;
  ownerName: string;
  ownerNameAr?: string;
  submittedAt?: string;
  updatedAt: string;
  totalFee: number;
  paymentStatus: PaymentStatus;
}

/**
 * Application Filters for list view
 */
export interface ApplicationFilters extends BaseFilters {
  status?: ApplicationStatus[];
  serviceType?: string[];
  serviceCategory?: ServiceCategory[];
  dateRange?: [string, string];
  paymentStatus?: PaymentStatus[];
  ownerId?: string;
  priority?: string[];
}

/**
 * Application Statistics for dashboard
 */
export interface ApplicationStats {
  total: number;
  draft: number;
  submitted: number;
  underReview: number;
  pendingDocuments: number;
  approved: number;
  rejected: number;
  cancelled: number;
}

/**
 * Application Wizard Data (form state)
 */
export interface ApplicationWizardData {
  // Step 1: Service Type
  serviceTypeId: string;

  // Step 2: Project & Owner Info
  projectName: string;
  projectNameAr?: string;
  projectDescription: string;
  projectDescriptionAr?: string;
  plotNumber: string;
  makaniNumber?: string;
  emirate: string;
  area: string;
  street?: string;

  // Building Details (optional based on service)
  numberOfFloors?: number;
  totalBuiltUpArea?: number;
  landArea?: number;
  buildingType?: string;
  buildingUse?: string;

  // Owner Info
  ownerType: "self" | "existing" | "new";
  ownerId?: string;
  ownerName?: string;
  ownerNameAr?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  ownerEmiratesId?: string;
  ownerTradeLicenseNumber?: string;
  ownershipType?: "individual" | "company";

  // Contractor Info (optional)
  hasContractor: boolean;
  contractorId?: string;
  contractorName?: string;
  contractorCompanyName?: string;
  contractorLicenseNumber?: string;

  // Step 3: Documents
  documents: Map<string, File>;

  // Form state
  currentStep: number;
  isSubmitting: boolean;
  isDirty: boolean;
}

/**
 * Create Application Request
 */
export interface CreateApplicationRequest {
  serviceTypeId: string;
  projectName: string;
  projectNameAr?: string;
  projectDescription: string;
  projectLocation: ProjectLocation;
  owner: Omit<OwnerInfo, "id">;
  contractor?: Omit<ContractorInfo, "id">;
  buildingDetails?: {
    numberOfFloors?: number;
    totalBuiltUpArea?: number;
    landArea?: number;
    buildingType?: string;
    buildingUse?: string;
  };
  isDraft?: boolean;
}

/**
 * Update Application Request
 */
export interface UpdateApplicationRequest {
  projectName?: string;
  projectNameAr?: string;
  projectDescription?: string;
  projectLocation?: Partial<ProjectLocation>;
  owner?: Partial<OwnerInfo>;
  contractor?: Partial<ContractorInfo>;
}

/**
 * Submit Application Request
 */
export interface SubmitApplicationRequest {
  applicationId: string;
  confirmation: boolean;
}

/**
 * Add Comment Request
 */
export interface AddCommentRequest {
  applicationId: string;
  text: string;
  textAr?: string;
  isInternal?: boolean;
  attachmentIds?: string[];
}
