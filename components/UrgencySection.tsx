'use client';
// ─────────────────────────────────────────────────────────
// UrgencySection — "Lo que te cuesta seguir como estás"
// • section-atmosphere (noise + gradient del skill)
// • Reveal + CTA con ripple
// ─────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';

export function UrgencySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 130px) clamp(20px, 5vw, 80px)',
      background: '#0a0a0a',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Atmosfera — del skill */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.06) 0%, transparent 60%),
          radial-gradient(ellipse at 70% 20%, rgba(10,10,10,0.8) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
      }} />
      {/* Línea dorada decorativa */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '1px', height: '80px',
        background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.4), transparent)',
      }} />

      <div ref={ref} className="reveal" style={{
        maxWidth: '700px', margin: '0 auto',
        textAlign: 'center', position: 'relative',
      }}>
        <p className="eyebrow" style={{ marginBottom: '28px' }}>Lo que te cuesta</p>
        <h2 style={{
          fontFamily: 'var(--font-instrument)',
          fontSize: 'clamp(36px, 5vw, 60px)',
          fontWeight: 400, lineHeight: 1.1,
          marginBottom: '28px',
        }}>
          Lo que te cuesta<br />
          <em style={{ color: '#C9A96E' }}>seguir como estás</em>
        </h2>

        <p style={{
          fontSize: 'clamp(15px, 1.8vw, 17px)',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.8, marginBottom: '16px',
        }}>
          Cada mes que pasa sin construir una fuente de ingresos recurrentes
          es un mes que no vuelve.
        </p>
        <p style={{
          fontSize: 'clamp(15px, 1.8vw, 17px)',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.8, marginBottom: '16px',
        }}>
          No es solo dinero que dejas de ganar. Es tiempo. Es tranquilidad.
          Es la posibilidad de estar más presente con las personas que quieres.
        </p>
        <p style={{
          fontSize: 'clamp(15px, 1.8vw, 17px)',
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.8, fontWeight: 500,
          marginBottom: '40px',
        }}>
          No se trata de que lo que haces hoy esté mal.
          Se trata de que mereces tener <em style={{ color: '#C9A96E' }}>opciones</em>.
        </p>

        <button
          className="btn-primary"
          onMouseMove={e => {
            const btn = e.currentTarget;
            const r   = btn.getBoundingClientRect();
            btn.style.setProperty('--x', `${e.clientX - r.left}px`);
            btn.style.setProperty('--y', `${e.clientY - r.top}px`);
          }}
          onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ padding: '18px 48px', fontSize: '15px' }}
        >
          Quiero dar el primer paso
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
