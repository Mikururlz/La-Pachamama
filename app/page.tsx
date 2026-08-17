import Link from "next/link";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import HowToOrder from "./components/HowToOrder";
import ContactSection from "./components/ContactSection";
import config from "./config";

export default function Home() {
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

export function Logo() {
  return (
    <Link
      className="logo"
      href="/"
      prefetch={false}
    >
      <img
        src="/images/logo-la-pachamama.jpeg"
        alt="Logo de La Pachamama"
        className="logoImage"
      />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="siteFooter darkFooter">
      <div className="footerInner container">

        <div className="footerBrand">
          <div className="logoPanel small">
            <Logo />
          </div>
        </div>

        <div className="footerSocial">

          {/* INSTAGRAM */}
          <a
            href={config.INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="socialLink"
            aria-label="Instagram - abre en nueva pestaña"
          >
            <svg
              className="socialIcon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"
                stroke="#fff"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="#fff"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="socialText">
              Instagram
            </span>
          </a>

          {/* WHATSAPP */}
        

        </div>
      </div>

      <div className="footerDivider" />

      <div className="footerCopy">
        © 2026 La Pachamama. Todos los derechos reservados.
      </div>
    </footer>
  );
}