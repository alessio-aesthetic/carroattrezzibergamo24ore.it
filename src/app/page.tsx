import Link from 'next/link'

import { ConsentBanner } from '@/components/ConsentBanner'
import { Container } from '@/components/Container'
import { Reveal } from '@/components/Reveal'
import { CallDock, SiteFooter, SiteHeader } from '@/components/SiteChrome'
import { faqs, services, site, zones } from '@/data/site'

function Hero() {
  return (
    <section className="ber-hero">
      <img className="ber-hero-media" src="/images/hero-bergamo-premium.webp" alt="" fetchPriority="high" />
      <div className="ber-hero-shade" />
      <div className="ber-hero-grain" />
      <span className="ber-hero-index">BG / 24H · LOMBARDIA</span>
      <Container className="ber-hero-inner">
        <div className="ber-hero-copy">
          <div className="ber-kicker">Bergamo e provincia · Soccorso stradale 24 ore</div>
          <h1>Carroattrezzi a<br /><span>Bergamo, 24 ore.</span></h1>
          <p>Auto ferma, batteria scarica o incidente? Chiama adesso, indica il punto esatto e parliamo subito del recupero più adatto al tuo veicolo.</p>
          <div className="ber-hero-actions">
            <a className="ber-primary-cta" href={`tel:${site.tel}`}><span aria-hidden="true">☎</span> Chiama ora <span className="ber-button-phone">{site.phone}</span> <span aria-hidden="true">↗</span></a>
            <Link className="ber-secondary-cta" href="/landing/"><span aria-hidden="true">⌖</span> Invia la tua posizione</Link>
          </div>
          <div className="ber-hero-proof">
            <span><i className="ber-check">✓</i> Contatto diretto</span>
            <span><i className="ber-check">✓</i> Bergamo e provincia</span>
            <span><i className="ber-check">✓</i> Costi concordati prima</span>
          </div>
        </div>
        <div className="ber-hero-flag" aria-label="Carroattrezzi Bergamo, servizio attivo 24 ore">
          <div className="ber-hero-flag-top"><span>Un intervento alla volta</span><span>24 / 7</span></div>
          <b>Prima mettiamo in sicurezza te.</b>
          <p>Poi definiamo posizione, mezzo e destinazione con l’operatore.</p>
          <div className="ber-hero-route" aria-hidden="true" />
        </div>
      </Container>
      <div className="ber-scroll-cue">Scopri l’assistenza</div>
    </section>
  )
}

function StatBar() {
  const items = [
    ['◷', '24 ore', 'anche la notte e nei festivi'],
    ['↗', 'Bergamo', 'città e comuni vicini'],
    ['＋', 'Più veicoli', 'auto, moto e furgoni'],
    ['€', 'Preventivo', 'prima di organizzare il recupero'],
  ]
  return <section className="ber-statbar"><Container className="ber-statbar-inner">{items.map(([icon, title, text]) => <div className="ber-stat" key={title}><i className="ber-stat-icon" aria-hidden="true">{icon}</i><div><b>{title}</b><span>{text}</span></div></div>)}</Container></section>
}

