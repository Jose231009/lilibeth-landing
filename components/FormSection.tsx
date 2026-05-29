'use client';
// ─────────────────────────────────────────────────────────
// FormSection — Formulario con Make webhook
// • section-atmosphere (noise + gradient del skill)
// • Botón con ripple dinámico del skill
// • Focus glow en inputs (microinteracción del skill)
// • Webhook: POST a Make con full_name, phone, question_1/2, answer_1/2
// ─────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';

const WEBHOOK_URL = 'https://hook.us1.make.com/50okeerhhevg3f8alto548tixjs3s45n';
const WA_NUMBER   = '34644649106';

export function FormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [nombre,   setNombre]   = useState('');
  const [email,    setEmail]    = useState('');
  const [wa,       setWa]       = useState('');
  const [ocup,     setOcup]     = useState('');
  const [obj,      setObj]      = useState('');
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState('');

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

  // Ripple dinámico del skill
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn  = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
    btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !email || !wa || !ocup || !obj) return;

    setLoading(true);
    setError('');

    const payload = {
      full_name:  nombre,
      email:      email,
      phone:      wa,
      question_1: '¿A qué te dedicas actualmente?',
      answer_1:   ocup,
      question_2: '¿Qué buscas principalmente?',
      answer_2:   obj,
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSuccess(true);
    } catch {
      setError('Hubo un problema al enviar. Inténtalo de nuevo o escríbenos por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const waMsg = encodeURIComponent(
    `Hola Lilibeth, me registré en tu página. Soy ${nombre || 'yo'} y me gustaría saber más.`
  );

  return (
    <section
      ref={sectionRef}
      id="formulario"
      className="reveal section-atmosphere"
      style={{
        padding: 'clamp(80px, 10vw, 130px) clamp(20px, 5vw, 80px)',
        background: '#110C09',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 56px)' }}>
          <p className="eyebrow" style={{ marginBottom: '20px' }}>Siguiente paso</p>
          <h2 style={{
            fontFamily: 'var(--font-instrument)',
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 400, lineHeight: 1.1, marginBottom: '16px',
          }}>
            Contame un poco<br />
            <em style={{ color: '#C9A96E' }}>sobre ti</em>
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
            Solo 4 preguntas. Así entiendo si puedo acompañarte en este camino.
          </p>
        </div>

        {/* ── FORMULARIO ── */}
        {!success ? (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Nombre */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  TU NOMBRE COMPLETO
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Cómo te llaman"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  EMAIL
                </label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  WHATSAPP (con código de país)
                </label>
                <input
                  className="form-control"
                  type="tel"
                  placeholder="+34 612 345 678"
                  value={wa}
                  onChange={e => setWa(e.target.value)}
                  required
                />
              </div>

              {/* Ocupación */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  ¿A QUÉ TE DEDICAS ACTUALMENTE?
                </label>
                <select
                  className="form-control"
                  value={ocup}
                  onChange={e => setOcup(e.target.value)}
                  required
                >
                  <option value="" disabled>Elegí una opción</option>
                  <option value="Soy empleado/a">Soy empleado/a</option>
                  <option value="Tengo mi propio negocio">Tengo mi propio negocio</option>
                  <option value="Trabajo de forma independiente">Trabajo de forma independiente</option>
                  <option value="Estoy en network marketing">Estoy en network marketing</option>
                </select>
              </div>

              {/* Objetivo */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  ¿QUÉ BUSCAS PRINCIPALMENTE?
                </label>
                <select
                  className="form-control"
                  value={obj}
                  onChange={e => setObj(e.target.value)}
                  required
                >
                  <option value="" disabled>Elegí una opción</option>
                  <option value="Un ingreso extra que complemente lo que hago">Un ingreso extra que complemente lo que hago</option>
                  <option value="Reemplazar mi ingreso actual completamente">Reemplazar mi ingreso actual completamente</option>
                  <option value="Libertad de tiempo y geográfica">Libertad de tiempo y geográfica</option>
                  <option value="Estoy explorando opciones todavía">Estoy explorando opciones todavía</option>
                </select>
              </div>

              {/* Error */}
              {error && (
                <p style={{ fontSize: '13px', color: '#ef9a9a', textAlign: 'center' }}>{error}</p>
              )}

              {/* Submit — ripple del skill */}
              <button
                type="submit"
                className="btn-primary"
                onMouseMove={handleRipple}
                disabled={loading}
                style={{
                  width: '100%', justifyContent: 'center',
                  padding: '18px', fontSize: '15px', marginTop: '8px',
                  opacity: loading ? 0.75 : 1,
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="loader-dots">
                      <span/><span/><span/>
                    </span>
                    Enviando…
                  </span>
                ) : (
                  <>
                    Quiero ver cómo funciona
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>

              {/* Nota privacidad */}
              <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Tu información es privada. No la compartimos con nadie.
              </p>
            </div>
          </form>
        ) : (
          /* ── THANK YOU ── */
          <div style={{
            textAlign: 'center',
            padding: 'clamp(40px, 5vw, 60px)',
            background: 'rgba(201,169,110,0.05)',
            border: '1px solid rgba(201,169,110,0.2)',
            borderRadius: '20px',
            animation: 'kpi-appear 0.6s var(--ease-spring) both',
          }}>
            {/* Check icon */}
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(201,169,110,0.1)',
              border: '1px solid rgba(201,169,110,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-instrument)',
              fontSize: 'clamp(26px, 3.5vw, 36px)',
              marginBottom: '12px',
            }}>
              ¡Listo, <em style={{ color: '#C9A96E' }}>{nombre.split(' ')[0] || 'bienvenido/a'}</em>!
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '36px' }}>
              Tu información llegó. El siguiente paso es conectarnos — elegí cómo prefieres hacerlo:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '8px', padding: '20px 16px',
                  background: 'rgba(37,211,102,0.08)',
                  border: '1px solid rgba(37,211,102,0.25)',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  transition: 'transform 300ms var(--ease-spring), box-shadow 300ms',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(37,211,102,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#25d366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span style={{ fontSize: '13px', color: '#25d366', fontWeight: 600 }}>WhatsApp directo</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Te respondo enseguida</span>
              </a>

              {/* Email / CTA */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '8px', padding: '20px 16px',
                background: 'rgba(201,169,110,0.05)',
                border: '1px solid rgba(201,169,110,0.2)',
                borderRadius: '14px',
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span style={{ fontSize: '13px', color: '#C9A96E', fontWeight: 600 }}>Te contacto en 24h</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>Recibirás un mensaje de Lilibeth</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
