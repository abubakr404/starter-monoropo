"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@starter-monoropo/ui/templates/dashboard-layout";
import { Badge } from "@starter-monoropo/ui/atoms/badge";
import { Button } from "@starter-monoropo/ui/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@starter-monoropo/ui/molecules/card";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [fetching, setFetching] = useState(true);
  const [moduleMissing, setModuleMissing] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;

    api
      .getNotifications()
      .then(setItems)
      .catch(() => setModuleMissing(true))
      .finally(() => setFetching(false));
  }, [user]);

  const markRead = async (id: string) => {
    try {
      await api.markNotificationRead(id);
      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
    } catch {
      // module may be unavailable
    }
  };

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
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay on top of account activity</p>
        </div>

        {fetching ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : moduleMissing ? (
          <Card>
            <CardHeader>
              <CardTitle>Module not enabled</CardTitle>
              <CardDescription>
                Enable the optional notifications module to store and list alerts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <code className="rounded bg-muted px-2 py-1 text-sm">
                pnpm add-module notifications
              </code>
            </CardContent>
          </Card>
        ) : items.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No notifications</CardTitle>
              <CardDescription>You are all caught up.</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id}>
                <Card>
                  <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      <CardDescription>{item.message}</CardDescription>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Badge variant={item.read ? "secondary" : "default"}>
                        {item.type}
                      </Badge>
                      {!item.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markRead(item.id)}
                        >
                          Mark read
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
}
