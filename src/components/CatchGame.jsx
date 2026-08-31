/* CatchGame.jsx — Gizli mola oyunu.

   Yukarıdan düşen nesneleri sepetle yakala. Doğru nesne puan,
   kaçırılan nesne ve yakalanan böcek can götürür.

   Teknik notlar:
   - Konumlar YÜZDE olarak tutuluyor (0-100). Böylece pencere
     boyutu değişince oyun bozulmuyor, ölçek hesabı gerekmiyor.
   - Nesne listesi useRef'te; her karede state'e kopyalanıyor.
     Oyun mantığı ref üzerinde döndüğü için React'in render
     hızından bağımsız çalışıyor.
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./CatchGame.css";

const GOOD = ["⚡", "💾", "🧩", "☕", "🚀", "🎧"];
const BAD = "🐛";
const BEST_KEY = "portfolio-game-best";

function CatchGame({ onClose }) {
  const { t } = useLanguage();

  const [status, setStatus] = useState("intro"); // intro | playing | over
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [items, setItems] = useState([]);
  const [basket, setBasket] = useState(50);
  const [best, setBest] = useState(readBest);

  const itemsRef = useRef([]);
  const basketRef = useRef(50);
  const areaRef = useRef(null);
  const frameRef = useRef(0);

  /* --- Sepeti imlece/parmağa göre sürükle --- */
  const movePointer = useCallback((clientX) => {
    const area = areaRef.current;
    if (!area) return;
    const box = area.getBoundingClientRect();
    const percent = ((clientX - box.left) / box.width) * 100;
    // 6-94 aralığı: sepet kenarlardan taşmasın
    const clamped = Math.min(94, Math.max(6, percent));
    basketRef.current = clamped;
    setBasket(clamped);
  }, []);

  /* --- Oyun döngüsü --- */
  useEffect(() => {
    if (status !== "playing") return;

    let last = performance.now();
    let spawnTimer = 0;
    let elapsed = 0;

    const loop = (now) => {
      const dt = Math.min(50, now - last); // sekme arka plandayken sıçramasın
      last = now;
      elapsed += dt;
      spawnTimer += dt;

      // Zamanla hızlanan doğuş aralığı: 900ms'ten 380ms'e iner
      const spawnEvery = Math.max(380, 900 - elapsed / 90);
      if (spawnTimer >= spawnEvery) {
        spawnTimer = 0;
        itemsRef.current.push(createItem(elapsed));
      }

      let scored = 0;
      let lost = 0;

      itemsRef.current = itemsRef.current.filter((item) => {
        item.y += (item.speed * dt) / 1000;

        // Sepet hizası (yüzde olarak ~86)
        if (item.y >= 84 && item.y <= 94) {
          const hit = Math.abs(item.x - basketRef.current) < 9;
          if (hit) {
            if (item.bad) lost += 1;
            else scored += 1;
            return false; // yakalandı, listeden çıkar
          }
        }

        if (item.y > 100) {
          if (!item.bad) lost += 1; // iyi nesneyi kaçırmak can götürür
          return false;
        }
        return true;
      });

      if (scored) setScore((s) => s + scored);
      if (lost) setLives((l) => l - lost);

      setItems([...itemsRef.current]);
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    // TEMİZLİK: bileşen kapanınca döngüyü durdur.
    return () => cancelAnimationFrame(frameRef.current);
  }, [status]);

  /* --- Can bitince oyunu bitir, rekoru kaydet --- */
  useEffect(() => {
    if (status === "playing" && lives <= 0) {
      setStatus("over");
      itemsRef.current = [];
      setItems([]);
      if (score > best) {
        setBest(score);
        try {
          localStorage.setItem(BEST_KEY, String(score));
        } catch {
          // rekor kaydedilemezse oyun yine de çalışır
        }
      }
    }
  }, [lives, status, score, best]);

  /* --- ESC ile kapat --- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const start = () => {
    itemsRef.current = [];
    setItems([]);
    setScore(0);
    setLives(3);
    setStatus("playing");
  };

  return (
    // Arka plana tıklayınca da kapanır
    <div className="game" onClick={onClose}>
      <div
        className="game__panel"
        // İçeriye yapılan tıklama arka plana ulaşıp pencereyi kapatmasın
        onClick={(e) => e.stopPropagation()}
      >
        <header className="game__bar">
          <span className="game__title">{t.game.title}</span>
          <span className="game__stats">
            <span>{t.game.score}: <b>{score}</b></span>
            <span>{t.game.best}: <b>{best}</b></span>
            <span className="game__lives">
              {"♥".repeat(Math.max(0, lives))}
              <span className="game__lives-empty">
                {"♥".repeat(Math.max(0, 3 - lives))}
              </span>
            </span>
          </span>
          <button
            type="button"
            className="game__close"
            onClick={onClose}
            aria-label={t.game.close}
          >
            ✕
          </button>
        </header>

        <div
          className="game__area"
          ref={areaRef}
          onMouseMove={(e) => movePointer(e.clientX)}
          onTouchMove={(e) => movePointer(e.touches[0].clientX)}
        >
          {items.map((item) => (
            <span
              key={item.id}
              className="game__item"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              {item.emoji}
            </span>
          ))}

          <span className="game__basket" style={{ left: `${basket}%` }}>
            🧺
          </span>

          {status !== "playing" && (
            <div className="game__overlay">
              {status === "over" ? (
                <>
                  <p className="game__over-title">{t.game.gameOver}</p>
                  <p className="game__over-score">
                    {t.game.finalScore}: <b>{score}</b>
                  </p>
                  {score > 0 && score >= best && (
                    <p className="game__badge">{t.game.newBest}</p>
                  )}
                  <button type="button" className="btn btn--primary" onClick={start}>
                    {t.game.restart}
                  </button>
                </>
              ) : (
                <>
                  <p className="game__hint">{t.game.hint}</p>
                  <button type="button" className="btn btn--primary" onClick={start}>
                    {t.game.start}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Yeni bir düşen nesne. Süre ilerledikçe hız artar. */
function createItem(elapsed) {
  const bad = Math.random() < 0.18;
  return {
    id: Math.random().toString(36).slice(2),
    x: 6 + Math.random() * 88,
    y: -6,
    speed: 34 + Math.random() * 16 + elapsed / 1200, // yüzde/saniye
    bad,
    emoji: bad ? BAD : GOOD[Math.floor(Math.random() * GOOD.length)],
  };
}

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

export default CatchGame;
