import { cn } from "@/lib/utils";
import React from "react";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("card", className)} {...props} />
  )
);
Card.displayName = "Card";

export const CardHeader = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-2 border-b border-border px-6 py-4", className)}>{children}</div>
);

export const CardContent = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-6 py-4", className)}>{children}</div>
);

export const CardFooter = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center justify-between gap-4 border-t border-border px-6 py-4", className)}>{children}</div>
);
