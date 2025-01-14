import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BankDash",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen bg-background">
            <div className="hidden md:block">
              <Sidebar />
            </div>

            <main className="flex-1 flex flex-col min-h-screen relative">
              <Header />
              <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden pb-20 md:pb-8">
                {children}
              </div>
              <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
                <MobileNav />
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
