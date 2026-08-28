/* ============================================================
   LanguageContext.jsx — Aktif dili tüm siteye dağıtan yapı.

   Neden Context? Dil bilgisine Hero da, Projeler de, Footer da
   ihtiyaç duyacak. Context olmadan bu bilgiyi App'ten her
   component'e tek tek "prop" olarak geçirmek gerekirdi
   (prop drilling). Context ile veriyi tepeden yayınlıyoruz,
   ihtiyacı olan aşağıdan doğrudan okuyor.
   ============================================================ */

import { createContext, useContext, useEffect, useState } from "react";
import { ui } from "../data/content";

// Yayın kanalı. Doğrudan dışa açmıyoruz; aşağıdaki hook üzerinden okunacak.
const LanguageContext = createContext(null);

// Tercihin tarayıcıda saklanacağı anahtar.
const STORAGE_KEY = "portfolio-lang";
const DEFAULT_LANG = "tr";

/* Sayfa ilk açılırken çalışır: daha önce seçilmiş bir dil var mı?
   Değeri doğrulamadan kullanmıyoruz — localStorage kullanıcının
   elle düzenleyebildiği bir alan, içinden "xx" gelirse ui["xx"]
   undefined olur ve site beyaz ekrana düşer. */
function readStoredLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && saved in ui ? saved : DEFAULT_LANG;
  } catch {
    // Gizli sekme / çerez engeli gibi durumlarda localStorage hata atabilir.
    return DEFAULT_LANG;
  }
}

export function LanguageProvider({ children }) {
  // useState'e fonksiyon veriyoruz: bu fonksiyon her render'da değil,
  // SADECE ilk açılışta bir kez çalışır (lazy initializer).
  const [lang, setLang] = useState(readStoredLanguage);

  const toggleLanguage = () => {
    setLang((current) => (current === "tr" ? "en" : "tr"));
  };

  // Dil her değiştiğinde: tercihi kaydet ve <html lang="..."> etiketini
  // güncelle. Ekran okuyucular ve arama motorları dili buradan anlar.
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Kaydedilemezse site çalışmaya devam etsin; sadece hatırlamaz.
    }
  }, [lang]);

  // t ("translate") = aktif dilin metin sözlüğü. t.hero.tagline gibi.
  const value = { lang, toggleLanguage, t: ui[lang] };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/* Component'lerin kullanacağı kısayol:
   const { t, lang, toggleLanguage } = useLanguage(); */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage yalnızca <LanguageProvider> içinde kullanılabilir.");
  }
  return context;
}
