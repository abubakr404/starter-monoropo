import type { ReactNode } from "react";
import { Header } from "../organisms/header";
import { Sidebar } from "../organisms/sidebar";
import { Breadcrumb, type BreadcrumbItem } from "../organisms/breadcrumb";
import { PageHeader } from "../molecules/page-header";

export interface SettingsLayoutProps {
  children: ReactNode;
  user?: { name?: string | null; email: string } | null;
  onLogout?: () => void;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
}

export function SettingsLayout({
  children,
  user,
  onLogout,
  title,
  description,
  breadcrumbs,
  actions,
}: SettingsLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header user={user} onLogout={onLogout} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 space-y-ui-6 p-ui-6">
          {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
          <PageHeader title={title} description={description} actions={actions} />
          {children}
        </main>
      </div>
    </div>
  );
}
