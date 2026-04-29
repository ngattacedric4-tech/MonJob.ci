import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "verified" | "premium" | "muted";

const badgeStyles: Record<BadgeVariant, string> = {
  default: "bg-brand-50 text-brand-700",
  verified: "bg-success-100 text-success-700",
  premium: "bg-warn-100 text-warn-700",
  muted: "bg-ink-100 text-ink-700",
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

