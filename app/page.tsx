// ─────────────────────────────────────────────────────────
// page.tsx — Landing Lilibeth Paris
// Ensambla todas las secciones en orden
// Server Component (no necesita 'use client')
// ─────────────────────────────────────────────────────────
import { Navbar }               from '@/components/Navbar';
import { HeroSection }          from '@/components/HeroSection';
import { DestinationsMarquee }  from '@/components/DestinationsMarquee';
import { PainPointsSection }    from '@/components/PainPointsSection';
import { ModelSection }         from '@/components/ModelSection';
import { AboutSection }         from '@/components/AboutSection';
import { TestimonialsSection }  from '@/components/TestimonialsSection';
import { HowItWorksSection }    from '@/components/HowItWorksSection';
import { FAQSection }           from '@/components/FAQSection';
import { UrgencySection }       from '@/components/UrgencySection';
import { GallerySection }       from '@/components/GallerySection';
import { FormSection }          from '@/components/FormSection';

// WhatsApp flotante como Server Component inline (sin interactividad)
function WAFloat() {
  return (
    <a
      className="wa-float"
      href="https://wa.me/34644649106"
      target="_blank"
      rel="noopener noreferrer"
      title="WhatsApp Lilibeth Paris"
      aria-label="Contactar por WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

// Footer
function Footer() {
  return (
    <footer style={{
      padding: '40px clamp(20px, 5vw, 80px)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      background: '#0a0a0a',
      textAlign: 'center',
    }}>
      {/* Instagram */}
      <div style={{ marginBottom: '20px' }}>
        <a
          href="https://www.instagram.com/lilibethparis_/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '13px', color: '#C9A96E',
            textDecoration: 'none', letterSpacing: '0.06em',
            padding: '8px 18px',
            border: '1px solid rgba(201,169,110,0.25)',
            borderRadius: '20px',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
          </svg>
          @lilibethparis_
        </a>
      </div>

      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', lineHeight: 1.8 }}>
        © 2026 Lilibeth Paris · Todos los derechos reservados
      </p>
      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.18)', marginTop: '6px' }}>
        <a href="/privacidad" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'underline', marginRight: '16px' }}>
          Política de Privacidad
        </a>
        <a href="/privacidad#aviso-legal" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'underline' }}>
          Aviso Legal
        </a>
      </p>
      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.12)', marginTop: '10px', maxWidth: '560px', margin: '10px auto 0', lineHeight: 1.7 }}>
        Los resultados presentados son experiencias personales. Los resultados individuales varían y dependen del esfuerzo y dedicación de cada persona.
      </p>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DestinationsMarquee />
        <PainPointsSection />
        <ModelSection />
        <AboutSection />
        <TestimonialsSection />
        <HowItWorksSection />
        <FAQSection />
        <UrgencySection />
        <GallerySection />
        <FormSection />
      </main>
      <Footer />
      <WAFloat />
    </>
  );
}
