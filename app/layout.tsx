import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Instrument_Serif, Schibsted_Grotesk } from 'next/font/google';

import { CustomCursor } from '@/components/layout/CustomCursor';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { WindingDial } from '@/components/layout/WindingDial';
import { Providers } from '@/components/providers/Providers';
import { SITE, identity } from '@/lib/content';

import './globals.css';

/* Fonts are downloaded and self-hosted at build time with `display: swap`
   and metric fallbacks — satisfies plan §16 (self-hosted, no CLS). */
const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-display',
  fallback: ['ui-serif', 'Georgia', 'Times New Roman', 'serif'],
});

const text = Schibsted_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-text',
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});

/* TODO: Owner input required (T1) — metadataBase uses a placeholder origin until the new
   custom domain is purchased. The retired portfolio URL is never used here.
   Social/OG image intentionally omitted (T2, owner-deferred). */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.originPlaceholder),
  title: {
    default: SITE.title,
    template: `%s — ${identity.name}`,
  },
  description: SITE.description,
  authors: [{ name: identity.name }],
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: 'website',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0c0c10',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          {children}
          <WindingDial />
          <CustomCursor />
        </Providers>
      </body>
    </html>
  );
}
