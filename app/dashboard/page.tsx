import { StatCard } from "@/components/stat-card";
import { ChartAreaStacked } from "@/components/charts-and-graphs/ChartAreaStacked";
import { ChartBarMultiple } from "@/components/charts-and-graphs/ChartBarMultiple";
import { DonationsChart } from "@/components/charts-and-graphs/DonationsChart";
import { ReportsChart } from "@/components/charts-and-graphs/ReportsChart";
import {
  Users,
  FileText,
  Heart,
  AlertCircle,
  DollarSign,
  Flag,
} from "lucide-react";

const Dashboard = () => {
  // Dummy data for stats
  const stats = {
    users: {
      total: "24.5K",
      previous: "18.2K",
      growth: 34.6,
    },
    postsOverview: [
      {
        title: "Anonymous Posts",
        current: 2847,
        icon: FileText,
        variant: "primary" as const,
      },
      {
        title: "Donation Posts",
        current: 1523,
        icon: Heart,
        variant: "success" as const,
      },
      {
        title: "Reported Posts",
        current: 89,
        icon: Flag,
        variant: "danger" as const,
      },
    ],
    donations: {
      totalPosts: "5,234",
      totalAmount: "$487,320",
      avgDonors: "24.5",
    },
    reports: {
      pending: 127,
      growth: -15.3,
    },
  };

  return (
    <div className="space-y-6">
      {/* User Statistics */}
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          current={stats.users.total}
          previous={stats.users.previous}
          growth={stats.users.growth}
          icon={Users}
          variant="primary"
        />
      </div>

      {/* Posts Overview */}
      <div>
        <h2 className="text-xl font-bold mb-4">Posts Overview</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.postsOverview.map((post, index) => (
            <StatCard
              key={index}
              title={post.title}
              current={post.current}
              icon={post.icon}
              variant={post.variant}
            />
          ))}
        </div>
      </div>

      {/* Donations Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Donations Overview</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Total Donation Posts"
            current={stats.donations.totalPosts}
            icon={Heart}
            variant="success"
          />
          <StatCard
            title="Total Amount Raised"
            current={stats.donations.totalAmount}
            icon={DollarSign}
            variant="success"
          />
          <StatCard
            title="Avg Donors per Post"
            current={stats.donations.avgDonors}
            icon={Users}
            variant="success"
          />
        </div>
      </div>

      {/* Reports Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Reports Status</h2>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-4">
          <StatCard
            title="Reports Pending Review"
            current={stats.reports.pending}
            growth={stats.reports.growth}
            icon={AlertCircle}
            variant="danger"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <h3 className="text-lg font-bold mb-4">User Trends</h3>
          <ChartAreaStacked />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Posts Activity</h3>
          <ChartBarMultiple />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <h3 className="text-lg font-bold mb-4">Donations Breakdown</h3>
          <DonationsChart />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Reports Overview</h3>
          <ReportsChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
