/* Footer.jsx — Kod editörü durum çubuğu (status bar) görünümlü alt çubuk.

   Üç bölge: solda kaçan ördek, ortada canlı saat + konum,
   sağda sosyal ikonlar ve telif. */

import { useEffect, useRef, useState } from "react";
import { profile } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import {
  ClockIcon,
  DuckIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "./icons";
import SmartLink from "./SmartLink";
import "./Footer.css";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="statusbar">
      <div className="statusbar__inner container">
        <div className="statusbar__left">
          <RunawayDuck label={t.footer.duck} />
        </div>

        <div className="statusbar__center">
          <ClockIcon />
          <LiveClock />
          <span className="statusbar__sep" aria-hidden="true">•</span>
          <span>{t.footer.location}</span>
        </div>

        <div className="statusbar__right">
          {/* İkonların içinde yazı yok; ekran okuyucu ne olduklarını
             aria-label'dan öğreniyor. */}
          <SmartLink
            className="statusbar__icon"
            href={profile.github}
            aria-label="GitHub"
            title="GitHub"
          >
            <GithubIcon />
          </SmartLink>
          <SmartLink
            className="statusbar__icon"
            href={profile.linkedin}
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <LinkedinIcon />
          </SmartLink>
          {/* E-posta ekranda hiç yazılmıyor; adres yalnızca
             href içindeki mailto: hedefinde yaşıyor. */}
          <SmartLink
            className="statusbar__icon"
            href={profile.email === "#" ? "#" : `mailto:${profile.email}`}
            aria-label="E-mail"
            title="E-mail"
          >
            <MailIcon />
          </SmartLink>
          <span className="statusbar__copy">© 2026 Ali Özel | build: 1.1.0</span>
        </div>
      </div>
    </footer>
  );
}

/* Saniyesi saniyesine güncellenen canlı saat. */
function LiveClock() {
  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    const timer = setInterval(() => setTime(formatTime()), 1000);
    // TEMİZLİK: component ekrandan kalkarsa sayacı durdur.
    // Bu satır olmazsa sayaç arka planda çalışmaya devam eder
    // ve var olmayan bir component'i güncellemeye çalışır.
    return () => clearInterval(timer);
  }, []);

  return <span className="statusbar__time">{time}</span>;
}

function formatTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/* --- Kaçan ördek ---
   İmleç yaklaşınca ekranın rastgele bir köşesine sıçrar.
   Konumu transform ile değiştiriyoruz: transform layout'u
   yeniden hesaplatmaz, sadece çizim katmanını kaydırır —
   bu yüzden hareket takılmadan akar. */
function RunawayDuck({ label }) {
  const [spot, setSpot] = useState(null);   // null = evinde
  const lastSpot = useRef(-1);

  const escape = () => {
    // Aynı köşeye üst üste gitmesin
    let next = Math.floor(Math.random() * CORNERS.length);
    if (next === lastSpot.current) next = (next + 1) % CORNERS.length;
    lastSpot.current = next;
    setSpot(CORNERS[next]);
  };

  return (
    <button
      type="button"
      className={`duck${spot ? " duck--loose" : ""}`}
      style={spot ? { top: spot.top, left: spot.left, transform: spot.shift } : undefined}
      onMouseEnter={escape}
      onFocus={escape}
      onClick={escape}
      aria-label={label}
      title={label}
    >
      <DuckIcon />
    </button>
  );
}

/* Ekranın dört köşesi + kenar ortaları. shift, ördeği köşenin
   içine doğru itip ekran dışına taşmasını engelliyor. */
const CORNERS = [
  { top: "12%", left: "6%", shift: "translate(0, 0)" },
  { top: "12%", left: "94%", shift: "translate(-100%, 0)" },
  { top: "82%", left: "6%", shift: "translate(0, -100%)" },
  { top: "82%", left: "94%", shift: "translate(-100%, -100%)" },
  { top: "48%", left: "92%", shift: "translate(-100%, -50%)" },
  { top: "20%", left: "50%", shift: "translate(-50%, 0)" },
];

export default Footer;
