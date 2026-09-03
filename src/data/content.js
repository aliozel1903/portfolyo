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
  // Ekranda düz metin olarak GÖSTERİLMEZ; yalnızca Hero'daki
  // ikonun mailto: hedefini üretmek için kullanılır.
  email: "hello@aliozel.dev",
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

/* Kurum adları da dile bağlı: İngilizce görünümde şirket ve okul
   adlarının Türkçe kalması yarım çeviri hissi veriyordu. */
export const experience = [
  {
    id: "uludag-bilisim",
    tr: {
      role: "Yazılım Stajyeri",
      org: "Uludağ Bilişim",
      period: "22 Haziran 2026 - 21 Temmuz 2026",
    },
    en: {
      role: "Software Intern",
      org: "Uludağ Bilişim",
      period: "22 June 2026 - 21 July 2026",
    },
  },
  {
    id: "sanko",
    tr: {
      role: "IT Stajyeri",
      org: "SANKO Tekstil İşletmeleri - İSKO Şubesi",
      period: "30 Haziran 2025 - 29 Temmuz 2025",
    },
    en: {
      role: "IT Intern",
      org: "SANKO Textile Enterprises - İSKO Branch",
      period: "30 June 2025 - 29 July 2025",
    },
  },
];

export const education = [
  {
    id: "selcuk",
    tr: { program: "Bilgisayar Mühendisliği", org: "Selçuk Üniversitesi" },
    en: { program: "Computer Engineering", org: "Selçuk University" },
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
      title: "Yazılım Geliştirici",
      tagline:
        "Ölçeklenebilir web mimarileri (SaaS), masaüstü uygulamaları ve veritabanı yönetimi odaklı çözümler üreten yazılım geliştirici.",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    projects: {
      github: "GitHub",
      demo: "Canlı Demo",
    },
    terminal: {
      title: "aliozel — -zsh — 80×24",
      intro: "Last login: on ttys000",
      command: "cat skills.txt",
    },
    experience: {
      work: "Deneyim",
      education: "Eğitim",
      scrollHint: "keşfetmek için kaydır",
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
      title: "Software Developer",
      tagline:
        "Software developer focused on scalable web architectures (SaaS), desktop applications, and database management solutions.",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    projects: {
      github: "GitHub",
      demo: "Live Demo",
    },
    terminal: {
      title: "aliozel — -zsh — 80×24",
      intro: "Last login: on ttys000",
      command: "cat skills.txt",
    },
    experience: {
      work: "Experience",
      education: "Education",
      scrollHint: "scroll to explore",
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
