const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

/** Cookie read by Next.js middleware to gate /dashboard routes */
export const SESSION_COOKIE = "starter_session";

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string | null;
    role: string;
    preferences?: {
      emailAlerts?: boolean;
      productUpdates?: boolean;
    } | null;
  };
  accessToken: string;
  refreshToken: string;
}

export interface ApiError {
  message: string | string[];
  statusCode: number;
}

function setSessionCookie(active: boolean) {
  if (typeof document === "undefined") return;
  if (active) {
    document.cookie = `${SESSION_COOKIE}=1; Path=/; SameSite=Lax; Max-Age=604800`;
  } else {
    document.cookie = `${SESSION_COOKIE}=; Path=/; SameSite=Lax; Max-Age=0`;
  }
}

class ApiClient {
  private token: string | null = null;
  private refreshToken: string | null = null;
  private refreshPromise: Promise<boolean> | null = null;

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }
  }

  setRefreshToken(token: string | null) {
    this.refreshToken = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("refreshToken", token);
      } else {
        localStorage.removeItem("refreshToken");
      }
    }
  }

  setSession(accessToken: string, refreshToken: string) {
    this.setToken(accessToken);
    this.setRefreshToken(refreshToken);
    setSessionCookie(true);
  }

  clearSession() {
    this.setToken(null);
    this.setRefreshToken(null);
    setSessionCookie(false);
  }

  /** Keep middleware cookie in sync when tokens already exist in localStorage */
  syncSessionCookie() {
    setSessionCookie(!!this.getToken());
  }

  getToken(): string | null {
    if (this.token) return this.token;
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (this.refreshToken) return this.refreshToken;
    if (typeof window !== "undefined") {
      return localStorage.getItem("refreshToken");
    }
    return null;
  }

  private async tryRefresh(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const res = await fetch(`${API_URL}/api/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        this.clearSession();
        return false;
      }

      const data = (await res.json()) as AuthResponse;
      this.setSession(data.accessToken, data.refreshToken);
      return true;
    } catch {
      this.clearSession();
      return false;
    }
  }

  private async request<T>(
    path: string,
    options: RequestInit = {},
    retry = true,
  ): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}/api${path}`, { ...options, headers });

    if (res.status === 401 && retry && path !== "/auth/refresh" && path !== "/auth/login") {
      if (!this.refreshPromise) {
        this.refreshPromise = this.tryRefresh().finally(() => {
          this.refreshPromise = null;
        });
      }
      const refreshed = await this.refreshPromise;
      if (refreshed) {
        return this.request<T>(path, options, false);
      }
    }

    if (!res.ok) {
      const error: ApiError = await res.json().catch(() => ({
        message: "Request failed",
        statusCode: res.status,
      }));
      throw new Error(
        Array.isArray(error.message) ? error.message.join(", ") : error.message,
      );
    }

    if (res.status === 204) {
      return undefined as T;
    }

    return res.json();
  }

  register(email: string, password: string, name?: string) {
    return this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
  }

  login(email: string, password: string) {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    const refreshToken = this.getRefreshToken();
    try {
      await this.request<{ success: boolean }>("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      // still clear local session
    } finally {
      this.clearSession();
    }
  }

  getProfile() {
    return this.request<AuthResponse["user"]>("/auth/profile");
  }

  updateProfile(data: {
    name?: string;
    password?: string;
    preferences?: {
      emailAlerts?: boolean;
      productUpdates?: boolean;
    };
  }) {
    return this.request<AuthResponse["user"] & { updatedAt?: string }>("/auth/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  getUsers(page = 1, limit = 10) {
    return this.request<{
      data: AuthResponse["user"][];
      meta: { total: number; page: number; limit: number; totalPages: number };
    }>(`/users?page=${page}&limit=${limit}`);
  }

  getNotifications(unreadOnly = false) {
    const query = unreadOnly ? "?unreadOnly=true" : "";
    return this.request<
      Array<{
        id: string;
        title: string;
        message: string;
        type: string;
        read: boolean;
        createdAt: string;
      }>
    >(`/notifications${query}`);
  }

  markNotificationRead(id: string) {
    return this.request(`/notifications/${id}/read`, { method: "PATCH" });
  }
}

export const api = new ApiClient();
