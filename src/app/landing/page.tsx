import { type Metadata } from 'next'

import { site } from '@/data/site'
import { LandingClient } from './LandingClient'

export const metadata: Metadata = {
  title: {
    absolute: 'Carroattrezzi Bergamo 24 Ore | Soccorso Stradale Rapido',
  },
  description:
    'Auto ferma a Bergamo? Richiedi carroattrezzi 24 ore, soccorso stradale rapido, recupero auto e assistenza urgente.',
  alternates: {
    canonical: '/landing/',
  },
}

export default function LandingPage() {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AutomotiveBusiness'],
    name: site.name,
    url: `https://${site.domain}/landing/`,
    telephone: site.tel,
    email: site.email,
    address: site.address,
    areaServed: ['Bergamo', 'Bergamo e provincia'],
    openingHours: 'Mo-Su 00:00-23:59',
    image: `https://${site.domain}/images/logo-bergamo-24ore.png`,
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Il carroattrezzi è disponibile 24 ore a Bergamo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì, puoi chiamare per soccorso stradale urgente a Bergamo e nei comuni vicini, anche di sera, nei festivi e durante la notte.',
        },
      },
      {
        '@type': 'Question',
        name: 'Posso inviare la posizione GPS dal telefono?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Si, dalla pagina puoi inviare la posizione GPS compilando il mini form. Se preferisci parlare con una persona, puoi chiamare direttamente.',
        },
      },
      {
        '@type': 'Question',
        name: 'Gestite anche auto in panne, incidenti e moto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì, il servizio copre auto in panne, veicoli incidentati, batteria scarica, recupero moto e trasporto veicoli.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <LandingClient />
    </>
  )
}
