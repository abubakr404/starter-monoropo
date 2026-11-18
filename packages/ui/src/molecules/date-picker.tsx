"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { Calendar } from "../atoms/calendar";
import { Button } from "../atoms/button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "../lib/utils";

export interface DatePickerProps {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/**
 * Form-friendly date field (Tour DatePickerField) on starter tokens.
 */
export function DatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
  id,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onValueChange} autoFocus />
      </PopoverContent>
    </Popover>
  );
}
