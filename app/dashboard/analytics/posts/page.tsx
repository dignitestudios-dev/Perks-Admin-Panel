"use client";

import React from "react";
import { StatCard } from "@/components/stat-card";
import { ChartBarMultiple } from "@/components/charts-and-graphs/ChartBarMultiple";
import { FileText, Heart, Flag } from "lucide-react";

const PostsAnalyticsPage = () => {
  const posts = {
    anonymous: 2847,
    donation: 1523,
    reported: 89,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Posts Analytics</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Anonymous Posts" current={posts.anonymous} icon={FileText} variant="primary" />
        <StatCard title="Donation Posts" current={posts.donation} icon={Heart} variant="success" />
        <StatCard title="Reported Posts" current={posts.reported} icon={Flag} variant="danger" />
      </div>

      <div>
        <h2 className="text-lg font-bold">Posts Activity</h2>
        <ChartBarMultiple />
      </div>
    </div>
  );
};

export default PostsAnalyticsPage;
