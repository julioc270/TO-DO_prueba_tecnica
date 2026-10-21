import { themes, type Theme } from "../config/themes";
import { useTheme } from "../hooks/useTheme";

type ThemeSelectorProps = Readonly<{
  onSelect?: () => void;
}>;

export function ThemeSelector({ onSelect }: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme();

  function handleSelect(id: Theme) {
    setTheme(id);
    onSelect?.();
  }

  return (
    <div className="flex flex-wrap gap-4">
      {(Object.keys(themes) as Theme[]).map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => handleSelect(id)}
          aria-label={`Seleccionar tema ${themes[id].label}`}
          aria-pressed={theme === id}
          title={themes[id].label}
          className="flex flex-col items-center gap-2"
        >
          <span
            className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 ${
              theme === id
                ? "border-app-text ring-2 ring-app-border"
                : "border-app-border"
            }`}
            style={{ backgroundColor: themes[id].color }}
          />

          <span className="text-xs text-app-text">{themes[id].label}</span>
        </button>
      ))}
    </div>
  );
}
