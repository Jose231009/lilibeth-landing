'use client';
// ─────────────────────────────────────────────────────────
// VideoSection — Video personal de Lilibeth
// • Reveal al scroll (IntersectionObserver)
// • Play/pause con botón custom
// • Solo transform/opacity — del skill
// ─────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  // Reveal al entrar
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
      setStarted(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const handleEnded = () => setPlaying(false);

  return (
    <section
      ref={sectionRef}
      id="s-video"
      className="reveal"
      style={{
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)',
        background: '#F9F3EC',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow de fondo */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%', height: '60%',
        background: 'radial-gradient(ellipse, rgba(212,149,106,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 52px)' }}>
          <p className="eyebrow" style={{ marginBottom: '16px' }}>En sus propias palabras</p>
          <h2 style={{
            fontFamily: 'var(--font-instrument)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 400, lineHeight: 1.1,
          }}>
            Lilibeth te cuenta<br />
            <em style={{ color: '#D4956A' }}>cómo funciona</em>
          </h2>
        </div>

        {/* Video container */}
        <div
          onClick={togglePlay}
          style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(212,149,106,0.2)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            cursor: 'pointer',
            background: '#111',
            aspectRatio: '16/9',
          }}
        >
          <video
            ref={videoRef}
            src="/assets/video-lili.mp4"
            onEnded={handleEnded}
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* Overlay oscuro al inicio o cuando pausado */}
          <div style={{
            position: 'absolute', inset: 0,
            background: started && playing
              ? 'transparent'
              : 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 100%)',
            transition: 'background 400ms ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Botón play/pause */}
            <div style={{
              width: '72px', height: '72px',
              borderRadius: '50%',
              background: playing ? 'rgba(212,149,106,0.15)' : 'rgba(212,149,106,0.9)',
              border: '2px solid rgba(212,149,106,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              transition: 'transform 200ms ease, opacity 200ms ease, background 200ms ease',
              opacity: playing ? 0 : 1,
              transform: playing ? 'scale(0.8)' : 'scale(1)',
              boxShadow: '0 8px 32px rgba(212,149,106,0.3)',
            }}>
              {/* Play icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#F5EDE0">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>

          {/* Label inferior */}
          {!started && (
            <div style={{
              position: 'absolute', bottom: '20px', left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '12px',
              color: 'rgba(28,18,8,0.55)',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}>
              REPRODUCIR VIDEO
            </div>
          )}
        </div>

        {/* Caption */}
        <p style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '13px',
          color: 'rgba(28,18,8,0.35)',
          letterSpacing: '0.06em',
        }}>
          Lilibeth Paris · Mentora ES + LATAM
        </p>
      </div>
    </section>
  );
}
