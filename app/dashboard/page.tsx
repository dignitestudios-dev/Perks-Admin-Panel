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
import DashboardStats from "./components/dashboard-stats";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardStats />

      {/* Reports Section removed — no API data available for reports */}

      {/* Charts Section (static) */}
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
