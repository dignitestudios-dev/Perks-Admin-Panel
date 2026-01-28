"use client";

import React from "react";
import { useDashboardStats } from "@/lib/hooks/useDashboardStats";
import { StatCard } from "@/components/stat-card";
import { Users, FileText, Heart, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardStats() {
  const { data, isLoading } = useDashboardStats();
  const stats = data?.data;

  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return "—";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-bold mb-4">Users Overview</h2>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
          <StatCard
            title="Total Users"
            current={
              isLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                (stats?.totalUsers ?? "—")
              )
            }
            icon={Users}
            variant="primary"
            description={
              isLoading ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                `${stats?.activeUsers ?? 0} active • ${stats?.inactiveUsers ?? 0} inactive`
              )
            }
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Posts Overview</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Total Posts"
            current={
              isLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                (stats?.totalPosts ?? "—")
              )
            }
            icon={FileText}
            variant="primary"
          />
          <StatCard
            title="Donation Posts"
            current={
              isLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                (stats?.totalDonations ?? "—")
              )
            }
            icon={Heart}
            variant="success"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Donations Overview</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Total Donation Posts"
            current={
              isLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                (stats?.totalDonations ?? "—")
              )
            }
            icon={Heart}
            variant="success"
          />
          <StatCard
            title="Total Amount Raised"
            current={
              isLoading ? (
                <Skeleton className="h-6 w-28" />
              ) : (
                formatCurrency(stats?.totalRevenue)
              )
            }
            icon={DollarSign}
            variant="success"
          />
          <StatCard
            title="App Commission"
            current={
              isLoading ? (
                <Skeleton className="h-6 w-28" />
              ) : (
                formatCurrency(stats?.totalAppCommission)
              )
            }
            icon={Users}
            variant="success"
          />
        </div>
      </div>
    </>
  );
}
