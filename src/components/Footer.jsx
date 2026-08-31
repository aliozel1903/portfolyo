/* Footer.jsx — Kod editörü durum çubuğu (status bar) görünümlü alt çubuk.
   Solda canlı saat ve konum, sağda sürüm bilgisi. */

import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { ClockIcon } from "./icons";
import "./Footer.css";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="statusbar">
      <div className="statusbar__inner container">
        <div className="statusbar__left">
          <ClockIcon />
          <LiveClock />
          <span className="statusbar__sep" aria-hidden="true">•</span>
          <span>{t.footer.location}</span>
        </div>

        <div className="statusbar__right">© 2026 Ali Özel | build: 1.2.0</div>
      </div>
    </footer>
  );
}

/* Canlı yerel saat (saat:dakika). */
function LiveClock() {
  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    // Saniye göstermiyoruz; dakika değişimini kaçırmamak için
    // 15 saniyede bir kontrol yeterli.
    const timer = setInterval(() => setTime(formatTime()), 15000);
    // TEMİZLİK: component ekrandan kalkarsa sayacı durdur.
    return () => clearInterval(timer);
  }, []);

  return <span className="statusbar__time">{time}</span>;
}

function formatTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default Footer;
