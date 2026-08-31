/* Avatar.jsx — Yuvarlak profil fotoğrafı + neon nabız + tooltip.
   Tıklanınca gizli oyunu açar (Hero'dan gelen onOpen ile). */

import { useState } from "react";
import { profile } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import "./Avatar.css";

function Avatar({ onOpen }) {
  const { t } = useLanguage();
  // Fotoğraf henüz eklenmediyse <img> hata verir; o durumda
  // kırık görsel yerine sade bir yedek işaret gösteriyoruz.
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      className="avatar"
      onClick={onOpen}
      /* Sağ tık menüsünü butonun tamamında kapatıyoruz: resim
         pointer-events:none olduğu için tıklama hedefi burasıdır. */
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      /* Tooltip görsel; ekran okuyucu için asıl açıklama burada */
      aria-label={t.hero.avatarTooltip}
    >
      <span className="avatar__ring" aria-hidden="true" />

      <span className="avatar__frame">
        {failed ? (
          <span className="avatar__fallback" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="40" height="40">
              <circle cx="24" cy="18" r="8" fill="currentColor" opacity="0.35" />
              <path d="M8 44c0-8.8 7.2-16 16-16s16 7.2 16 16" fill="currentColor" opacity="0.35" />
            </svg>
          </span>
        ) : (
          <img
            src={profile.photo}
            alt={t.hero.avatarAlt}
            className="avatar__img"
            onError={() => setFailed(true)}
            /* Fotoğrafın kolayca indirilmesini zorlaştırıyoruz:
               sürükle-bırak ve sağ tık menüsü kapalı. */
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
          />
        )}
      </span>

      {/* Hover/odak durumunda görünen ipucu balonu */}
      <span className="avatar__tooltip" aria-hidden="true">
        {t.hero.avatarTooltip}
      </span>
    </button>
  );
}

export default Avatar;
