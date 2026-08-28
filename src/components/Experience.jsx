/* Experience.jsx — Deneyim & Eğitim bölümü.

   Tek bir zaman çizelgesi görünümü, iki farklı veri kaynağı:
   experience (iş) ve education (okul). Her ikisi de aynı satır
   yapısını kullandığı için TimelineItem'ı ortak yazdık. */

import { experience, education } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import "./Experience.css";

function Experience() {
  const { lang, t } = useLanguage();

  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <h2 className="section-title">{t.sections.experience}</h2>

        <h3 className="timeline__heading">{t.experience.work}</h3>
        <ul className="timeline">
          {experience.map((item) => (
            <TimelineItem
              key={item.id}
              title={item[lang].role}
              organization={item.organization}
              period={item[lang].period}
            />
          ))}
        </ul>

        <h3 className="timeline__heading">{t.experience.education}</h3>
        <ul className="timeline">
          {education.map((item) => (
            <TimelineItem
              key={item.id}
              title={item[lang].program}
              organization={item.school}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Çizelgedeki tek bir satır.
   period isteğe bağlı: eğitim kaydında tarih göstermiyoruz. */
function TimelineItem({ title, organization, period }) {
  return (
    <li className="timeline__item">
      {/* Soldaki nokta tamamen dekoratif; ekran okuyucu okumasın diye
          metin değil, CSS ile çiziliyor (::before). */}
      <h4 className="timeline__title">{title}</h4>
      <p className="timeline__org">{organization}</p>
      {/* period yoksa bu satır hiç basılmaz.
          && : soldaki doğruysa sağdakini çiz. */}
      {period && <p className="timeline__period">{period}</p>}
    </li>
  );
}

export default Experience;
