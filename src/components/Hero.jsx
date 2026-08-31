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
            {/* SmartLink: linki "#" ise tıklanamaz <span> basar */}
            <SmartLink className="btn btn--fire" href={profile.github}>
              <span className="btn__flames" aria-hidden="true">
                {/* üç ayrı alev dili, farklı gecikmelerle titriyor */}
                <i /><i /><i /><i /><i />
              </span>
              <span className="btn__label">{t.hero.github}</span>
            </SmartLink>

            <SmartLink className="btn btn--spark" href={profile.linkedin}>
              {/* kenarda dolaşan kıvılcım */}
              <span className="btn__arc" aria-hidden="true" />
              <span className="btn__label">{t.hero.linkedin}</span>
            </SmartLink>

            <SmartLink
              className="btn btn--mail"
              href={profile.email === "#" ? "#" : `mailto:${profile.email}`}
            >
              <EnvelopeIcon />
              <span className="btn__label">{t.hero.email}</span>
              {/* Daktilo efekti: kağıdın üzerindeki yazı */}
              <span className="btn__type" aria-hidden="true">
                merhaba
              </span>
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
