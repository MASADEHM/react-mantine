/**
 * Mock Projects Data
 */
import type { Project, ProjectSummary } from "@/features/projects/types";

/**
 * Mock projects
 */
export const mockProjects: Project[] = [
  {
    id: "proj-001",
    projectNumber: "DCCJ-2026-000001",
    name: "Al Wasl Villa",
    nameAr: "فيلا الوصل",
    description: "Luxury residential villa in Al Wasl area",
    descriptionAr: "فيلا سكنية فاخرة في منطقة الوصل",
    projectType: "residential_villa",
    category: "G+4",
    status: "active",
    plot: {
      plotNumber: "234-567",
      makaniNumber: "12345678",
      area: "Al Wasl",
      emirate: "Dubai",
      plotAreaSqm: 1500,
      builtUpAreaSqm: 800,
      coordinates: { lat: 25.1785, lng: 55.2548 },
      affectionPlanNumber: "AP-2026-001234",
    },
    buildingSpecs: {
      numberOfFloors: 3,
      numberOfBasements: 1,
      numberOfUnits: 1,
      buildingHeight: 12,
      buildingUse: "Residential Villa",
      constructionType: "Reinforced Concrete",
    },
    owner: {
      name: "Ahmed Al Maktoum",
      nameAr: "أحمد آل مكتوم",
      emiratesId: "784-1990-1234567-1",
      phone: "+971501234567",
      email: "ahmed@example.com",
      ownershipType: "individual",
    },
    consultantId: "user-001",
    consultantName: "Dubai Engineering Consultants",
    currentStage: "permitting",
    stageProgress: [
      { stageId: "pre-requisites", status: "completed", completedAt: "2026-01-02", servicesCompleted: 2, servicesTotal: 2 },
      { stageId: "concept-design", status: "completed", completedAt: "2026-01-05", servicesCompleted: 1, servicesTotal: 1 },
      { stageId: "permitting", status: "current", servicesCompleted: 2, servicesTotal: 5 },
      { stageId: "construction", status: "locked", servicesCompleted: 0, servicesTotal: 2 },
      { stageId: "completion", status: "locked", servicesCompleted: 0, servicesTotal: 1 },
    ],
    soilTestApprovalId: "doc-soil-001",
    conceptDesignApprovalId: "doc-concept-001",
    totalFees: 12500,
    paidFees: 6000,
    expectedCompletionDate: "2027-06-30",
    createdAt: "2026-01-01T10:00:00Z",
    updatedAt: "2026-01-08T14:30:00Z",
    createdBy: "user-001",
  },
  {
    id: "proj-002",
    projectNumber: "DCCJ-2026-000002",
    name: "Business Bay Tower",
    nameAr: "برج الخليج التجاري",
    description: "12-floor commercial office building",
    descriptionAr: "مبنى مكاتب تجاري من 12 طابق",
    projectType: "commercial",
    category: "G+12",
    status: "active",
    plot: {
      plotNumber: "BB-891",
      makaniNumber: "98765432",
      area: "Business Bay",
      emirate: "Dubai",
      plotAreaSqm: 3000,
      builtUpAreaSqm: 25000,
      coordinates: { lat: 25.1865, lng: 55.2628 },
      affectionPlanNumber: "AP-2026-002345",
    },
    buildingSpecs: {
      numberOfFloors: 12,
      numberOfBasements: 2,
      numberOfUnits: 48,
      buildingHeight: 48,
      buildingUse: "Commercial Offices",
      constructionType: "Steel Frame",
    },
    owner: {
      name: "Gulf Properties LLC",
      nameAr: "خليج العقارات ذ.م.م",
      phone: "+971502345678",
      email: "info@gulfproperties.ae",
      ownershipType: "company",
      companyName: "Gulf Properties LLC",
      tradeLicenseNumber: "TL-123456",
    },
    consultantId: "user-001",
    consultantName: "Dubai Engineering Consultants",
    currentStage: "pre-requisites",
    stageProgress: [
      { stageId: "pre-requisites", status: "current", servicesCompleted: 1, servicesTotal: 2 },
      { stageId: "concept-design", status: "locked", servicesCompleted: 0, servicesTotal: 1 },
      { stageId: "permitting", status: "locked", servicesCompleted: 0, servicesTotal: 5 },
      { stageId: "construction", status: "locked", servicesCompleted: 0, servicesTotal: 2 },
      { stageId: "completion", status: "locked", servicesCompleted: 0, servicesTotal: 1 },
    ],
    soilTestApprovalId: "doc-soil-002",
    totalFees: 45000,
    paidFees: 0,
    expectedCompletionDate: "2028-12-31",
    createdAt: "2026-01-05T09:00:00Z",
    updatedAt: "2026-01-08T11:00:00Z",
    createdBy: "user-001",
  },
  {
    id: "proj-003",
    projectNumber: "DCCJ-2025-000089",
    name: "Jumeirah Residence",
    nameAr: "سكن جميرا",
    description: "Residential building with 20 apartments",
    descriptionAr: "مبنى سكني يحتوي على 20 شقة",
    projectType: "residential_building",
    category: "G+4",
    status: "active",
    plot: {
      plotNumber: "JVC-456",
      area: "Jumeirah Village Circle",
      emirate: "Dubai",
      plotAreaSqm: 2000,
      builtUpAreaSqm: 5000,
    },
    buildingSpecs: {
      numberOfFloors: 4,
      numberOfBasements: 1,
      numberOfUnits: 20,
      buildingHeight: 16,
      buildingUse: "Residential Apartments",
      constructionType: "Reinforced Concrete",
    },
    owner: {
      name: "Jumeirah Developers",
      phone: "+971503456789",
      email: "dev@jumeirah.ae",
      ownershipType: "company",
      companyName: "Jumeirah Developers LLC",
    },
    consultantId: "user-001",
    currentStage: "construction",
    stageProgress: [
      { stageId: "pre-requisites", status: "completed", completedAt: "2025-06-15", servicesCompleted: 2, servicesTotal: 2 },
      { stageId: "concept-design", status: "completed", completedAt: "2025-07-01", servicesCompleted: 1, servicesTotal: 1 },
      { stageId: "permitting", status: "completed", completedAt: "2025-09-30", servicesCompleted: 5, servicesTotal: 5 },
      { stageId: "construction", status: "current", servicesCompleted: 1, servicesTotal: 2 },
      { stageId: "completion", status: "locked", servicesCompleted: 0, servicesTotal: 1 },
    ],
    contractor: {
      contractorId: "contractor-001",
      contractorName: "Al Habtoor Construction",
      contractorNameAr: "الحبتور للمقاولات",
      assignedAt: "2025-10-01",
      isVerified: true,
      verifiedAt: "2025-10-02",
    },
    totalFees: 25000,
    paidFees: 20000,
    expectedCompletionDate: "2026-06-30",
    createdAt: "2025-06-01T08:00:00Z",
    updatedAt: "2026-01-07T16:00:00Z",
    createdBy: "user-001",
  },
];

/**
 * Get project summaries for list view
 */
export const getProjectSummaries = (): ProjectSummary[] => {
  return mockProjects.map((p) => {
    const completed = p.stageProgress.filter((s) => s.status === "completed").length;
    const total = p.stageProgress.length;
    const progress = Math.round((completed / total) * 100);

    return {
      id: p.id,
      projectNumber: p.projectNumber,
      name: p.name,
      nameAr: p.nameAr,
      projectType: p.projectType,
      category: p.category,
      status: p.status,
      currentStage: p.currentStage,
      stageProgress: progress,
      plotNumber: p.plot.plotNumber,
      area: p.plot.area,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  });
};

/**
 * Get project by ID
 */
export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find((p) => p.id === id);
};

export default mockProjects;
