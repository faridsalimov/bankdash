"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useActivityData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";

const defaultAxisProps = {
  axisLine: false,
  tickLine: false,
  tick: { fontSize: 12 },
};

export function DashboardActivity() {
  const { activityData, isLoading, error } = useActivityData();

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load activity data: {error.message}
      </div>
    );
  }

  if (isLoading) return <ActivitySkeleton />;

  return (
    <Card className="chart-container">
      <div className="chart-header">
        <h2 className="text-lg font-semibold">Weekly Activity</h2>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-dot bg-blue-500" />
            <span>Deposit</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot bg-emerald-400" />
            <span>Withdraw</span>
          </div>
        </div>
      </div>
      <div className="p-6 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activityData?.weekly} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis {...defaultAxisProps} dataKey="name" dy={10} />
            <YAxis
              {...defaultAxisProps}
              width={60}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
              }}
              labelStyle={{ color: "#6B7280", marginBottom: "4px" }}
            />
            <Bar
              dataKey="deposit"
              fill="rgb(59, 130, 246)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="withdraw"
              fill="rgb(52, 211, 153)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function ActivitySkeleton() {
  return (
    <Card className="chart-container">
      <div className="chart-header">
        <Skeleton className="h-6 w-36" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="p-6">
        <Skeleton className="h-[300px] w-full" />
      </div>
    </Card>
  );
}
