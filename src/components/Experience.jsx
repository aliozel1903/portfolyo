/* Experience.jsx — Deneyim & Eğitim, oyun haritası biçiminde.

   Düz liste yerine yukarıdan aşağı kıvrılan bir SVG yol var;
   duraklar bu yolun üzerine yerleştirilmiş "checkpoint"ler.

   Konumlandırma yöntemi: yol SVG'si viewBox 0 0 100 100 ile
   çiziliyor ve preserveAspectRatio="none" ile kutuyu dolduruyor.
   Duraklar ise HTML olarak aynı yüzde koordinatlarına konuyor.
   Böylece yol her ekran boyutunda esneyebiliyor ama duraklar
   yuvarlak ve keskin kalıyor (SVG'de esnetilseler ovalleşirdi). */

import { experience, education } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import "./Experience.css";

/* Durakların yol üzerindeki yüzde konumları.
   Yol eğrisi de bu noktalardan geçecek şekilde çizildi. */
const STOPS = [
  { x: 24, y: 12 },
  { x: 74, y: 42 },
  { x: 30, y: 76 },
];

function Experience() {
  const { lang, t } = useLanguage();

  // İş ve okul kayıtlarını tek bir yolculuk olarak sıralıyoruz.
  const stops = [
    ...experience.map((item) => ({
      id: item.id,
      kind: t.experience.work,
      title: item[lang].role,
      organization: item.organization,
      period: item[lang].period,
    })),
    ...education.map((item) => ({
      id: item.id,
      kind: t.experience.education,
      title: item[lang].program,
      organization: item.school,
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
            {/* Alttaki kalın, soluk şerit: yolun kendisi */}
            <path
              className="map__road"
              d="M24 12 C24 26, 74 28, 74 42 S30 62, 30 76"
              vectorEffect="non-scaling-stroke"
            />
            {/* Üstteki kesik çizgi: şerit işareti */}
            <path
              className="map__dashes"
              d="M24 12 C24 26, 74 28, 74 42 S30 62, 30 76"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Duraklar — ekran okuyucu için sıralı bir liste */}
          <ol className="map__stops">
            {stops.map((stop, index) => {
              const spot = STOPS[index] ?? STOPS[STOPS.length - 1];
              // Son durak "şu an burada"; öncekiler tamamlanmış.
              const current = index === stops.length - 1;

              return (
                <li
                  key={stop.id}
                  className={`stop${current ? " stop--current" : ""}`}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                >
                  <span className="stop__node" aria-hidden="true">
                    {current ? index + 1 : "✓"}
                  </span>

                  <div className="stop__card">
                    <span className="stop__kind">{stop.kind}</span>
                    <h3 className="stop__title">{stop.title}</h3>
                    <p className="stop__org">{stop.organization}</p>
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
