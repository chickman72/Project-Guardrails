import { cn } from "@/lib/utils";
import React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & { tone?: "default" | "success" | "warning" | "danger" };

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, tone = "default", ...props }, ref) => {
  const toneClass =
    tone === "success"
      ? "bg-green-50 text-green-700 border-green-300"
      : tone === "warning"
        ? "bg-yellow-50 text-yellow-700 border-yellow-300"
        : tone === "danger"
          ? "bg-red-50 text-red-700 border-red-300"
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
