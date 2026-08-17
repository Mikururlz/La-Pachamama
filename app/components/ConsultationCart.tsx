"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { WHATSAPP_NUMBER } from "../config";
import useFloatingBlockers from "./useFloatingBlockers";

export type ConsultationProduct = {
  name: string;
  image: string;
};

type ConsultationCartProps = {
  products: ConsultationProduct[];
  onRemove: (name: string) => void;
  onClear: () => void;
};

export default function ConsultationCart({ products, onRemove, onClear }: ConsultationCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const drawerId = useId();
  const count = products.length;
  const blocked = useFloatingBlockers(".siteFooter");

  const message = `Hola, quiero consultar por estos productos de La Pachamama:\n\n${products.map(({ name }) => `• ${name}`).join("\n")}\n\n¿Están disponibles?`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const trigger = triggerRef.current;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      const currentPadding = Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }

    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href]:not([aria-disabled="true"]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      trigger?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && panelRef.current && !panelRef.current.contains(document.activeElement)) {
      closeRef.current?.focus();
    }
  }, [count, isOpen]);

  const drawer = isOpen ? createPortal(
    <div id={drawerId} className="consultationDrawerRoot" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button
        type="button"
        className="consultationDrawerBackdrop"
        tabIndex={-1}
        aria-label="Cerrar Mi consulta"
        onClick={() => setIsOpen(false)}
      />
      <aside ref={panelRef} className="consultationDrawerPanel">
        <header className="consultationDrawerHeader">
          <h2 id={titleId}>Mi consulta</h2>
          <button
            ref={closeRef}
            type="button"
            className="consultationDrawerClose"
            aria-label="Cerrar Mi consulta"
            onClick={() => setIsOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="consultationDrawerBody">
          {count === 0 ? (
            <p className="consultationEmpty">Todavía no agregaste productos a tu consulta.</p>
          ) : (
            <ul className="consultationProductList">
              {products.map(({ name, image }) => (
                <li className="consultationProduct" key={name}>
                  {/* Native images preserve the catalog's existing local asset paths. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="" className="consultationProductImage" />
                  <span className="consultationProductName">{name}</span>
                  <button
                    type="button"
                    className="consultationRemove"
                    aria-label={`Quitar ${name} de la consulta`}
                    onClick={() => onRemove(name)}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {count > 0 && (
          <footer className="consultationDrawerActions">
            <button type="button" className="consultationClear" onClick={onClear}>Vaciar consulta</button>
            <a
              className="consultationWhatsApp"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
            >
              Consultar por WhatsApp
            </a>
          </footer>
        )}
      </aside>
    </div>,
    document.body,
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`consultationCartButton${blocked ? " floatingActionHidden" : ""}`}
        aria-label="Ver productos seleccionados"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={drawerId}
        aria-hidden={blocked}
        tabIndex={blocked ? -1 : undefined}
        onClick={() => setIsOpen(true)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 4h2.2l1.65 9.05a2 2 0 0 0 1.97 1.64h8.68a2 2 0 0 0 1.94-1.5L21 7H6.1" />
          <circle cx="9.25" cy="19" r="1.25" />
          <circle cx="17.75" cy="19" r="1.25" />
        </svg>
        {count > 0 && <span className="consultationCartBadge" aria-hidden="true">{count}</span>}
      </button>
      <span className="visuallyHidden" aria-live="polite">
        {count === 1 ? "1 producto seleccionado" : `${count} productos seleccionados`}
      </span>
      {drawer}
    </>
  );
}
