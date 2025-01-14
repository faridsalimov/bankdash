"use client";

import { Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/lib/hooks/useData";
import { ThemeToggle } from "@/components/theme-toggle";

const getTabName = (pathname: string): string => {
  switch (pathname) {
    case "/":
      return "Overview";
    case "/transactions":
      return "Transactions";
    case "/accounts":
      return "Accounts";
    case "/settings":
      return "Setting";
    default:
      return "Overview";
  }
};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const tabName = getTabName(pathname);
  const { user } = useUser();

  const navigateToSettings = () => {
    router.push("/settings");
  };

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-2xl font-semibold flex-1">{tabName}</h1>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={navigateToSettings}>
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={navigateToSettings}>
                Appearance
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={navigateToSettings}>
                Security
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-9 w-9">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={navigateToSettings}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={navigateToSettings}>
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={navigateToSettings}>
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
