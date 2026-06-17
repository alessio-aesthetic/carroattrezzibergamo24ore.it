import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import Script from 'next/script'
import clsx from 'clsx'

import { site } from '@/data/site'
import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    template: `%s | ${site.name}`,
    default: site.title,
  },
  description: site.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.domain,
    locale: 'it_IT',
    type: 'website',
  },
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AutomotiveBusiness'],
    name: site.name,
    url: `https://${site.domain}`,
    telephone: site.tel,
    email: site.email,
    address: site.address,
    areaServed: site.city,
    image: `https://${site.domain}/images/hero-bergamo.webp`,
  }

  return (
    <html
      lang="it"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <body className="flex h-full flex-col">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-972513984"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-972513984');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
