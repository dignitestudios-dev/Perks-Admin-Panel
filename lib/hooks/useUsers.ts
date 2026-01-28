import { useQuery } from "@tanstack/react-query";
import { usersAPI, GetUsersParams } from "@/lib/api/users.api";

/**
 * Hook to fetch users with pagination and search
 * Uses TanStack Query for caching and refetching
 */
export const useUsers = (params: GetUsersParams = {}) => {
  const { page = 1, limit = 10, search = "" } = params;

  return useQuery({
    queryKey: ["users", { page, limit, search }],
    queryFn: () =>
      usersAPI.getAll({
        page,
        limit,
        search,
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch blocked users with pagination and search
 * Uses TanStack Query for caching and refetching
 */
export const useBlockedUsers = (params: GetUsersParams = {}) => {
  const { page = 1, limit = 10, search = "" } = params;

  return useQuery({
    queryKey: ["blocked-users", { page, limit, search }],
    queryFn: () =>
      usersAPI.getBlocked({
        page,
        limit,
        search,
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch single user
 */
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => usersAPI.getById(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
