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

export function GithubIcon() {
  return (
    <svg {...base} fill="currentColor" stroke="none">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.69-.22.69-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.8-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

export function LinkedinIcon() {
  return (
    <svg {...base} fill="currentColor" stroke="none">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.76-1.95C21.6 8.69 22 11.1 22 14.24V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4V9z" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg {...base}>
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

/* --- Marka işareti ---
   Keskin açılardan kurulu bir "A": iki eğik kiriş, ortada kesik
   bir kemer ve tepede kırpılmış bir köşe. Yuvarlak hat yok;
   tüm kimlik düz çizgi ve açıdan geliyor. */
export function LogoMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="logo-mark"
    >
      {/* dış çerçeve: köşesi kırpılmış altıgen */}
      <path
        d="M16 1.5 30 9v14l-14 7.5L2 23V9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.35"
      />
      {/* A'nın sol ve sağ kirişi */}
      <path
        d="M16 7 8.5 24.5M16 7l7.5 17.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
      {/* ortadaki kemer — ortası boş bırakıldı, keskin duruyor */}
      <path
        d="M11.6 18.5h3.1M17.3 18.5h3.1"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

/* Zarf — kapağı ayrı bir <path>, çünkü hover'da onu döndürüyoruz. */
export function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 32 24" className="envelope" aria-hidden="true">
      {/* içinden çıkan kağıt (CSS ile yukarı kayar) */}
      <rect className="envelope__paper" x="7" y="4" width="18" height="14" rx="1" />
      <line className="envelope__line envelope__line--1" x1="10" y1="8" x2="22" y2="8" />
      <line className="envelope__line envelope__line--2" x1="10" y1="11.5" x2="19" y2="11.5" />
      {/* gövde */}
      <path className="envelope__body" d="M2 6h28v16H2z" />
      {/* kapak (hover'da üstten açılır) */}
      <path className="envelope__flap" d="M2 6h28L16 16z" />
    </svg>
  );
}

/* Ördek — footer'ın sol köşesinde kaçan minik figür. */
export function DuckIcon() {
  return (
    <svg {...base} width={16} height={16} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M14 4a3.2 3.2 0 0 1 3.2 3.2c0 .4-.07.78-.2 1.13l2.4.67-2.1 1.5c-.5 3.6-3.6 6.5-7.3 6.5H4c0-2.3 1.3-4.3 3.2-5.3-.6-.7-1-1.6-1-2.6C6.2 6.7 8.5 4.4 11.3 4.4c.5 0 1 .07 1.4.2.4-.4.8-.6 1.3-.6zm.9 2.2a.7.7 0 1 0 0 1.4.7.7 0 0 0 0-1.4z" />
      <path d="M4 17h6.5c.6 0 1.2.3 1.5.8l.7 1.2H6.8A2.8 2.8 0 0 1 4 17z" opacity="0.6" />
    </svg>
  );
}
