export const themes = {
  indigo: {
    label: "Índigo",
    color: "#4f46e5",
  },
  emerald: {
    label: "Esmeralda",
    color: "#059669",
  },
  rose: {
    label: "Rosa",
    color: "#e11d48",
  },
  dark: {
    label: "Oscuro",
    color: "#818cf8",
  },
  ocean: {
    label: "Océano",
    color: "#0284c7",
  },
} as const;

export type Theme = keyof typeof themes;

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
