/* Footer.jsx — Kod editörü durum çubuğu (status bar) görünümlü alt çubuk.
   Solda canlı saat ve konum, sağda sürüm bilgisi.
   Sosyal bağlantılar Hero bölümünde olduğu için burada tekrarlanmıyor. */

import { useEffect, useState } from "react";
import { ClockIcon } from "./icons";
import "./Footer.css";

function Footer() {
  return (
    <footer className="statusbar">
      <div className="statusbar__inner container">
        <div className="statusbar__left">
          <ClockIcon />
          <LiveClock />
        </div>

        <div className="statusbar__right">© 2026 Ali Özel | build: 1.0.0</div>
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
