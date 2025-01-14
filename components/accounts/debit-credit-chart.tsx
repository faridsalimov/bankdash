"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  YAxis,
} from "recharts";
import { useActivityData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";

export function DebitCreditChart() {
  const { activityData, isLoading, error } = useActivityData();

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load chart data: {error.message}
      </div>
    );
  }

  if (isLoading) return <ChartSkeleton />;

  return (
    <Card className="chart-container">
      <div className="chart-header">
        <h2 className="text-lg font-semibold">Debit & Credit Overview</h2>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-dot bg-blue-500 dark:bg-blue-400" />
            <span>Debit</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot bg-orange-400 dark:bg-orange-300" />
            <span>Credit</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="text-sm text-muted-foreground mb-4">
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            $7,560
          </span>{" "}
          Debited &{" "}
          <span className="text-orange-400 dark:text-orange-300 font-medium">
            $5,420
          </span>{" "}
          Credited in this Week
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData?.weekly}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                width={60}
                tickFormatter={(value) => `$${value}`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "12px",
                }}
                labelStyle={{
                  color: "var(--muted-foreground)",
                  marginBottom: "4px",
                }}
              />
              <Bar
                dataKey="deposit"
                fill="rgb(59, 130, 246)"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
              <Bar
                dataKey="withdraw"
                fill="rgb(251, 146, 60)"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}

function ChartSkeleton() {
  return (
    <Card className="chart-container">
      <div className="chart-header">
        <Skeleton className="h-6 w-48" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="p-6">
        <Skeleton className="h-4 w-96 mb-4" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    </Card>
  );
}
