import { type Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ConsentBanner } from '@/components/ConsentBanner'
import { Container } from '@/components/Container'
import { Reveal } from '@/components/Reveal'
import { CallDock, SiteFooter, SiteHeader } from '@/components/SiteChrome'
import { services, site, zones } from '@/data/site'

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find((item) => item.slug === params.slug)
  if (!service) return {}
  const title = `${service.title} a Bergamo`
  return {
    title: { absolute: title },
    description: `${title}: intervento chiaro per recupero, traino e trasporto veicoli con destinazione concordata prima del servizio.`,
    alternates: { canonical: `/servizi/${service.slug}/` },
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((item) => item.slug === params.slug)
  if (!service) notFound()
  const others = services.filter((item) => item.slug !== service.slug).slice(0, 6)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} a Bergamo`,
    provider: { '@type': 'AutomotiveBusiness', name: site.name, telephone: site.tel, vatID: site.vatNumber },
    areaServed: site.city,
    url: `https://${site.domain}/servizi/${service.slug}/`,
  }

  return (
    <div className="bergamo-site">
      <SiteHeader active="inner" />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <section className="ber-inner-hero">
          <Container className="ber-container ber-inner-content">
            <div>
              <div className="ber-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#servizi">Servizi</Link><span>/</span><span>{service.title}</span></div>
              <p className="ber-kicker" style={{marginTop:26}}>Soccorso stradale · Bergamo e provincia</p>
              <h1>{service.title}<br/><span>a Bergamo</span></h1>
              <p className="ber-inner-content-copy">{service.text}</p>
              <div className="ber-inner-actions"><a href={`tel:${site.tel}`}>☎ Chiama ora</a><Link href="/landing/">⌖ Invia posizione</Link></div>
              <div className="ber-inner-pillrow"><span>Intervento 24 ore</span><span>Preventivo concordato</span><span>Destinazione definita prima</span></div>
            </div>
            <Reveal className="ber-inner-photo"><img src={service.image} alt={`${service.title} a Bergamo`} fetchPriority="high"/><span>{service.title} · Bergamo e provincia</span></Reveal>
          </Container>
        </section>

        <section className="ber-section ber-section-soft">
          <Container className="ber-container ber-detail-grid">
            <Reveal className="ber-detail-aside"><b>Richiedi assistenza</b><p>Parla con l’operatore e descrivi veicolo, problema e punto di recupero.</p><a href={`tel:${site.tel}`}>☎ Chiama {site.phone}</a><p style={{marginTop:12}}>Disponibilità e tempi vanno confermati al telefono. Concorda il preventivo prima dell’intervento.</p></Reveal>
            <Reveal className="ber-prose" delay={90}>
              <p className="ber-eyebrow">Il servizio</p>
              <h2 className="ber-section-title" style={{fontSize:'clamp(34px,4vw,52px)',marginBottom:23}}>{service.title} a Bergamo:<br/>come organizzarci.</h2>
              <p><strong>{service.text}</strong></p>
              <p>{service.detail}</p>
              <p>Per preparare correttamente l’intervento comunica la posizione, marca e modello del veicolo, il problema riscontrato e l’indirizzo di destinazione. Se ci sono danni alle ruote, accessi stretti, rampe o limitazioni per i mezzi, descrivili prima di confermare il recupero.</p>
              <p>Disponibilità, tempi e costo dipendono dal punto in cui si trova il veicolo e dalle caratteristiche dell’intervento. Chiedi un preventivo e concorda il trasporto prima della partenza del carroattrezzi.</p>
            </Reveal>
          </Container>
        </section>

        <section className="ber-section ber-section-white">
          <Container className="ber-container">
            <Reveal><p className="ber-eyebrow">Un intervento ben preparato</p><h2 className="ber-section-title">Dalla chiamata alla destinazione.</h2><p className="ber-section-intro">Poche informazioni complete aiutano a scegliere come raggiungere il veicolo e caricarlo con attenzione.</p></Reveal>
            <div className="ber-detail-steps">{[['01','Descrivi il veicolo','Tipo, modello, condizioni di marcia e ogni danno visibile.'],['02','Indica il punto esatto','Via, comune, direzione e accessi disponibili per il mezzo di soccorso.'],['03','Concorda dove portarlo','Scegli officina, carrozzeria o altro indirizzo e chiedi il costo del trasporto.']].map(([number,title,text],index)=><Reveal key={number} delay={index*90}><article className="ber-detail-step"><span>{number} / ASSISTENZA</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>
          </Container>
        </section>

        <section className="ber-section ber-section-soft">
          <Container className="ber-container">
            <Reveal><p className="ber-eyebrow">Servizi collegati</p><h2 className="ber-section-title">Altre soluzioni di soccorso stradale.</h2></Reveal>
            <div className="ber-related-grid">{others.map((item)=><Link className="ber-related-card" href={`/servizi/${item.slug}/`} key={item.slug}><span>{item.title}</span><span className="ber-arrow">↗</span></Link>)}</div>
          </Container>
        </section>

        <section className="ber-section ber-section-white">
          <Container className="ber-container">
            <Reveal><p className="ber-eyebrow">Bergamo e provincia</p><h2 className="ber-section-title">Soccorso vicino al tuo veicolo.</h2></Reveal>
            <div className="ber-related-grid">{zones.slice(0,6).map((zone)=><Link className="ber-related-card" href={`/zone/${zone.slug}/`} key={zone.slug}><span>Carroattrezzi a {zone.name}</span><span className="ber-arrow">↗</span></Link>)}</div>
          </Container>
        </section>
        <section className="ber-final"><Container className="ber-container ber-final-inner"><div><p className="ber-eyebrow">Assistenza stradale · Bergamo</p><h2>La tua auto è ferma?<br/>Organizziamo il recupero.</h2><p>Chiama per comunicare il problema, concordare la disponibilità e definire la destinazione.</p></div><div className="ber-final-actions"><a href={`tel:${site.tel}`}>☎ Chiama ora</a><Link href="/landing/">⌖ Invia la posizione</Link></div></Container></section>
      </main>
      <SiteFooter /><CallDock /><ConsentBanner />
    </div>
  )
}
