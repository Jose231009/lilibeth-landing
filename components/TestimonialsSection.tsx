'use client';
// ─────────────────────────────────────────────────────────
// TestimonialsSection — Stagger desde abajo al hacer scroll
// card-glass del skill, stagger 0.08s entre items
// ─────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';

const testimonials = [
  {
    text: 'Llevaba años en empleos que me consumían. Con Lilibeth entendí que había otro camino. En 4 meses reemplacé mi salario y hoy trabajo desde donde quiero.',
    name: 'Gloria M.',
    country: 'Colombia',
    tag: 'Reemplazó su salario en 4 meses',
    initials: 'GM',
  },
  {
    text: 'Lo que más valoro es el acompañamiento real. No estás sola en ningún momento. En 3 semanas ya tenía mis primeros resultados y una comunidad increíble.',
    name: 'Rosario C.',
    country: 'Venezuela',
    tag: 'Primeros resultados en 3 semanas',
    initials: 'RC',
  },
  {
    text: 'Soy enfermera y no tenía ni idea de negocios online. Lilibeth me guió paso a paso. Hoy tengo un ingreso extra que me permite viajar con mi familia.',
    name: 'Marta V.',
    country: 'España',
    tag: 'Ingreso extra · viaja con familia',
    initials: 'MV',
  },
];

const Stars = () => (
  <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C9A96E">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    if (titleRef.current) {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { titleRef.current!.classList.add('revealed'); obs.disconnect(); } },
        { threshold: 0.2 }
      );
      obs.observe(titleRef.current);
      observers.push(obs);
    }

    if (containerRef.current) {
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            containerRef.current!.querySelectorAll<HTMLElement>('.stagger-item')
              .forEach((el, i) => setTimeout(() => el.classList.add('revealed'), i * 100));
            obs.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      obs.observe(containerRef.current);
      observers.push(obs);
    }

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 130px) clamp(20px, 5vw, 80px)',
      background: '#110C09',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div
          ref={titleRef}
          className="reveal"
          style={{ textAlign: 'center', marginBottom: 'clamp(50px, 7vw, 70px)' }}
        >
          <p className="eyebrow" style={{ marginBottom: '20px' }}>Lo que dicen quienes ya están adentro</p>
          <h2 style={{
            fontFamily: 'var(--font-instrument)',
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            fontWeight: 400, lineHeight: 1.1,
          }}>
            Resultados <em style={{ color: '#C9A96E' }}>reales</em><br />
            de personas normales
          </h2>
        </div>

        <div
          ref={containerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {testimonials.map(({ text, name, country, tag, initials }) => (
            <div key={name} className="stagger-item reveal card-glass" style={{ padding: 'clamp(24px, 3vw, 36px)' }}>
              <Stars />
              <p style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.75,
                marginBottom: '24px',
                fontStyle: 'italic',
              }}>
                &ldquo;{text}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Avatar inicial */}
                <div style={{
                  width: '40px', height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(201,169,110,0.15)',
                  border: '1px solid rgba(201,169,110,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-instrument)',
                  fontStyle: 'italic',
                  fontSize: '14px',
                  color: '#C9A96E',
                  flexShrink: 0,
                }}>
                  {initials}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{name}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{country}</div>
                </div>
              </div>
              <div style={{
                marginTop: '16px',
                padding: '6px 12px',
                background: 'rgba(201,169,110,0.08)',
                border: '1px solid rgba(201,169,110,0.2)',
                borderRadius: '20px',
                display: 'inline-block',
                fontSize: '11px',
                color: '#C9A96E',
                letterSpacing: '0.04em',
              }}>
                {tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
