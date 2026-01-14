/**
 * Workflow Types
 * Types for the 5-stage workflow and services
 */
import type { AuditFields, FileInfo } from "@/types";
import type { StageId } from "@/constants/stages";
import type { ServiceStatus } from "@/constants/statuses";

/**
 * Service definition (from workflow configuration)
 */
export interface ServiceDefinition {
  id: string;
  code: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  stageId: StageId;
  isRequired: boolean;
  isUploadOnly: boolean; // Just upload approval (like Soil Test)
  fee: number;
  estimatedDays: number;
  requiredDocuments: RequiredDocument[];
  dependencies: string[]; // Other service IDs that must be completed first
  nocAgency?: string; // For NOC services (RTA, DEWA, DCD)
}

/**
 * Required document definition
 */
export interface RequiredDocument {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  isRequired: boolean;
  acceptedFormats: string[];
  maxSizeMB: number;
}

/**
 * Service instance (user's submission)
 */
export interface ServiceInstance extends AuditFields {
  id: string;
  serviceDefinitionId: string;
  projectId: string;
  
  // Status
  status: ServiceStatus;
  statusHistory: StatusHistoryEntry[];
  
  // Submission
  submittedAt?: string;
  submittedBy?: string;
  
  // Review
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  
  // Documents
  documents: SubmittedDocument[];
  
  // For NOC services
  nocReferenceNumber?: string;
  nocExternalApprovalId?: string;
  nocExternalApprovalDate?: string;
  
  // Fees
  fee: number;
  isPaid: boolean;
  paidAt?: string;
  paymentReference?: string;
  
  // Output (issued permit/certificate)
  issuedDocumentId?: string;
  issuedDocumentNumber?: string;
  issuedAt?: string;
}

/**
 * Submitted document
 */
