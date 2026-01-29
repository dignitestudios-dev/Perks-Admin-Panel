"use client";

import { Loader } from "lucide-react";
import { useDashboardGraph } from "@/lib/hooks/useDashboardGraph";
import { UsersChart } from "@/components/charts-and-graphs/UsersChart";
import { PostsChart } from "@/components/charts-and-graphs/PostsChart";
import { RevenueChart } from "@/components/charts-and-graphs/RevenueChart";

export function DashboardGraphClient() {
  const { data: graphData, isLoading, error } = useDashboardGraph();

  // Transform monthly data into arrays for charts
  const transformChartData = () => {
    if (!graphData?.monthly) return [];

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months.map((month) => ({
      month,
      users:
        graphData.monthly[month.toLowerCase() as keyof typeof graphData.monthly]
          ?.users || 0,
      posts:
        graphData.monthly[month.toLowerCase() as keyof typeof graphData.monthly]
          ?.posts || 0,
      revenue:
        graphData.monthly[month.toLowerCase() as keyof typeof graphData.monthly]
          ?.revenue || 0,
    }));
  };

  const chartData = transformChartData();
  const currentYear = new Date().getFullYear();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-950 dark:text-red-200">
        <p>Failed to load dashboard charts. Please try again later.</p>
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="rounded-lg bg-blue-50 p-4 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
        <p>No data available for the current year.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <UsersChart
        data={chartData.map((d) => ({ month: d.month, users: d.users }))}
        year={currentYear}
      />
      <PostsChart
        data={chartData.map((d) => ({ month: d.month, posts: d.posts }))}
        year={currentYear}
      />
      <RevenueChart
        data={chartData.map((d) => ({ month: d.month, revenue: d.revenue }))}
        year={currentYear}
      />
    </div>
  );
}
