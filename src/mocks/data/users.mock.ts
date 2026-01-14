/**
 * Mock Users Data
 */
import type { AuthUser } from "@/features/auth/types";

/**
 * Mock consultant user
 */
export const mockConsultant: AuthUser = {
  id: "user-001",
  email: "consultant@dccj.ae",
  firstName: "Mohammed",
  lastName: "Al Rashid",
  firstNameAr: "محمد",
  lastNameAr: "الراشد",
  phone: "+971501234567",
  emiratesId: "784-1985-1234567-1",
  role: "consultant_admin",
  avatar: undefined,
  companyName: "Dubai Engineering Consultants",
  companyNameAr: "مستشارو دبي الهندسيون",
  licenseNumber: "DM-CON-2025-1234",
  licenseCategory: "G+12",
  excellenceRating: 4,
  isVerified: true,
  isActive: true,
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2025-12-01T14:00:00Z",
  createdBy: "system",
};

/**
 * Mock project engineer user
 */
export const mockEngineer: AuthUser = {
  id: "user-002",
  email: "engineer@dccj.ae",
  firstName: "Sara",
  lastName: "Ahmed",
  firstNameAr: "سارة",
  lastNameAr: "أحمد",
  phone: "+971502345678",
  role: "project_engineer",
  companyName: "Dubai Engineering Consultants",
  companyNameAr: "مستشارو دبي الهندسيون",
  licenseNumber: "DM-CON-2025-1234",
  isVerified: true,
  isActive: true,
  createdAt: "2024-06-01T09:00:00Z",
  updatedAt: "2025-11-15T11:00:00Z",
  createdBy: "user-001",
};

/**
 * Mock contractor user
 */
export const mockContractor: AuthUser = {
  id: "contractor-001",
  email: "contractor@dccj.ae",
  firstName: "Khalid",
  lastName: "Hassan",
  firstNameAr: "خالد",
  lastNameAr: "حسن",
  phone: "+971503456789",
  role: "contractor",
  companyName: "Al Habtoor Construction",
  companyNameAr: "الحبتور للمقاولات",
  licenseNumber: "DM-CTR-2024-5678",
  contractorGrade: "first",
  specializations: ["building", "infrastructure"],
  isVerified: true,
  isActive: true,
  createdAt: "2023-03-01T08:00:00Z",
  updatedAt: "2025-10-01T10:00:00Z",
  createdBy: "system",
};

/**
 * Mock authority simulator user
 */
export const mockAuthority: AuthUser = {
  id: "authority-001",
  email: "authority@dm.gov.ae",
  firstName: "DM",
  lastName: "Reviewer",
  firstNameAr: "مراجع",
  lastNameAr: "البلدية",
  phone: "+971504567890",
  role: "authority_simulator",
  companyName: "Dubai Municipality",
  companyNameAr: "بلدية دبي",
  isVerified: true,
  isActive: true,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
  createdBy: "system",
};

/**
 * All mock users
 */
export const mockUsers: AuthUser[] = [
  mockConsultant,
  mockEngineer,
  mockContractor,
  mockAuthority,
];

/**
 * Mock login function
 */
export const mockLogin = (email: string, password: string): { user: AuthUser; token: string } | null => {
  const user = mockUsers.find((u) => u.email === email);
  
  if (user && password === "password123") {
    return {
      user,
      token: `mock-jwt-token-${user.id}-${Date.now()}`,
    };
  }
  
  return null;
};

export default mockUsers;
