'use client';
// ─────────────────────────────────────────────────────────
// AboutSection — "Hola, soy Lilibeth París"
// • Foto con parallax suave al scroll (CSS transform, del skill)
// • Reveal stagger en stats
// • Solo transform — del skill
// ─────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatedCounter } from './AnimatedCounter';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section  = sectionRef.current;
    const photo    = photoRef.current;
    const content  = contentRef.current;
    if (!section || !photo || !content) return;

    // Reveal al entrar
    const revealObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          photo.classList.add('revealed');
          content.classList.add('revealed');
          revealObs.unobserve(section);
        }
      },
      { threshold: 0.15 }
    );
    revealObs.observe(section);

    // Parallax suave — solo transform, del skill
    // Usa rAF para evitar jank
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!section || !photo) return;
        const rect   = section.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        const offset = center * 0.08; // factor de parallax suave
        photo.style.transform = `translateY(${Math.max(-30, Math.min(30, offset))}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Limpiar en unmount — obligatorio del skill
    return () => {
      revealObs.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="s-about"
      style={{
        padding: 'clamp(80px, 10vw, 130px) clamp(20px, 5vw, 80px)',
        background: '#0a0a0a',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Atmosfera */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: '-10%',
        width: '50%', height: '100%',
        background: 'radial-gradient(ellipse at 0% 50%, rgba(201,169,110,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'clamp(280px, 35%, 420px) 1fr',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'center',
      }}>
        {/* Foto con parallax — solo transform */}
        <div
          ref={photoRef}
          className="reveal-scale"
          style={{ willChange: 'transform' }}
        >
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(201,169,110,0.2)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            aspectRatio: '3/4',
          }}>
            <Image
              src="/assets/lilibeth-about.jpeg"
              alt="Lilibeth París"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
              sizes="(max-width: 768px) 100vw, 420px"
            />
            {/* Overlay gradiente sutil */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,10,10,0.3) 0%, transparent 50%)',
            }} />

            {/* Badge superpuesto */}
            <div style={{
              position: 'absolute', bottom: '20px', left: '20px',
              background: 'rgba(10,10,10,0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(201,169,110,0.3)',
              borderRadius: '12px',
              padding: '12px 18px',
            }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '2px' }}>Madrid · España</div>
              <div style={{
                fontFamily: 'var(--font-instrument)',
                fontStyle: 'italic',
                fontSize: '16px',
                color: '#C9A96E',
              }}>
                Est. 2020
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div ref={contentRef} className="reveal">
          <p className="eyebrow" style={{ marginBottom: '24px' }}>+5 años · Madrid</p>

          <h2 style={{
            fontFamily: 'var(--font-instrument)',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 400, lineHeight: 1.1,
            marginBottom: '28px',
          }}>
            Hola, soy<br />
            <em style={{ color: '#C9A96E' }}>Lilibeth París</em>
          </h2>

          <div style={{
            display: 'flex', flexDirection: 'column', gap: '16px',
            marginBottom: '36px',
          }}>
            {[
              'Hace 5 años estaba exactamente donde estás tú hoy. Trabajaba mucho, me esforzaba — pero mis ingresos no crecían sin mí. Un mes bueno, un mes malo. Sin estabilidad.',
              'Hasta que encontré un modelo que me cambió la vida: ingresos que se generan aunque no esté presente, con personas que acompaño desde cualquier país.',
              'Hoy he viajado a Londres, Venecia, Bruselas, Madrid… y el negocio sigue creciendo. Trabajo con +200 personas activas en 12 países y quiero mostrarte exactamente cómo funciona.',
            ].map((p, i) => (
              <p key={i} style={{
                fontSize: 'clamp(14px, 1.8vw, 16px)',
                color: i === 1 ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.55)',
                lineHeight: 1.75,
              }}>
                {p}
              </p>
            ))}
          </div>

          {/* Firma */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            padding: '20px 0',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            marginBottom: '36px',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-instrument)',
                fontStyle: 'italic',
                fontSize: '22px',
                color: '#C9A96E',
              }}>
                Lilibeth París
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>
                MENTORA · ES + LATAM
              </div>
            </div>
          </div>

          {/* Mini stats con AnimatedCounter */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { val: 200, suf: '+', label: 'Personas' },
              { val: 12,  suf: '',  label: 'Países' },
              { val: 5,   suf: '+', label: 'Años' },
            ].map(({ val, suf, label }) => (
              <div key={label} style={{
                padding: '16px',
                background: 'rgba(201,169,110,0.05)',
                border: '1px solid rgba(201,169,110,0.15)',
                borderRadius: '12px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--font-instrument)',
                  fontSize: '32px', color: '#C9A96E',
                }}>
                  <AnimatedCounter target={val} suffix={suf} duration={1000} />
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
