/**
 * Private Route Guard
 * Protects routes that require authentication
 */
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "@/core/store";
import { ROUTES } from "@/config/routes";

interface PrivateRouteProps {
  children?: React.ReactNode;
  redirectTo?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectTo = ROUTES.LOGIN,
}) => {
  const location = useLocation();
  const { isAuthenticated } = useUserStore();

  if (!isAuthenticated) {
    // Redirect to login with return URL
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location }}
        replace
      />
    );
  }

  // Render children if provided, otherwise render Outlet for nested routes
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
