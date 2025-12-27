"use client";

import { createContext, useContext, useState, useEffect } from "react";

import en from "../data1/languages/en";
import es from "../data1/languages/es";
import pt from "../data1/languages/pt";
import zh from "../data1/languages/zh";
import ar from "../data1/languages/ar";
import de from "../data1/languages/de";
import fr from "../data1/languages/fr";
import ja from "../data1/languages/ja";
import nl from "../data1/languages/nl";

const LANGUAGES = {
  en, es, pt, zh, ar, de, fr, ja, nl,
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // 1. Initialize with a default, but check localStorage on mount
  const [lang, setLang] = useState("en");

  // 2. Persist Language Selection (Optional but Recommended)
  useEffect(() => {
    const saved = localStorage.getItem("app-lang");
    if (saved && LANGUAGES[saved]) {
      setLang(saved);
    }
  }, []);

  const changeLanguage = (code) => {
    setLang(code);
    localStorage.setItem("app-lang", code); // Save preference
  };

  return (
    <LanguageContext.Provider
      value={{
        language: lang,      // Expose as 'language' to match Navbar
        changeLanguage,      // Expose as 'changeLanguage' to match Navbar
        t: LANGUAGES[lang],  // The actual data object
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
