/* Hero.jsx — Karşılama bölümü.
   Metinleri content.js'ten alır; kendi içinde sabit yazı barındırmaz. */

import { useState } from "react";
import { profile } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import SmartLink from "./SmartLink";
import Avatar from "./Avatar";
import BounceGame from "./BounceGame";
import { EnvelopeIcon } from "./icons";
import "./Hero.css";

function Hero() {
  const { t } = useLanguage(); // aktif dilin sözlüğü
  const [gameOpen, setGameOpen] = useState(false);

  return (
    <section id="hero" className="section hero">
      {/* Dekoratif zemin: ince ızgara + tek bir vurgu parıltısı */}
      <div className="hero__backdrop" aria-hidden="true" />

      <div className="container hero__inner">
        <Avatar onOpen={() => setGameOpen(true)} />

        <div className="hero__text">
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__title">{t.hero.title}</p>
          <p className="hero__tagline">{t.hero.tagline}</p>

          {/* id="contact": üst menüdeki İletişim linki buraya kayar */}
          <div className="hero__actions" id="contact">
            {/* SmartLink: linki "#" ise tıklanamaz <span> basar.
               Parıltı ve dönen çerçeve tamamen CSS; ek eleman yok. */}
            <SmartLink className="btn btn--github" href={profile.github}>
              <span className="btn__label">{t.hero.github}</span>
            </SmartLink>

            <SmartLink className="btn btn--linkedin" href={profile.linkedin}>
              <span className="btn__label">{t.hero.linkedin}</span>
            </SmartLink>

            <SmartLink
              className="btn btn--mail"
              href={profile.email === "#" ? "#" : `mailto:${profile.email}`}
            >
              <EnvelopeIcon />
              <span className="btn__label">{t.hero.email}</span>
            </SmartLink>
          </div>
        </div>
      </div>

      {/* Oyun yalnızca açıkken DOM'a giriyor; kapanınca tamamen
         kaldırılıyor, arkada çalışan döngü kalmıyor. */}
      {gameOpen && <BounceGame onClose={() => setGameOpen(false)} />}
    </section>
  );
}

export default Hero;
