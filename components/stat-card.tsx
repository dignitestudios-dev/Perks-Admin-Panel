import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  current: string | number;
  previous?: string | number;
  growth?: number;
  icon: LucideIcon;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  description?: string;
}

const variantStyles = {
  default: "text-muted-foreground",
  primary: "text-blue-600",
  success: "text-green-600",
  warning: "text-amber-600",
  danger: "text-red-600",
};

const variantBgStyles = {
  default: "bg-muted",
  primary: "bg-blue-50",
  success: "bg-green-50",
  warning: "bg-amber-50",
  danger: "bg-red-50",
};

export function StatCard({
  title,
  current,
  previous,
  growth,
  icon: Icon,
  variant = "default",
  description,
}: StatCardProps) {
  return (
    <Card className="border hover:shadow-md transition-shadow">
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className={cn("p-2 rounded-lg", variantBgStyles[variant])}>
            <Icon className={cn("size-6", variantStyles[variant])} />
          </div>
          {growth !== undefined && (
            <Badge
              variant="outline"
              className={cn(
                growth >= 0
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              )}
            >
              {growth >= 0 ? (
                <>
                  <TrendingUp className="me-1 size-3" />
                  {growth >= 0 ? "+" : ""}
                  {growth}%
                </>
              ) : (
                <>
                  <TrendingDown className="me-1 size-3" />
                  {growth}%
                </>
              )}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <div className="text-2xl font-bold">{current}</div>
          {description && (
            <p className="text-muted-foreground text-xs">{description}</p>
          )}
          {previous && (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <span>from {previous}</span>
              <ArrowUpRight className="size-3" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
