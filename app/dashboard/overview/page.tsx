import DashboardStats from "../components/dashboard-stats";
import { DashboardGraphClient } from "../components/dashboard-graph-client";

const OverviewPage = () => {
  return (
    <div className="space-y-6">
      <DashboardStats />
      <DashboardGraphClient />
    </div>
  );
};

export default OverviewPage;
