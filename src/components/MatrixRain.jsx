/* MatrixRain.jsx — Yetenekler bölümünün arkasında akan dijital yağmur.

   Canvas tercih ettik: yüzlerce karakteri DOM elemanı olarak
   çizmek tarayıcıyı yorar, canvas'ta hepsi tek bir yüzeye çizilir.

   Performans için iki önlem:
   - IntersectionObserver: bölüm ekranda değilken animasyon durur.
   - prefers-reduced-motion: hareketi azalt seçenlerde hiç çalışmaz. */

import { useEffect, useRef } from "react";
import "./MatrixRain.css";

/* Filmdeki gibi: yarım genişlikli katakana + rakamlar. */
const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
const FONT_SIZE = 15;

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
    let drops = [];      // her sütunun baş karakterinin satır konumu
    let speeds = [];     // sütunlar farklı hızda düşsün
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
      speeds = Array.from({ length: columns }, () => 0.4 + Math.random() * 0.75);

      // Siyah zemini bir kez bas: sonraki karelerde yalnızca
      // yarı saydam katman gelecek.
      ctx.fillStyle = "#050805";
      ctx.fillRect(0, 0, width, height);
    };

    const draw = () => {
      const { width, height } = canvas;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = width / dpr;
      const h = height / dpr;

      // Şeffaf siyah katman: eski karakterleri silmek yerine
      // soldurur — düşen izin kuyruğu böyle oluşuyor.
      ctx.fillStyle = "rgba(5, 8, 5, 0.085)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < drops.length; i += 1) {
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

        // Baş karakter neredeyse beyaz ve parlıyor; filmdeki
        // "damlanın ucu" etkisini veren şey bu.
        ctx.shadowColor = "#00ff41";
        ctx.shadowBlur = 8;
        ctx.fillStyle = "#c8ffd0";
        ctx.fillText(char, x, y);

        // Hemen arkasındaki birkaç karakter parlak yeşil,
        // gerisi zaten sönerek kuyruğu oluşturuyor.
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#00ff41";
        ctx.fillText(
          GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          x,
          y - FONT_SIZE
        );
        ctx.fillStyle = "#12b53a";
        ctx.fillText(
          GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          x,
          y - FONT_SIZE * 2
        );

        // Alt kenarı geçen sütun rastgele bir gecikmeyle başa döner
        if (y > h && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
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
