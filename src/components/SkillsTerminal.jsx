/* SkillsTerminal.jsx — Yetenekleri bir macOS terminali içinde,
   satır satır yazılıyormuş gibi gösterir.

   Animasyon sayfa açılır açılmaz değil, bölüm ekrana girdiğinde
   başlar (IntersectionObserver) ve bir kez oynar. */

import { useEffect, useRef, useState } from "react";
import { skills } from "../data/content";
import "./SkillsTerminal.css";

const PROMPT = "aliozel@ali-MacBook-Air ~ %";
const CHAR_MS = 26;      // harf başına gecikme
const LINE_MS = 260;     // satır sonlarındaki nefes payı

function SkillsTerminal({ title, command, intro }) {
  // Ekranda görünecek tam metin. Satırlar sırayla yazılacak.
  const script = [
    { kind: "muted", text: intro },
    { kind: "prompt", text: `${PROMPT} ${command}` },
    ...skills.map((skill) => ({ kind: "out", text: skill })),
    { kind: "prompt", text: PROMPT },
  ];
  const fullText = script.map((line) => line.text).join("\n");

  const [typed, setTyped] = useState(0);
  const [started, setStarted] = useState(false);
  const boxRef = useRef(null);

  /* Bölüm görünür olunca animasyonu başlat — bir kez. */
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTyped(fullText.length);   // hareket istemeyene metin hazır gelsin
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // %35'i görününce başlasın: kullanıcı bölüme geldiğinde
        // animasyon çoktan bitmiş olmasın.
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, [fullText.length]);

  /* Harf harf yazım. Zincirleme setTimeout kullanıyoruz:
     satır sonlarında daha uzun bekleyebilmek için her adımın
     gecikmesi ayrı hesaplanıyor. */
  useEffect(() => {
    if (!started || typed >= fullText.length) return;
    const isLineEnd = fullText[typed] === "\n";
    const timer = setTimeout(
      () => setTyped((n) => n + 1),
      isLineEnd ? LINE_MS : CHAR_MS
    );
    return () => clearTimeout(timer);
  }, [started, typed, fullText]);

  // Yazılmış kısmı satırlara böl; her satır kendi rengini alsın.
  const visible = fullText.slice(0, typed).split("\n");

  return (
    <div className="term" ref={boxRef}>
      <div className="term__bar">
        <span className="term__light term__light--red" />
        <span className="term__light term__light--yellow" />
        <span className="term__light term__light--green" />
        <span className="term__title">{title}</span>
      </div>

      {/* Ekran okuyucu animasyonu değil, sonucu okusun */}
      <pre className="term__screen" aria-label={fullText}>
        {visible.map((line, index) => {
          const kind = script[index]?.kind ?? "out";
          const isLast = index === visible.length - 1;
          return (
            <span key={index} className={`term__line term__line--${kind}`}>
              {line}
              {isLast && <span className="term__caret" aria-hidden="true" />}
              {"\n"}
            </span>
          );
        })}
      </pre>
    </div>
  );
}

export default SkillsTerminal;
