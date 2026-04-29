import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "verified" | "premium" | "muted" | "live";

const badgeStyles: Record<BadgeVariant, string> = {
  default: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100",
  verified: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100",
  premium: "bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-100",
  muted: "bg-ink-100 text-ink-700 ring-1 ring-inset ring-ink-200",
  live: "bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-100",
};

export function Badge({
  className,
  children,
  variant = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        badgeStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
