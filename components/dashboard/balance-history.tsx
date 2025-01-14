"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useBalanceHistory } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";

export function BalanceHistory() {
  const { history, isLoading, error } = useBalanceHistory();

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load balance history data: {error.message}
      </div>
    );
  }

  if (isLoading) return <HistorySkeleton />;

  return (
    <Card className="chart-container">
      <div className="chart-header">
        <h2 className="text-lg font-semibold">Balance History</h2>
      </div>
      <div className="p-6 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={history}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
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
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
              }}
              labelStyle={{ color: "#6B7280", marginBottom: "4px" }}
              formatter={(value: number) => [`$${value}`]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="rgb(59, 130, 246)"
              strokeWidth={2}
              dot={{ fill: "rgb(59, 130, 246)", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "rgb(59, 130, 246)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function HistorySkeleton() {
  return (
    <Card className="chart-container">
      <div className="chart-header">
        <Skeleton className="h-6 w-36" />
      </div>
      <div className="p-6">
        <Skeleton className="h-[300px] w-full" />
      </div>
    </Card>
  );
}
