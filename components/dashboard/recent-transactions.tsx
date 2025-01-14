"use client";

import { Card } from "@/components/ui/card";
import { useTransactions } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBasket, HandPlatter, RefreshCcw } from "lucide-react";

interface RecentTransactionsProps {
  userId: string | undefined;
}

export function RecentTransactions({ userId }: RecentTransactionsProps) {
  const { transactions, isLoading, error } = useTransactions(userId);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load transactions: {error.message}
      </div>
    );
  }

  if (isLoading || !transactions) {
    return <TransactionsSkeleton />;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Transaction</h2>
      </div>
      <div className="space-y-6">
        {transactions.slice(0, 3).map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`p-3 rounded-full ${
                  transaction.type === "Shopping"
                    ? "bg-cyan-100 dark:bg-cyan-900"
                    : transaction.type === "Service"
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-red-100 dark:bg-red-900"
                }`}
              >
                {transaction.type === "Shopping" ? (
                  <ShoppingBasket className="h-5 w-5" />
                ) : transaction.type === "Service" ? (
                  <HandPlatter className="h-5 w-5" />
                ) : (
                  <RefreshCcw className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {transaction.date}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {transaction.type}
              </p>
              <p className="text-sm text-muted-foreground">
                **** {transaction.cardLastFour}
              </p>
            </div>
            <div className="text-right">
              <p
                className={
                  transaction.status === "Pending"
                    ? "text-amber-500 dark:text-amber-400"
                    : "text-green-500 dark:text-green-400"
                }
              >
                {transaction.status}
              </p>
              <p
                className={`text-sm ${
                  transaction.direction === "outgoing"
                    ? "text-red-500 dark:text-red-400"
                    : "text-green-500 dark:text-green-400"
                }`}
              >
                {transaction.direction === "outgoing" ? "-" : "+"}$
                {transaction.amount.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TransactionsSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="text-right">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="text-right">
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
