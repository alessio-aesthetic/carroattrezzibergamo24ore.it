import Link from 'next/link'

import { Container } from '@/components/Container'
import { site, services, zones } from '@/data/site'

function Arrow() {
  return <span aria-hidden="true" className="ber-arrow">↗</span>
}

export function SiteHeader({ active = 'home' }: { active?: 'home' | 'inner' }) {
  const anchor = (id: string) => active === 'home' ? `#${id}` : `/#${id}`
  return (
    <>
      <div className="ber-utility">
        <Container className="ber-utility-inner">
          <span><i className="ber-live-dot" /> Soccorso stradale a Bergamo · Operativi 24 ore</span>
          <a href={`tel:${site.tel}`}>Chiama direttamente <b>{site.phone}</b></a>
        </Container>
      </div>
      <header className="ber-header">
        <Container className="ber-header-inner">
          <Link href="/" className="ber-brand" aria-label="Carroattrezzi Bergamo 24 Ore, home">
            <img src="/images/logo-bergamo-24ore.png" alt="Carroattrezzi Bergamo 24 Ore" />
          </Link>
          <nav className="ber-nav" aria-label="Navigazione principale">
            <a href={anchor('servizi')}>Servizi</a>
            <a href={anchor('zone')}>Zone servite</a>
            <a href={anchor('metodo')}>Come funziona</a>
            <a href={anchor('faq')}>FAQ</a>
          </nav>
          <div className="ber-header-actions">
            <Link href="/landing/" className="ber-location-link"><span aria-hidden="true">⌖</span> Invia posizione</Link>
            <a href={`tel:${site.tel}`} className="ber-header-call"><span aria-hidden="true">☎</span> Chiama ora <Arrow /></a>
          </div>
          <details className="ber-mobile-menu">
            <summary aria-label="Apri il menu"><i/><i/></summary>
            <nav className="ber-mobile-nav" aria-label="Navigazione mobile">
              <a href={anchor('servizi')}>Servizi</a><a href={anchor('zone')}>Zone servite</a><a href={anchor('metodo')}>Come funziona</a><a href={anchor('faq')}>Domande frequenti</a><Link href="/landing/">Invia la posizione ↗</Link>
            </nav>
          </details>
        </Container>
      </header>
    </>
  )
}

export function SiteFooter() {
  return (
    <footer className="ber-footer">
      <Container>
        <div className="ber-footer-main">
          <div className="ber-footer-brand">
            <Link href="/" aria-label="Torna alla home"><img src="/images/logo-bergamo-24ore.png" alt="Carroattrezzi Bergamo 24 Ore" /></Link>
            <p>Una risposta concreta quando il tuo veicolo si ferma. Recupero, traino e trasporto a Bergamo e in provincia.</p>
            <a href={`tel:${site.tel}`} className="ber-footer-phone">{site.phone} <Arrow /></a>
          </div>
          <div><span className="ber-footer-label">Assistenza</span>{services.slice(0, 5).map((service) => <Link key={service.slug} href={`/servizi/${service.slug}/`}>{service.title}</Link>)}</div>
          <div><span className="ber-footer-label">Territorio</span>{zones.slice(0, 6).map((zone) => <Link key={zone.slug} href={`/zone/${zone.slug}/`}>{zone.name}</Link>)}</div>
          <div><span className="ber-footer-label">Informazioni</span><p>P. IVA {site.vatNumber}</p><a href={`mailto:${site.email}`}>{site.email}</a><Link href="/privacy/">Privacy policy</Link><Link href="/termini/">Termini e condizioni</Link><Link href="/cookie/">Cookie policy</Link></div>
        </div>
        <div className="ber-footer-bottom"><span>© 2026 {site.name}</span><span>Bergamo · Lombardia · Soccorso stradale 24 ore</span><a href="https://www.google.com/maps/search/Bergamo" target="_blank" rel="noreferrer">Bergamo e provincia <Arrow /></a></div>
      </Container>
    </footer>
  )
}

export function CallDock() {
  return (
    <div className="ber-call-dock">
      <a href="/landing/" className="ber-dock-location"><span aria-hidden="true">⌖</span> Invia posizione</a>
      <a href={`tel:${site.tel}`} className="ber-dock-call"><span aria-hidden="true">☎</span> Chiama ora</a>
    </div>
  )
}

export function SiteEnd({ active = 'inner' }: { active?: 'home' | 'inner' }) {
  return <><SiteFooter /><CallDock /></>
}
