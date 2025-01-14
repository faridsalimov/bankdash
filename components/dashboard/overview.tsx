"use client";

import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useExpenseCategories } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ["#3B82F6", "#F97316", "#EC4899", "#6366F1"];

export function DashboardOverview() {
  const { categories, isLoading, error } = useExpenseCategories();

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load expense categories: {error.message}
      </div>
    );
  }

  if (isLoading) return <OverviewSkeleton />;

  return (
    <Card className="chart-container">
      <div className="chart-header">
        <h2 className="text-lg font-semibold">Expense Statistics</h2>
      </div>
      <div className="p-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={4}
                dataKey="percentage"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {categories?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px",
                }}
                formatter={(value: number) => [`${value}%`]}
              />
              <Legend
                verticalAlign="bottom"
                height={48}
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-sm text-gray-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}

function OverviewSkeleton() {
  return (
    <Card className="chart-container">
      <div className="chart-header">
        <Skeleton className="h-6 w-36" />
      </div>
      <div className="p-6">
        <Skeleton className="h-[300px] w-full" />
        <div className="grid grid-cols-2 gap-4 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-32" />
          ))}
        </div>
      </div>
    </Card>
  );
}
