// App.jsx — Sitenin ana iskeleti.
// Görevi tek: sayfadaki bölümlerin SIRASINI belirlemek.
// İçerik ve tasarım detayları buraya değil, her bölümün kendi dosyasına yazılacak.

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      {/* Üstte sabit duran menü + TR | EN düğmesi */}
      <Navbar />

      <main>
        <Hero />        {/* 1. Karşılama */}
        <Skills />      {/* 2. Yetenekler */}
        <Projects />    {/* 3. Projeler */}
        <Experience />  {/* 4. Deneyim & Eğitim */}
        <Contact />     {/* 5. İletişim */}
      </main>

      {/* Durum çubuğu görünümlü alt bilgi */}
      <Footer />
    </div>
  );
}

// export default: bu dosyanın dışarıya açtığı tek şey App fonksiyonu.
// main.jsx bunu "import App from './App.jsx'" ile alıp ekrana basıyor.
export default App;
