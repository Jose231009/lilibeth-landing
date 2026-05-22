'use client';
// ─────────────────────────────────────────────────────────
// GallerySection — Bento grid 9 fotos
// • Reveal stagger al hacer scroll
// • Hover: zoom suave (solo transform — del skill)
// ─────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const photos = [
  { src: '/assets/gallery/londres-telephone.jpeg', label: 'Sin horarios',        sub: 'Mis propios tiempos',  wide: false, tall: true  },
  { src: '/assets/gallery/paris-grupo.jpeg',       label: 'Cena con el equipo',  sub: 'Personas reales',     wide: false, tall: false },
  { src: '/assets/gallery/venecia-canal.jpeg',     label: 'En ruta',             sub: 'Con el equipo',       wide: false, tall: false },
  { src: '/assets/gallery/teatro-colombia.jpeg',   label: 'Encuentro internacional', sub: 'Equipo · Convención', wide: true, tall: false },
  { src: '/assets/gallery/evento-madrid.jpeg',     label: 'Convención anual',    sub: '2025',                wide: false, tall: false },
  { src: '/assets/gallery/venecia-cafe.jpeg',      label: 'Pausa merecida',      sub: 'Sin pedir permiso',   wide: false, tall: false },
  { src: '/assets/gallery/venecia-puente.jpeg',    label: 'Un paso más',         sub: 'Cada mes',            wide: false, tall: false },
  { src: '/assets/gallery/amigas-selfie.jpeg',     label: 'Comunidad',           sub: '+200 personas activas', wide: false, tall: false },
  { src: '/assets/gallery/londres-tube.jpeg',      label: 'Vivir distinto',      sub: 'Vistas que cambian todo', wide: false, tall: false },
];

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('.stagger-item')
            .forEach((item, i) => setTimeout(() => item.classList.add('revealed'), i * 60));
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="s-gallery" style={{
      padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)',
      background: '#0a0a0a',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <p className="eyebrow" style={{ marginBottom: '20px' }}>Los destinos que te esperan</p>
          <h2 style={{
            fontFamily: 'var(--font-instrument)',
            fontSize: 'clamp(30px, 4vw, 50px)',
            fontWeight: 400, lineHeight: 1.1,
          }}>
            El mundo desde otra<br />
            <em style={{ color: '#C9A96E' }}>perspectiva</em>
          </h2>
        </div>

        {/* Bento grid — responsive via CSS class */}
        <div ref={containerRef} className="gallery-grid">
          {photos.map(({ src, label, sub, wide, tall }, i) => (
            <div
              key={src}
              className={`stagger-item reveal-scale${wide ? ' gallery-wide' : ''}${tall ? ' gallery-tall' : ''}`}
              style={{
                /* NO gridColumn/gridRow aquí — lo controla CSS para
                   que los media queries puedan sobreescribirlo */
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                minHeight: 0, /* evita overflow en grid */
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                // Hover: zoom solo con transform — del skill
                transition: 'transform 500ms var(--ease-out)',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'}
              >
                <Image
                  src={src}
                  alt={label}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>

              {/* Overlay con label — siempre visible en mobile */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '16px',
                zIndex: 2,
              }}>
                <div style={{
                  fontFamily: 'var(--font-instrument)',
                  fontStyle: 'italic',
                  fontSize: '15px',
                  color: '#fff',
                  lineHeight: 1.3,
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.55)',
                  letterSpacing: '0.06em',
                  marginTop: '2px',
                }}>
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '32px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.08em',
        }}>
          Momentos reales · Comunidad real · Equipo internacional
        </p>
      </div>
    </section>
  );
}
