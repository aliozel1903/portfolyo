/* Contact.jsx — İletişim bölümü.
   Başlık yapısı Projeler ve Deneyim ile birebir aynı:
   section > container > h2.section-title */

import { profile } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import SmartLink from "./SmartLink";
import "./Contact.css";

function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">{t.sections.contact}</h2>

        <p className="contact__text">{t.contact.text}</p>

        <div className="contact__actions">
          {/* SmartLink: linki "#" ise tıklanamaz <span> basar */}
          <SmartLink className="btn btn--primary" href={profile.github}>
            {t.hero.github}
          </SmartLink>
          <SmartLink className="btn btn--outline" href={profile.linkedin}>
            {t.hero.linkedin}
          </SmartLink>
          {/* E-posta ekranda düz metin olarak yazılmıyor; adres
             yalnızca href içindeki mailto: hedefinde yaşıyor. */}
          <SmartLink
            className="btn btn--outline"
            href={profile.email === "#" ? "#" : `mailto:${profile.email}`}
          >
            {t.hero.email}
          </SmartLink>
        </div>
      </div>
    </section>
  );
}

export default Contact;
