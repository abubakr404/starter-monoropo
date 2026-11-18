"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { buttonVariants } from "./button";
import { cn } from "../lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * Token-driven calendar (Tour CalendarDay/Month → shadcn DayPicker).
 */
export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-ui-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-ui-4",
        month: "flex flex-col gap-ui-3",
        month_caption: "flex justify-center relative items-center h-control-sm px-control-sm",
        caption_label: "text-ui-sm font-medium",
        nav: "flex items-center gap-1",
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100",
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-muted-foreground rounded-md w-8 font-normal text-ui-xs",
        week: "flex w-full mt-1",
        day: "relative p-0 text-center text-ui-sm focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
        ),
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
        today: "bg-accent text-accent-foreground rounded-md",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        range_start: "rounded-l-md",
        range_end: "rounded-r-md",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";
