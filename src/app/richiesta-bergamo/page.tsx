import type { Metadata } from 'next'

import { site } from '@/data/site'
import { RichiestaBergamoClient } from './RichiestaBergamoClient'

export const metadata: Metadata = {
  title: {
    absolute: 'Richiesta Carroattrezzi Bergamo | Posizione GPS',
  },
  description:
    'Compila il form per inviare posizione, veicolo e problema: ricevi una chiamata rapida dal carroattrezzi disponibile a Bergamo.',
  alternates: {
    canonical: '/richiesta-bergamo',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RichiestaBergamoPage() {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AutomotiveBusiness'],
    name: site.name,
    url: `https://${site.domain}/richiesta-bergamo`,
    telephone: site.tel,
    email: site.email,
    address: site.address,
    areaServed: ['Bergamo', 'Bergamo e provincia'],
    openingHours: 'Mo-Su 00:00-23:59',
    image: `https://${site.domain}/images/logo-bergamo-24ore.png`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <RichiestaBergamoClient />
    </>
  )
}
