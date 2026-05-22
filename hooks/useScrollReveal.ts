'use client';
// ─────────────────────────────────────────────────────────
// useScrollReveal — del skill AtraeLab
// Usa IntersectionObserver, NUNCA raw scroll event
// Limpia el observer en unmount
// ─────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';

interface Options extends IntersectionObserverInit {
  once?: boolean;
}

export function useScrollReveal(options: Options = {}) {
  const { once = true, threshold = 0.15, ...rest } = options;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          if (once) observer.unobserve(el); // fire once
        } else if (!once) {
          el.classList.remove('revealed');
        }
      },
      { threshold, ...rest }
    );

    observer.observe(el);
    // Limpiar observer en unmount — obligatorio del skill
    return () => observer.disconnect();
  }, [once, threshold, rest]);

  return ref;
}

// Versión para múltiples elementos con stagger
export function useStaggerReveal(count: number, options: Options = {}) {
  const { once = true, threshold = 0.1, ...rest } = options;
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = container.querySelectorAll<HTMLElement>('.stagger-item');
          children.forEach((child, i) => {
            // Delay escalonado: 0.08s entre elementos (del skill)
            setTimeout(() => child.classList.add('revealed'), i * 80);
          });
          if (once) observer.unobserve(container);
        }
      },
      { threshold, ...rest }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [count, once, threshold, rest]);

  return containerRef;
}
