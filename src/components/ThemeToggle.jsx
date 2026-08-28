/* ThemeToggle.jsx — Navbar'daki tema düğmesi (TR | EN'in yanında). */

import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { MoonIcon, SunIcon } from "./icons";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={t.themeToggle.label}
      title={t.themeToggle.label}
    >
      {/* Karanlıktayken güneş (aydınlığa geç), aydınlıktayken ay */}
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export default ThemeToggle;
