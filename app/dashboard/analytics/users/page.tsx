"use client";

import React from "react";
import { StatCard } from "@/components/stat-card";
import { ChartAreaStacked } from "@/components/charts-and-graphs/ChartAreaStacked";
import { Users } from "lucide-react";

const UsersAnalyticsPage = () => {
  const data = {
    totalUsers: "24.5K",
    previous: "18.2K",
    growth: 34.6,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Users Analytics</h1>

      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          current={data.totalUsers}
          previous={data.previous}
          growth={data.growth}
          icon={Users}
          variant="primary"
        />
      </div>

      <div>
        <h2 className="text-lg font-bold">User Trends</h2>
        <ChartAreaStacked />
      </div>
    </div>
  );
};

export default UsersAnalyticsPage;
