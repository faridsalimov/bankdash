"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useInvoices } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";

export function Invoices() {
  const { invoices, isLoading, error } = useInvoices();

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load invoices: {error.message}
      </div>
    );
  }

  if (isLoading) return <InvoicesSkeleton />;

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Invoices Sent</h2>
      <div className="space-y-6">
        {invoices?.map((invoice) => (
          <div key={invoice.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-muted">
                <Image src={invoice.icon} alt="" width={24} height={24} />
              </div>
              <div>
                <p className="font-medium">{invoice.name}</p>
                <p className="text-sm text-muted-foreground">{invoice.time}</p>
              </div>
            </div>
            <p className="font-medium">${invoice.amount}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function InvoicesSkeleton() {
  return (
    <Card className="p-6">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </Card>
  );
}
