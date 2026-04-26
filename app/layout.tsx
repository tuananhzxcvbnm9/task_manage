import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { IssueStoreProvider } from "@/lib/issue-store";

export const metadata: Metadata = {
  title: "Task Manage",
  description: "Production-ready Linear style task manager foundation"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <IssueStoreProvider>{children}</IssueStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
