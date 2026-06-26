import Link from 'next/link'

import { ConsentBanner } from '@/components/ConsentBanner'
import { Container } from '@/components/Container'
import { faqs, services, site, zones } from '@/data/site'

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <img
        src="/images/logo-bergamo-24ore.png"
        alt="Carroattrezzi Bergamo 24 Ore"
        className="h-14 w-auto sm:h-16"
      />
    </Link>
  )
}

function PhoneLink({
  className = '',
  children = `Chiama ${site.phone}`,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <Link
      href={`tel:${site.tel}`}
      className={`inline-flex items-center justify-center rounded-full bg-[#1D4ED8] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#1E40AF] ${className}`}
    >
      {children}
    </Link>
  )
}

function LandingLink({ className = '', children = 'Invia posizione' }: { className?: string; children?: React.ReactNode }) {
  return (
    <Link
      href="/landing/"
      className={`inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:border-[#1D4ED8] hover:text-[#1D4ED8] ${className}`}
    >
      {children}
    </Link>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <Container className="flex min-h-20 items-center justify-between gap-5">
        <Brand />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-700 lg:flex">
          <a href="#servizi" className="hover:text-[#1D4ED8]">
            Servizi
          </a>
          <a href="#zone" className="hover:text-[#1D4ED8]">
            Zone
          </a>
          <a href="#metodo" className="hover:text-[#1D4ED8]">
            Metodo
          </a>
          <a href="#faq" className="hover:text-[#1D4ED8]">
            Domande
          </a>
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LandingLink className="py-2.5" />
          <PhoneLink className="py-2.5" />
        </div>
        <PhoneLink className="px-5 lg:hidden">Chiama</PhoneLink>
      </Container>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F7FAFF]">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-100/70 to-transparent" />
      <Container className="relative grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div>
          <p className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-[#1D4ED8] shadow-sm">
            Soccorso stradale locale, attivo giorno e notte
          </p>
          <h1 className="mt-7 max-w-5xl font-display text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Carroattrezzi a Bergamo
          </h1>
          <div className="mt-7 max-w-3xl space-y-5 text-lg leading-8 text-slate-700">
            <p>
              Un guasto, una batteria scarica o un incidente leggero possono
              bloccare tutto in pochi secondi. In quel momento servono
              <strong> risposte chiare, tempi realistici e un recupero gestito con cura</strong>,
              non frasi confuse. Per questo il servizio di carroattrezzi a
              Bergamo nasce con una procedura semplice: ascoltiamo il problema,
              localizziamo il veicolo e concordiamo subito dove portarlo.
            </p>
            <p>
              Interveniamo in città, nelle zone industriali, nei parcheggi, sulle
              strade di collegamento e nei comuni vicini. Ogni richiesta viene
              gestita con attenzione al mezzo e alla situazione: auto in panne,
              moto ferme, furgoni da recuperare, veicoli incidentati o trasporti
              programmati verso officina e carrozzeria.
            </p>
            <p>
              Il nostro obiettivo è farti sentire seguito dal primo minuto. Ti
              diciamo cosa comunicare, come prepararti all’arrivo del mezzo e
              quali informazioni servono per evitare attese inutili.
            </p>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PhoneLink />
            <LandingLink>Invia posizione</LandingLink>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-blue-200 via-white to-amber-100 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/12">
            <img
              src="/images/hero-bergamo.webp"
              alt="Carroattrezzi a Bergamo durante un intervento stradale"
              className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 rounded-3xl bg-white/92 p-5 shadow-xl backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1D4ED8]">
                Bergamo e provincia
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-950">
                Recupero, traino e assistenza 24 ore.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <Container className="grid gap-6 py-8 md:grid-cols-4">
        {[
          ['24H', 'disponibilità continuativa'],
          ['Auto', 'moto e furgoni leggeri'],
          ['Chiaro', 'prezzo spiegato prima'],
          ['Locale', 'Bergamo e comuni vicini'],
        ].map(([value, label]) => (
          <div key={label} className="border-l-4 border-[#1D4ED8] pl-4">
            <p className="font-display text-3xl font-bold text-slate-950">
              {value}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-600">{label}</p>
          </div>
        ))}
      </Container>
    </section>
  )
}

