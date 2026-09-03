/* useSmoothScroll.js — Lenis ile akıcı kaydırma.

   Tarayıcının kendi kaydırması adım adım (satır satır) ilerler;
   bu da tekerlek çevirirken sıçrama hissi verir. Lenis her karede
   hedef konuma doğru yumuşak bir geçiş uygulayarak bu adımları
   sürekli bir harekete çevirir.

   Not: CSS'te scroll-behavior: smooth TANIMLI DEĞİL — ikisi aynı
   anda çalışırsa birbirleriyle yarışır. */

import { useEffect } from "react";
import Lenis from "lenis";

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,          // hedefe varış süresi (sn)
      // Yumuşak duruş eğrisi: hızlı başlar, sona doğru yavaşlar
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,              // #projects gibi bağlantıları da Lenis taşısın
      respectReducedMotion: true, // "hareketi azalt" seçenlerde devre dışı
    });

    // Geliştirme sırasında konsoldan kaydırmayı sürebilmek için.
    // Üretim derlemesinde bu satır tamamen çıkarılır.
    if (import.meta.env.DEV) window.__lenis = lenis;

    // Lenis'i tarayıcının çizim döngüsüne bağlıyoruz: her karede
    // bir adım ilerlesin, ekran yenilemesiyle senkron kalsın.
    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // TEMİZLİK: döngüyü durdur ve Lenis'in olay dinleyicilerini kaldır.
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}
