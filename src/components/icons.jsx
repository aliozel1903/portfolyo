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

export function GithubIcon({ size = 14 }) {
  return (
    <svg {...base} width={size} height={size} fill="currentColor" stroke="none">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.69-.22.69-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.8-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 14 }) {
  return (
    <svg {...base} width={size} height={size} fill="currentColor" stroke="none">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.76-1.95C21.6 8.69 22 11.1 22 14.24V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4V9z" />
    </svg>
  );
}

export function MailIcon({ size = 14 }) {
  return (
    <svg {...base} width={size} height={size}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
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

/* Breaking Bad karavanı (Fleetwood Bounder) — yolda duran dekor.
   Hareketsiz; tek işi haritaya bir hikâye katmak. */
export function RvIcon() {
  return (
    <svg width="76" height="44" viewBox="0 0 76 44" aria-hidden="true">
      {/* gövde */}
      <rect x="4" y="10" width="60" height="22" rx="3" fill="#e8e2d4" />
      {/* kabin (öne doğru alçalan burun) */}
      <path d="M64 16h6l2 6v10h-8z" fill="#dcd5c4" />
      {/* çizgiler — orijinal karavanın kahverengi bantları */}
      <rect x="4" y="24" width="60" height="3" fill="#8a6a3f" />
      <rect x="4" y="28" width="60" height="1.5" fill="#b08d55" />
      {/* pencereler */}
      <rect x="9" y="14" width="14" height="7" rx="1" fill="#9fb4c7" />
      <rect x="27" y="14" width="10" height="7" rx="1" fill="#9fb4c7" />
      <rect x="66" y="17" width="6" height="6" rx="1" fill="#9fb4c7" />
      {/* kapı */}
      <rect x="43" y="13" width="9" height="19" rx="1" fill="#d3ccbb" />
      {/* tekerlekler */}
      <circle cx="19" cy="34" r="6" fill="#1f2937" />
      <circle cx="19" cy="34" r="2.4" fill="#9ca3af" />
      <circle cx="60" cy="34" r="6" fill="#1f2937" />
      <circle cx="60" cy="34" r="2.4" fill="#9ca3af" />
    </svg>
  );
}

/* Soru işaretli bayrak — yolun sonundaki bilinmeyen durak. */
export function FlagIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      {/* direk */}
      <path d="M6 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* bayrak */}
      <path d="M6 4h12l-2.5 4L18 12H6z" fill="currentColor" />
      {/* soru işareti */}
      <text
        x="11"
        y="10.4"
        textAnchor="middle"
        fontSize="7"
        fontWeight="700"
        fill="#0f172a"
        fontFamily="ui-monospace, Menlo, monospace"
      >
        ?
      </text>
    </svg>
  );
}
