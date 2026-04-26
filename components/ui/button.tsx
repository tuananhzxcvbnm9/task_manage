import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border border-border bg-card px-4 text-sm font-medium transition hover:bg-muted disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
