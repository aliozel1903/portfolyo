/* Skills.jsx — Yetenekler bölümü.
   content.js'teki "skills" dizisini rozet listesine çevirir. */

import { skills } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import "./Skills.css";

function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">{t.sections.skills}</h2>

        {/* Masaya bırakılmış bir kağıt: zeminden hafifçe yükselen,
           yayvan gölgeli geniş kart. */}
        <div className="skills__paper">
          {/* Görsel olarak rozet dizisi ama yapısal olarak bir LİSTE.
              <ul> kullanmak ekran okuyucuya "6 öğelik liste" der;
              arka arkaya <span> yığını bunu söyleyemez. */}
          <ul className="skills__list">
            {skills.map((skill) => (
              // key: React'in hangi öğenin hangisi olduğunu takip etmesi için.
              // Yetenek adları benzersiz olduğundan doğrudan key olabilir.
              <li key={skill} className="skills__badge">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Skills;
