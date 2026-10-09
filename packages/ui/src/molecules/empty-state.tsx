import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Button } from "../atoms/button";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed px-ui-6 py-ui-12 text-center",
        className,
      )}
    >
      {icon && <div className="mb-ui-3 text-muted-foreground">{icon}</div>}
      <h3 className="text-ui-lg font-semibold">{title}</h3>
      {description && (
        <p className="mt-ui-1 max-w-sm text-ui-sm text-muted-foreground">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button className="mt-ui-4" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
