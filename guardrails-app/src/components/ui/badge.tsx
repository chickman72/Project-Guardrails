import { cn } from "@/lib/utils";
import React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & { tone?: "default" | "success" | "warning" | "danger" };

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, tone = "default", ...props }, ref) => {
  const toneClass =
    tone === "success"
      ? "bg-success/10 text-success border-success/30"
      : tone === "warning"
        ? "bg-warning/10 text-warning border-warning/30"
        : tone === "danger"
          ? "bg-danger/10 text-danger border-danger/30"
          : "bg-neutral-100 text-neutral-900 border-neutral-200";
  return (
    <span
      ref={ref}
      className={cn("inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide", toneClass, className)}
      {...props}
    />
  );
});
Badge.displayName = "Badge";
