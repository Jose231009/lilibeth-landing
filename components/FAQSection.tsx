'use client';
// ─────────────────────────────────────────────────────────
// FAQSection — Accordion
// • max-height para open/close — del skill (solo transform/opacity/filter)
// • Stagger reveal al entrar en viewport
// ─────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';

const faqs = [
  {
    q: '¿Qué modelo de negocio es este exactamente?',
    a: 'Es marketing de red — sí, lo digo directamente. Pero no es lo que probablemente imaginás. No hay productos para acumular en casa, no hay presión para vender a familia y amigos, y no empezás desde cero cada mes. El modelo se basa en construir una red de distribución de una membresía de viajes con demanda real. Puedo mostrarte los números, el sistema y cómo funciona paso a paso — sin letra pequeña.',
  },
  {
    q: 'No tengo experiencia en ventas ni en negocios online.',
    a: 'No hace falta. El sistema incluye formación paso a paso y un equipo que te acompaña desde el primer día. Personas sin ninguna experiencia previa están generando resultados reales.',
  },
  {
    q: 'No tengo tiempo para algo más.',
    a: 'Precisamente por eso esto tiene sentido. Si no tienes tiempo, es porque tu modelo actual te lo consume todo. Esto está diseñado para construirse en paralelo, a tu ritmo, sin tener que dejar lo que ya haces.',
  },
  {
    q: '¿Necesito invertir mucho dinero para empezar?',
    a: 'No estamos hablando de franquicias ni de negocios que necesitan miles de euros. Cuando hablemos, te muestro exactamente lo que se necesita — y verás que es muy accesible.',
  },
  {
    q: 'Suena demasiado bien. ¿Es real?',
    a: 'Entiendo perfectamente la desconfianza. Por eso no te pido que confíes a ciegas — te pido que te informes. Cuando hablemos te muestro casos reales, el paso a paso y cómo funciona el modelo con total transparencia. Sin letra pequeña.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      borderBottom: '1px solid rgba(28,18,8,0.08)',
      transition: 'background 200ms var(--ease-out)',
      background: open ? 'rgba(212,149,106,0.03)' : 'transparent',
      borderRadius: open ? '8px' : '0',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left',
          padding: 'clamp(18px, 2.5vw, 24px) clamp(16px, 2vw, 24px)',
          background: 'none', border: 'none',
          cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: '16px',
        }}
      >
        <span style={{
          fontSize: 'clamp(15px, 1.8vw, 17px)',
          fontWeight: 500, color: '#1C1208',
          lineHeight: 1.4,
        }}>
          {q}
        </span>
        {/* ícono + → × del skill */}
        <span style={{
          width: '28px', height: '28px', flexShrink: 0,
          borderRadius: '50%',
          background: open ? 'rgba(212,149,106,0.15)' : 'rgba(28,18,8,0.08)',
          border: `1px solid ${open ? 'rgba(212,149,106,0.4)' : 'rgba(28,18,8,0.1)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          // Solo transform — del skill
          transition: 'transform 300ms var(--ease-spring), background 200ms, border-color 200ms',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          color: open ? '#D4956A' : 'rgba(28,18,8,0.55)',
          fontSize: '18px', fontWeight: 300, lineHeight: 1,
        }}>
          +
        </span>
      </button>
      {/* Accordion body — max-height del skill */}
      <div className={`faq-body ${open ? 'open' : ''}`}>
        <p style={{
          padding: '0 clamp(16px, 2vw, 24px) clamp(18px, 2.5vw, 24px)',
          fontSize: '15px',
          color: 'rgba(28,18,8,0.6)',
          lineHeight: 1.75,
        }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{
      padding: 'clamp(52px, 6vw, 80px) clamp(20px, 5vw, 64px)',
      background: '#EDE0CE',
    }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(28px, 4vw, 48px)' }}>
          <p className="eyebrow" style={{ marginBottom: '20px' }}>Preguntas frecuentes</p>
          <h2 style={{
            fontFamily: 'var(--font-instrument)',
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 400, lineHeight: 1.1,
          }}>
            Puede que estés<br />
            <em style={{ color: '#D4956A' }}>pensando...</em>
          </h2>
        </div>

        <div
          ref={containerRef}
          className="reveal"
          style={{
            background: 'rgba(28,18,8,0.03)',
            border: '1px solid rgba(28,18,8,0.08)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {faqs.map((faq) => <FAQItem key={faq.q} {...faq} />)}
        </div>
      </div>
    </section>
  );
}
