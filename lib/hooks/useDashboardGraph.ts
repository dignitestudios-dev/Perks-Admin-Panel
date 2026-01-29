import { useQuery } from "@tanstack/react-query";
import { adminAPI } from "@/lib/api/admin.api";

export const useDashboardGraph = () => {
  return useQuery({
    queryKey: ["admin-dashboard-graph"],
    queryFn: () => adminAPI.getDashboardGraph(),
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: true,
  });
};
