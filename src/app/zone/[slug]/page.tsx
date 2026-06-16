import { type Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { services, site, zones } from '@/data/site'

export function generateStaticParams() {
  return zones.map((zone) => ({ slug: zone.slug }))
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
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

  return (
    <main className="bg-white">
      <section className="bg-[#F7FAFF] py-14">
        <Container>
          <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/10 lg:grid-cols-[1fr_0.9fr]">
            <div className="p-8 lg:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1D4ED8]">
                zona servita
              </p>
              <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold tracking-tight text-slate-950">
                {zone.title}
              </h1>
              <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
                <p>
                  Il servizio di <strong>carroattrezzi a {zone.name}</strong> è
                  pensato per chi vuole una gestione semplice quando il veicolo
                  non può proseguire: una chiamata chiara, una destinazione
                  concordata e un recupero organizzato senza passaggi inutili.
                </p>
                <p>
                  Interveniamo per auto in panne, moto da caricare, furgoni
                  leggeri, veicoli incidentati e trasporti verso officine o
                  carrozzerie. Anche quando il mezzo si trova in un parcheggio,
                  in una strada secondaria o vicino a un’area produttiva,
                  valutiamo gli accessi prima di muoverci.
                </p>
                <p>
                  A {zone.name} contano rapidità e precisione, ma soprattutto
                  conta sapere cosa succederà dopo la chiamata. Ti aiutiamo a
                  comunicare le informazioni giuste e a decidere dove portare il
                  mezzo con calma, anche nelle situazioni urgenti.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`tel:${site.tel}`}
                  className="rounded-full bg-[#1D4ED8] px-6 py-3 text-center text-sm font-bold text-white"
                >
                  Chiama {site.phone}
                </Link>
                <Link
                  href="/landing/"
                  className="rounded-full border border-slate-300 bg-white px-6 py-3 text-center text-sm font-bold text-slate-950"
                >
                  Invia posizione
                </Link>
              </div>
            </div>
            <img
              src={zone.image}
              alt={`Carroattrezzi a ${zone.name} in intervento locale`}
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1D4ED8]">
                gestione locale
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold text-slate-950">
                Recupero ordinato anche lontano dal centro.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-700">
              <p>
                Quando il veicolo è fermo in un punto poco visibile, vicino a
                una curva, in una zona industriale o in un parcheggio privato,
                la posizione precisa è fondamentale. Ti guidiamo nella raccolta
                dei dati utili e prepariamo il recupero prima dell’arrivo.
              </p>
              <p>
                Poi concordiamo la destinazione: officina, carrozzeria,
                abitazione, deposito o altro indirizzo. Questo rende
                l’intervento più ordinato e ti permette di sapere subito dove
                verrà portato il veicolo.
              </p>
            </div>
          </div>

          <div className="mt-14 rounded-[2rem] bg-[#EFF6FF] p-8 lg:p-10">
            <h2 className="font-display text-3xl font-bold text-slate-950">
              Servizi disponibili a {zone.name}
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 9).map((service) => (
                <Link
                  key={service.slug}
                  href={`/servizi/${service.slug}/`}
                  className="rounded-2xl border border-blue-100 bg-white px-5 py-4 font-semibold text-slate-800 shadow-sm transition hover:-translate-y-1 hover:text-[#1D4ED8] hover:shadow-lg"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
