import Link from "next/link";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import HowToOrder from "./components/HowToOrder";
import ContactSection from "./components/ContactSection";
import config from "./config";

export default function Home(){
  return (
  <main>
    <Header />
    <Hero />
    <Categories />
    <FeaturedProducts />

    <section className="orderContactSection">
      <div className="orderContactInner">
        <HowToOrder />
        <ContactSection />
      </div>
    </section>

    <Footer />
  </main>
);
}


export function Logo(){
  return (
    <Link className="logo" href="/">
      <img src="/images/logo-la-pachamama.jpeg" alt="Logo de La Pachamama" className="logoImage" />
    </Link>
  );
}
export function Footer(){
  return (
    <footer className="siteFooter darkFooter">
      <div className="footerInner container">
        <div className="footerBrand">
          <div className="logoPanel small"><Logo/></div>
        </div>
        <div className="footerSocial">
          <a href={config.INSTAGRAM} target="_blank" rel="noreferrer" className="socialLink" aria-label="Instagram - abre en nueva pestaña">
            <svg className="socialIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="socialText">Instagram</span>
          </a>
          <a href={`https://wa.me/${config.WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="socialLink" aria-label={`WhatsApp ${config.WHATSAPP_DISPLAY}`}>
            <svg className="socialIcon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="1.2" fill="none"/>
              <path d="M16.5 14.5c-.4-.2-1.2-.5-1.5-.6-.3-.1-.5-.1-.7.1s-.7.6-.9.8c-.2.2-.4.2-.7.1-.3-.1-1.1-.3-2-.9-.7-.6-1.1-1.3-1.2-1.5-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.3.1-.1.2-.2.3-.4.1-.2 0-.3 0-.4-.1-.1-.5-1.1-.7-1.5-.2-.4-.4-.3-.6-.3-.2 0-.4 0-.6 0s-.3.04-.5.2c-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.4.1.2 1.5 2.3 3.6 3.2 2 .9 2 .6 2.3.6.3-.05.9-.35 1-.7.1-.35.1-.65.08-.7-.02-.05-.08-.07-.18-.13z" stroke="#fff" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="socialText">WhatsApp</span>
          </a>
        </div>
      </div>
      <div className="footerDivider" />
      <div className="footerCopy">© 2026 La Pachamama. Todos los derechos reservados.</div>
    </footer>
  );
}
