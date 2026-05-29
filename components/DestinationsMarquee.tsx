'use client';
// ─────────────────────────────────────────────────────────
// DestinationsMarquee
// • Loop CSS infinito (del skill: animation marquee)
// • Gradient mask blur en bordes (maskImage)
// • No JS para la animación — solo CSS transform
// ─────────────────────────────────────────────────────────

const destinations = [
  'Caribe', 'Mediterráneo', 'Bahamas', 'Maldivas',
  'Fiordos noruegos', 'Venecia', 'Santorini', 'Bali', 'Dubai',
  'Lisboa', 'Azores', 'Canarias', 'Islandia', 'Japón',
];

// Duplicamos para el loop infinito CSS
const track = [...destinations, ...destinations];

const dot = (
  <span style={{
    display: 'inline-block',
    width: '4px', height: '4px',
    borderRadius: '50%',
    background: '#C9A96E',
    margin: '0 28px',
    verticalAlign: 'middle',
    opacity: 0.5,
    flexShrink: 0,
  }} />
);

export function DestinationsMarquee() {
  return (
    <div style={{ background: '#0d0d0d', borderTop: '1px solid rgba(28,18,8,0.06)', borderBottom: '1px solid rgba(28,18,8,0.06)', overflow: 'hidden' }}>
      {/* Gradient mask — bordes difuminados del skill */}
      <div
        className="marquee-fade"
        style={{ padding: '20px 0' }}
      >
        <div className="marquee-track" style={{ display: 'flex', alignItems: 'center' }}>
          {track.map((dest, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
              <span style={{
                fontFamily: 'var(--font-instrument)',
                fontStyle: 'italic',
                fontSize: 'clamp(14px, 2vw, 17px)',
                color: 'rgba(28,18,8,0.5)',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}>
                {dest}
              </span>
              {dot}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
