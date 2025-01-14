"use client";

import { Card } from "@/components/ui/card";
import { Wallet, ArrowUpRight, PiggyBank, Receipt } from "lucide-react";

interface OverviewCardProps {
  title: string;
  amount: number;
  type: "balance" | "income" | "expense" | "saving";
}

export function OverviewCard({ title, amount, type }: OverviewCardProps) {
  const icons = {
    balance: Wallet,
    income: ArrowUpRight,
    expense: Receipt,
    saving: PiggyBank,
  };

  const colors = {
    balance: "bg-amber-100 dark:bg-amber-900/50",
    income: "bg-blue-100 dark:bg-blue-900/50",
    expense: "bg-red-100 dark:bg-red-900/50",
    saving: "bg-emerald-100 dark:bg-emerald-900/50",
  };

  const Icon = icons[type];

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-4">
        <div className={`p-4 rounded-full ${colors[type]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">${amount.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
}
