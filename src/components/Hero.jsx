/* Hero.jsx — Karşılama bölümü.
   Metinleri content.js'ten alır; kendi içinde sabit yazı barındırmaz. */

import { useEffect, useState } from "react";
import { profile } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import SmartLink from "./SmartLink";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import "./Hero.css";

function Hero() {
  const { t } = useLanguage(); // aktif dilin sözlüğü

  return (
    <section id="hero" className="section hero">
      <div className="container">
        <h1 className="hero__name">
          <Typewriter text={profile.name} />
        </h1>
        <p className="hero__title">{t.hero.title}</p>
        <p className="hero__tagline">{t.hero.tagline}</p>

        {/* Yalnızca ikonlar — metin yok. Ekran okuyucu için
           aria-label taşıyorlar. */}
        <div className="hero__social">
          <SmartLink
            className="social"
            href={profile.github}
            aria-label="GitHub"
            title="GitHub"
          >
            <GithubIcon size={39} />
          </SmartLink>
          <SmartLink
            className="social"
            href={profile.linkedin}
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <LinkedinIcon size={39} />
          </SmartLink>
          {/* E-posta ekranda düz metin olarak yazılmıyor; adres
             yalnızca href içindeki mailto: hedefinde yaşıyor. */}
          <SmartLink
            className="social"
            href={profile.email === "#" ? "#" : `mailto:${profile.email}`}
            aria-label="E-mail"
            title="E-mail"
          >
            <MailIcon size={39} />
          </SmartLink>
        </div>
      </div>
    </section>
  );
}

/* Terminal satırı: "> Ali Özel _"
   İsim harf harf yazılır, sonunda imleç yanıp söner.

   Kurulum: her karakterden sonra bir sonraki için zamanlayıcı
   kuruluyor. setInterval yerine zincirleme setTimeout kullanmak,
   bileşen kapanınca tek bir temizlikle durdurmayı kolaylaştırıyor. */
function Typewriter({ text, speed = 165 }) {   // 110ms → 165ms (1.5 kat yavaş)
  const [count, setCount] = useState(0);

  useEffect(() => {
    // "Hareketi azalt" tercihi varsa animasyon yok: metin hazır gelsin.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCount(text.length);
      return;
    }
    if (count >= text.length) return;

    const timer = setTimeout(() => setCount(count + 1), speed);
    return () => clearTimeout(timer);
  }, [count, text, speed]);

  return (
    <span className="terminal">
      <span className="terminal__prompt" aria-hidden="true">&gt;</span>
      {/* Ekran okuyucu ismi tek parça okusun; harf harf değil */}
      <span className="terminal__text" aria-label={text}>
        <span aria-hidden="true">{text.slice(0, count)}</span>
      </span>
      <span className="terminal__caret" aria-hidden="true">_</span>
    </span>
  );
}

export default Hero;
