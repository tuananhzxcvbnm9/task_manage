"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Issues" },
  { href: "/board", label: "Board" },
  { href: "/projects", label: "Projects" }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Linear-style Task Manager</h1>
          <span className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">Keyboard friendly</span>
        </div>
        <ThemeToggle />
      </header>
      <nav className="mb-6 flex gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-md border px-3 py-1.5 text-sm",
              pathname === link.href ? "border-primary text-primary" : "border-border text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
