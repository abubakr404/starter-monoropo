"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@stater/ui/templates/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@stater/ui/molecules/card";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <DashboardLayout user={user} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name ?? user.email}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Your project is ready to go</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explore the API docs at{" "}
                <a
                  href="http://localhost:3001/docs"
                  className="text-primary underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  localhost:3001/docs
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Modules</CardTitle>
              <CardDescription>Optional features on demand</CardDescription>
            </CardHeader>
            <CardContent>
              <code className="rounded bg-muted px-2 py-1 text-sm">
                pnpm add-module notifications
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atomic Design</CardTitle>
              <CardDescription>UI components in @stater/ui</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                atoms → molecules → organisms → templates
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
