import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Status } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const statusColors: Record<Status, string> = {
  green: "bg-success/10 text-success border-success/20",
  yellow: "bg-warning/10 text-warning border-warning/20",
  red: "bg-danger/10 text-danger border-danger/20",
};

export const statusIconClasses: Record<Status, string> = {
  green: "border-success/40 bg-success/80",
  yellow: "border-warning/40 bg-warning/80",
  red: "border-danger/40 bg-danger/80",
};

export const statusTextColor: Record<Status, string> = {
  green: "text-success",
  yellow: "text-warning",
  red: "text-danger",
};
