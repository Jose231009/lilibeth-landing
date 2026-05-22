'use client';
// ─────────────────────────────────────────────────────────
// Navbar — blur on scroll (del skill: backdrop-filter)
// Solo transform/opacity para la transición
// Limpia el listener en unmount
// ─────────────────────────────────────────────────────────
import { useEffect, useState } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ripple en el botón del skill
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn  = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
    btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <nav
      style={{
        position:   'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '0 clamp(20px, 5vw, 80px)',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // Transición solo opacity y backdrop-filter — del skill
        transition: 'background 300ms var(--ease-out), box-shadow 300ms var(--ease-out)',
        background: scrolled
          ? 'rgba(10,10,10,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          fontFamily: 'var(--font-instrument)',
          fontSize: '20px',
          fontStyle: 'italic',
          color: '#C9A96E',
          textDecoration: 'none',
          letterSpacing: '0.02em',
        }}
      >
        Lilibeth París
      </a>

      {/* CTA */}
      <button
        className="btn-primary"
        onMouseMove={handleRipple}
        onClick={() => {
          document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{ padding: '10px 24px', fontSize: '13px' }}
      >
        Reservar llamada
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </nav>
  );
}
