'use client';
// ─────────────────────────────────────────────────────────
// GlobalRevealObserver
// • Observa TODOS los .reveal y .stagger-item del DOM
// • rootMargin 200px → revela ANTES de entrar al viewport
// • Elimina espacios en blanco entre secciones
// • Idempotente: classList.add('revealed') no falla si ya existe
// ─────────────────────────────────────────────────────────
import { useEffect } from 'react';

export function GlobalRevealObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        // Extiende el viewport 200px hacia abajo → elementos se revelan
        // antes de que el usuario llegue a ellos → cero espacio en blanco
        rootMargin: '0px 0px 200px 0px',
      }
    );

    const observe = () => {
      document
        .querySelectorAll<HTMLElement>('.reveal:not(.revealed), .stagger-item:not(.revealed)')
        .forEach(el => obs.observe(el));
    };

    // Primera pasada — DOM ya renderizado
    observe();

    // Segunda pasada a 400ms — captura elementos de render asíncrono
    // (Framer Motion, dynamic imports, etc.)
    const t = setTimeout(observe, 400);

    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);

  return null;
}
