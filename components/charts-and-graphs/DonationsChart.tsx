import { Card } from "@/components/ui/card";

export function DonationsChart() {
  // Dummy data for donations by category
  const data = [
    { category: "Medical", amount: 145000, percentage: 30 },
    { category: "Education", amount: 125000, percentage: 26 },
    { category: "Emergency", amount: 98000, percentage: 20 },
    { category: "Community", amount: 87000, percentage: 18 },
    { category: "Other", amount: 32320, percentage: 6 },
  ];

  const colors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  const maxAmount = Math.max(...data.map((d) => d.amount));

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="text-sm font-medium">{item.category}</span>
              </div>
              <span className="text-sm font-semibold">${item.amount.toLocaleString()}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="h-full transition-all rounded-full"
                style={{
                  width: `${(item.amount / maxAmount) * 100}%`,
                  backgroundColor: colors[index],
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{item.percentage}% of total</p>
          </div>
        ))}

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Raised</span>
            <span className="text-lg font-bold text-green-600">
              ${data.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
