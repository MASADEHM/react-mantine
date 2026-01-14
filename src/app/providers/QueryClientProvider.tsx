/**
 * Query Client Provider
 * Provides TanStack Query with DevTools
 */
import React from "react";
import {
  QueryClientProvider as TanStackQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/core/query";
import { env } from "@/config/env";

interface QueryClientProviderProps {
  children: React.ReactNode;
}

export const QueryClientProvider: React.FC<QueryClientProviderProps> = ({
  children,
}) => {
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
      {/* DevTools only in development */}
      {env.isDev && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      )}
    </TanStackQueryClientProvider>
  );
};

export default QueryClientProvider;
