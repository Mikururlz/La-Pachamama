"use client";

import { useEffect, useState } from "react";
import useFloatingBlockers from "./useFloatingBlockers";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const blocked = useFloatingBlockers(".contactSection, .instagramSection, .siteFooter");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY >= 500);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!visible || blocked) return null;

  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <button type="button" className="backToTop" aria-label="Volver arriba" onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="m6.5 14.5 5.5-5 5.5 5" />
      </svg>
    </button>
  );
}
