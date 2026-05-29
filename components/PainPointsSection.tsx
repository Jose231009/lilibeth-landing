'use client';
// ─────────────────────────────────────────────────────────
// PainPointsSection — "¿Te suena familiar?"
// • useScrollReveal + stagger desde la izquierda
// • Delay 0.08s entre items (del skill)
// • Solo transform/opacity — del skill
// ─────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';

const pains = [
  {
    num: '01',
    title: 'Cada mes empiezas de cero',
    text: 'Sin importar cuánto te esfuerces, los ingresos no se acumulan si no estás presente. El contador vuelve a cero cada 30 días.',
  },
  {
    num: '02',
    title: 'Si paras, tu negocio para',
    text: 'Todo depende de tu presencia constante. Una semana de vacaciones y los ingresos se caen. Eso no es libertad — es otra jaula.',
  },
  {
    num: '03',
    title: 'Probaste de todo sin resultado',
    text: 'Freelance, redes, trading, negocios online… ninguno te dio la libertad que prometía. No es culpa tuya — era el modelo equivocado.',
  },
];

export function PainPointsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // IntersectionObserver — nunca raw scroll event (del skill)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = container.querySelectorAll<HTMLElement>('.stagger-item');
          items.forEach((item, i) => {
            // Delay escalonado 0.08s — del skill
            setTimeout(() => item.classList.add('revealed'), i * 80);
          });
          observer.unobserve(container);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);
    // Limpiar en unmount — obligatorio del skill
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="s-pain"
      style={{
        padding: 'clamp(80px, 10vw, 130px) clamp(20px, 5vw, 80px)',
        background: '#F5EDE0',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(50px, 7vw, 80px)' }}>
          <p className="eyebrow" style={{ marginBottom: '20px' }}>¿Te suena familiar?</p>
          <h2 style={{
            fontFamily: 'var(--font-instrument)',
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 400,
            lineHeight: 1.1,
          }}>
            Trabajás mucho.<br />
            <em style={{ color: '#D4956A' }}>Los resultados no acompañan.</em>
          </h2>
        </div>

        {/* Pain points — stagger reveal-left del skill */}
        <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {pains.map(({ num, title, text }, i) => (
            <div
              key={num}
              className="stagger-item reveal-left"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '56px 1fr',
                  gap: '28px',
                  padding: 'clamp(24px, 3vw, 36px) clamp(20px, 3vw, 40px)',
                  background: i === 1 ? 'rgba(212,149,106,0.04)' : 'rgba(28,18,8,0.03)',
                  border: '1px solid rgba(28,18,8,0.06)',
                  borderLeft: i === 1 ? '2px solid rgba(212,149,106,0.4)' : '2px solid transparent',
                  borderRadius: '12px',
                  alignItems: 'start',
                  transition: 'border-color 300ms var(--ease-out), background 300ms var(--ease-out)',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderLeftColor = 'rgba(212,149,106,0.5)';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(212,149,106,0.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderLeftColor = i === 1 ? 'rgba(212,149,106,0.4)' : 'transparent';
                  (e.currentTarget as HTMLDivElement).style.background = i === 1 ? 'rgba(212,149,106,0.04)' : 'rgba(28,18,8,0.03)';
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-instrument)',
                  fontStyle: 'italic',
                  fontSize: '40px',
                  color: 'rgba(212,149,106,0.3)',
                  lineHeight: 1,
                  paddingTop: '4px',
                }}>
                  {num}
                </span>
                <div>
                  <h3 style={{
                    fontSize: 'clamp(18px, 2.5vw, 22px)',
                    fontWeight: 600,
                    marginBottom: '10px',
                    letterSpacing: '-0.01em',
                  }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '15px', color: 'rgba(28,18,8,0.6)', lineHeight: 1.7 }}>
                    {text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
