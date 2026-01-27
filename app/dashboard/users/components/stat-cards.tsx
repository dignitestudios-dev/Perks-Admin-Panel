import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface StatCardsProps {
  totalUsers: number;
}

export function StatCards({ totalUsers }: StatCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <Users className="text-muted-foreground size-6" />
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground text-sm font-medium">
              Total Users
            </p>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
