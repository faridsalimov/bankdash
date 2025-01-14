"use client";

import { Card } from "@/components/ui/card";
import { ShoppingBasket, HandPlatter, RefreshCcw } from "lucide-react";
import type { Transaction } from "@/lib/types";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Last Transaction</h2>
        <button className="text-sm text-primary">See All</button>
      </div>
      <div className="space-y-6">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`p-3 rounded-full ${
                  transaction.type === "Shopping"
                    ? "bg-cyan-100 dark:bg-cyan-900/50"
                    : transaction.type === "Service"
                    ? "bg-blue-100 dark:bg-blue-900/50"
                    : "bg-red-100 dark:bg-red-900/50"
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
                {transaction.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
