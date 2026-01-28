import { useQuery } from "@tanstack/react-query";
import { adminAPI } from "@/lib/api/admin.api";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: () => adminAPI.getDashboardStats(),
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: true,
  });
};