export interface SubmittedDocument {
  id: string;
  documentDefinitionId: string;
  file: FileInfo;
  status: "pending" | "verified" | "rejected";
  rejectionReason?: string;
  uploadedAt: string;
  uploadedBy: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

/**
 * Status history entry
 */
export interface StatusHistoryEntry {
  status: ServiceStatus;
  timestamp: string;
  userId: string;
  userName: string;
  notes?: string;
}

/**
 * Stage gate condition
 */
export interface GateCondition {
  id: string;
  descriptionEn: string;
  descriptionAr: string;
  type: "all_services_approved" | "specific_services" | "custom";
  requiredServiceIds?: string[];
  customCheck?: string;
  isMet: boolean;
}

/**
 * Stage state for a project
 */
export interface StageState {
  stageId: StageId;
  isLocked: boolean;
  isCurrent: boolean;
  isCompleted: boolean;
  services: ServiceInstance[];
  gateConditions: GateCondition[];
  canUnlockNext: boolean;
  completedAt?: string;
}

/**
 * Workflow state for a project
 */
export interface WorkflowState {
  projectId: string;
  currentStage: StageId;
  stages: Record<StageId, StageState>;
  overallProgress: number; // Percentage 0-100
  nextAction?: NextAction;
}

/**
 * Next action recommendation
 */
export interface NextAction {
  type: "submit_service" | "upload_document" | "pay_fee" | "wait_review" | "assign_contractor";
  serviceId?: string;
  message: string;
  messageAr: string;
}

/**
 * Service submission request
 */
export interface SubmitServiceRequest {
  projectId: string;
  serviceDefinitionId: string;
  documents: {
    documentDefinitionId: string;
    fileId: string;
  }[];
  notes?: string;
}

/**
 * NOC upload request
 */
export interface UploadNOCRequest {
  projectId: string;
  serviceDefinitionId: string;
  nocReferenceNumber: string;
  nocApprovalDate: string;
  approvalDocumentId: string;
}

/**
 * Service review request (for authority simulator)
 */
export interface ReviewServiceRequest {
  serviceInstanceId: string;
  action: "approve" | "reject" | "request_info";
  notes?: string;
  notesAr?: string;
  issuedDocumentNumber?: string;
}

/**
 * Pre-defined services for the DCCJ workflow
 */
export const WORKFLOW_SERVICES: ServiceDefinition[] = [
  // Stage 1: Pre-Requisites (Upload Only)
  {
    id: "soil-test",
    code: "PRE-001",
    nameEn: "Soil Test Approval",
    nameAr: "موافقة فحص التربة",
    descriptionEn: "Upload soil test approval document from authorized testing lab",
    descriptionAr: "رفع وثيقة موافقة فحص التربة من مختبر معتمد",
    stageId: "pre-requisites",
    isRequired: true,
    isUploadOnly: true,
    fee: 0,
    estimatedDays: 0,
    requiredDocuments: [
      {
        id: "soil-test-report",
        nameEn: "Soil Test Report",
        nameAr: "تقرير فحص التربة",
        isRequired: true,
        acceptedFormats: [".pdf"],
        maxSizeMB: 50,
      },
    ],
    dependencies: [],
  },
  {
    id: "affection-plan",
    code: "PRE-002",
    nameEn: "Affection Plan",
    nameAr: "مخطط التأثير",
    descriptionEn: "Upload plot affection plan from Dubai Municipality",
    descriptionAr: "رفع مخطط تأثير القطعة من بلدية دبي",
    stageId: "pre-requisites",
    isRequired: true,
    isUploadOnly: true,
    fee: 0,
    estimatedDays: 0,
    requiredDocuments: [
      {
        id: "affection-plan-doc",
        nameEn: "Affection Plan Document",
        nameAr: "وثيقة مخطط التأثير",
        isRequired: true,
        acceptedFormats: [".pdf"],
        maxSizeMB: 50,
      },
    ],
    dependencies: [],
  },

  // Stage 2: Concept Design (Optional)
  {
    id: "concept-design",
    code: "DES-001",
    nameEn: "Concept/Preliminary Design",
    nameAr: "التصميم المبدئي",
    descriptionEn: "Submit preliminary design for early approval (optional)",
    descriptionAr: "تقديم التصميم المبدئي للموافقة المسبقة (اختياري)",
    stageId: "concept-design",
    isRequired: false,
    isUploadOnly: false,
    fee: 1000,
    estimatedDays: 14,
    requiredDocuments: [
      {
        id: "concept-drawings",
        nameEn: "Concept Drawings",
        nameAr: "رسومات المفهوم",
        isRequired: true,
        acceptedFormats: [".pdf", ".dwg"],
        maxSizeMB: 100,
      },
    ],
    dependencies: ["soil-test", "affection-plan"],
  },

  // Stage 3: Building Permitting
  {
    id: "building-permit",
    code: "PER-001",
    nameEn: "Building Permit Application",
    nameAr: "طلب رخصة البناء",
    descriptionEn: "Submit complete building permit application with all drawings",
    descriptionAr: "تقديم طلب رخصة البناء كامل مع جميع الرسومات",
    stageId: "permitting",
    isRequired: true,
    isUploadOnly: false,
    fee: 5000,
    estimatedDays: 30,
    requiredDocuments: [
      {
        id: "architectural-drawings",
        nameEn: "Architectural Drawings",
        nameAr: "الرسومات المعمارية",
        isRequired: true,
        acceptedFormats: [".pdf", ".dwg"],
        maxSizeMB: 100,
      },
      {
        id: "structural-drawings",
        nameEn: "Structural Drawings",
        nameAr: "الرسومات الإنشائية",
        isRequired: true,
        acceptedFormats: [".pdf", ".dwg"],
        maxSizeMB: 100,
      },
      {
        id: "mep-drawings",
        nameEn: "MEP Drawings",
        nameAr: "رسومات الميكانيكية والكهربائية",
        isRequired: true,
        acceptedFormats: [".pdf", ".dwg"],
        maxSizeMB: 100,
      },
    ],
    dependencies: ["soil-test", "affection-plan"],
  },
  {
    id: "noc-rta",
    code: "NOC-001",
    nameEn: "RTA NOC",
    nameAr: "شهادة عدم ممانعة من هيئة الطرق",
    descriptionEn: "Upload Roads & Transport Authority NOC",
    descriptionAr: "رفع شهادة عدم ممانعة من هيئة الطرق والمواصلات",
    stageId: "permitting",
    isRequired: true,
    isUploadOnly: true,
    fee: 0,
    estimatedDays: 0,
    requiredDocuments: [
      {
        id: "rta-noc-doc",
        nameEn: "RTA NOC Document",
        nameAr: "وثيقة شهادة عدم ممانعة من هيئة الطرق",
        isRequired: true,
        acceptedFormats: [".pdf"],
        maxSizeMB: 10,
      },
    ],
    dependencies: [],
    nocAgency: "RTA",
  },
  {
    id: "noc-dewa",
    code: "NOC-002",
    nameEn: "DEWA NOC",
    nameAr: "شهادة عدم ممانعة من ديوا",
    descriptionEn: "Upload Dubai Electricity & Water Authority NOC",
    descriptionAr: "رفع شهادة عدم ممانعة من هيئة كهرباء ومياه دبي",
    stageId: "permitting",
    isRequired: true,
    isUploadOnly: true,
    fee: 0,
    estimatedDays: 0,
    requiredDocuments: [
      {
        id: "dewa-noc-doc",
        nameEn: "DEWA NOC Document",
        nameAr: "وثيقة شهادة عدم ممانعة من ديوا",
        isRequired: true,
        acceptedFormats: [".pdf"],
        maxSizeMB: 10,
      },
    ],
    dependencies: [],
    nocAgency: "DEWA",
  },
  {
    id: "noc-dcd",
    code: "NOC-003",
    nameEn: "DCD NOC",
    nameAr: "شهادة عدم ممانعة من الدفاع المدني",
    descriptionEn: "Upload Dubai Civil Defense NOC",
    descriptionAr: "رفع شهادة عدم ممانعة من الدفاع المدني",
    stageId: "permitting",
    isRequired: true,
    isUploadOnly: true,
    fee: 0,
    estimatedDays: 0,
    requiredDocuments: [
      {
        id: "dcd-noc-doc",
        nameEn: "DCD NOC Document",
        nameAr: "وثيقة شهادة عدم ممانعة من الدفاع المدني",
        isRequired: true,
        acceptedFormats: [".pdf"],
        maxSizeMB: 10,
      },
    ],
    dependencies: [],
    nocAgency: "DCD",
  },

  // Stage 4: Construction
  {
    id: "site-demarcation",
    code: "CON-001",
    nameEn: "Site Demarcation",
    nameAr: "تحديد الموقع",
    descriptionEn: "Request site demarcation inspection",
    descriptionAr: "طلب فحص تحديد الموقع",
    stageId: "construction",
    isRequired: true,
    isUploadOnly: false,
    fee: 500,
    estimatedDays: 7,
    requiredDocuments: [],
    dependencies: ["building-permit"],
  },
  {
    id: "structural-inspection",
    code: "CON-002",
    nameEn: "Structural Inspections",
    nameAr: "الفحوصات الإنشائية",
    descriptionEn: "Complete structural inspection milestones",
    descriptionAr: "إكمال مراحل الفحص الإنشائي",
    stageId: "construction",
    isRequired: true,
    isUploadOnly: false,
    fee: 2000,
    estimatedDays: 30,
    requiredDocuments: [],
    dependencies: ["site-demarcation"],
  },

  // Stage 5: Completion
  {
    id: "completion-certificate",
    code: "COM-001",
    nameEn: "Building Completion Certificate",
    nameAr: "شهادة إنجاز المبنى",
    descriptionEn: "Apply for building completion certificate",
    descriptionAr: "التقدم للحصول على شهادة إنجاز المبنى",
    stageId: "completion",
    isRequired: true,
    isUploadOnly: false,
    fee: 3000,
    estimatedDays: 14,
    requiredDocuments: [
      {
        id: "as-built-drawings",
        nameEn: "As-Built Drawings",
        nameAr: "رسومات كما تم البناء",
        isRequired: true,
        acceptedFormats: [".pdf", ".dwg"],
        maxSizeMB: 100,
      },
    ],
    dependencies: ["structural-inspection"],
  },
];
