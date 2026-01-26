import {
  QueryClient,
  DefaultError,
  DefinedInitialDataOptions,
} from "@tanstack/react-query";

/**
 * Create and configure TanStack Query Client
 * Production-level configuration with proper defaults
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set stale time to 5 minutes
      staleTime: 5 * 60 * 1000,
      // Cache data for 10 minutes before garbage collection
      gcTime: 10 * 60 * 1000,
      // Retry failed requests up to 3 times
      retry: 3,
      // Retry with exponential backoff
      retryDelay: (attemptIndex) =>
        Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus
      refetchOnWindowFocus: true,
      // Refetch on mount
      refetchOnMount: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
      // Retry delay for mutations
      retryDelay: (attemptIndex) =>
        Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

export default queryClient;
