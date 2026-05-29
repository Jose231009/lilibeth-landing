// ─────────────────────────────────────────────────────────
// Política de Privacidad + Aviso Legal — RGPD España
// ─────────────────────────────────────────────────────────

export const metadata = {
  title: 'Privacidad y Aviso Legal · Lilibeth Paris',
  description: 'Política de privacidad y aviso legal conforme al RGPD y la LSSI.',
};

export default function PrivacidadPage() {
  return (
    <main style={{
      background: '#0a0a0a',
      minHeight: '100vh',
      padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)',
      color: '#fff',
    }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Back link */}
        <a href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '13px', color: 'rgba(255,255,255,0.4)',
          textDecoration: 'none', marginBottom: '48px',
          letterSpacing: '0.06em',
        }}>
          ← Volver
        </a>

        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 400,
          color: '#C9A96E',
          marginBottom: '48px',
          lineHeight: 1.2,
        }}>
          Política de Privacidad<br />y Aviso Legal
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

          {/* AVISO LEGAL */}
          <section>
            <h2 style={h2Style}>1. Aviso Legal e Identificación del Responsable</h2>
            <p style={pStyle}>
              En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa:
            </p>
            <ul style={ulStyle}>
              <li><strong>Titular:</strong> Lilibeth Paris</li>
              <li><strong>Actividad:</strong> Mentora de negocios online y distribuidora independiente</li>
              <li><strong>Contacto:</strong> <a href="mailto:contacto@lilibethparis.com" style={linkStyle}>contacto@lilibethparis.com</a></li>
              <li><strong>Web:</strong> www.lilibethparis.com</li>
            </ul>
          </section>

          {/* RGPD */}
          <section>
            <h2 style={h2Style}>2. Política de Privacidad (RGPD)</h2>
            <p style={pStyle}>
              De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD), te informamos sobre el tratamiento de tus datos personales.
            </p>

            <h3 style={h3Style}>¿Quién trata tus datos?</h3>
            <p style={pStyle}>Lilibeth Paris, como responsable del tratamiento.</p>

            <h3 style={h3Style}>¿Qué datos recogemos?</h3>
            <p style={pStyle}>
              A través del formulario de contacto: nombre completo, dirección de correo electrónico, número de teléfono/WhatsApp, y respuestas a las preguntas del formulario.
            </p>

            <h3 style={h3Style}>¿Con qué finalidad?</h3>
            <ul style={ulStyle}>
              <li>Gestionar tu solicitud de información y contacto</li>
              <li>Hacerte llegar información sobre el modelo de negocio presentado</li>
              <li>Contactarte por los medios indicados (WhatsApp, email)</li>
            </ul>

            <h3 style={h3Style}>¿Cuál es la base legal?</h3>
            <p style={pStyle}>
              El consentimiento expreso que prestas al enviar el formulario (art. 6.1.a RGPD).
            </p>

            <h3 style={h3Style}>¿Cuánto tiempo conservamos tus datos?</h3>
            <p style={pStyle}>
              Hasta que revoques tu consentimiento o, en su defecto, durante el tiempo necesario para la finalidad indicada y los plazos legales aplicables.
            </p>

            <h3 style={h3Style}>¿Con quién compartimos tus datos?</h3>
            <p style={pStyle}>
              No cedemos datos a terceros salvo obligación legal. Utilizamos Make (Integromat) como herramienta de automatización, sujeta a los estándares RGPD, para procesar las solicitudes recibidas.
            </p>

            <h3 style={h3Style}>Tus derechos</h3>
            <p style={pStyle}>
              Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación del tratamiento escribiendo a{' '}
              <a href="mailto:contacto@lilibethparis.com" style={linkStyle}>contacto@lilibethparis.com</a>.
              También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).
            </p>
          </section>

          {/* COOKIES */}
          <section>
            <h2 style={h2Style}>3. Política de Cookies</h2>
            <p style={pStyle}>
              Esta web puede utilizar cookies técnicas necesarias para el funcionamiento del sitio y cookies de análisis (Meta Pixel) para medir el rendimiento de las campañas publicitarias. Al navegar por este sitio, aceptas el uso de dichas cookies conforme a esta política.
            </p>
            <p style={pStyle}>
              Puedes configurar tu navegador para rechazar las cookies o ser notificado cuando se envíen. Ten en cuenta que algunas funcionalidades del sitio pueden verse afectadas.
            </p>
          </section>

          {/* PROPIEDAD INTELECTUAL */}
          <section>
            <h2 style={h2Style}>4. Propiedad Intelectual</h2>
            <p style={pStyle}>
              Todos los contenidos de este sitio web (textos, imágenes, diseño, código) son propiedad de Lilibeth Paris o se utilizan con la debida autorización. Queda prohibida su reproducción total o parcial sin consentimiento expreso.
            </p>
          </section>

          {/* LIMITACIÓN DE RESPONSABILIDAD */}
          <section>
            <h2 style={h2Style}>5. Limitación de Responsabilidad</h2>
            <p style={pStyle}>
              Los resultados presentados en este sitio corresponden a experiencias personales de la titular y de personas de su equipo. Los resultados individuales pueden variar y dependen del esfuerzo, la dedicación y las circunstancias de cada persona. No se garantizan ingresos específicos.
            </p>
          </section>

        </div>

        <p style={{
          marginTop: '60px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.2)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '24px',
        }}>
          Última actualización: mayo 2026 · Madrid, España
        </p>
      </div>
    </main>
  );
}

// Estilos reutilizables
const h2Style: React.CSSProperties = {
  fontSize: 'clamp(16px, 2vw, 19px)',
  fontWeight: 600,
  color: '#C9A96E',
  marginBottom: '12px',
  letterSpacing: '0.01em',
};

const h3Style: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.7)',
  marginTop: '20px',
  marginBottom: '6px',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const pStyle: React.CSSProperties = {
  fontSize: '15px',
  color: 'rgba(255,255,255,0.55)',
  lineHeight: 1.8,
};

const ulStyle: React.CSSProperties = {
  fontSize: '15px',
  color: 'rgba(255,255,255,0.55)',
  lineHeight: 1.8,
  paddingLeft: '20px',
  listStyleType: 'disc',
};

const linkStyle: React.CSSProperties = {
  color: '#C9A96E',
  textDecoration: 'underline',
};
