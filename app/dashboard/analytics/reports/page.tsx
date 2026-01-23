"use client";

import React from "react";
import { StatCard } from "@/components/stat-card";
import { ReportsChart } from "@/components/charts-and-graphs/ReportsChart";
import { AlertTriangle } from "lucide-react";

const ReportsAnalyticsPage = () => {
  const data = {
    pending: 127,
    growth: -15.3,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports Analytics</h1>

      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-4">
        <StatCard title="Reports Pending Review" current={data.pending} growth={data.growth} icon={AlertTriangle} variant="danger" />
      </div>

      <div>
        <h2 className="text-lg font-bold">Reports Overview</h2>
        <ReportsChart />
      </div>
    </div>
  );
};

export default ReportsAnalyticsPage;
