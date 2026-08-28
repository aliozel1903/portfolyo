/* ProjectCard.jsx — TEK bir projenin kartı.

   Bu dosya hangi projeler olduğunu BİLMEZ. Kendisine "project"
   adında bir obje verilir, onu çizer. Bu ayrım sayesinde kart
   tasarımını değiştirmek için tek bir dosyaya dokunmak yeterli. */

import { useLanguage } from "../context/LanguageContext";
import SmartLink from "./SmartLink";
import "./ProjectCard.css";

// { project } = gelen prop'ların içinden sadece "project" alanını al.
function ProjectCard({ project }) {
  const { lang, t } = useLanguage();

  // Başlık ve açıklama dile bağlı: project.tr.title / project.en.title
  const text = project[lang];

  return (
    <article className="card">
      <h3 className="card__title">{text.title}</h3>
      <p className="card__description">{text.description}</p>

      {/* Teknoloji rozetleri — Skills'tekilerin küçük kardeşi */}
      <ul className="card__tech">
        {project.tech.map((item) => (
          <li key={item} className="card__tech-item">
            {item}
          </li>
        ))}
      </ul>

      {/* mt-auto benzeri bir iş: bu blok kartın en altına yapışır,
         böylece farklı uzunluktaki kartlarda butonlar aynı hizada durur.
         (Hizalamayı ProjectCard.css'teki margin-top:auto sağlıyor.) */}
      <div className="card__links">
        <SmartLink className="card__link" href={project.github}>
          {t.projects.github}
        </SmartLink>
        <SmartLink className="card__link" href={project.demo}>
          {t.projects.demo}
        </SmartLink>
      </div>
    </article>
  );
}

export default ProjectCard;
