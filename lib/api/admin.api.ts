import { API } from "./axios";

export interface DashboardStatsResponse {
  status: string;
  data: {
    totalUsers: number;
    totalPosts: number;
    totalDonations: number;
    totalRevenue: number;
    totalAppCommission: number;
    activeUsers: number;
    inactiveUsers: number;
  };
}

export const adminAPI = {
  getDashboardStats: async (): Promise<DashboardStatsResponse> => {
    try {
      const res = await API.get<DashboardStatsResponse>("/admin/dashboard-stats");
      return res.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to fetch dashboard stats",
        status: error.response?.status || 500,
      };
    }
  },
};
