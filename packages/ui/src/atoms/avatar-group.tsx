import * as React from "react";
import { cn } from "../lib/utils";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max avatars before +N overflow chip */
  max?: number;
}

export function AvatarGroup({ className, max = 4, children, ...props }: AvatarGroupProps) {
  const items = React.Children.toArray(children);
  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;

  return (
    <div className={cn("flex items-center -space-x-2", className)} {...props}>
      {visible.map((child, index) => (
        <div key={index} className="ring-2 ring-background rounded-full">
          {child}
        </div>
      ))}
      {overflow > 0 ? (
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-ui-xs font-medium text-muted-foreground ring-2 ring-background">
          +{overflow}
        </div>
      ) : null}
    </div>
  );
}
