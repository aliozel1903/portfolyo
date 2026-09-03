/* Experience.jsx — Deneyim & Eğitim, oyun haritası biçiminde.

   Düz liste yerine yukarıdan aşağı kıvrılan bir yol var; duraklar
   bu yolun üzerinde. Yol ortada dar bir bantta salınıyor, yazılar
   ise dışa doğru açılıyor — böylece metin yolun üstüne binmiyor.

   Konumlandırma: yol SVG'si viewBox 0 0 100 100 ile çiziliyor ve
   preserveAspectRatio="none" ile kutuyu dolduruyor. Duraklar ise
   HTML olarak aynı yüzde koordinatlarına konuyor; SVG içinde
   olsalardı yol esnerken daireler ovalleşirdi. */

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

function Experience() {
  const { lang, t } = useLanguage();

  // İş, okul ve "sırada ne var" duraklarını tek bir yolculuk yapıyoruz.
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
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">{t.sections.experience}</h2>

        <div className="map">
          {/* Kıvrımlı yol. Yalnızca dekoratif olduğu için gizli. */}
          <svg
            className="map__path"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Alttaki kalın şerit: yolun kendisi */}
            <path className="map__road" d={PATH} vectorEffect="non-scaling-stroke" />
            {/* Üstteki kesik çizgi: şerit işareti */}
            <path className="map__dashes" d={PATH} vectorEffect="non-scaling-stroke" />
          </svg>

          {/* Duraklar — ekran okuyucu için sıralı bir liste */}
          <ol className="map__stops">
            {stops.map((stop, index) => {
              const spot = STOPS[index] ?? STOPS[STOPS.length - 1];

              return (
                <li
                  key={stop.id}
                  className={`stop stop--${spot.side}`}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                >
                  <span className="stop__node" aria-hidden="true">
                    ✓
                  </span>

                  <div className="stop__card">
                    <span className="stop__kind">{stop.kind}</span>
                    <h3 className="stop__title">{stop.title}</h3>
                    <p className="stop__org">{stop.org}</p>
                    {/* period yoksa bu satır hiç basılmaz */}
                    {stop.period && <p className="stop__period">{stop.period}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Experience;
