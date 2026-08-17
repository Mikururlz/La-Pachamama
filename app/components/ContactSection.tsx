import React from "react";
import config from "../config";

export default function ContactSection() {
  const contacts = [
    {
      number: config.WHATSAPP_NUMBER,
      display: config.WHATSAPP_DISPLAY,
    },
    {
      number: config.WHATSAPP_NUMBER_2,
      display: config.WHATSAPP_DISPLAY_2,
    },
  ];

  return (
    <section className="contactSection waPanel" id="contacto">
      <div className="container contactInner waInner">
        <h2>Hablemos</h2>

        <p className="waSubtitle">
          Consultas, pedidos y disponibilidad.
        </p>

        <div className="waContactsSimple">
          {contacts.map((contact) => (
            <a
              key={contact.number}
              className="waContactLink"
              href={`https://wa.me/${contact.number}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Contactar por WhatsApp al ${contact.display}`}
            >
              <svg
                className="waContactSvg"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                <path
                  d="M16.5 14.5c-.4-.2-1.2-.5-1.5-.6-.3-.1-.5-.1-.7.1s-.7.6-.9.8c-.2.2-.4.2-.7.1-.3-.1-1.1-.3-2-.9-.7-.6-1.1-1.3-1.2-1.5-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.3.1-.1.2-.2.3-.4.1-.2 0-.3 0-.4-.1-.1-.5-1.1-.7-1.5-.2-.4-.4-.3-.6-.3-.2 0-.4 0-.6 0s-.3.04-.5.2c-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.4.1.2 1.5 2.3 3.6 3.2 2 .9 2 .6 2.3.6.3-.05.9-.35 1-.7.1-.35.1-.65.08-.7-.02-.05-.08-.07-.18-.13z"
                  fill="currentColor"
                />
              </svg>

              <span>{contact.display}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}