function EmergencySection() {
  const items = services.slice(0, 4)

  return (
    <section className="bg-[#F8FAFC] py-20">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1D4ED8]">
            Urgenze reali
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Quando il veicolo si ferma, serve un piano semplice.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
            Le richieste più frequenti vengono gestite con priorità, perché sono
            quelle in cui ogni minuto pesa: auto bloccata, traino da organizzare,
            incidente da liberare o moto da caricare con attenzione.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {items.map((service) => (
            <Link
              key={service.slug}
              href={`/servizi/${service.slug}`}
              className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={service.image}
                alt={`${service.title} a Bergamo`}
                className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <p className="text-sm font-bold text-[#1D4ED8]">
                  {service.title} a Bergamo
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-950">
                  {service.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  {service.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ServicesGrid() {
  return (
    <section id="servizi" className="bg-white py-20">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1D4ED8]">
            Servizi
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Tutto quello che serve quando un mezzo non può proseguire.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Dal recupero urgente al trasporto programmato, ogni servizio è
            impostato per essere comprensibile prima dell’intervento e preciso
            durante il carico.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/servizi/${service.slug}`}
              className="group rounded-[1.5rem] border border-slate-200 bg-[#F8FAFC] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              <div className="h-1.5 w-14 rounded-full bg-[#1D4ED8]" />
              <h3 className="mt-5 text-2xl font-bold text-slate-950">
                {service.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-700">
                {service.text}
              </p>
              <span className="mt-5 inline-flex text-sm font-bold text-[#1D4ED8]">
                Apri il servizio
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Zones() {
  return (
    <section id="zone" className="bg-[#EFF6FF] py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1D4ED8]">
              Dove interveniamo
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Bergamo e le principali località vicine.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Copriamo la città, le aree produttive e i comuni collegati dalle
              principali direttrici. Ogni zona ha una pagina dedicata con
              informazioni utili e contatto rapido.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {zones.map((zone) => (
              <Link
                key={zone.slug}
                href={`/zone/${zone.slug}`}
                className="rounded-2xl border border-blue-100 bg-white p-5 font-bold text-slate-950 shadow-sm transition hover:-translate-y-1 hover:text-[#1D4ED8] hover:shadow-lg"
              >
                {zone.title}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Method() {
  return (
    <section id="metodo" className="bg-white py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1D4ED8]">
              Metodo
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-slate-950">
              Tre passaggi, zero confusione.
            </h2>
          </div>
          {[
            [
              '1',
              'Capire il punto esatto',
              'Raccogliamo posizione, tipo di mezzo, problema e destinazione. Una chiamata fatta bene evita giri a vuoto.',
            ],
            [
              '2',
              'Preparare il recupero',
              'Valutiamo accessi, spazi, danni visibili e condizioni della strada prima di organizzare il carico.',
            ],
            [
              '3',
              'Portare il veicolo dove serve',
              'Concordiamo il punto di consegna e gestiamo il trasporto con attenzione, fino alla destinazione scelta.',
            ],
          ].map(([number, title, text]) => (
            <div
              key={title}
              className="rounded-[1.5rem] border border-slate-200 bg-[#F8FAFC] p-7"
            >
              <p className="font-display text-5xl font-bold text-[#1D4ED8]">
                {number}
              </p>
              <h3 className="mt-4 text-2xl font-bold text-slate-950">{title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-700">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Pricing() {
  return (
    <section className="bg-slate-950 py-20 text-white">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-300">
            Prezzi chiari
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Prima capiamo il caso, poi ti diamo un’indicazione sensata.
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-8 text-slate-200">
          <p>
            Il costo di un intervento dipende da distanza, posizione del veicolo,
            tipo di mezzo, complessità del carico e destinazione richiesta. Per
            questo preferiamo raccogliere prima le informazioni importanti e
            spiegare il servizio in modo trasparente.
          </p>
          <p>
            Se il mezzo è in un parcheggio stretto, in autostrada, su una rampa
            o dopo un sinistro, la gestione cambia. Una valutazione iniziale
            corretta protegge il veicolo e ti evita sorprese.
          </p>
        </div>
      </Container>
    </section>
  )
}

function Faq() {
  return (
    <section id="faq" className="bg-white py-20">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1D4ED8]">
            Domande frequenti
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Le risposte che servono prima di chiamare.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-[1.5rem] border border-slate-200 bg-[#F8FAFC] p-6"
            >
              <h3 className="text-xl font-bold text-slate-950">{faq.question}</h3>
              <p className="mt-3 text-base leading-7 text-slate-700">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="bg-[#1D4ED8] py-20 text-white">
      <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Hai il veicolo fermo?
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50">
            Chiama ora, indica dove ti trovi e scegli la destinazione. Ti
            aiutiamo a organizzare il recupero nel modo più semplice possibile.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Link
            href={`tel:${site.tel}`}
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-[#1D4ED8] shadow-xl transition hover:bg-blue-50"
          >
            Chiama {site.phone}
          </Link>
          <Link
            href="/landing/"
            className="inline-flex items-center justify-center rounded-full border border-white/60 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Invia posizione
          </Link>
        </div>
      </Container>
    </section>
  )
}

function StickyCall() {
  return (
    <Link
      href={`tel:${site.tel}`}
      className="fixed bottom-4 right-4 z-40 rounded-full bg-[#1D4ED8] px-4 py-3 text-xs font-bold text-white shadow-2xl shadow-blue-950/30 ring-1 ring-white/40 transition hover:bg-[#1E40AF] sm:px-5 sm:text-sm"
    >
      Chiama
    </Link>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-950 py-14 text-white">
      <Container className="grid gap-10 md:grid-cols-4">
        <div>
          <Brand />
          <p className="mt-5 text-sm leading-6 text-slate-300">
            Il sito mette in contatto chi necessita di assistenza con diversi
            carroattrezzi indipendenti disponibili nella rete. Operiamo come
            intermediario e non come singolo carroattrezzi.
          </p>
        </div>
        <div>
          <p className="font-bold">Contatti</p>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p>P. IVA {site.vatNumber}</p>
            <p>{site.phone}</p>
            <p>{site.email}</p>
            <div className="pt-2">
              <Link href="/privacy/" className="block hover:text-white">
                Privacy policy
              </Link>
              <Link href="/termini/" className="mt-2 block hover:text-white">
                Termini e condizioni
              </Link>
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold">Servizi</p>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            {services.slice(0, 5).map((service) => (
              <Link
                key={service.slug}
                href={`/servizi/${service.slug}`}
                className="block hover:text-white"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold">Zone</p>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            {zones.slice(0, 5).map((zone) => (
              <Link
                key={zone.slug}
                href={`/zone/${zone.slug}`}
                className="block hover:text-white"
              >
                {zone.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <EmergencySection />
        <ServicesGrid />
        <Zones />
        <Method />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCall />
      <ConsentBanner />
    </>
  )
}
