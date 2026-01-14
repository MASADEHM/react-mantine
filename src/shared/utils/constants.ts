/**
 * Application-wide constants
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
export const API_TIMEOUT = 30000; // 30 seconds

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// File upload limits
export const MAX_FILE_SIZE_MB = 50;
export const ACCEPTED_IMAGE_FORMATS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
export const ACCEPTED_DOCUMENT_FORMATS = [".pdf", ".doc", ".docx", ".xls", ".xlsx"];
export const ACCEPTED_DRAWING_FORMATS = [".pdf", ".dwg", ".dxf"];

// Dubai/UAE specific
export const UAE_COUNTRY_CODE = "+971";
export const EMIRATES = [
  { value: "dubai", label: "Dubai", labelAr: "دبي" },
  { value: "abu_dhabi", label: "Abu Dhabi", labelAr: "أبوظبي" },
  { value: "sharjah", label: "Sharjah", labelAr: "الشارقة" },
  { value: "ajman", label: "Ajman", labelAr: "عجمان" },
  { value: "ras_al_khaimah", label: "Ras Al Khaimah", labelAr: "رأس الخيمة" },
  { value: "fujairah", label: "Fujairah", labelAr: "الفجيرة" },
  { value: "umm_al_quwain", label: "Umm Al Quwain", labelAr: "أم القيوين" },
];

// Dubai areas
export const DUBAI_AREAS = [
  { value: "downtown", label: "Downtown Dubai", labelAr: "وسط مدينة دبي" },
  { value: "dubai_marina", label: "Dubai Marina", labelAr: "مرسى دبي" },
  { value: "palm_jumeirah", label: "Palm Jumeirah", labelAr: "نخلة جميرا" },
  { value: "jumeirah", label: "Jumeirah", labelAr: "جميرا" },
  { value: "jvc", label: "Jumeirah Village Circle", labelAr: "قرية جميرا الدائرية" },
  { value: "jlt", label: "Jumeirah Lake Towers", labelAr: "أبراج بحيرات جميرا" },
  { value: "business_bay", label: "Business Bay", labelAr: "الخليج التجاري" },
  { value: "deira", label: "Deira", labelAr: "ديرة" },
  { value: "bur_dubai", label: "Bur Dubai", labelAr: "بر دبي" },
  { value: "al_barsha", label: "Al Barsha", labelAr: "البرشاء" },
  { value: "al_quoz", label: "Al Quoz", labelAr: "القوز" },
  { value: "dubai_silicon_oasis", label: "Dubai Silicon Oasis", labelAr: "واحة دبي للسيليكون" },
  { value: "dubai_land", label: "Dubai Land", labelAr: "دبي لاند" },
  { value: "motor_city", label: "Motor City", labelAr: "موتور سيتي" },
  { value: "sports_city", label: "Sports City", labelAr: "المدينة الرياضية" },
  { value: "arabian_ranches", label: "Arabian Ranches", labelAr: "المرابع العربية" },
  { value: "dubai_hills", label: "Dubai Hills", labelAr: "تلال دبي" },
  { value: "mirdif", label: "Mirdif", labelAr: "مردف" },
  { value: "al_rashidiya", label: "Al Rashidiya", labelAr: "الراشدية" },
];

// Building types
export const BUILDING_TYPES = [
  { value: "residential", label: "Residential", labelAr: "سكني" },
  { value: "commercial", label: "Commercial", labelAr: "تجاري" },
  { value: "industrial", label: "Industrial", labelAr: "صناعي" },
  { value: "mixed_use", label: "Mixed Use", labelAr: "استخدام متعدد" },
  { value: "hospitality", label: "Hospitality", labelAr: "ضيافة" },
  { value: "educational", label: "Educational", labelAr: "تعليمي" },
  { value: "healthcare", label: "Healthcare", labelAr: "صحي" },
  { value: "religious", label: "Religious", labelAr: "ديني" },
  { value: "recreational", label: "Recreational", labelAr: "ترفيهي" },
];

// Building uses
export const BUILDING_USES = [
  { value: "apartments", label: "Apartments", labelAr: "شقق" },
  { value: "villas", label: "Villas", labelAr: "فلل" },
  { value: "townhouse", label: "Townhouse", labelAr: "تاون هاوس" },
  { value: "office", label: "Office", labelAr: "مكاتب" },
  { value: "retail", label: "Retail", labelAr: "تجزئة" },
  { value: "warehouse", label: "Warehouse", labelAr: "مستودع" },
  { value: "factory", label: "Factory", labelAr: "مصنع" },
  { value: "hotel", label: "Hotel", labelAr: "فندق" },
  { value: "school", label: "School", labelAr: "مدرسة" },
  { value: "hospital", label: "Hospital", labelAr: "مستشفى" },
  { value: "clinic", label: "Clinic", labelAr: "عيادة" },
  { value: "mosque", label: "Mosque", labelAr: "مسجد" },
  { value: "parking", label: "Parking", labelAr: "مواقف سيارات" },
];

// Consultant categories
export const CONSULTANT_CATEGORIES = [
  { value: "architecture", label: "Architecture", labelAr: "هندسة معمارية" },
  { value: "structural", label: "Structural Engineering", labelAr: "هندسة إنشائية" },
  { value: "mep", label: "MEP Engineering", labelAr: "هندسة ميكانيكية وكهربائية" },
  { value: "civil", label: "Civil Engineering", labelAr: "هندسة مدنية" },
  { value: "interior_design", label: "Interior Design", labelAr: "تصميم داخلي" },
  { value: "landscape", label: "Landscape Architecture", labelAr: "هندسة المناظر الطبيعية" },
  { value: "urban_planning", label: "Urban Planning", labelAr: "تخطيط عمراني" },
  { value: "project_management", label: "Project Management", labelAr: "إدارة المشاريع" },
];

// Contractor categories
export const CONTRACTOR_CATEGORIES = [
  { value: "building", label: "Building Construction", labelAr: "إنشاء مباني" },
  { value: "road", label: "Road Construction", labelAr: "إنشاء طرق" },
  { value: "infrastructure", label: "Infrastructure", labelAr: "بنية تحتية" },
  { value: "mep", label: "MEP Works", labelAr: "أعمال ميكانيكية وكهربائية" },
  { value: "interior", label: "Interior Fit-Out", labelAr: "تجهيز داخلي" },
  { value: "landscaping", label: "Landscaping", labelAr: "تنسيق حدائق" },
  { value: "demolition", label: "Demolition", labelAr: "هدم" },
];

// Contractor grade classifications
export const CONTRACTOR_GRADES = [
  { value: "special", label: "Special Grade", labelAr: "درجة خاصة" },
  { value: "first", label: "1st Grade", labelAr: "الدرجة الأولى" },
  { value: "second", label: "2nd Grade", labelAr: "الدرجة الثانية" },
  { value: "third", label: "3rd Grade", labelAr: "الدرجة الثالثة" },
  { value: "fourth", label: "4th Grade", labelAr: "الدرجة الرابعة" },
];

// Application priorities
export const APPLICATION_PRIORITIES = [
  { value: "low", label: "Low", labelAr: "منخفض", color: "#9ca3af" },
  { value: "normal", label: "Normal", labelAr: "عادي", color: "#3b82f6" },
  { value: "high", label: "High", labelAr: "عالي", color: "#f59e0b" },
  { value: "urgent", label: "Urgent", labelAr: "عاجل", color: "#dc2626" },
];

// Date formats
export const DATE_FORMAT = "DD/MM/YYYY";
export const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";
export const DATE_FORMAT_API = "YYYY-MM-DD";

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "dubai_portal_auth_token",
  REFRESH_TOKEN: "dubai_portal_refresh_token",
  USER: "dubai_portal_user",
  LANGUAGE: "dubai_portal_language",
  THEME: "dubai_portal_theme",
  SIDEBAR_COLLAPSED: "dubai_portal_sidebar_collapsed",
} as const;
