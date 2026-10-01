"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string; name?: string | null } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = api.getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .getProfile()
      .then(setUser)
      .catch(() => {
        api.setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    api.setToken(null);
    setUser(null);
    router.push("/login");
  };

  return { user, loading, logout, setUser };
}
