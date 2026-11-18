"use client";

import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { cn } from "../lib/utils";

export interface SegmentedControlOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Generic segmented control (Tour SegmentedTabs without product status labels).
 */
export function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  disabled,
}: SegmentedControlProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => {
        if (next) onValueChange?.(next);
      }}
      disabled={disabled}
      variant="outline"
      className={cn("inline-flex rounded-md border border-input bg-background p-0.5", className)}
    >
      {options.map((opt) => (
        <ToggleGroupItem
          key={opt.value}
          value={opt.value}
          disabled={opt.disabled}
          className="rounded-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          {opt.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
