/**
 * Project Types
 * Core types for DCCJ projects
 */
import type { AuditFields } from "@/types";
import type { StageId } from "@/constants/stages";
import type { LicenseCategory } from "@/core/store";

/**
 * Project type based on building category
 */
export type ProjectType =
  | "residential_villa"
  | "residential_building"
  | "commercial"
  | "industrial"
  | "mixed_use"
  | "hospitality"
  | "educational"
  | "healthcare";

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
 * Plot information
 */
export interface PlotInfo {
  plotNumber: string;
  makaniNumber?: string;
  area: string;      // e.g., "Jumeirah"
  emirate: string;   // e.g., "Dubai"
  plotAreaSqm: number;
  builtUpAreaSqm?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  affectionPlanNumber?: string;
  affectionPlanDocument?: string; // Document ID
}

/**
 * Building specifications
 */
export interface BuildingSpecs {
  numberOfFloors: number;
  numberOfBasements?: number;
  numberOfUnits?: number;
  buildingHeight?: number;
  buildingUse: string;
  constructionType?: string;
}

/**
 * Owner information
 */
export interface OwnerInfo {
  name: string;
  nameAr?: string;
  emiratesId?: string;
  phone: string;
  email: string;
  ownershipType: "individual" | "company";
  companyName?: string;
  tradeLicenseNumber?: string;
}

/**
 * Contractor assignment
 */
export interface ContractorAssignment {
  contractorId: string;
  contractorName: string;
  contractorNameAr?: string;
  assignedAt: string;
  isVerified: boolean;
  verifiedAt?: string;
  verificationDocument?: string;
}

/**
 * Stage progress for a project
 */
export interface StageProgress {
  stageId: StageId;
  status: "locked" | "current" | "completed";
  startedAt?: string;
  completedAt?: string;
  servicesCompleted: number;
  servicesTotal: number;
}

/**
 * Main Project interface
 */
export interface Project extends AuditFields {
  id: string;
  projectNumber: string;
  
  // Basic info
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  projectType: ProjectType;
  category: LicenseCategory;
  status: ProjectStatus;
  
  // Location & Plot
  plot: PlotInfo;
  
  // Building
  buildingSpecs: BuildingSpecs;
  
  // Owner
  owner: OwnerInfo;
  
  // Consultant
  consultantId: string;
  consultantName?: string;
  
  // Contractor (assigned in Stage 3)
  contractor?: ContractorAssignment;
  
  // Workflow
  currentStage: StageId;
  stageProgress: StageProgress[];
  
  // Pre-requisites (uploaded documents)
  soilTestApprovalId?: string;
  conceptDesignApprovalId?: string; // Optional
  
  // Fees & Payments
  totalFees?: number;
  paidFees?: number;
  
  // Timeline
  expectedCompletionDate?: string;
  actualCompletionDate?: string;
}

/**
 * Project creation request
 */
export interface CreateProjectRequest {
  name: string;
  nameAr?: string;
  description?: string;
  projectType: ProjectType;
  category: LicenseCategory;
  plot: PlotInfo;
  buildingSpecs: BuildingSpecs;
  owner: OwnerInfo;
  soilTestApprovalId: string;
  conceptDesignApprovalId?: string;
}

/**
 * Project update request
 */
export interface UpdateProjectRequest {
  name?: string;
  nameAr?: string;
  description?: string;
  plot?: Partial<PlotInfo>;
  buildingSpecs?: Partial<BuildingSpecs>;
  owner?: Partial<OwnerInfo>;
  status?: ProjectStatus;
}

/**
 * Project list filters
 */
export interface ProjectFilters {
  search?: string;
  status?: ProjectStatus;
  stage?: StageId;
  projectType?: ProjectType;
  category?: LicenseCategory;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Project summary for dashboard/list
 */
export interface ProjectSummary {
  id: string;
  projectNumber: string;
  name: string;
  nameAr?: string;
  projectType: ProjectType;
  category: LicenseCategory;
  status: ProjectStatus;
  currentStage: StageId;
  stageProgress: number; // Percentage
  plotNumber: string;
  area: string;
  createdAt: string;
  updatedAt: string;
}
