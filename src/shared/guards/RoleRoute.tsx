/**
 * Role-Based Route Guard
 * Protects routes based on user role
 */
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserStore, type UserRole } from "@/core/store";
import { ROUTES } from "@/config/routes";

interface RoleRouteProps {
  children?: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
  unauthorizedRedirect?: string;
}

export const RoleRoute: React.FC<RoleRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = ROUTES.LOGIN,
  unauthorizedRedirect = ROUTES.UNAUTHORIZED,
}) => {
  const location = useLocation();
  const { isAuthenticated, hasRole } = useUserStore();

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location }}
        replace
      />
    );
  }

  // Authenticated but not authorized - redirect to unauthorized page
  if (!hasRole(allowedRoles)) {
    return (
      <Navigate
        to={unauthorizedRedirect}
        replace
      />
    );
  }

  // Authorized - render content
  return children ? <>{children}</> : <Outlet />;
};

/**
 * Pre-configured role routes for common use cases
 */
export const ConsultantRoute: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <RoleRoute allowedRoles={["consultant_admin", "project_engineer"]}>
    {children}
  </RoleRoute>
);

export const ContractorRoute: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <RoleRoute allowedRoles={["contractor"]}>
    {children}
  </RoleRoute>
);

export const AuthorityRoute: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <RoleRoute allowedRoles={["authority_simulator"]}>
    {children}
  </RoleRoute>
);

export default RoleRoute;
