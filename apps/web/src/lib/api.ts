const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string | null;
    role: string;
  };
  accessToken: string;
}

export interface ApiError {
  message: string | string[];
  statusCode: number;
}

class ApiClient {
  private token: string | null = null;

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

  getToken(): string | null {
    if (this.token) return this.token;
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}/api${path}`, { ...options, headers });

    if (!res.ok) {
      const error: ApiError = await res.json().catch(() => ({
        message: "Request failed",
        statusCode: res.status,
      }));
      throw new Error(
        Array.isArray(error.message) ? error.message.join(", ") : error.message,
      );
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

  getProfile() {
    return this.request<AuthResponse["user"]>("/auth/profile");
  }

  getUsers(page = 1, limit = 10) {
    return this.request<{
      data: AuthResponse["user"][];
      meta: { total: number; page: number; limit: number; totalPages: number };
    }>(`/users?page=${page}&limit=${limit}`);
  }
}

export const api = new ApiClient();
