"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@starter-monoropo/ui/templates/dashboard-layout";
import { Button } from "@starter-monoropo/ui/atoms/button";
import { FormField } from "@starter-monoropo/ui/molecules/form-field";
import { Switch } from "@starter-monoropo/ui/molecules/switch";
import { Label } from "@starter-monoropo/ui/atoms/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@starter-monoropo/ui/molecules/card";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading, logout, setUser } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setEmailAlerts(user.preferences?.emailAlerts ?? true);
      setProductUpdates(user.preferences?.productUpdates ?? false);
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    setSaved(false);

    try {
      const updated = await api.updateProfile({
        name: name.trim() || undefined,
        ...(password ? { password } : {}),
        preferences: {
          emailAlerts,
          productUpdates,
        },
      });
      setUser({
        id: updated.id,
        email: updated.email,
        name: updated.name,
        role: updated.role,
        preferences: updated.preferences,
      });
      setPassword("");
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout user={user} onLogout={logout}>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormField
                label="Email"
                type="email"
                value={user.email}
                disabled
                description="Email cannot be changed here"
              />
              <FormField
                label="New password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                description="Leave blank to keep your current password"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose what you want to hear about</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="email-alerts">Email alerts</Label>
                <Switch
                  id="email-alerts"
                  checked={emailAlerts}
                  onCheckedChange={setEmailAlerts}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="product-updates">Product updates</Label>
                <Switch
                  id="product-updates"
                  checked={productUpdates}
                  onCheckedChange={setProductUpdates}
                />
              </div>
            </CardContent>
          </Card>

          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : saved ? "Saved" : "Save changes"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
