"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@stater/ui/templates/dashboard-layout";
import { DataTable } from "@stater/ui/organisms/data-table";
import { Badge } from "@stater/ui/atoms/badge";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";

interface User {
  id: string;
  email: string;
  name?: string | null;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      api
        .getUsers()
        .then((res) => setUsers(res.data as User[]))
        .catch(console.error)
        .finally(() => setFetching(false));
    }
  }, [user]);

  if (loading || !user) return null;

  return (
    <DashboardLayout user={user} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage application users</p>
        </div>

        <DataTable
          loading={fetching}
          data={users}
          columns={[
            { key: "name", header: "Name", render: (row) => row.name ?? "—" },
            { key: "email", header: "Email" },
            {
              key: "role",
              header: "Role",
              render: (row) => <Badge variant="secondary">{row.role}</Badge>,
            },
            {
              key: "createdAt",
              header: "Joined",
              render: (row) => new Date(row.createdAt).toLocaleDateString(),
            },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
