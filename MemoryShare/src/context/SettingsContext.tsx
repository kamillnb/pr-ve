import React, { createContext, useContext, useState } from "react";
import { Language } from "../i18n/translations";

type ThemeMode = "light" | "dark";

type SettingsContextType = {
  language: Language;
  theme: ThemeMode;
  setLanguage: (l: Language) => void;
  setTheme: (t: ThemeMode) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<ThemeMode>("light");

  return (
    <SettingsContext.Provider
      value={{ language, theme, setLanguage, setTheme }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
