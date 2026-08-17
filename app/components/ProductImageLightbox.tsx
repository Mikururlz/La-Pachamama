"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ProductImageLightboxProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function ProductImageLightbox({ src, alt, className = "" }: ProductImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const currentPaddingRight = parseFloat(getComputedStyle(body).paddingRight) || 0;
    const trigger = triggerRef.current;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(focusFrame);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      trigger?.focus();
    };
  }, [close, open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="productImageTrigger"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Ampliar imagen de ${alt}`}
      >
        <img src={src} alt={alt} className={className} />
      </button>

      {open && createPortal(
        <div
          className="lightboxRoot"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button type="button" className="lightboxBackdrop" tabIndex={-1} onClick={close} aria-label="Cerrar imagen ampliada" />
          <h2 id={titleId} className="visuallyHidden">Imagen ampliada de {alt}</h2>
          <button ref={closeButtonRef} type="button" className="lightboxClose" onClick={close} aria-label="Cerrar imagen ampliada">
            <span aria-hidden="true">×</span>
          </button>
          <img src={src} alt={alt} className="lightboxImage" />
        </div>,
        document.body,
      )}
    </>
  );
}
