"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Download } from "lucide-react";
import type { Transaction } from "@/lib/types";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              All Transactions
            </Button>
            <Button variant="outline" size="sm">
              Income
            </Button>
            <Button variant="outline" size="sm">
              Expense
            </Button>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b">
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-left py-3 px-4">Transaction ID</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Card</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-right py-3 px-4">Amount</th>
                <th className="text-center py-3 px-4">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b last:border-0">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {transaction.direction === "incoming" ? (
                        <ArrowDownRight className="text-green-500" />
                      ) : (
                        <ArrowUpRight className="text-red-500" />
                      )}
                      {transaction.description}
                    </div>
                  </td>
                  <td className="py-3 px-4">{transaction.transactionId}</td>
                  <td className="py-3 px-4">{transaction.type}</td>
                  <td className="py-3 px-4">**** {transaction.cardLastFour}</td>
                  <td className="py-3 px-4">{transaction.date}</td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={
                        transaction.direction === "incoming"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {transaction.direction === "incoming" ? "+" : "-"}$
                      {transaction.amount}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
