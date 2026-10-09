import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-ui-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div>
        <h1 className="text-ui-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-ui-1 text-ui-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-ui-2">{actions}</div>}
    </div>
  );
}
