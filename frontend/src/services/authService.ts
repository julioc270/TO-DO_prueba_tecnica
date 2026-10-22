import { api } from "../api/axios";
import type { AuthResponse, LoginRequest, User } from "../types/auth";

export type RegisterData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);

    return response.data;
  },
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/users/me");
    return response.data;
  },
  async register(data: RegisterData): Promise<void> {
    await api.post("/auth/register", {
      name: data.name.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      password: data.password,
    });
  },
};
