import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface StatCardsProps {
  totalUsers: number;
}

export function StatCards({ totalUsers }: StatCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border bg-linear-to-r from-primary/20 to-primary/5">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <Users className="text-gray-600 size-6" />
          </div>

          <div className="space-y-2">
            <p className="text-gray-600 text-sm font-medium">
              Total Users
            </p>
            <div className="text-2xl font-bold text-primary">{totalUsers}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
