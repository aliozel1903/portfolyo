/* ============================================================
   ThemeContext.jsx — Aktif temayı (dark/light) tutan yapı.

   LanguageContext ile aynı kalıp: değeri tepede tutuyoruz,
   localStorage'a yazıyoruz, <html> etiketine işliyoruz.

   Temayı React state'i ile DEĞİL, <html data-theme="dark">
   özniteliği ile uyguluyoruz. Böylece renk değişimi tamamen
   CSS'in işi olur; hiçbir bileşen tema bilmek zorunda kalmaz.
   ============================================================ */

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "portfolio-theme";
const DEFAULT_THEME = "dark";      // sitenin varsayılan açılış teması
const THEMES = ["dark", "light"];

function readStoredTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return THEMES.includes(saved) ? saved : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readStoredTheme);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    // CSS bu özniteliği okuyup renk değişkenlerini değiştirecek.
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Kaydedilemezse site çalışır, sadece tercihi hatırlamaz.
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme yalnızca <ThemeProvider> içinde kullanılabilir.");
  }
  return context;
}
