'use client';
// ─────────────────────────────────────────────────────────
// VideoSection — "Lilibeth te cuenta sin filtros"
// • Posicionada entre PainPoints y Model
// • Poster con foto de Lilibeth → preload="none"
// • Play/pause con overlay glassmorphism
// • IntersectionObserver reveal — del skill
// ─────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  return (
    <section
      ref={sectionRef}
      id="s-video"
      className="reveal"
      style={{
        padding: 'clamp(52px, 6vw, 80px) clamp(20px, 5vw, 64px)',
        background: '#EDE0CE',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow sutil */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '70%', height: '70%',
        background: 'radial-gradient(ellipse, rgba(212,149,106,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 3vw, 36px)' }}>
          <p className="eyebrow" style={{ marginBottom: '16px' }}>Sin guion · Sin filtros</p>
          <h2 style={{
            fontFamily: 'var(--font-instrument)',
            fontSize: 'clamp(28px, 4vw, 46px)',
            fontWeight: 400, lineHeight: 1.1,
          }}>
            Lilibeth te cuenta<br />
            <em style={{ color: '#D4956A' }}>cómo funciona el modelo</em>
          </h2>
        </div>

        {/* Video */}
        <div
          onClick={togglePlay}
          style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(212,149,106,0.25)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
            cursor: 'pointer',
            background: '#2C1A0E',
            aspectRatio: '16/9',
          }}
        >
          <video
            ref={videoRef}
            src="/assets/video-lili.mp4"
            poster="/assets/lilibeth-about.jpeg"
            onEnded={() => setPlaying(false)}
            playsInline
            preload="none"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top center',
              display: 'block',
            }}
          />

          {/* Overlay gradiente — solo antes de reproducir */}
          <div style={{
            position: 'absolute', inset: 0,
            background: playing
              ? 'transparent'
              : 'linear-gradient(160deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.5) 100%)',
            transition: 'background 400ms ease',
            pointerEvents: 'none',
          }} />

          {/* Botón play */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <div style={{
              width: '80px', height: '80px',
              borderRadius: '50%',
              background: 'rgba(212,149,106,0.92)',
              backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 40px rgba(212,149,106,0.45), 0 0 0 12px rgba(212,149,106,0.12)',
              transition: 'transform 250ms var(--ease-spring), opacity 250ms ease',
              opacity: playing ? 0 : 1,
              transform: playing ? 'scale(0.6)' : 'scale(1)',
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="#F5EDE0" style={{ marginLeft: '3px' }}>
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>

          {/* Tarjeta inferior */}
          {!playing && (
            <div style={{
              position: 'absolute', bottom: '20px', left: '20px', right: '20px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
              pointerEvents: 'none',
            }}>
              <div style={{
                background: 'rgba(245,237,224,0.1)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(245,237,224,0.18)',
                borderRadius: '12px',
                padding: '10px 16px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-instrument)',
                  fontStyle: 'italic',
                  fontSize: '14px',
                  color: 'rgba(245,237,224,0.92)',
                  marginBottom: '2px',
                }}>
                  Mi historia · cómo lo construí
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(245,237,224,0.5)', letterSpacing: '0.1em' }}>
                  LILIBETH PARIS
                </div>
              </div>
              <div style={{
                background: 'rgba(212,149,106,0.85)',
                backdropFilter: 'blur(8px)',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '11px',
                color: '#F5EDE0',
                letterSpacing: '0.08em',
                fontWeight: 600,
              }}>
                ▶ VER
              </div>
            </div>
          )}
        </div>

        {/* Caption */}
        <p style={{
          textAlign: 'center',
          marginTop: '16px',
          fontSize: '12px',
          color: 'rgba(28,18,8,0.35)',
          letterSpacing: '0.05em',
        }}>
          Lilibeth Paris · Mentora ES + LATAM · Marketing de red
        </p>
      </div>
    </section>
  );
}
