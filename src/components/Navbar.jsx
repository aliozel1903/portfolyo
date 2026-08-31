/* Navbar.jsx — Sayfanın üstünde sabit duran menü.

   Linkler #id'lere gider; index.css'teki scroll-behavior: smooth
   sayesinde sayfa zıplamak yerine yumuşak kayar. */

import { useLanguage } from "../context/LanguageContext";
import LanguageSwitch from "./LanguageSwitch";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

function Navbar() {
  const { t } = useLanguage();

  // Menü linklerini dizi olarak tutuyoruz: aynı JSX'i dört kez
  // yazmak yerine map ile basıyoruz. Yeni bölüm eklenince
  // buraya tek satır yeterli.
  const links = [
    { href: "#skills", label: t.sections.skills },
    { href: "#projects", label: t.sections.projects },
    { href: "#experience", label: t.sections.experience },
    // İletişim: kaydırmadan, tek adımda en tepeye ışınlanır
    { href: "#contact", label: t.sections.contact, teleport: true },
  ];

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        {/* Logo: en üste dönüş */}
        <a href="#hero" className="navbar__logo" onClick={teleportTop}>
          <span className="navbar__eagle" aria-hidden="true">🦅</span>
          <span className="navbar__brand">aliozel.dev</span>
        </a>

        {/* <nav>: ekran okuyucuya "burası site navigasyonu" der */}
        <nav className="navbar__nav">
          <ul className="navbar__links">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="navbar__link"
                  onClick={link.teleport ? teleportTop : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitch />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

/* Yumuşak kaydırma yerine anında sıçrama ("ışınlanma").
   scroll-behavior: smooth global olduğu için behavior:"instant"
   ile bu tek hareketi bilinçli olarak devre dışı bırakıyoruz. */
function teleportTop(event) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "instant" });
  // Adres çubuğunda iz bırakmadan hedefi işaretle
  const actions = document.getElementById("contact");
  if (actions) {
    actions.classList.remove("is-teleported");
    // reflow: sınıfı hemen geri eklersek animasyon yeniden başlasın
    void actions.offsetWidth;
    actions.classList.add("is-teleported");
  }
}

export default Navbar;
