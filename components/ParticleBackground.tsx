'use client';
// ─────────────────────────────────────────────────────────
// ParticleBackground — Three.js (del skill)
// DEBE ser 'use client' — Three.js no funciona en SSR
// Importado con dynamic({ ssr: false }) en HeroSection
// Limpia todos los recursos en unmount
// ─────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';
import { initParticleBackground } from '@/lib/three/particleBackground';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cleanup: (() => void) | undefined;

    // initParticleBackground retorna la función de cleanup
    initParticleBackground(canvas).then((fn) => {
      cleanup = fn;
    });

    // Limpiar Three.js en unmount — obligatorio del skill
    return () => cleanup?.();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
