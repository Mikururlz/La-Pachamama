import React from "react";

import config from "../config";

export default function ContactSection(){
  const wa = config.WHATSAPP_NUMBER;
  const waDisplay = config.WHATSAPP_DISPLAY;
  return (
    <section className="contactSection waPanel" id="contacto">
      <div className="container contactInner waInner">
        <h2>Hablemos</h2>
        <p className="waSubtitle">Consultas, pedidos y disponibilidad.</p>
        <div className="waNumberLarge">{waDisplay}</div>
        <a className="waLarge waPrimary" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 .01 5.36 0 12c.01 2.12.55 4.19 1.6 6.02L0 24l6.3-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.36 12-12 0-3.2-1.25-6.19-3.48-8.52z" fill="#4b5b2a"/>
            <path d="M17.1 14.9c-.3-.15-1.77-.87-2.04-.97-.27-.11-.47-.15-.67.15s-.77.97-.95 1.17c-.18.2-.36.23-.67.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.67-2.09-.18-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2 0-.4-.05-.55-.05-.15-.67-1.62-.92-2.2-.24-.58-.48-.5-.66-.51-.17-.01-.37-.01-.57-.01s-.5.07-.77.35c-.27.28-1.03 1.01-1.03 2.46 0 1.45 1.06 2.85 1.2 3.05.13.2 2.07 3.3 5.02 4.62 2.95 1.32 2.95.88 3.48.82.53-.07 1.7-.69 1.94-1.36.24-.66.24-1.22.17-1.34-.07-.12-.27-.18-.57-.33z" fill="#fff"/>
          </svg>
          Contactar por WhatsApp
        </a>
      </div>
    </section>
  );
}
