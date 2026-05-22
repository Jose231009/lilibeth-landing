import type { Metadata } from 'next';
import { Instrument_Serif, Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lilibeth Paris · Viajá el mundo mientras tus ingresos trabajan por ti',
  description:
    'Descubrí el modelo que +200 personas en 12 países usan para generar ingresos recurrentes — mientras viajan y viven sin depender de un horario fijo.',
  openGraph: {
    title: 'Lilibeth Paris · iCruises',
    description: 'Ingresos recurrentes mientras viajas el mundo.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${instrumentSerif.variable} ${outfit.variable}`}
    >
      <head>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '955502993569248');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=955502993569248&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
