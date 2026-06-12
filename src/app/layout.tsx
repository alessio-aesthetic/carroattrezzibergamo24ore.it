import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
