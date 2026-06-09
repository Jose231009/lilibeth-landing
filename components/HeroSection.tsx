'use client';
// ─────────────────────────────────────────────────────────
// HeroSection
// • Three.js particles (dynamic import, ssr:false)
// • GlowCursor
// • Headline: Framer Motion stagger (pageVariants del skill)
// • Mini-form 2 campos → Make webhook (alta conversión)
// • Stats: AnimatedCounter con IntersectionObserver
// ─────────────────────────────────────────────────────────
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { GlowCursor } from './GlowCursor';
import { AnimatedCounter } from './AnimatedCounter';

const WEBHOOK_URL = 'https://hook.us1.make.com/50okeerhhevg3f8alto548tixjs3s45n';

// Three.js NO puede correr en SSR
const ParticleBackground = dynamic(() => import('./ParticleBackground'), {
  ssr: false,
  loading: () => null,
});

// Variantes Framer Motion — del skill (pageVariants + stagger)
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
};
const wordVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stats = [
  { value: 200, suffix: '+', label: 'Personas acompañadas' },
  { value: 5,   suffix: '+', label: 'Años construyendo' },
  { value: 12,  suffix: '',  label: 'Países · Comunidad' },
  { value: 100, suffix: '%', label: 'Online y flexible' },
];

export function HeroSection() {
  const headline1 = ['Trabajaba', 'mucho.'];
  const headline2 = ['Ganaba', 'poco.'];
  const headline3 = ['Cambié', 'el', 'modelo.'];

  const [nombre,  setNombre]  = useState('');
  const [wa,      setWa]      = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !wa) return;
    setLoading(true);
    try {
      await fetch(WEBHOOK_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ full_name: nombre, phone: wa }),
      });
    } catch { /* fail silently — mostramos éxito igual */ }
    setSuccess(true);
    setLoading(false);
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '72px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(212,149,106,0.2) 0%, transparent 60%), #F5EDE0',
      }}
    >
      {/* Three.js particles */}
      <ParticleBackground />

      {/* Glow cursor */}
      <GlowCursor />

      {/* Atmospheric radial glow central */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(212,149,106,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Contenido */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center',
          padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px)',
          maxWidth: '860px',
          width: '100%',
        }}
      >
        {/* Eyebrow — honesto desde el inicio */}
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '32px' }}
        >
          Marketing de red · 100% digital · ES + LATAM
        </motion.p>

        {/* Headline staggered — del skill */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-instrument)',
            fontSize: 'clamp(48px, 8vw, 88px)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            marginBottom: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          <span style={{ display: 'flex', gap: '0.28em', justifyContent: 'center', flexWrap: 'wrap' }}>
            {headline1.map((w, i) => (
              <motion.span key={i} variants={wordVariants} style={{ display: 'inline-block' }}>
                {w}
              </motion.span>
            ))}
          </span>
          <span style={{ display: 'flex', gap: '0.28em', justifyContent: 'center', flexWrap: 'wrap' }}>
            {headline2.map((w, i) => (
              <motion.span key={i} variants={wordVariants} style={{ display: 'inline-block' }}>
                {w}
              </motion.span>
            ))}
          </span>
          <span style={{ display: 'flex', gap: '0.28em', justifyContent: 'center', flexWrap: 'wrap' }}>
            {headline3.map((w, i) => (
              <motion.span key={i} variants={wordVariants}
                style={{
                  display: 'inline-block',
                  fontStyle: i === 2 ? 'italic' : 'normal',
                  color:     i === 2 ? '#D4956A' : 'inherit',
                }}
              >
                {w}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="visible"
          transition={{ delay: 0.8 }}
          style={{
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: 'rgba(28,18,8,0.65)',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto 36px',
          }}
        >
          Hace 5 años encontré un modelo que cambió todo — ingresos recurrentes,
          sin horarios, sin stock, desde cualquier país. Dejame tu WhatsApp
          y te cuento exactamente cómo funciona.
        </motion.p>

        {/* ── MINI-FORM ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible"
          transition={{ delay: 1.0 }}
          style={{ maxWidth: '540px', margin: '0 auto' }}
        >
          {!success ? (
            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  required
                  style={{ textAlign: 'center', fontSize: '15px', padding: '15px 20px' }}
                />
                <input
                  className="form-control"
                  type="tel"
                  placeholder="WhatsApp con código de país (+34, +52, +54…)"
                  value={wa}
                  onChange={e => setWa(e.target.value)}
                  required
                  style={{ textAlign: 'center', fontSize: '15px', padding: '15px 20px' }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '17px 28px',
                    fontSize: '15px',
                    opacity: loading ? 0.75 : 1,
                  }}
                >
                  {loading ? 'Enviando…' : (
                    <>
                      Quiero saber cómo funciona
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Nota privacidad */}
              <p style={{
                marginTop: '12px',
                fontSize: '12px',
                color: 'rgba(28,18,8,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Sin spam · Solo hablamos por WhatsApp
              </p>
            </form>
          ) : (
            /* ── ÉXITO ── */
            <div style={{
              background: 'rgba(212,149,106,0.08)',
              border: '1px solid rgba(212,149,106,0.25)',
              borderRadius: '20px',
              padding: '32px 28px',
              textAlign: 'center',
              animation: 'kpi-appear 0.5s var(--ease-spring) both',
            }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: 'rgba(212,149,106,0.12)',
                border: '1px solid rgba(212,149,106,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4956A" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <p style={{
                fontFamily: 'var(--font-instrument)',
                fontStyle: 'italic',
                fontSize: '22px',
                color: '#D4956A',
                marginBottom: '8px',
              }}>
                ¡Listo, {nombre.split(' ')[0]}!
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(28,18,8,0.6)', lineHeight: 1.6 }}>
                Te contacto en menos de 24 horas por WhatsApp.
              </p>
            </div>
          )}
        </motion.div>

        {/* Badge disponibilidad */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="visible"
          transition={{ delay: 1.15 }}
          style={{ fontSize: '12px', color: 'rgba(28,18,8,0.4)', letterSpacing: '0.06em', marginTop: '16px' }}
        >
          <span style={{
            display: 'inline-block', width: '6px', height: '6px',
            borderRadius: '50%', background: '#4ade80',
            marginRight: '7px', verticalAlign: 'middle',
            animation: 'pulse-dot 2s cubic-bezier(0.4,0,0.6,1) infinite',
          }} />
          Disponibilidad limitada · Solo para personas serias
        </motion.p>

        {/* Avatar + badge */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible"
          transition={{ delay: 0.6 }}
          style={{
            position: 'absolute',
            top: 'clamp(60px, 10vw, 100px)',
            right: 'clamp(20px, 4vw, 60px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          }}
        >
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            overflow: 'hidden', border: '2px solid rgba(212,149,106,0.5)',
            boxShadow: '0 0 20px rgba(212,149,106,0.2)',
          }}>
            <Image
              src="/assets/lilibeth-hero.jpeg"
              alt="Lilibeth Paris"
              width={64} height={64}
              priority
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
          <div style={{
            background: 'rgba(212,149,106,0.12)',
            border: '1px solid rgba(212,149,106,0.3)',
            borderRadius: '20px', padding: '4px 12px',
            fontSize: '11px', color: '#D4956A',
            letterSpacing: '0.08em', fontWeight: 600,
          }}>
            +5 años
          </div>
        </motion.div>

        {/* Stats con AnimatedCounter — del skill */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible"
          transition={{ delay: 1.3 }}
          className="stats-grid"
          style={{
            gap: '1px',
            marginTop: '36px',
            background: 'rgba(28,18,8,0.07)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(28,18,8,0.12)',
          }}
        >
          {stats.map(({ value, suffix, label }) => (
            <div
              key={label}
              style={{
                padding: 'clamp(16px, 3vw, 28px) 16px',
                background: 'rgba(212,149,106,0.06)',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-instrument)',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 400,
                color: '#D4956A',
                lineHeight: 1,
                marginBottom: '6px',
              }}>
                <AnimatedCounter target={value} suffix={suffix} duration={1200} />
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(28,18,8,0.5)', letterSpacing: '0.05em' }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: '32px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}
      >
        <span style={{ fontSize: '11px', color: 'rgba(28,18,8,0.3)', letterSpacing: '0.12em' }}>
          SCROLL
        </span>
        <div style={{
          width: '1px', height: '48px',
          background: 'linear-gradient(to bottom, rgba(212,149,106,0.5), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </motion.div>
    </section>
  );
}
