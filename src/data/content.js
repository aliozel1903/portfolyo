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
    id: "lab-portal",
    tech: ["Laravel 12", "PostgreSQL", "Vercel"],
    github: "https://github.com/aliozel1903/lab-portal",
    demo: "https://lab-portal-tau.vercel.app",
    tr: {
      title: "Lab Portal",
      description:
        "Laboratuvar tahlil sonuçlarının kaydedildiği ve hastaların kendi sonuçlarını sorgulayabildiği web uygulaması.",
    },
    en: {
      title: "Lab Portal",
      description:
        "Web application where laboratory test results are recorded and patients can look up their own results.",
    },
  },
  {
    id: "sohats",
    tech: ["C#", ".NET", "SQLite"],
    github: "https://github.com/aliozel1903/hasta-takip-csharp",
    demo: "#",
    tr: {
      title: "Sağlık Ocağı Hasta Takip Sistemi",
      description:
        "Rol bazlı yetkilendirme, hasta kabul ve poliklinik yönetimi içeren; OOP prensipleriyle MDI form yapısında geliştirilmiş masaüstü otomasyon.",
    },
    en: {
      title: "Health Center Patient Tracking System",
      description:
        "Desktop automation with role-based access, patient admission and clinic management, built on OOP principles with an MDI form architecture.",
    },
  },
  {
    id: "stok-yonetim",
    tech: ["Python", "Flask", "SQLite", "REST API"],
    github: "https://github.com/aliozel1903/stok-yonetim-flask",
    demo: "#",
    tr: {
      title: "Stok Yönetim Sistemi",
      description:
        "Stok giriş-çıkış takibi, hareket geçmişi, çöp kutusu ve raporlama sunan web tabanlı envanter yönetim uygulaması.",
    },
    en: {
      title: "Inventory Management System",
      description:
        "Web-based inventory application with stock in/out tracking, movement history, soft delete and reporting.",
    },
  },
  {
    id: "smartmenu",
    tech: ["C#", ".NET Core MVC", "Entity Framework Core", "PostgreSQL"],
    // Henüz yayımlanmadı: linkler hazır olunca buraya yazılacak,
    // butonlar kendiliğinden görünecek.
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
    id: "nlp",
    tech: ["Python", "BERT", "Word2Vec", "TF-IDF"],
    github: "https://github.com/aliozel1903/Turkish-News-Classification-NLP",
    demo: "#",
    tr: {
      title: "Türkçe Haber Sınıflandırma (NLP)",
      description:
        "Türkçe haber metinlerini ekonomi, spor ve teknoloji kategorilerine ayıran; BERT, Word2Vec ve TF-IDF modellerini karşılaştıran proje.",
    },
    en: {
      title: "Turkish News Classification (NLP)",
      description:
        "Classifies Turkish news into economy, sports and technology categories, comparing BERT, Word2Vec and TF-IDF models.",
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
      title: "Bilgisayar Mühendisi",
      tagline:
        "Laravel ve .NET ile web uygulamaları ve multi-tenant SaaS mimarileri, C# ile masaüstü otomasyonlar, Python ile doğal dil işleme projeleri geliştiriyorum. Sağlık, envanter ve restoran yönetimi gibi gerçek iş süreçlerine yönelik çözümleri veritabanı tasarımından yayına kadar uçtan uca hayata geçiriyorum.",
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
      title: "Computer Engineer",
      tagline:
        "I build web applications and multi-tenant SaaS architectures with Laravel and .NET, desktop automation in C#, and natural language processing projects in Python. I deliver solutions for real-world workflows such as healthcare, inventory and restaurant management end to end, from database design to deployment.",
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
