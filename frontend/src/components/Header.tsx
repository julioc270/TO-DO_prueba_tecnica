import { ListTodo, LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../hooks/useAuth";
import { ThemeSelector } from "./ThemeSelector";
import { LanguageSelect } from "./LanguageToggleButton";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="border-b border-app-border bg-app-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Logo */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="rounded-xl bg-app-primary p-2.5 text-white shadow-sm">
            <ListTodo size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-app-text">To-Do App</h1>
          </div>
        </div>

        {/* Opciones */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Idioma */}
          <LanguageSelect />

          {/* Tema */}
          <ThemeSelector />

          {/* Separador */}
          <div className="mx-1 hidden h-8 w-px bg-app-border sm:block" />

          {/* Usuario */}
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-app-bg text-app-primary">
              <UserRound size={18} />
            </div>

            <span className="max-w-28 truncate text-sm font-medium text-app-text">
              {user?.name}
            </span>
          </div>

          {/* Cerrar sesión */}
          <button
            type="button"
            onClick={handleLogout}
            title={t("header.logout")}
            aria-label={t("header.logout")}
            className="rounded-lg p-2.5 text-app-muted transition hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOut size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}
