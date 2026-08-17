"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuId = "mobile-menu";
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    if (open) {
      document.addEventListener("keydown", onKey);
    }

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!open) return;

      const target = e.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("click", onDoc);

    return () => {
      document.removeEventListener("click", onDoc);
    };
  }, [open]);

  function handleToggle() {
    setOpen((prev) => !prev);
  }

  function handleLinkClick() {
    setOpen(false);

    // Devuelve el foco al botón del menú por accesibilidad
    buttonRef.current?.focus();
  }

  return (
    <header className="siteHeader">
      <div className="headerInner">
        <nav className="mainNav" aria-label="Menú principal">
          <ul>
            <li>
              <Link href="/" prefetch={false}>
                Inicio
              </Link>
            </li>

            <li>
              <Link href="/productos" prefetch={false}>
                Productos
              </Link>
            </li>

            <li>
              <a href="#contacto">Contacto</a>
            </li>
          </ul>
        </nav>

        <div className="ctaArea">
          {/* header contains only navigation; CTA kept in hero */}
        </div>

        <button
          ref={buttonRef}
          className="mobileToggle"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={handleToggle}
        >
          <span aria-hidden>☰</span>
        </button>
      </div>

      <div
        id={menuId}
        ref={menuRef}
        className={`mobileMenu ${open ? "open" : ""}`}
        role="dialog"
        aria-modal={false}
        aria-hidden={!open}
      >
        <ul>
          <li>
            <Link
              href="/"
              prefetch={false}
              onClick={handleLinkClick}
            >
              Inicio
            </Link>
          </li>

          <li>
            <Link
              href="/productos"
              prefetch={false}
              onClick={handleLinkClick}
            >
              Productos
            </Link>
          </li>

          <li>
            <a href="#contacto" onClick={handleLinkClick}>
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}