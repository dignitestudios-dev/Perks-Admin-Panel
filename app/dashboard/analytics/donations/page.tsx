"use client";

import React from "react";
import { StatCard } from "@/components/stat-card";
import { DonationsChart } from "@/components/charts-and-graphs/DonationsChart";
import { Heart, DollarSign, Users } from "lucide-react";

const DonationsAnalyticsPage = () => {
  const data = {
    totalPosts: "5,234",
    totalAmount: "$487,320",
    avgDonors: "24.5",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Donations Analytics</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Donation Posts" current={data.totalPosts} icon={Heart} variant="success" />
        <StatCard title="Total Amount Raised" current={data.totalAmount} icon={DollarSign} variant="success" />
        <StatCard title="Avg Donors per Post" current={data.avgDonors} icon={Users} variant="success" />
      </div>

      <div>
        <h2 className="text-lg font-bold">Donations Breakdown</h2>
        <DonationsChart />
      </div>
    </div>
  );
};

export default DonationsAnalyticsPage;
