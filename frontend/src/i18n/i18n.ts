import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./local/es.json";
import en from "./local/en.json";

const savedLanguage = localStorage.getItem("app-language");
const initialLanguage =
  savedLanguage === "en" || savedLanguage === "es" ? savedLanguage : "es";

void i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: initialLanguage,
  fallbackLng: "es",
  supportedLngs: ["es", "en"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
