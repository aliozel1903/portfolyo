/* Experience.jsx — Deneyim & Eğitim, kaydırmaya bağlı harita.

   Nasıl çalışıyor:
   - Dıştaki bölüm normalden uzun (300vh). İçindeki kutu ise
     position: sticky ile ekrana yapışıyor. Yani kullanıcı
     kaydırırken görüntü sabit kalıyor, sayfa "içeriden" ilerliyor.
   - useScroll bu uzun bölümün ne kadarının geçildiğini 0–1
     arasında veriyor; useTransform da bu değeri yolun çizim
     oranına ve durakların görünürlüğüne çeviriyor.
   - Hiçbir şey kendi kendine oynamıyor: tek kaynak tekerlek.
     Yukarı kaydırınca değer küçüldüğü için animasyon geri sarıyor.
   - Bölümün sonuna gelindiğinde sticky biter ve sayfa normal
     akışına döner. */

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { experience, education } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import "./Experience.css";

/* Yolun geçtiği noktalar (yüzde). side = yazının hangi yöne açılacağı. */
const STOPS = [
  { x: 40, y: 12, side: "left" },
  { x: 62, y: 50, side: "right" },
  { x: 38, y: 86, side: "left" },
];

/* Yol eğrisi — yukarıdaki üç noktadan geçer. */
const PATH = "M40 12 C40 30, 62 32, 62 50 S38 68, 38 86";

/* Yol çizimi ilk %78'de tamamlanır; kalan pay, son durak
   belirdikten sonra kullanıcının "bitti" hissetmesi için. */
const DRAW_END = 0.78;

function Experience() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef(null);
  const compact = useCompactLayout();

  // Kaydırma ilerlemesini kendimiz ölçüyoruz: bölümün üstü ekranın
  // üstüne değdiği andan, altı ekranın altına gelene kadar 0 → 1.
  // (Kütüphanenin otomatik takibi yerine bunu tercih ettik; Lenis
  // ile birlikte davranışı bu şekilde birebir öngörülebilir.)
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || compact) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;   // kaydırılabilir pay
      const raw = span > 0 ? -rect.top / span : 0;
      scrollYProgress.set(Math.min(1, Math.max(0, raw)));
    };

    update();
    // Geliştirme sırasında ilerlemeyi konsoldan okuyabilmek için.
    if (import.meta.env.DEV) window.__mapProgress = scrollYProgress;
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // TEMİZLİK: bileşen kalkarsa dinleyiciler de kalksın.
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [compact, scrollYProgress]);

  const drawn = useTransform(scrollYProgress, [0, DRAW_END], [0, 1]);

  const stops = [
    ...experience.map((item) => ({
      id: item.id,
      kind: t.experience.work,
      title: item[lang].role,
      org: item[lang].org,
      period: item[lang].period,
    })),
    ...education.map((item) => ({
      id: item.id,
      kind: t.experience.education,
      title: item[lang].program,
      org: item[lang].org,
      period: "",
    })),
  ];

  /* Dar ekranda kaydırma animasyonu yok: harita düz bir listeye
     dönüşüyor, bölüm de normal yüksekliğine iniyor. */
  if (compact) {
    return (
      <section id="experience" className="section">
        <div className="container">
          <h2 className="section-title">{t.sections.experience}</h2>
          <ol className="map__stops">
            {stops.map((stop) => (
              <li key={stop.id} className="stop">
                <span className="stop__node" aria-hidden="true">✓</span>
                <StopCard stop={stop} />
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="section experience" ref={sectionRef}>
      {/* Yapışkan kutu: kaydırma boyunca ekranda sabit kalır */}
      <div className="experience__pin">
        <div className="container">
          <h2 className="section-title">{t.sections.experience}</h2>

          <div className="map">
            <svg
              className="map__path"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Yolun gövdesi — kaydırdıkça çizilir */}
              <motion.path
                className="map__road"
                d={PATH}
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: drawn }}
              />
              {/* Ortadaki şerit çizgisi — aynı ritimde ilerler */}
              <motion.path
                className="map__lane"
                d={PATH}
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: drawn }}
              />
            </svg>

            <ol className="map__stops map__stops--absolute">
              {stops.map((stop, index) => (
                <MapStop
                  key={stop.id}
                  stop={stop}
                  spot={STOPS[index]}
                  progress={scrollYProgress}
                  index={index}
                  total={stops.length}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Tek durak. Kendi görünürlüğünü kaydırma oranından hesaplıyor:
   yol o noktaya ulaştığında beliriyor. */
function MapStop({ stop, spot, progress, index, total }) {
  // Durağın yolun neresinde olduğu: 0. durak hemen, sonuncusu
  // çizim bitmeden hemen önce.
  const at = ((index + 0.6) / total) * DRAW_END;
  const opacity = useTransform(progress, [at - 0.1, at], [0, 1]);
  const scale = useTransform(progress, [at - 0.1, at], [0.6, 1]);

  return (
    <motion.li
      className={`stop stop--${spot.side}`}
      style={{ left: `${spot.x}%`, top: `${spot.y}%`, opacity }}
    >
      <motion.span className="stop__node" style={{ scale }} aria-hidden="true">
        ✓
      </motion.span>
      <StopCard stop={stop} />
    </motion.li>
  );
}

function StopCard({ stop }) {
  return (
    <div className="stop__card">
      <span className="stop__kind">{stop.kind}</span>
      <h3 className="stop__title">{stop.title}</h3>
      <p className="stop__org">{stop.org}</p>
      {/* period yoksa bu satır hiç basılmaz */}
      {stop.period && <p className="stop__period">{stop.period}</p>}
    </div>
  );
}

/* Dar ekran veya "hareketi azalt" tercihi: animasyonsuz liste. */
function useCompactLayout() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const queries = [
      window.matchMedia("(max-width: 760px)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];
    const update = () => setCompact(queries.some((q) => q.matches));
    update();
    queries.forEach((q) => q.addEventListener("change", update));
    return () => queries.forEach((q) => q.removeEventListener("change", update));
  }, []);

  return compact;
}

export default Experience;
