/**
 * Mock Applications Data (Legacy - to be replaced by projects.mock.ts)
 * This file is maintained for backward compatibility with existing pages
 */
import type { Application, ApplicationListItem, ApplicationStats } from "@/features/applications/types/application.types";
import { mockServiceTypes } from "./services.mock";
import { mockConsultant } from "./users.mock";

/**
 * Mock Applications Data
 */
export const mockApplications: Application[] = [
  {
    id: "app-001",
    referenceNumber: "DM-2024-001234",
    serviceType: mockServiceTypes[0],
    status: "approved",
    projectName: "Palm Heights Residence",
    projectNameAr: "إقامة بالم هايتس",
    projectDescription: "A luxury residential tower with 40 apartments",
    projectDescriptionAr: "برج سكني فاخر يضم 40 شقة",
    projectLocation: {
      emirate: "Dubai",
      area: "Jumeirah Village Circle",
      street: "Street 15",
      plotNumber: "JVC-456",
    },
    numberOfFloors: 10,
    totalBuiltUpArea: 5000,
    landArea: 800,
    buildingType: "residential",
    buildingUse: "apartments",
    owner: {
      id: "owner-001",
      name: "Ahmed Al Maktoum",
      nameAr: "أحمد آل مكتوم",
      email: "ahmed@example.com",
      phone: "+971501234567",
      emiratesId: "784-1990-1234567-1",
      type: "individual",
    },
    consultant: {
      id: mockConsultant.id,
      name: `${mockConsultant.firstName} ${mockConsultant.lastName}`,
      nameAr: `${mockConsultant.firstNameAr || ""} ${mockConsultant.lastNameAr || ""}`,
      companyName: mockConsultant.companyName || "",
      companyNameAr: mockConsultant.companyNameAr || "",
      licenseNumber: mockConsultant.licenseNumber || "",
      email: mockConsultant.email,
      phone: mockConsultant.phone,
    },
    documents: [],
    statusHistory: [],
    comments: [],
    fees: [
      { id: "fee-001", name: "Application Fee", nameAr: "رسوم التقديم", amount: 1000, type: "fixed" },
      { id: "fee-002", name: "Processing Fee", nameAr: "رسوم المعالجة", amount: 500, type: "fixed" },
    ],
    totalFee: 1500,
    paidAmount: 1500,
    paymentStatus: "paid",
    payments: [],
    submittedAt: "2024-01-15T10:30:00Z",
    approvedAt: "2024-02-10T14:45:00Z",
    priority: "normal",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-02-10T14:45:00Z",
    createdBy: "consultant-001",
  },
];

/**
 * Get applications list with summary data
 */
export const getApplicationsList = (): ApplicationListItem[] => {
  return mockApplications.map((app) => ({
    id: app.id,
    referenceNumber: app.referenceNumber,
    serviceTypeName: app.serviceType.name,
    serviceTypeNameAr: app.serviceType.nameAr,
    serviceCategory: app.serviceType.category,
    projectName: app.projectName,
    projectNameAr: app.projectNameAr || "",
    status: app.status,
    ownerName: app.owner.name,
    ownerNameAr: app.owner.nameAr,
    submittedAt: app.submittedAt,
    updatedAt: app.updatedAt,
    totalFee: app.totalFee,
    paymentStatus: app.paymentStatus,
  }));
};

/**
 * Get application statistics
 */
export const getApplicationStats = (): ApplicationStats => {
  const total = mockApplications.length;
  const approved = mockApplications.filter((a) => a.status === "approved").length;
  const rejected = mockApplications.filter((a) => a.status === "rejected").length;

  return {
    total,
    draft: mockApplications.filter((a) => a.status === "draft").length,
    submitted: mockApplications.filter((a) => a.status === "submitted").length,
    underReview: mockApplications.filter((a) => a.status === "under_review").length,
    pendingDocuments: mockApplications.filter((a) => a.status === "pending_documents").length,
    approved,
    rejected,
    cancelled: mockApplications.filter((a) => a.status === "cancelled").length,
  };
};

/**
 * Get a single application by ID
 */
export const getApplicationById = (id: string): Application | undefined => {
  return mockApplications.find((app) => app.id === id);
};

// Re-export for backwards compatibility
export const applicationsMockData = mockApplications;

export default mockApplications;
