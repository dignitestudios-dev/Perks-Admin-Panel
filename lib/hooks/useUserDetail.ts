import { useQuery } from "@tanstack/react-query";
import { userDetailsAPI } from "@/lib/api/user-details.api";

/**
 * Hook to fetch user details by ID
 * Uses TanStack Query for caching and refetching
 */
export const useUserDetail = (userId: string) => {
  return useQuery({
    queryKey: ["user-detail", userId],
    queryFn: () => userDetailsAPI.getById(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
