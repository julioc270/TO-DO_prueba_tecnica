import { useEffect, useMemo, useState, type ReactNode } from "react";
import { authService } from "../services/authService";
import { AuthContext } from "./AuthContext";

import type { User, LoginRequest } from "../types/auth";

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    authService
      .getCurrentUser()
      .then((userData) => {
        if (active) setUser(userData);
      })
      .catch(() => {
        if (active) {
          localStorage.removeItem("auth-token");
          setUser(null);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function login(credentials: LoginRequest) {
    const response = await authService.login(credentials);

    localStorage.setItem("auth-token", response.token);
    setUser(response.user);
  }

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
