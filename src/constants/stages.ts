/**
 * DCCJ Stage Definitions
 * Defines the 5-stage workflow for building permits
 */

/**
 * Stage IDs
 */
export type StageId = "pre-requisites" | "concept-design" | "permitting" | "construction" | "completion";

/**
 * Stage numbers for ordering
 */
export const STAGE_ORDER: Record<StageId, number> = {
  "pre-requisites": 1,
  "concept-design": 2,
  "permitting": 3,
  "construction": 4,
  "completion": 5,
};

/**
 * Stage definitions with display names and descriptions
 */
export const STAGES: Record<StageId, {
  id: StageId;
  order: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  isOptional: boolean;
  isEntryPoint: boolean;
  color: string;
  icon: string;
}> = {
  "pre-requisites": {
    id: "pre-requisites",
    order: 1,
    nameEn: "Pre-Requisites",
    nameAr: "المتطلبات المسبقة",
    descriptionEn: "Upload soil test approval and affection plan",
    descriptionAr: "رفع موافقة فحص التربة ومخطط التأثير",
    isOptional: false,
    isEntryPoint: false,
    color: "#1890ff",
    icon: "FileSearchOutlined",
  },
  "concept-design": {
    id: "concept-design",
    order: 2,
    nameEn: "Concept Design",
    nameAr: "التصميم المبدئي",
    descriptionEn: "Optional preliminary design approval",
    descriptionAr: "موافقة التصميم المبدئي (اختياري)",
    isOptional: true,
    isEntryPoint: false,
    color: "#722ed1",
    icon: "HighlightOutlined",
  },
  "permitting": {
    id: "permitting",
    order: 3,
    nameEn: "Building Permitting",
    nameAr: "تصاريح البناء",
    descriptionEn: "Submit building permit application with NOCs",
    descriptionAr: "تقديم طلب رخصة البناء مع الشهادات",
    isOptional: false,
    isEntryPoint: true, // Primary entry point
    color: "#13c2c2",
    icon: "FileDoneOutlined",
  },
  "construction": {
    id: "construction",
    order: 4,
    nameEn: "Construction",
    nameAr: "البناء",
    descriptionEn: "Site demarcation and structural inspections",
    descriptionAr: "تحديد الموقع والفحوصات الإنشائية",
    isOptional: false,
    isEntryPoint: false,
    color: "#fa8c16",
    icon: "BuildOutlined",
  },
  "completion": {
    id: "completion",
    order: 5,
    nameEn: "Completion",
    nameAr: "الإنجاز",
    descriptionEn: "Final inspection and completion certificate",
    descriptionAr: "الفحص النهائي وشهادة الإنجاز",
    isOptional: false,
    isEntryPoint: false,
    color: "#52c41a",
    icon: "CheckCircleOutlined",
  },
};

/**
 * Get stages as an ordered array
 */
export const getStagesArray = () => {
  return Object.values(STAGES).sort((a, b) => a.order - b.order);
};

/**
 * Get entry point stage
 */
export const getEntryPointStage = () => {
  return Object.values(STAGES).find((s) => s.isEntryPoint);
};
