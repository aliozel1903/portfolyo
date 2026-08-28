/* SmartLink.jsx — Linki hazır olmayan bağlantıları pasifleştiren
   ortak bileşen.

   Aynı mantığı Hero, ProjectCard ve Footer'da üç kez yazmak yerine
   tek yerde topladık. Kural değişirse (örneğin boş linkleri gizlemek
   isterseniz) tek dosyaya dokunmak yetecek.

   Neden <a> yerine <span>? Bir <a>'yı CSS ile soluklaştırmak
   yetmez: tıklanabilir kalır, Tab ile odaklanılabilir ve ekran
   okuyucu onu hâlâ "link" diye duyurur. <span> doğası gereği
   tıklanamaz — engellemek için ek bir hileye gerek kalmaz. */

function SmartLink({ href, className = "", children, ...rest }) {
  const isReady = href && href !== "#";

  if (!isReady) {
    return (
      <span className={`${className} is-disabled`} aria-disabled="true" {...rest}>
        {children}
      </span>
    );
  }

  // mailto: bağlantısı yeni sekmede açılmaz; posta uygulamasını açar.
  // Bu yüzden target/rel'i sadece http(s) linklerine veriyoruz.
  const isExternal = href.startsWith("http");

  return (
    <a
      className={className}
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

export default SmartLink;
