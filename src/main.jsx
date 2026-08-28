import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Dil bilgisini tüm siteye yaymak için App'i sarmalıyoruz.
import { LanguageProvider } from './context/LanguageContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
