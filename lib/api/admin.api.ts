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

export interface DashboardGraphResponse {
  year: number;
  monthly: {
    january: { users: number; posts: number; revenue: number };
    february: { users: number; posts: number; revenue: number };
    march: { users: number; posts: number; revenue: number };
    april: { users: number; posts: number; revenue: number };
    may: { users: number; posts: number; revenue: number };
    june: { users: number; posts: number; revenue: number };
    july: { users: number; posts: number; revenue: number };
    august: { users: number; posts: number; revenue: number };
    september: { users: number; posts: number; revenue: number };
    october: { users: number; posts: number; revenue: number };
    november: { users: number; posts: number; revenue: number };
    december: { users: number; posts: number; revenue: number };
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

  getDashboardGraph: async (): Promise<DashboardGraphResponse> => {
    try {
      const currentYear = new Date().getFullYear();
      const res = await API.get<DashboardGraphResponse>("/admin/dashboard-graph", {
        params: { year: currentYear },
      });
      return res.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to fetch dashboard graph data",
        status: error.response?.status || 500,
      };
    }
  },

  getYearComparison: async (year1: number, year2: number): Promise<{ year1: DashboardGraphResponse; year2: DashboardGraphResponse }> => {
    try {
      const [res1, res2] = await Promise.all([
        API.get<DashboardGraphResponse>("/admin/dashboard-graph", {
          params: { year: year1 },
        }),
        API.get<DashboardGraphResponse>("/admin/dashboard-graph", {
          params: { year: year2 },
        }),
      ]);
      return {
        year1: res1.data,
        year2: res2.data,
      };
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to fetch year comparison data",
        status: error.response?.status || 500,
      };
    }
  },
};
