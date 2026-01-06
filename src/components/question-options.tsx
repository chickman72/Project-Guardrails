"use client";

import { cn } from "@/lib/utils";
import React from "react";

export type OptionItem<T extends string> = { value: T; label: string; helper?: string };

type OptionCardProps<T extends string> = {
  option: OptionItem<T>;
  selected?: boolean;
  onSelect: (value: T) => void;
};

export function OptionCard<T extends string>({ option, selected, onSelect }: OptionCardProps<T>) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      className={cn(
        "w-full rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-black/60 hover:shadow-md",
        selected ? "border-black bg-neutral-50 shadow-sm" : "border-border bg-white"
      )}
    >
      <div className="font-semibold text-neutral-900">{option.label}</div>
      {option.helper ? <p className="mt-1 text-sm text-neutral-600">{option.helper}</p> : null}
    </button>
  );
}
