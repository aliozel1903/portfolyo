/* BounceGame.jsx — Gizli oyun: fotoğrafı düşürmeden sektir.

   Raket alttadır ve imleci/parmağı takip eder. Fotoğraf top gibi
   yerçekimiyle düşer; rakete değdiğinde yukarı sıçrar ve skor artar.
   Yere düşerse oyun biter.

   Fizik px cinsinden ve saniye bazlı: konum += hız * (dt/1000).
   Böylece kare hızı değişse bile (60Hz / 120Hz ekran) top aynı
   hızda hareket eder. */

import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import "./BounceGame.css";

const GRAVITY = 1500;        // px/sn²
const BALL_R = 30;           // topun yarıçapı
const PADDLE_W = 96;
const PADDLE_H = 16;
const PADDLE_BOTTOM = 42;    // raketin alt kenardan yüksekliği
const BEST_KEY = "portfolio-game-best";

function BounceGame({ onClose }) {
  const { t } = useLanguage();

  const [status, setStatus] = useState("intro"); // intro | countdown | playing | over
  const [count, setCount] = useState(3);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(readBest);
  // Fotoğraf henüz eklenmediyse top yerine kartal işareti dönsün
  const [photoOk, setPhotoOk] = useState(true);

  const areaRef = useRef(null);
  const ballRef = useRef(null);
  const paddleRef = useRef(null);
  const frameRef = useRef(0);

  // Oyun durumu ref'te: her karede state güncellemek React'i
  // gereksiz yere yorardı. Konumu doğrudan transform ile yazıyoruz.
  const world = useRef({ x: 0, y: 0, vx: 0, vy: 0, paddleX: 0, w: 0, h: 0 });
  const scoreRef = useRef(0);

  /* Alan ölçüsünü al ve topu başlangıç noktasına koy */
  const reset = useCallback(() => {
    const area = areaRef.current;
    if (!area) return;
    const box = area.getBoundingClientRect();
    const w = world.current;
    w.w = box.width;
    w.h = box.height;
    w.x = box.width / 2;
    w.y = box.height * 0.28;
    w.vx = (Math.random() - 0.5) * 160;
    w.vy = 0;
    w.paddleX = box.width / 2;
    scoreRef.current = 0;
    setScore(0);
    draw();
  }, []);

  /* Konumları DOM'a yaz (React render'ı beklemeden) */
  const draw = () => {
    const w = world.current;
    if (ballRef.current) {
      ballRef.current.style.transform =
        `translate(${w.x - BALL_R}px, ${w.y - BALL_R}px)`;
    }
    if (paddleRef.current) {
      paddleRef.current.style.transform =
        `translateX(${w.paddleX - PADDLE_W / 2}px)`;
    }
  };

  const movePointer = useCallback((clientX) => {
    const area = areaRef.current;
    if (!area) return;
    const box = area.getBoundingClientRect();
    const w = world.current;
    w.paddleX = Math.min(
      box.width - PADDLE_W / 2,
      Math.max(PADDLE_W / 2, clientX - box.left)
    );
    draw();
  }, []);

  /* --- 3 · 2 · 1 geri sayımı --- */
  useEffect(() => {
    if (status !== "countdown") return;
    if (count === 0) {
      setStatus("playing");
      return;
    }
    const id = setTimeout(() => setCount((c) => c - 1), 700);
    return () => clearTimeout(id);
  }, [status, count]);

  /* --- Oyun döngüsü --- */
  useEffect(() => {
    if (status !== "playing") return;

    let last = performance.now();

    const loop = (now) => {
      const dt = Math.min(34, now - last); // sekme arka plandayken sıçramasın
      last = now;
      const s = dt / 1000;
      const w = world.current;

      w.vy += GRAVITY * s;
      w.x += w.vx * s;
      w.y += w.vy * s;

      // Yan duvarlar: yönü çevir, biraz enerji kaybettir
      if (w.x < BALL_R) {
        w.x = BALL_R;
        w.vx = Math.abs(w.vx) * 0.9;
      } else if (w.x > w.w - BALL_R) {
        w.x = w.w - BALL_R;
        w.vx = -Math.abs(w.vx) * 0.9;
      }

      // Tavan
      if (w.y < BALL_R) {
        w.y = BALL_R;
        w.vy = Math.abs(w.vy) * 0.6;
      }

      // Raket teması
      const paddleTop = w.h - PADDLE_BOTTOM - PADDLE_H;
      const inRow = w.y + BALL_R >= paddleTop && w.y + BALL_R <= paddleTop + PADDLE_H + 18;
      const overlapX = Math.abs(w.x - w.paddleX) <= PADDLE_W / 2 + BALL_R * 0.6;

      if (inRow && overlapX && w.vy > 0) {
        w.y = paddleTop - BALL_R;
        scoreRef.current += 1;
        setScore(scoreRef.current);

        // Sıçrama gücü skorla birlikte hafifçe artar (üst sınırlı)
        const power = 640 + Math.min(scoreRef.current * 9, 220);
        w.vy = -power;

        // Rakete nereden çarptıysa oraya doğru saparak açı kazanır
        const offset = (w.x - w.paddleX) / (PADDLE_W / 2);
        w.vx += offset * 260;
        w.vx = Math.max(-420, Math.min(420, w.vx));
      }

      // Yere düştü mü?
      if (w.y - BALL_R > w.h) {
        finish();
        return;
      }

      draw();
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    // TEMİZLİK: bileşen kapanınca döngüyü durdur.
    return () => cancelAnimationFrame(frameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const finish = () => {
    cancelAnimationFrame(frameRef.current);
    const final = scoreRef.current;
    setStatus("over");
    if (final > best) {
      setBest(final);
      try {
        localStorage.setItem(BEST_KEY, String(final));
      } catch {
        // rekor kaydedilemezse oyun yine de çalışır
      }
    }
  };

  const start = () => {
    reset();
    setCount(3);
    setStatus("countdown");
  };

  /* --- ESC ile kapat --- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* Pencere boyutu değişirse alan ölçüsünü tazele */
  useEffect(() => {
    const onResize = () => {
      const area = areaRef.current;
      if (!area) return;
      const box = area.getBoundingClientRect();
      world.current.w = box.width;
      world.current.h = box.height;
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const running = status === "playing" || status === "countdown";

  return (
    <div className="bgame">
      <div className="bgame__panel">
        <header className="bgame__bar">
          <button
            type="button"
            className="bgame__close"
            onClick={onClose}
            aria-label={t.game.close}
          >
            ✕
          </button>
          <span className="bgame__stats">
            <span>{t.game.score}: <b>{score}</b></span>
            <span>{t.game.best}: <b>{best}</b></span>
          </span>
        </header>

        <div
          className="bgame__area"
          ref={areaRef}
          onMouseMove={(e) => movePointer(e.clientX)}
          onTouchMove={(e) => movePointer(e.touches[0].clientX)}
        >
          {/* Ortadaki dev, yarı saydam skor */}
          <span className="bgame__watermark" aria-hidden="true">
            {status === "countdown" && count > 0 ? count : score}
          </span>

          {/* Top: profil fotoğrafı. Kaydetmeye/sürüklemeye kapalı. */}
          <span className="bgame__ball" ref={ballRef}>
            {photoOk ? (
              <img
                src={profile.photo}
                alt=""
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
                onError={() => setPhotoOk(false)}
              />
            ) : (
              <span className="bgame__ball-fallback" aria-hidden="true">🦅</span>
            )}
          </span>

          <span className="bgame__paddle" ref={paddleRef} />

          {!running && (
            <div className="bgame__overlay">
              {status === "over" ? (
                <>
                  <p className="bgame__over-title">{t.game.gameOver}</p>
                  <p className="bgame__over-score">
                    {t.game.finalScore}: <b>{score}</b>
                  </p>
                  {score > 0 && score >= best && (
                    <p className="bgame__badge">{t.game.newBest}</p>
                  )}
                  <button type="button" className="btn btn--primary" onClick={start}>
                    {t.game.restart}
                  </button>
                </>
              ) : (
                <>
                  <p className="bgame__hint">{t.game.hint}</p>
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

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

export default BounceGame;
