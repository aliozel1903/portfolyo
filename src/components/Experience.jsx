/* Experience.jsx — Deneyim & Eğitim, kaydırmaya bağlı harita.

   Nasıl çalışıyor:
   - Dıştaki bölüm normalden uzun (300dvh). İçindeki kutu sticky ile
     ekrana yapışıyor; kullanıcı kaydırırken görüntü sabit kalıyor,
     sayfa "içeriden" ilerliyor.
   - İlerleme her karede ölçülüyor ve motion değerlerine yazılıyor:
     yolun çizim oranı ve durakların görünürlüğü buradan besleniyor.
   - Hiçbir şey kendi kendine oynamıyor; yukarı kaydırınca değer
     küçüldüğü için animasyon geri sarıyor.

   Mobil notları:
   - Ölçüm için window.innerHeight yerine yapışkan kutunun GERÇEK
     yüksekliği kullanılıyor. Adres çubuğu açılıp kapandığında
     innerHeight değişir ve hesap kayar; kutunun kendi ölçüsü ise
     dvh ile birlikte doğru kalır.
   - Güncellemeler scroll olayına değil requestAnimationFrame'e
     bağlı. Dokunmatik kaydırmada (özellikle parmak ekrandayken ve
     atalet kaymasında) scroll olayları seyrekleşebiliyor; her kare
     ölçmek animasyonu parmakla senkron tutuyor.
   - Yol geometrisi dar ekranda daha dik ve dar bir varyanta geçiyor. */

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { experience, education } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import "./Experience.css";

/* Geniş ekran: yol ortada salınır, yazılar iki yana açılır. */
const DESKTOP = {
  path: "M40 12 C40 30, 62 32, 62 50 S38 68, 38 86",
  stops: [
    { x: 40, y: 12, side: "left" },
    { x: 62, y: 50, side: "right" },
    { x: 38, y: 86, side: "left" },
  ],
};

/* Dar ekran: yol sola yaslanır, kıvrım daralır, yazılar hep sağda. */
const MOBILE = {
  path: "M16 10 C16 26, 30 30, 30 48 S16 70, 16 86",
  stops: [
    { x: 16, y: 10, side: "right" },
    { x: 30, y: 48, side: "right" },
    { x: 16, y: 86, side: "right" },
  ],
};

/* Yol çizimi ilk %78'de tamamlanır; kalan pay, son durak
   belirdikten sonra kullanıcının "bitti" hissetmesi için. */
const DRAW_END = 0.78;

function Experience() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  const isMobile = useMediaQuery("(max-width: 760px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const layout = isMobile ? MOBILE : DESKTOP;

  const scrollYProgress = useMotionValue(0);
  const drawn = useTransform(scrollYProgress, [0, DRAW_END], [0, 1]);

  /* Yönlendirme ipucu: kullanıcı kaydırmaya başlar başlamaz sönüyor.
     İşini yaptıktan sonra ekranda durması gereksiz gürültü olurdu. */
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  /* İlerlemeyi her karede ölç. Döngü yalnızca bölüm ekrana yakınken
     çalışır; uzaktayken boşuna kare harcamıyoruz. */
  useEffect(() => {
    if (reducedMotion) {
      scrollYProgress.set(1);   // hareket istemeyene her şey açık gelsin
      return;
    }

    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    let frame = 0;
    let active = false;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      // Yapışkan kutunun kendi yüksekliği: adres çubuğu açılıp
      // kapansa da bölüm yüksekliğiyle tutarlı kalır.
      const span = rect.height - pin.offsetHeight;
      const raw = span > 0 ? -rect.top / span : 0;
      scrollYProgress.set(Math.min(1, Math.max(0, raw)));
    };

    const loop = () => {
      measure();
      frame = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !active) {
          active = true;
          frame = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && active) {
          active = false;
          cancelAnimationFrame(frame);
          measure();   // son bir kez hizala
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(section);
    measure();

    // Yedek: kare döngüsü kısıtlanırsa (arka plan sekmesi, düşük güç
    // modu) en azından her kaydırma olayında hizalanalım.
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    // TEMİZLİK: döngü ve gözlemci kapatılır.
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [reducedMotion, scrollYProgress, isMobile]);

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

  return (
    <section id="experience" className="section experience" ref={sectionRef}>
      {/* Yapışkan kutu: kaydırma boyunca ekranda sabit kalır */}
      <div className="experience__pin" ref={pinRef}>
        <div className="container">
          <h2 className="section-title">{t.sections.experience}</h2>

          <motion.p className="scroll-hint" style={{ opacity: hintOpacity }}>
            <span className="scroll-hint__text">{t.experience.scrollHint}</span>
            {/* İnce chevron, yavaşça aşağı süzülür */}
            <svg
              className="scroll-hint__chevron"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.p>

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
                d={layout.path}
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: drawn }}
              />
              {/* Ortadaki şerit çizgisi — aynı ritimde ilerler */}
              <motion.path
                className="map__lane"
                d={layout.path}
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: drawn }}
              />
            </svg>

            <ol className="map__stops">
              {stops.map((stop, index) => (
                <MapStop
                  key={stop.id}
                  stop={stop}
                  spot={layout.stops[index]}
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

      <div className="stop__card">
        <span className="stop__kind">{stop.kind}</span>
        <h3 className="stop__title">{stop.title}</h3>
        <p className="stop__org">{stop.org}</p>
        {/* period yoksa bu satır hiç basılmaz */}
        {stop.period && <p className="stop__period">{stop.period}</p>}
      </div>
    </motion.li>
  );
}

/* Bir medya sorgusunu takip eder ve değiştiğinde bileşeni yeniler. */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    // Yedek: bazı ortamlarda (cihaz emülasyonu, bölünmüş ekran)
    // matchMedia "change" olayı gelmiyor; resize her durumda geliyor.
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [query]);

  return matches;
}

export default Experience;
