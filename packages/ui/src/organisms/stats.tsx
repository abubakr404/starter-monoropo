import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../molecules/card";

export interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ title, value, description, icon, className }: StatCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-ui-2">
        <CardTitle className="text-ui-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-ui-2xl font-bold">{value}</div>
        {description && <CardDescription className="mt-ui-1">{description}</CardDescription>}
      </CardContent>
    </Card>
  );
}

export interface StatsGridProps {
  children: ReactNode;
  className?: string;
}

export function StatsGrid({ children, className }: StatsGridProps) {
  return (
    <div className={cn("grid gap-ui-4 sm:grid-cols-2 lg:grid-cols-4", className)}>{children}</div>
  );
}
