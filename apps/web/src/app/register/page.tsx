"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@starter-monoropo/ui/templates/auth-layout";
import { Button } from "@starter-monoropo/ui/atoms/button";
import { FormField } from "@starter-monoropo/ui/molecules/form-field";
import { Card, CardContent } from "@starter-monoropo/ui/molecules/card";
import { api } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { accessToken, refreshToken } = await api.register(
        email,
        password,
        name || undefined,
      );
      api.setSession(accessToken, refreshToken);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create an account" description="Get started with Starter">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              description="Minimum 8 characters"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
