import type { ReactNode } from "react";
import { Header } from "../organisms/header";
import { Sidebar } from "../organisms/sidebar";

export interface DashboardLayoutProps {
  children: ReactNode;
  user?: { name?: string | null; email: string } | null;
  onLogout?: () => void;
}

export function DashboardLayout({ children, user, onLogout }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header user={user} onLogout={onLogout} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
