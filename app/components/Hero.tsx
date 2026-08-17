import Link from "next/link";
import React from "react";

export default function Hero(){
  const style = {
    backgroundImage: `url('/images/hero-quilmes.webp')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  } as React.CSSProperties;

  return (
    <section className="heroPanel" style={style}>
      <div className="heroOverlay dark" />
      <div className="heroInner">
        <div className="headerBrand heroBrand">
          <Link href="/" className="headerBrandLink" aria-label="Ir al inicio">
            <div className="headerBrandMark" aria-hidden>
              <img src="/images/logo-la-pachamama.jpeg" alt="" className="headerBrandImg"/>
            </div>
            <div className="headerBrandText">
              <span className="headerBrandOverline">LA</span>
              <span className="headerBrandTitle">PACHAMAMA</span>
              <span className="headerBrandSubtitle">PRODUCTOS REGIONALES</span>
            </div>
          </Link>
        </div>
        <h1 className="heroTitle">Sabores con raíz</h1>
        <p className="heroSub">Productos regionales seleccionados para vos</p>
        <Link href="/productos" className="heroCta">Ver catálogo</Link>
      </div>
    </section>
  );
}
