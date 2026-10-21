import { themes, type Theme } from "../config/themes";

const THEME_KEY = "app-theme";

export function loadTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY);

  return saved && Object.hasOwn(themes, saved) ? (saved as Theme) : "indigo";
}

export function saveTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme);
}
