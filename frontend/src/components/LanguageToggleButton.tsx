import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { MXFlag, USFlag } from "../assets/FlagsIcon";

const LANGUAGES = [
  { code: "en", label: "EN", Flag: USFlag },
  { code: "es", label: "ES", Flag: MXFlag },
];

export function LanguageSelect() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLangCode = i18n.language?.startsWith("es") ? "es" : "en";
  const selectedLang =
    LANGUAGES.find((lang) => lang.code === currentLangCode) ?? LANGUAGES[0];

  const handleSelect = (code: string) => {
    void i18n.changeLanguage(code);
    localStorage.setItem("app-language", code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("header.language")}
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full border border-app-border bg-app-surface px-3.5 py-1.5 text-xs font-mono font-medium tracking-wider text-app-text shadow-sm transition-all duration-200 hover:border-app-primary hover:bg-app-bg focus:outline-none focus:ring-2 focus:ring-app-primary"
      >
        <selectedLang.Flag />
        <span>{selectedLang.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-app-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-28 rounded-xl border border-app-border bg-app-surface p-1 shadow-xl">
          {LANGUAGES.map(({ code, label, Flag }) => {
            const isSelected = currentLangCode === code;

            return (
              <button
                key={code}
                type="button"
                onClick={() => handleSelect(code)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
                  isSelected
                    ? "bg-app-primary text-white"
                    : "text-app-muted hover:bg-app-bg hover:text-app-text"
                }`}
              >
                <Flag />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
