import Link from 'next/link'

import { Container } from '@/components/Container'
import { ConsentBanner } from '@/components/ConsentBanner'
import { CallDock, SiteFooter, SiteHeader } from '@/components/SiteChrome'
import { site } from '@/data/site'

export function LegalPage({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bergamo-site">
      <SiteHeader active="inner" />
      <main>
        <section className="ber-inner-hero ber-legal-hero">
          <Container className="ber-container ber-legal-heading">
            <div className="ber-breadcrumb"><Link href="/">Home</Link><span>/</span><span>Informazioni</span></div>
            <p className="ber-kicker" style={{marginTop:24}}>Trasparenza · Informazioni legali</p>
            <h1>{title}</h1>
            <p className="ber-inner-content-copy">I dettagli sul servizio, sul trattamento dei dati e sulle condizioni d’uso del sito.</p>
          </Container>
        </section>
        <section className="ber-section ber-section-soft">
          <Container className="ber-container">
            <article className="ber-legal-card">
              <div className="ber-prose ber-legal-copy">{children}</div>
              <p className="ber-legal-vat">P. IVA {site.vatNumber}</p>
            </article>
          </Container>
        </section>
      </main>
      <SiteFooter /><CallDock /><ConsentBanner />
    </div>
  )
}
