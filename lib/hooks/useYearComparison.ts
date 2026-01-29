import { useQuery } from "@tanstack/react-query";
import { adminAPI } from "@/lib/api/admin.api";

export const useYearComparison = (year1: number, year2: number) => {
  return useQuery({
    queryKey: ["year-comparison", year1, year2],
    queryFn: () => adminAPI.getYearComparison(year1, year2),
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: true,
    enabled: year1 !== year2 && year1 > 0 && year2 > 0,
  });
};
