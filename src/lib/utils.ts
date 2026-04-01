import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Status } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const statusColors: Record<Status, string> = {
  green: "bg-green-50 text-green-700 border-green-200",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  red: "bg-red-50 text-red-700 border-red-200",
};

export const statusIconClasses: Record<Status, string> = {
  green: "border-green-500/40 bg-green-500/80",
  yellow: "border-yellow-500/40 bg-yellow-500/80",
  red: "border-red-500/40 bg-red-500/80",
};

export const statusTextColor: Record<Status, string> = {
  green: "text-green-700",
  yellow: "text-yellow-700",
  red: "text-red-700",
};
