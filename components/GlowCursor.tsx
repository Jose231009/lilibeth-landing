'use client';
// ─────────────────────────────────────────────────────────
// GlowCursor — del skill AtraeLab
// Glow dorado champagne que sigue el cursor
// Solo transform — nunca top/left
// Limpia el listener en unmount
// ─────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';

export function GlowCursor() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    // Ocultar en touch devices
    if ('ontouchstart' in window) {
      el.style.display = 'none';
      return;
    }

    const move = (e: MouseEvent) => {
      // Solo transform — del skill (nunca top/left)
      el.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    };

    window.addEventListener('mousemove', move, { passive: true });
    // Limpiar en unmount — obligatorio del skill
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <div ref={glowRef} className="glow-cursor" aria-hidden="true" />;
}
