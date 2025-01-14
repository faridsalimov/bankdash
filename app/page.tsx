"use client";

import { useUser } from "@/lib/hooks/useData";
import { DashboardCards } from "@/components/dashboard/cards";
import { DashboardActivity } from "@/components/dashboard/activity";
import { DashboardOverview } from "@/components/dashboard/overview";
import { DashboardTransfer } from "@/components/dashboard/transfer";
import { BalanceHistory } from "@/components/dashboard/balance-history";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, isLoading, error } = useUser();

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load dashboard: {error.message}
      </div>
    );
  }

  if (isLoading || !user) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="dashboard-grid space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCards userId={user.id} />
        <RecentTransactions userId={user.id} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <DashboardActivity />
        <DashboardOverview />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <DashboardTransfer />
        <BalanceHistory />
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="dashboard-grid space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    </div>
  );
}
