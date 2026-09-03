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
    { href: "#contact", label: t.sections.contact },
  ];

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        {/* Logo: en üste dönüş */}
        <a href="#hero" className="navbar__logo">
          {/* Metin logo: terminal istemi + alan adı */}
          <span className="navbar__logo-mark">&gt;_&lt;</span>
          <span className="navbar__logo-name">aliozel.dev</span>
        </a>

        {/* <nav>: ekran okuyucuya "burası site navigasyonu" der */}
        <nav className="navbar__nav">
          <ul className="navbar__links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="navbar__link">
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

export default Navbar;
