import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

export function ReportsChart() {
  // Dummy data for reports
  const reportData = [
    {
      type: "Post Reports",
      count: 85,
      status: "pending",
      icon: AlertCircle,
      color: "bg-red-100",
      textColor: "text-red-600",
    },
    {
      type: "Comment Reports",
      count: 32,
      status: "pending",
      icon: AlertCircle,
      color: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      type: "Resolved",
      count: 234,
      status: "resolved",
      icon: CheckCircle,
      color: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      type: "Under Review",
      count: 42,
      status: "review",
      icon: Clock,
      color: "bg-blue-100",
      textColor: "text-blue-600",
    },
  ];

  const totalReports = reportData.reduce((sum, report) => sum + report.count, 0);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {reportData.map((report, index) => {
          const Icon = report.icon;
          const percentage = ((report.count / totalReports) * 100).toFixed(1);

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${report.color}`}>
                    <Icon className={`w-4 h-4 ${report.textColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{report.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {report.status === "pending" && "Needs attention"}
                      {report.status === "resolved" && "Completed"}
                      {report.status === "review" && "In progress"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{report.count}</p>
                  <p className="text-xs text-muted-foreground">{percentage}%</p>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all rounded-full ${report.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}

        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Reports</span>
            <span className="text-lg font-bold">{totalReports}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Pending Action</span>
            <span className="text-red-600 font-semibold">
              {reportData[0].count + reportData[1].count}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
