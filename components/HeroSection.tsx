'use client';
// ─────────────────────────────────────────────────────────
// HeroSection
// • Three.js particles (dynamic import, ssr:false)
// • GlowCursor
// • Headline: Framer Motion stagger (pageVariants del skill)
// • Stats: AnimatedCounter con IntersectionObserver
// • Botones: ripple dinámico del skill
// ─────────────────────────────────────────────────────────
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GlowCursor } from './GlowCursor';
import { AnimatedCounter } from './AnimatedCounter';

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
  hidden:  { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Ripple dinámico del skill
function addRipple(e: React.MouseEvent<HTMLButtonElement>) {
  const btn  = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
  btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
}

const stats = [
  { value: 200, suffix: '+', label: 'Personas acompañadas' },
  { value: 5,   suffix: '+', label: 'Años construyendo' },
  { value: 12,  suffix: '',  label: 'Países · Comunidad' },
  { value: 100, suffix: '%', label: 'Online y flexible' },
];

export function HeroSection() {
  const headline1 = ['Viajá', 'el', 'mundo'];
  const headline2 = ['mientras', 'tus', 'ingresos'];
  const headline3 = ['trabajan', 'por', 'ti'];

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
        background: 'radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.08) 0%, transparent 60%), #0a0a0a',
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
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(201,169,110,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Contenido */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center',
          padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px)',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        {/* Eyebrow */}
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '32px' }}
        >
          Para profesionales y emprendedores · ES + LATAM
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
            marginBottom: '32px',
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
              <motion.span key={i} variants={wordVariants}
                style={{
                  display: 'inline-block',
                  fontStyle: i === 2 ? 'italic' : 'normal',
                  color: i === 2 ? '#C9A96E' : 'inherit',
                }}
              >
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
          transition={{ delay: 0.85 }}
          style={{
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7,
            maxWidth: '580px',
            margin: '0 auto 40px',
          }}
        >
          Descubrí el modelo que +200 personas en 12 países usan para generar
          ingresos recurrentes — mientras viajan y viven sin depender de un horario fijo.
        </motion.p>

        {/* CTAs con ripple del skill */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible"
          transition={{ delay: 1.0 }}
          style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}
        >
          <button
            className="btn-primary"
            onMouseMove={addRipple}
            onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: '16px 36px', fontSize: '15px' }}
          >
            Quiero saber cómo funciona
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button
            className="btn-ghost"
            onClick={() => document.getElementById('s-about')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: '16px 36px', fontSize: '15px' }}
          >
            Conocer a Lilibeth
          </button>
        </motion.div>

        {/* Badge disponibilidad */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="visible"
          transition={{ delay: 1.1 }}
          style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}
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
            overflow: 'hidden', border: '2px solid rgba(201,169,110,0.5)',
            boxShadow: '0 0 20px rgba(201,169,110,0.2)',
          }}>
            <Image
              src="/assets/lilibeth-hero.jpeg"
              alt="Lilibeth Paris"
              width={64} height={64}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
          <div style={{
            background: 'rgba(201,169,110,0.12)',
            border: '1px solid rgba(201,169,110,0.3)',
            borderRadius: '20px', padding: '4px 12px',
            fontSize: '11px', color: '#C9A96E',
            letterSpacing: '0.08em', fontWeight: 600,
          }}>
            +5 años
          </div>
        </motion.div>

        {/* Stats con AnimatedCounter — del skill */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible"
          transition={{ delay: 1.2 }}
          className="stats-grid"
          style={{
            gap: '1px',
            marginTop: '64px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {stats.map(({ value, suffix, label }) => (
            <div
              key={label}
              style={{
                padding: 'clamp(16px, 3vw, 28px) 16px',
                background: 'rgba(255,255,255,0.02)',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-instrument)',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 400,
                color: '#C9A96E',
                lineHeight: 1,
                marginBottom: '6px',
              }}>
                <AnimatedCounter target={value} suffix={suffix} duration={1200} />
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>
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
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em' }}>
          SCROLL
        </span>
        <div style={{
          width: '1px', height: '48px',
          background: 'linear-gradient(to bottom, rgba(201,169,110,0.5), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </motion.div>
    </section>
  );
}
