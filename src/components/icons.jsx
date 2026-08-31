/* icons.jsx — Küçük SVG ikonlar.

   Dışarıdan ikon kütüphanesi kurmadık: 4 ikon için bir paket
   yüklemek gereksiz ağırlık. SVG'ler currentColor kullanıyor,
   yani bulundukları yerin yazı rengini alıyorlar — renk yönetimi
   tek yerden (CSS'ten) yapılıyor.

   aria-hidden: ikonlar dekoratif; anlamı saran linkin
   aria-label'ı taşıyor, ekran okuyucu ikonu tekrar okumasın. */

const base = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export function ClockIcon() {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  );
}

export function SunIcon() {
  return (
    <svg {...base} width={16} height={16}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg {...base} width={16} height={16}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

