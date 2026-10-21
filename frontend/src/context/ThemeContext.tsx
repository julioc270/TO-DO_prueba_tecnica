import { createContext } from "react";
import type { ThemeContextType } from "../config/themes";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
