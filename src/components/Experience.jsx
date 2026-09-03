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
import { RvIcon, FlagIcon } from "./icons";
import "./Experience.css";

/* Yolun geçtiği noktalar (yüzde). side = yazının hangi yöne açılacağı. */
const STOPS = [
  { x: 40, y: 8, side: "left" },
  { x: 62, y: 31, side: "right" },
  { x: 38, y: 56, side: "left" },
  { x: 60, y: 84, side: "right" },
];

/* Yol eğrisi — yukarıdaki dört noktadan geçer. */
const PATH = "M40 8 C40 20, 62 20, 62 31 S38 44, 38 56 S60 72, 60 84";

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
      done: true,
    })),
    ...education.map((item) => ({
      id: item.id,
      kind: t.experience.education,
      title: item[lang].program,
      org: item[lang].org,
      period: "",
      done: true,
    })),
    // Son durak: henüz bilinmeyen. Bayrağın üzerinde soru işareti var.
    { id: "next", kind: "", title: t.experience.next, org: "", period: "", done: false },
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

          {/* Yolda duran karavan — hareketsiz, tamamen dekoratif */}
          <span className="map__rv" aria-hidden="true">
            <RvIcon />
          </span>

          {/* Duraklar — ekran okuyucu için sıralı bir liste */}
          <ol className="map__stops">
            {stops.map((stop, index) => {
              const spot = STOPS[index] ?? STOPS[STOPS.length - 1];

              return (
                <li
                  key={stop.id}
                  className={`stop stop--${spot.side}${stop.done ? "" : " stop--next"}`}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                >
                  <span className="stop__node" aria-hidden="true">
                    {stop.done ? "✓" : <FlagIcon />}
                  </span>

                  <div className="stop__card">
                    {stop.kind && <span className="stop__kind">{stop.kind}</span>}
                    <h3 className="stop__title">{stop.title}</h3>
                    {stop.org && <p className="stop__org">{stop.org}</p>}
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
