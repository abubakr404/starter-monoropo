"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api, type AuthResponse } from "@/lib/api";

export type AuthUser = AuthResponse["user"];

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = api.getToken();
    if (!token) {
      api.syncSessionCookie();
      setLoading(false);
      return;
    }

    api.syncSessionCookie();

    api
      .getProfile()
      .then(setUser)
      .catch(() => {
        api.clearSession();
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await api.logout();
    setUser(null);
    router.push("/login");
  };

  return { user, loading, logout, setUser };
}
