import Link from 'next/link'

import { Container } from '@/components/Container'
import { CallDock, SiteFooter, SiteHeader } from '@/components/SiteChrome'
import { site } from '@/data/site'

export default function NotFound() {
  return (
    <div className="bergamo-site">
      <SiteHeader active="inner" />
      <main>
        <section className="ber-inner-hero ber-not-found">
          <Container className="ber-container ber-not-found-inner">
            <p className="ber-kicker">Errore 404 · Bergamo e provincia</p>
            <h1>Questa strada<br/><span>non porta qui.</span></h1>
            <p className="ber-inner-content-copy">La pagina che cercavi non è disponibile. Torna alla home oppure chiama per ricevere assistenza con il tuo veicolo.</p>
            <div className="ber-inner-actions"><Link href="/">Torna alla home ↗</Link><a href={`tel:${site.tel}`}>☎ Chiama {site.phone}</a></div>
          </Container>
        </section>
      </main>
      <SiteFooter /><CallDock />
    </div>
  )
}
