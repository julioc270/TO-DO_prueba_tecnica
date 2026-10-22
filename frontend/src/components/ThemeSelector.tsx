import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Check, ChevronDown, Palette } from "lucide-react";
import { themes, type Theme } from "../config/themes";
import { useTheme } from "../hooks/useTheme";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(id: Theme) {
    setTheme(id);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Botón */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={t("header.theme")}
        className="flex items-center gap-2 rounded-full border border-app-border bg-app-surface px-3.5 py-1.5 text-xs font-mono font-medium tracking-wider text-app-text shadow-sm transition-all duration-200 hover:border-app-primary hover:bg-app-bg focus:outline-none focus:ring-2 focus:ring-app-primary"
      >
        <Palette size={16} />

        <span className="hidden sm:inline">{t("header.theme")}</span>

        <ChevronDown
          className={`h-3.5 w-3.5 text-app-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-app-border bg-app-surface p-2 shadow-xl">
          <p className="px-3 py-2 text-sm font-semibold text-app-text">
            {t("header.selectTheme")}
          </p>

          {(Object.keys(themes) as Theme[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => handleSelect(id)}
              aria-pressed={theme === id}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                theme === id
                  ? "bg-app-bg text-app-primary"
                  : "text-app-text hover:bg-app-bg"
              }`}
            >
              <span
                className="h-5 w-5 rounded-full border border-app-border"
                style={{ backgroundColor: themes[id].color }}
              />

              <span className="flex-1 text-left">{themes[id].label}</span>

              {theme === id && <Check size={16} className="text-app-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
