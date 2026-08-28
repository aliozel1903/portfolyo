/* Projects.jsx — Projeler bölümü (listeleyici).

   Bu dosya kartın NASIL göründüğünü bilmez; sadece diziyi dolaşıp
   her proje için bir <ProjectCard /> basar ve ızgarayı kurar. */

import { projects } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">{t.sections.projects}</h2>

        <div className="projects__grid">
          {projects.map((project) => (
            // key: content.js'te tanımladığımız sabit id.
            // project={project}: kartın çizeceği veriyi aşağı geçiriyoruz.
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
