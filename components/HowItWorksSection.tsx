'use client';
// ─────────────────────────────────────────────────────────
// HowItWorksSection — "Cómo empiezas hoy"
// • 3 pasos con stagger reveal desde abajo
// • IntersectionObserver — del skill
// ─────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';

const steps = [
  {
    num: '01',
    title: 'Reservás tu llamada',
    text: 'Completás el formulario con tu nombre y WhatsApp. Te contacto en menos de 24 horas para coordinar una llamada de 20 minutos.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Vemos si encaja',
    text: 'Te muestro el modelo completo, los números reales y cómo se ve aplicado a tu situación. Sin presión, sin venta forzada.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M15 10l-4 4L9 12M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Empezás a construir',
    text: 'Si te suma, te acompaño paso a paso desde el primer día. Comunidad activa, entrenamientos, y tu primer resultado en semanas.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
  },
];

export function HowItWorksSection() {
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
              .forEach((el, i) => setTimeout(() => el.classList.add('revealed'), i * 110));
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
    <section
      id="s-how"
      style={{
        padding: 'clamp(80px, 10vw, 130px) clamp(20px, 5vw, 80px)',
        background: '#0D0907',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '400px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(50px, 7vw, 80px)' }}>
          <p className="eyebrow" style={{ marginBottom: '20px' }}>Tres pasos · sin vueltas</p>
          <h2 style={{
            fontFamily: 'var(--font-instrument)',
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            fontWeight: 400, lineHeight: 1.1,
          }}>
            Cómo <em style={{ color: '#C9A96E' }}>empiezas hoy</em>
          </h2>
        </div>

        <div
          ref={containerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2px',
          }}
        >
          {steps.map(({ num, title, text, icon }, i) => (
            <div key={num} className="stagger-item reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div style={{
                padding: 'clamp(28px, 3vw, 40px)',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px',
                height: '100%',
                position: 'relative',
                transition: 'border-color 300ms var(--ease-out), background 300ms var(--ease-out)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(201,169,110,0.25)';
                el.style.background  = 'rgba(201,169,110,0.03)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(255,255,255,0.05)';
                el.style.background  = 'rgba(255,255,255,0.02)';
              }}
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div aria-hidden style={{
                    position: 'absolute',
                    top: '52px', right: '-1px',
                    width: '2px', height: '40px',
                    background: 'linear-gradient(to bottom, rgba(201,169,110,0.3), transparent)',
                    display: 'none', // visible solo en desktop via grid
                  }} />
                )}

                {/* Icon + número */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{
                    width: '44px', height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(201,169,110,0.1)',
                    border: '1px solid rgba(201,169,110,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#C9A96E', flexShrink: 0,
                  }}>
                    {icon}
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-instrument)',
                    fontStyle: 'italic',
                    fontSize: '36px',
                    color: 'rgba(201,169,110,0.2)',
                    lineHeight: 1,
                  }}>
                    {num}
                  </span>
                </div>

                <h3 style={{
                  fontSize: 'clamp(17px, 2vw, 20px)',
                  fontWeight: 600, marginBottom: '12px',
                  letterSpacing: '-0.01em',
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA debajo de los pasos */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button
            className="btn-primary"
            onMouseMove={e => {
              const btn = e.currentTarget;
              const r = btn.getBoundingClientRect();
              btn.style.setProperty('--x', `${e.clientX - r.left}px`);
              btn.style.setProperty('--y', `${e.clientY - r.top}px`);
            }}
            onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: '18px 44px', fontSize: '15px' }}
          >
            Quiero dar el primer paso
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
