import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  useEffect(() => {
    const load = async () => {
      const [storedLang, storedTheme] = await Promise.all([
        AsyncStorage.getItem("@memoryshare/lang"),
        AsyncStorage.getItem("@memoryshare/theme"),
      ]);

      if (storedLang === "en" || storedLang === "no") {
        setLanguage(storedLang);
      }

      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      }
    };

    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("@memoryshare/lang", language);
  }, [language]);

  useEffect(() => {
    AsyncStorage.setItem("@memoryshare/theme", theme);
  }, [theme]);

  return (
    <SettingsContext.Provider
      value={{ language, theme, setLanguage, setTheme }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
