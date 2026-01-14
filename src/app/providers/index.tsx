/**
 * App Providers
 * Combines all application providers
 */
import React, { Suspense } from "react";
import { MantineConfigProvider } from "./MantineConfigProvider";
import { QueryClientProvider } from "./QueryClientProvider";

interface AppProvidersProps {
  children: React.ReactNode;
}

// Loading fallback for Suspense - uses plain CSS since it renders before MantineProvider
const AppLoader: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f5f7fa",
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        border: "3px solid #e5e7eb",
        borderTopColor: "#004d99",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider>
      <MantineConfigProvider>
        <Suspense fallback={<AppLoader />}>
          {children}
        </Suspense>
      </MantineConfigProvider>
    </QueryClientProvider>
  );
};

export { MantineConfigProvider } from "./MantineConfigProvider";
export { QueryClientProvider } from "./QueryClientProvider";

export default AppProviders;
