import { useEffect, useMemo, useState, type ReactNode } from "react";
import { api } from "../api/axios";
import { AuthContext } from "./AuthContext";

import type { User, LoginRequest, AuthResponse } from "../types/auth";

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Recuperar sesión al iniciar la aplicación
  useEffect(() => {
    let active = true;

    api
      .get<User>("/users/me")
      .then((response) => {
        if (active) setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem("auth-token");
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Iniciar sesión
  async function login(credentials: LoginRequest) {
    const response = await api.post<AuthResponse>("/auth/login", credentials);

    localStorage.setItem("auth-token", response.data.token);
    setUser(response.data.user);
  }

  // Cerrar sesión
  function logout() {
    localStorage.removeItem("auth-token");
    setUser(null);
  }

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: user !== null,
      loading,
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
