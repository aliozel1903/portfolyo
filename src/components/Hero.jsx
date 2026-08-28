/* Hero.jsx — Karşılama bölümü.
   Metinleri content.js'ten alır; kendi içinde sabit yazı barındırmaz. */

import { profile } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import SmartLink from "./SmartLink";
import "./Hero.css";

function Hero() {
  const { t } = useLanguage(); // aktif dilin sözlüğü

  return (
    <section id="hero" className="section hero">
      <div className="container">
        <h1 className="hero__name">{profile.name}</h1>
        <p className="hero__title">{t.hero.title}</p>
        <p className="hero__tagline">{t.hero.tagline}</p>

        <div className="hero__actions">
          {/* SmartLink: linki "#" ise tıklanamaz <span> basar */}
          <SmartLink className="btn btn--primary" href={profile.github}>
            {t.hero.github}
          </SmartLink>
          <SmartLink className="btn btn--outline" href={profile.linkedin}>
            {t.hero.linkedin}
          </SmartLink>
        </div>
      </div>
    </section>
  );
}

export default Hero;
