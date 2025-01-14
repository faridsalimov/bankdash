"use client";

import { useUser, useCards, useTransactions } from "@/lib/hooks/useData";
import { TransactionList } from "@/components/transactions/list";
import { TransactionCards } from "@/components/transactions/cards";
import { TransactionChart } from "@/components/transactions/chart";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionsPage() {
  const { user, isLoading: userLoading, error: userError } = useUser();
  const {
    cards,
    isLoading: cardsLoading,
    error: cardsError,
  } = useCards(user?.id);
  const {
    transactions,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useTransactions(user?.id);

  if (userError || cardsError || transactionsError) {
    return (
      <div className="p-4 text-red-500">
        Failed to load transaction data. Please try again later.
      </div>
    );
  }

  if (userLoading || cardsLoading || transactionsLoading || !user) {
    return <TransactionsPageSkeleton />;
  }

  return (
    <div className="space-y-6">
      <TransactionCards cards={cards} />
      <TransactionChart />
      <TransactionList transactions={transactions} />
    </div>
  );
}

function TransactionsPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-8 w-24" />
                </div>
                <Skeleton className="h-10 w-10 rounded" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
                <Skeleton className="h-6 w-48" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-6">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-[300px] w-full" />
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
