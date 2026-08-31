/* Footer.jsx — Kod editörü durum çubuğu (status bar) görünümlü alt çubuk.

   Üç bölge: solda bağlantı ikonları, ortada canlı saat + konum,
   sağda sürüm bilgisi. */

import { useEffect, useState } from "react";
import { profile } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import { ClockIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import SmartLink from "./SmartLink";
import "./Footer.css";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="statusbar">
      <div className="statusbar__inner container">
        <div className="statusbar__left">
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
        </div>

        <div className="statusbar__center">
          <ClockIcon />
          <LiveClock />
          <span className="statusbar__sep" aria-hidden="true">•</span>
          <span>{t.footer.location}</span>
        </div>

        <div className="statusbar__right">© 2026 Ali Özel | build: 1.1.0</div>
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
  });
}

export default Footer;
