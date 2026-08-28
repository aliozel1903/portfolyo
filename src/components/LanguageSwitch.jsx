/* LanguageSwitch.jsx — Sağ üstteki TR | EN düğmesi. */

import { useLanguage } from "../context/LanguageContext";
import "./LanguageSwitch.css";

function LanguageSwitch() {
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      className="lang-switch"
      onClick={toggleLanguage}
      // Ekran okuyucu "TR EN" yerine ne işe yaradığını duysun:
      aria-label={t.languageSwitch.label}
    >
      {/* Aktif olan dile "is-active" sınıfı verip koyulaştırıyoruz */}
      <span className={lang === "tr" ? "is-active" : ""}>TR</span>
      <span className="lang-switch__divider">|</span>
      <span className={lang === "en" ? "is-active" : ""}>EN</span>
    </button>
  );
}

export default LanguageSwitch;
