/**
 * Role-Based Route Guard
 * Protects routes based on user role.
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

  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location }}
        replace
      />
    );
  }

  if (!hasRole(allowedRoles)) {
    return <Navigate to={unauthorizedRedirect} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default RoleRoute;
