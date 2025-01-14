"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useQuickTransferContacts } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function DashboardTransfer() {
  const { contacts, isLoading, error } = useQuickTransferContacts();

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load contacts: {error.message}
      </div>
    );
  }

  if (isLoading) return <TransferSkeleton />;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Quick Transfer</h2>
      <div className="space-y-6">
        <div className="flex gap-6 overflow-x-auto pb-2">
          {contacts?.map((contact) => (
            <div key={contact.id} className="text-center min-w-[100px]">
              <Avatar className="cursor-pointer h-32 w-32">
                <AvatarImage src={contact.avatar} alt={contact.name} />
              </Avatar>
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-muted-foreground">{contact.role}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <Input placeholder="Write Amount" defaultValue="525.50" />
          <Button className="gap-2">
            Send
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

function TransferSkeleton() {
  return (
    <Card className="p-6">
      <Skeleton className="h-8 w-40 mb-6" />
      <div className="space-y-6">
        <div className="flex gap-6 overflow-x-auto pb-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center min-w-[100px]">
              <Skeleton className="w-16 h-16 mx-auto mb-2 rounded-full" />
              <Skeleton className="h-5 w-20 mx-auto mb-1" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </Card>
  );
}
