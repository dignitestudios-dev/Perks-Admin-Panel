"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface RevenueComparisonChartProps {
  data: Array<{ month: string; year1: number; year2: number }>;
  year1: number;
  year2: number;
  color1?: string;
  color2?: string;
}

export function RevenueComparisonChart({ data, year1, year2, color1, color2 }: RevenueComparisonChartProps) {
  const chartConfig = {
    year1: {
      label: `${year1}`,
      color: color1 || "var(--chart-1)",
    },
    year2: {
      label: `${year2}`,
      color: color2 || "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Comparison</CardTitle>
        <CardDescription>
           Monthly revenue - {year1} vs {year2}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 12,
              right: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              }
            />
            <Legend />
            <Line
              dataKey="year1"
              type="monotone"
              stroke={color1 || "var(--color-year1)"}
              strokeWidth={2}
              dot={{
                fill: color1 || "var(--color-year1)",
              }}
              activeDot={{
                r: 6,
              }}
              name={`${year1}`}
            />
            <Line
              dataKey="year2"
              type="monotone"
              stroke={color2 || "var(--color-year2)"}
              strokeWidth={2}
              dot={{
                fill: color2 || "var(--color-year2)",
              }}
              activeDot={{
                r: 6,
              }}
              name={`${year2}`}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Year-over-year revenue growth comparison <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Comparing revenue between {year1} and {year2}
        </div>
      </CardFooter>
    </Card>
  );
}
