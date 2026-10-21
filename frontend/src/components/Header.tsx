import { useState } from "react";
import {
  ChevronDown,
  ListTodo,
  LogOut,
  Palette,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { ThemeSelector } from "./ThemeSelector";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isThemeOpen, setIsThemeOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="border-b border-app-border bg-app-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-app-primary p-2.5 text-white">
            <ListTodo size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-app-text">To-Do App</h1>
            <p className="text-xs text-app-muted">Organiza tu día</p>
          </div>
        </div>

        {/* Opciones */}
        <div className="flex items-center gap-3">
          {/* Selector de temas */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              aria-expanded={isThemeOpen}
              aria-label="Cambiar tema"
              className="flex items-center gap-2 rounded-lg border border-app-border px-3 py-2 text-app-text transition hover:bg-app-bg"
            >
              <Palette size={18} />
              <span className="hidden sm:inline">Tema</span>
              <ChevronDown size={16} />
            </button>

            {isThemeOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-app-border bg-app-surface p-4 shadow-xl">
                <h3 className="mb-4 text-sm font-semibold text-app-text">
                  Selecciona un tema
                </h3>

                <ThemeSelector />
              </div>
            )}
          </div>

          {/* Usuario */}
          <div className="hidden items-center gap-2 border-l border-app-border pl-4 sm:flex">
            <div className="rounded-full bg-app-bg p-2 text-app-primary">
              <UserRound size={18} />
            </div>

            <span className="text-sm font-medium text-app-text">
              {user?.name}
            </span>
          </div>

          {/* Cerrar sesión */}
          <button
            type="button"
            onClick={handleLogout}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
            className="rounded-lg p-2 text-app-muted transition hover:bg-app-bg hover:text-app-text"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
