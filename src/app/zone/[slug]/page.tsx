import { type Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ConsentBanner } from '@/components/ConsentBanner'
import { Container } from '@/components/Container'
import { Reveal } from '@/components/Reveal'
import { CallDock, SiteFooter, SiteHeader } from '@/components/SiteChrome'
import { services, site, zones } from '@/data/site'

export function generateStaticParams() {
  return zones.map((zone) => ({ slug: zone.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const zone = zones.find((item) => item.slug === params.slug)
  if (!zone) return {}
  return {
    title: { absolute: zone.title },
    description: `${zone.title}: soccorso stradale, traino e recupero veicoli con assistenza chiara e trasporto verso destinazione concordata.`,
    alternates: { canonical: `/zone/${zone.slug}/` },
  }
}

export default function ZonePage({ params }: { params: { slug: string } }) {
  const zone = zones.find((item) => item.slug === params.slug)
  if (!zone) notFound()
  const relatedZones = zones.filter((item) => item.slug !== zone.slug).slice(0, 6)
  const supportServices = services.slice(0, 6)

  return (
    <div className="bergamo-site">
      <SiteHeader active="inner" />
      <main>
        <section className="ber-inner-hero">
          <Container className="ber-container ber-inner-content">
            <div>
              <div className="ber-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#zone">Zone servite</Link><span>/</span><span>{zone.name}</span></div>
              <p className="ber-kicker" style={{marginTop:26}}>Bergamo e provincia · Servizio locale</p>
              <h1>Carroattrezzi <span>a {zone.name}</span></h1>
              <p className="ber-inner-content-copy">Il veicolo si è fermato a {zone.name}? Chiama il servizio di soccorso stradale di Bergamo: descriviamo insieme la situazione e organizziamo il recupero più adatto.</p>
              <div className="ber-inner-actions"><a href={`tel:${site.tel}`}>☎ Chiama ora</a><Link href="/landing/">⌖ Invia posizione</Link></div>
              <div className="ber-inner-pillrow"><span>Auto · moto · furgoni</span><span>Recupero e traino</span><span>Preventivo concordato</span></div>
            </div>
            <Reveal className="ber-inner-photo"><img src={zone.image} alt={`Carroattrezzi a ${zone.name}`} fetchPriority="high"/><span>{zone.name} · Provincia di Bergamo</span></Reveal>
          </Container>
        </section>

        <section className="ber-section ber-section-soft">
          <Container className="ber-container ber-detail-grid">
            <Reveal className="ber-detail-aside"><b>Quando chiamare</b><p>Se l’auto non riparte o non è sicuro proseguire, raccontaci dove si trova e cosa è successo.</p><a href={`tel:${site.tel}`}>Chiama {site.phone}</a><Link href="/landing/" className="ber-detail-aside-link" style={{display:'flex',justifyContent:'center',marginTop:9,color:'#17191b',fontSize:12,fontWeight:800,textDecoration:'none'}}>Condividi la posizione ↗</Link></Reveal>
            <Reveal className="ber-prose" delay={90}>
              <p className="ber-eyebrow">Soccorso stradale a {zone.name}</p>
              <h2 className="ber-section-title" style={{fontSize:'clamp(34px,4vw,52px)',marginBottom:23}}>Ripartiamo dal punto<br/>in cui sei fermo.</h2>
              <p>Il servizio di <strong>carroattrezzi a {zone.name}</strong> è pensato per chi ha bisogno di un contatto pratico quando il veicolo non può continuare il viaggio. Una posizione precisa, il modello del mezzo e una descrizione del problema ci permettono di valutare con te come procedere.</p>
              <p>Gestiamo richieste per auto in panne, batterie scariche, moto ferme, furgoni leggeri, veicoli incidentati e trasporti verso officine o carrozzerie. Se il mezzo si trova in una via stretta, in un parcheggio sotterraneo o vicino a un’area produttiva, segnalaci eventuali limiti di accesso prima della partenza.</p>
              <p>Prima di organizzare il recupero puoi concordare la destinazione e chiedere un’indicazione sul costo. L’intervento viene così preparato con più precisione, tenendo conto del veicolo, delle condizioni della strada e dei chilometri da percorrere.</p>
            </Reveal>
          </Container>
        </section>

        <section className="ber-section ber-section-white">
          <Container className="ber-container">
            <Reveal><p className="ber-eyebrow">Interventi nella zona</p><h2 className="ber-section-title">Cosa possiamo organizzare a {zone.name}.</h2><p className="ber-section-intro">Ogni recupero parte da una valutazione semplice delle condizioni del mezzo e del punto in cui si trova.</p></Reveal>
            <div className="ber-detail-steps">{[['01','Posizione precisa','Via, area, direzione e un punto di riferimento aiutano a raggiungere il veicolo.'],['02','Mezzo e problema','Auto, moto o furgone; guasto, incidente, gomma o batteria da valutare.'],['03','Destinazione chiara','Officina, carrozzeria, deposito o indirizzo concordato prima del traino.']].map(([number,title,text],index)=><Reveal key={number} delay={index*90}><article className="ber-detail-step"><span>{number} / RECUPERO</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>
          </Container>
        </section>

        <section className="ber-section ber-section-soft">
          <Container className="ber-container">
            <Reveal><p className="ber-eyebrow">Servizi per il tuo veicolo</p><h2 className="ber-section-title">Assistenza a {zone.name}, quando serve.</h2></Reveal>
            <div className="ber-related-grid">{supportServices.map((service)=><Link className="ber-related-card" href={`/servizi/${service.slug}/`} key={service.slug}><span>{service.title}</span><span className="ber-arrow">↗</span></Link>)}</div>
          </Container>
        </section>

        <section className="ber-section ber-section-white">
          <Container className="ber-container">
            <Reveal><p className="ber-eyebrow">Comuni vicini</p><h2 className="ber-section-title">Altre zone servite.</h2></Reveal>
            <div className="ber-related-grid">{relatedZones.map((item)=><Link className="ber-related-card" href={`/zone/${item.slug}/`} key={item.slug}><span>Carroattrezzi a {item.name}</span><span className="ber-arrow">↗</span></Link>)}</div>
          </Container>
        </section>
        <section className="ber-final"><Container className="ber-container ber-final-inner"><div><p className="ber-eyebrow">{zone.name} · Soccorso stradale</p><h2>Il veicolo è fermo?<br/>Parliamone subito.</h2><p>Indicaci il punto esatto e il tipo di problema. Organizziamo il recupero con tempi e costo da concordare.</p></div><div className="ber-final-actions"><a href={`tel:${site.tel}`}>☎ Chiama ora</a><Link href="/landing/">⌖ Invia la posizione</Link></div></Container></section>
      </main>
      <SiteFooter /><CallDock /><ConsentBanner />
    </div>
  )
}
