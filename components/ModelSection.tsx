'use client';
// ─────────────────────────────────────────────────────────
// ModelSection — "Es cambiar el modelo"
// • 3 pilares con glassmorphism (card-glass del skill)
// • Card central: border-spin animado (del skill)
// • Stagger desde abajo con IntersectionObserver
// ─────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';

const pillars = [
  {
    roman: 'I',
    title: 'Ingresos que se acumulan',
    text: 'Construís una base de clientes que paga mes a mes. Tu trabajo de hoy te paga también el próximo mes — y el siguiente, y el siguiente.',
    icon: '◈',
    featured: false,
  },
  {
    roman: 'II',
    title: 'Libertad real, no slogans',
    text: '100% digital. Sin horarios, sin permanencia. Trabajás desde donde quieras, con la gente que quieres. Cuando viajas, los ingresos siguen entrando.',
    icon: '◉',
    featured: true,
  },
  {
    roman: 'III',
    title: 'Acompañamiento real',
    text: 'No estás solo/a. Comunidad activa de +200 personas en 12 países y un sistema probado paso a paso. Resultados desde la primera semana.',
    icon: '◎',
    featured: false,
  },
];

export function ModelSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [containerRef.current, titleRef.current].filter(Boolean) as HTMLElement[];
    const observers: IntersectionObserver[] = [];

    // Title reveal
    if (titleRef.current) {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { titleRef.current!.classList.add('revealed'); obs.unobserve(titleRef.current!); } },
        { threshold: 0.06 }
      );
      obs.observe(titleRef.current);
      observers.push(obs);
    }

    // Cards stagger
    if (containerRef.current) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            containerRef.current!.querySelectorAll<HTMLElement>('.stagger-item')
              .forEach((el, i) => setTimeout(() => el.classList.add('revealed'), i * 100));
            obs.unobserve(containerRef.current!);
          }
        },
        { threshold: 0.05 }
      );
      obs.observe(containerRef.current);
      observers.push(obs);
    }

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section
      id="s-shift"
      style={{
        padding: 'clamp(52px, 6vw, 80px) clamp(20px, 5vw, 64px)',
        background: '#EDE0CE',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Atmospheric glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '600px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(212,149,106,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div
          ref={titleRef}
          className="reveal"
          style={{ textAlign: 'center', marginBottom: 'clamp(28px, 4vw, 48px)' }}
        >
          <p className="eyebrow" style={{ marginBottom: '20px' }}>La respuesta no es trabajar más</p>
          <h2 style={{
            fontFamily: 'var(--font-instrument)',
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 400, lineHeight: 1.1,
          }}>
            Es <em style={{ color: '#D4956A' }}>cambiar el modelo</em>
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            color: 'rgba(28,18,8,0.55)',
            maxWidth: '520px',
            margin: '20px auto 0',
            lineHeight: 1.7,
          }}>
            No se trata de más esfuerzo ni de más suerte. Se trata de acceder a un
            sistema que genera ingresos recurrentes — y dejarlo trabajar para ti.
          </p>
          {/* Transparencia NM — antes de las FAQ */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            marginTop: '20px',
            padding: '8px 18px',
            background: 'rgba(212,149,106,0.08)',
            border: '1px solid rgba(212,149,106,0.22)',
            borderRadius: '20px',
            fontSize: '12px',
            color: 'rgba(28,18,8,0.55)',
            letterSpacing: '0.04em',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D4956A" strokeWidth="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Marketing de red · Sin stock · Sin grandes inversiones · 100% digital
          </div>
        </div>

        {/* Cards con stagger — del skill */}
        <div
          ref={containerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {pillars.map(({ roman, title, text, featured }) => (
            <div
              key={roman}
              className={`stagger-item reveal ${featured ? 'glass-border-spin' : 'card-glass'}`}
              style={{
                padding: 'clamp(28px, 3vw, 40px)',
                ...(featured ? { background: 'rgba(212,149,106,0.06)' } : {}),
              }}
            >
              {/* Número romano */}
              <div style={{
                fontFamily: 'var(--font-instrument)',
                fontStyle: 'italic',
                fontSize: '52px',
                color: featured ? '#D4956A' : 'rgba(212,149,106,0.35)',
                lineHeight: 1,
                marginBottom: '20px',
              }}>
                {roman}
              </div>

              <h3 style={{
                fontSize: 'clamp(18px, 2vw, 21px)',
                fontWeight: 600,
                marginBottom: '14px',
                letterSpacing: '-0.01em',
                color: '#1C1208',
              }}>
                {title}
              </h3>
              <p style={{
                fontSize: '15px',
                color: 'rgba(28,18,8,0.6)',
                lineHeight: 1.7,
              }}>
                {text}
              </p>

              {featured && (
                <div style={{
                  marginTop: '24px',
                  display: 'inline-block',
                  padding: '6px 16px',
                  background: 'rgba(212,149,106,0.15)',
                  border: '1px solid rgba(212,149,106,0.35)',
                  borderRadius: '20px',
                  fontSize: '11px',
                  color: '#D4956A',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}>
                  LA CLAVE
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
