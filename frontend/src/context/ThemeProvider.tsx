import { useEffect, useMemo, useState, type ReactNode } from "react";

import { ThemeContext } from "./ThemeContext";
import type { Theme } from "../config/themes";
import { loadTheme, saveTheme } from "../services/themeStorage";

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [theme, setTheme] = useState<Theme>(loadTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
