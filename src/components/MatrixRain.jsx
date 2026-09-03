/* MatrixRain.jsx — Yetenekler bölümünün arkasında akan dijital yağmur.

   Canvas tercih ettik: yüzlerce karakteri DOM elemanı olarak
   çizmek tarayıcıyı yorar, canvas'ta hepsi tek bir yüzeye çizilir.

   Performans için iki önlem:
   - IntersectionObserver: bölüm ekranda değilken animasyon durur.
   - prefers-reduced-motion: hareketi azalt seçenlerde hiç çalışmaz. */

import { useEffect, useRef } from "react";
import "./MatrixRain.css";

const GLYPHS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01234567890101<>/{}[]$#";
const FONT_SIZE = 14;
const SPEED = 0.55;        // düşüş hızı (satır/kare) — bilinçli olarak yavaş

function MatrixRain() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = canvas.getContext("2d");
    let drops = [];
    let frame = 0;
    let visible = true;

    /* Canvas'ı kutusuna göre ölçekle. devicePixelRatio olmadan
       retina ekranlarda bulanık görünür. */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = wrap.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_SIZE}px ui-monospace, Menlo, monospace`;

      const columns = Math.ceil(width / FONT_SIZE);
      // Her sütun rastgele bir yükseklikten başlasın; hepsi aynı
      // anda tepeden düşerse "perde" gibi görünür.
      drops = Array.from({ length: columns }, () =>
        Math.random() * (height / FONT_SIZE)
      );
    };

    const draw = () => {
      const { width, height } = canvas;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = width / dpr;
      const h = height / dpr;

      // Şeffaf siyah katman: eski karakterleri silmek yerine
      // soldurur — düşen izin kuyruğu böyle oluşuyor.
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#008f11";
      for (let i = 0; i < drops.length; i += 1) {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);

        // Alt kenarı geçen sütun rastgele bir gecikmeyle başa döner
        if (drops[i] * FONT_SIZE > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += SPEED;
      }
    };

    const loop = () => {
      if (visible) draw();
      frame = requestAnimationFrame(loop);
    };

    resize();
    frame = requestAnimationFrame(loop);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // Bölüm ekrandan çıkınca çizimi durdur: boşuna kare harcamayalım.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(wrap);

    // TEMİZLİK: döngü, dinleyici ve gözlemci kapatılır.
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="matrix" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} className="matrix__canvas" />
    </div>
  );
}

export default MatrixRain;