function EmergencySection() {
  return (
    <section className="ber-section ber-section-soft">
      <Container className="ber-container ber-emergency-grid">
        <Reveal className="ber-emergency-photo">
          <img src="/images/services/recupero-auto-in-panne.webp" alt="Intervento con carroattrezzi per auto in panne a Bergamo" loading="lazy" />
          <div className="ber-photo-note"><b>Fermo in città o fuori Bergamo?</b><span>Comunicaci il punto e che cosa è successo: organizziamo insieme il passaggio successivo.</span></div>
        </Reveal>
        <Reveal className="ber-emergency-copy" delay={100}>
          <p className="ber-eyebrow">Quando la strada si ferma</p>
          <h2 className="ber-section-title">Una voce chiara. Il mezzo giusto. La ripartenza.</h2>
          <p>Una gomma danneggiata, un guasto o un sinistro cambiano subito la giornata. Una telefonata semplice aiuta a capire cosa serve, dove si trova il veicolo e quale soluzione è più sensata.</p>
          <div className="ber-urgent-list">
            {services.slice(0,4).map((service,index)=><Link className="ber-urgent-item" href={`/servizi/${service.slug}/`} key={service.slug}><span className="ber-urgent-num">0{index+1}</span><span><b>{service.title}</b><small>{service.text}</small></span><span className="ber-urgent-arrow" aria-hidden="true">↗</span></Link>)}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

function ServicesGrid() {
  return (
    <section id="servizi" className="ber-section ber-section-white">
      <Container className="ber-container">
        <Reveal className="ber-section-head"><div className="ber-section-head-copy"><p className="ber-eyebrow">Un servizio per ogni imprevisto</p><h2 className="ber-section-title">Il recupero giusto<br />parte dal tuo caso.</h2><p className="ber-section-intro">Descrivici cosa è successo e organizziamo un soccorso adatto al veicolo, al luogo e alla destinazione che hai in mente.</p></div><Link className="ber-ghost-link" href={`tel:${site.tel}`}>Parla con l’operatore <span className="ber-arrow">↗</span></Link></Reveal>
        <div className="ber-services-grid">{services.map((service,index)=><Reveal key={service.slug} delay={(index%3)*65}><Link className="ber-service-card" href={`/servizi/${service.slug}/`}><img src={service.image} alt={`${service.title} con carroattrezzi a Bergamo`} loading="lazy"/><span className="ber-service-num">{String(index+1).padStart(2,'0')}</span><div className="ber-service-body"><span className="ber-service-label">Bergamo · 24 ore</span><h3>{service.title}</h3><p>{service.text}</p><span className="ber-service-link">Scopri il servizio <i aria-hidden="true">↗</i></span></div></Link></Reveal>)}</div>
      </Container>
    </section>
  )
}

function Zones() {
  return (
    <section id="zone" className="ber-section ber-section-soft">
      <Container className="ber-container ber-zone-layout">
        <Reveal className="ber-zone-aside"><p className="ber-eyebrow">Un aiuto vicino</p><h2 className="ber-section-title">Bergamo e i suoi dintorni.</h2><p>Dalla città alle principali direttrici della provincia, trovare la zona giusta aiuta a parlare subito del punto e dell’intervento.</p><Link className="ber-ghost-link" href={`tel:${site.tel}`}>Chiama {site.phone} <span className="ber-arrow">↗</span></Link></Reveal>
        <div className="ber-zone-grid">{zones.map((zone,index)=><Reveal key={zone.slug} delay={(index%3)*55}><Link className="ber-zone-card" href={`/zone/${zone.slug}/`}><img src={zone.image} alt="" loading="lazy"/><span>Carroattrezzi · Bergamo</span><b>{zone.name}</b><i aria-hidden="true">↗</i></Link></Reveal>)}</div>
      </Container>
    </section>
  )
}

function Method() {
  const steps = [
    ['01','Spiegaci dov’è il mezzo','Condividi la posizione oppure dicci via, comune, direzione e un punto di riferimento.'],
    ['02','Raccontaci il problema','Indica tipo di veicolo, guasto o danno e ogni dettaglio utile per preparare il recupero.'],
    ['03','Concordiamo l’intervento','Verifichiamo disponibilità, destinazione e prezzo prima di procedere.'],
  ]
  return <section id="metodo" className="ber-section ber-section-dark"><Container className="ber-container"><Reveal className="ber-section-head"><div className="ber-section-head-copy"><p className="ber-eyebrow">Chiaro dal primo minuto</p><h2 className="ber-section-title">Tre passaggi.<br />Niente giri a vuoto.</h2><p className="ber-section-intro">Quando hai già un problema, la richiesta di soccorso deve essere semplice e comprensibile.</p></div><a className="ber-ghost-link" href={`tel:${site.tel}`} style={{color:'#fff'}}>Chiama l’operatore <span className="ber-arrow">↗</span></a></Reveal><div className="ber-steps">{steps.map(([num,title,text],i)=><Reveal key={num} delay={i*100}><article className="ber-step"><div className="ber-step-num">{num}</div><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div></Container></section>
}

function Pricing() {
  return <section className="ber-section ber-section-white"><Container className="ber-container ber-emergency-grid"><Reveal><p className="ber-eyebrow">Prezzi concordati con chiarezza</p><h2 className="ber-section-title">Prima di partire, sai cosa aspettarti.</h2></Reveal><Reveal delay={100}><div className="ber-prose"><p>Il costo dipende dalla distanza, dal tipo di veicolo, dal punto di recupero e dalla destinazione. Per darti un’indicazione concreta servono poche informazioni corrette.</p><p>Prima dell’intervento parla con l’operatore, descrivi la situazione e concorda il preventivo. In caso di accessi difficili, veicolo incidentato o trasferimento fuori provincia, specifica subito ogni dettaglio.</p><a href={`tel:${site.tel}`} className="ber-primary-cta" style={{marginTop:16,color:'#171717',textDecoration:'none'}}>Richiedi un preventivo al telefono <span className="ber-arrow">↗</span></a></div></Reveal></Container></section>
}

function Faq() {
  return <section id="faq" className="ber-section ber-section-soft"><Container className="ber-container ber-faq-grid"><Reveal><p className="ber-eyebrow">Domande frequenti</p><h2 className="ber-section-title">Le risposte prima della chiamata.</h2><p className="ber-section-intro">Se non trovi qui quello che cerchi, l’operatore ti aiuta a capire come muoverti.</p></Reveal><div className="ber-faq-list">{faqs.map((faq)=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></Container></section>
}

function FinalCta() {
  return <section className="ber-final"><Container className="ber-container ber-final-inner"><div><p className="ber-eyebrow">Siamo qui per aiutarti</p><h2>Fermo con l’auto?<br />Partiamo dalla tua posizione.</h2><p>Chiama e raccontaci cosa è successo. Ti aiutiamo a definire il recupero e la destinazione in modo chiaro.</p></div><div className="ber-final-actions"><a href={`tel:${site.tel}`}>☎ Chiama ora · {site.phone}</a><Link href="/landing/">⌖ Invia la posizione</Link></div></Container></section>
}

export default function Home() {
  return <div className="bergamo-site"><SiteHeader active="home"/><main><Hero/><StatBar/><EmergencySection/><ServicesGrid/><Zones/><Method/><Pricing/><Faq/><FinalCta/></main><SiteFooter/><CallDock/><ConsentBanner/></div>
}
