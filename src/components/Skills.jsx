/* Skills.jsx — Yetenekler bölümü.
   Yetenekler bir macOS terminali içinde sırayla yazılıyor. */

import { useLanguage } from "../context/LanguageContext";
import SkillsTerminal from "./SkillsTerminal";
import "./Skills.css";

function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">{t.sections.skills}</h2>

        <SkillsTerminal
          title={t.terminal.title}
          command={t.terminal.command}
          intro={t.terminal.intro}
        />
      </div>
    </section>
  );
}

export default Skills;
