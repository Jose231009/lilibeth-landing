'use client';
// ─────────────────────────────────────────────────────────
// AnimatedCounter — del skill AtraeLab
// easeOutCubic, rAF, IntersectionObserver
// Duración 1200ms (del skill: contadores 1000-1500ms)
// Limpia el observer y rAF en unmount
// ─────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';

interface Props {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function AnimatedCounter({
  target,
  duration = 1200,
  prefix = '',
  suffix = '',
  decimals = 0,
}: Props) {
  const [count, setCount]   = useState(0);
  const ref                 = useRef<HTMLSpanElement>(null);
  const hasRun              = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver — nunca raw scroll event (del skill)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          observer.unobserve(el);
          startCount();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    // Limpiar en unmount — obligatorio del skill
    return () => observer.disconnect();
  }, [target, duration]);

  function startCount() {
    const start = performance.now();
    // easeOutCubic — del skill (nunca linear para contadores)
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      setCount(parseFloat((ease(elapsed) * target).toFixed(decimals)));
      if (elapsed < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    // Cleanup del rAF si el componente se desmonta
    return () => cancelAnimationFrame(rafId);
  }

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString('es-ES')}
      {suffix}
    </span>
  );
}
