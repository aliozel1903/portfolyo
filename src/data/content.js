/* ============================================================
   content.js — Sitedeki TÜM metin ve linkler.

   İKİ PARÇAYA AYIRDIK:
   1) Dilden BAĞIMSIZ veri  → isim, linkler, teknoloji adları.
      ("PostgreSQL" Türkçede de İngilizcede de PostgreSQL'dir.)
   2) Dile BAĞLI metin (ui) → başlıklar, açıklamalar, buton yazıları.

   Bu ayrım sayesinde yeni bir dil eklemek = "ui" içine yeni bir
   anahtar eklemek. Veriyi iki kez yazmıyoruz.
   ============================================================ */

/* --- 1. Dilden bağımsız veriler --------------------------- */

export const profile = {
  name: "Ali Özel",
  github: "https://github.com/aliozel1903",
  linkedin: "https://www.linkedin.com/in/ali-ozel-dev",
  // Ekranda düz metin olarak GÖSTERİLMEZ; yalnızca Footer'daki
  // ikonun mailto: adresini üretmek için kullanılır.
  email: "aliozel1025@gmail.com",
  // Fotoğrafı public/ klasörüne "profile.jpg" adıyla bırakmak yeterli.
  // Dosya yoksa Avatar bileşeni sessizce yedek görsele düşer.
  photo: "/profile.jpg",
};

export const skills = [
  "C#",
  ".NET Core",
  "Laravel",
  "PostgreSQL",
  "Python",
  "Windows Forms",
];

/* Projelerde title/description dile bağlı olduğu için her projenin
   içine "tr" ve "en" alt objeleri koyduk. id, tech ve linkler ortak. */
export const projects = [
  {
    id: "smartmenu",
    tech: ["C#", ".NET Core MVC", "Entity Framework Core", "PostgreSQL"],
    github: "#",
    demo: "#",
    tr: {
      title: "SmartMenu SaaS",
      description:
        "Multi-tenant mimari ile geliştirilmiş kapsamlı restoran yönetim sistemi.",
    },
    en: {
      title: "SmartMenu SaaS",
      description:
        "Comprehensive restaurant management system built on a multi-tenant architecture.",
    },
  },
  {
    id: "lbys",
    tech: ["Laravel", "PostgreSQL"],
    github: "#",
    demo: "#",
    tr: {
      title: "LBYS (Laboratuvar Bilgi Yönetim Sistemi)",
      description: "Gelişmiş laboratuvar süreç yönetimi altyapısı.",
    },
    en: {
      title: "LIMS (Laboratory Information Management System)",
      description: "Advanced infrastructure for laboratory process management.",
    },
  },
  {
    id: "eczacilik",
    tech: ["C#", "Windows Forms"],
    github: "#",
    demo: "#",
    tr: {
      title: "Eczacılık Yönetim Sistemi",
      description: "Masaüstü eczane takip ve yönetim uygulaması.",
    },
    en: {
      title: "Pharmacy Management System",
      description: "Desktop application for pharmacy tracking and management.",
    },
  },
  {
    id: "nlp",
    tech: ["Python"],
    github: "#",
    demo: "#",
    tr: {
      title: "Doğal Dil İşleme (NLP) Modeli",
      description: "Metin analizi ve işleme projesi.",
    },
    en: {
      title: "Natural Language Processing (NLP) Model",
      description: "A text analysis and processing project.",
    },
  },
];

/* Kurum adları çevrilmez; sadece pozisyon ve tarih dile bağlı. */
export const experience = [
  {
    id: "uludag-bilisim",
    organization: "Uludağ Bilişim",
    tr: { role: "Yazılım Stajyeri", period: "22 Haziran 2026 - 21 Temmuz 2026" },
    en: { role: "Software Intern", period: "22 June 2026 - 21 July 2026" },
  },
  {
    id: "sanko",
    organization: "SANKO Tekstil İşletmeleri - İSKO Şubesi",
    tr: { role: "IT Stajyeri", period: "30 Haziran 2025 - 29 Temmuz 2025" },
    en: { role: "IT Intern", period: "30 June 2025 - 29 July 2025" },
  },
];

export const education = [
  {
    id: "selcuk",
    school: "Selçuk Üniversitesi",
    tr: { program: "Bilgisayar Mühendisliği" },
    en: { program: "Computer Engineering" },
  },
];

/* --- 2. Arayüz metinleri (i18n sözlüğü) -------------------
   Kullanımı: t = ui[lang]  →  t.hero.tagline
   Yeni bölüm yazdıkça buraya yeni anahtarlar ekleyeceğiz.
   İki dilin anahtarları BİREBİR aynı olmalı; biri eksik kalırsa
   o metin ekranda "undefined" görünür. */
export const ui = {
  tr: {
    hero: {
      title: "Bilgisayar Mühendisi",
      tagline:
        "Bursa'da yaşayan; ölçeklenebilir web mimarileri (SaaS), masaüstü uygulamaları ve veritabanı yönetimi odaklı çözümler üreten bilgisayar mühendisi.",
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "E-posta",
      avatarAlt: "Ali Özel'in profil fotoğrafı",
      avatarTooltip: "easter egg?",
    },
    game: {
      title: "easter egg?",
      
      score: "Skor",
      best: "Rekor",
      lives: "Can",
      restart: "Tekrar oyna",
      close: "Kapat",
      gameOver: "Oyun bitti",
      finalScore: "Skorun",
      newBest: "Yeni rekor!",
    },
    footer: {
      location: "Bursa, Türkiye",
      duck: "Yakalayabilirsen yakala",
    },
    projects: {
      github: "GitHub",
      demo: "Canlı Demo",
    },
    experience: {
      work: "Deneyim",
      education: "Eğitim",
    },
    sections: {
      skills: "Yetenekler",
      projects: "Projeler",
      experience: "Deneyim & Eğitim",
      contact: "İletişim",
    },
    languageSwitch: {
      // Ekran okuyucuların butonu doğru okuması için:
      label: "Dili değiştir",
    },
    themeToggle: {
      label: "Temayı değiştir",
    },
  },
  en: {
    hero: {
      title: "Computer Engineer",
      tagline:
        "Bursa-based computer engineer focused on scalable web architectures (SaaS), desktop applications, and database management solutions.",
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
      avatarAlt: "Profile photo of Ali Özel",
      avatarTooltip: "easter egg?",
    },
    game: {
      title: "easter egg?",
      
      score: "Score",
      best: "Best",
      lives: "Lives",
      restart: "Play again",
      close: "Close",
      gameOver: "Game over",
      finalScore: "Your score",
      newBest: "New best!",
    },
    footer: {
      location: "Bursa, Türkiye",
      duck: "Catch me if you can",
    },
    projects: {
      github: "GitHub",
      demo: "Live Demo",
    },
    experience: {
      work: "Experience",
      education: "Education",
    },
    sections: {
      skills: "Skills",
      projects: "Projects",
      experience: "Experience & Education",
      contact: "Contact",
    },
    languageSwitch: {
      label: "Change language",
    },
    themeToggle: {
      label: "Toggle theme",
    },
  },
};
