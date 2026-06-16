import { type Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { services, site } from '@/data/site'

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} a Bergamo`,
    provider: {
      '@type': 'AutomotiveBusiness',
      name: site.name,
      telephone: site.tel,
      address: site.address,
    },
    areaServed: site.city,
    url: `https://${site.domain}/servizi/${service.slug}/`,
  }

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-[#F7FAFF] py-14">
        <Container>
          <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-8 lg:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1D4ED8]">
                servizio dedicato
              </p>
              <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold tracking-tight text-slate-950">
                {service.title} a Bergamo
              </h1>
              <div className="mt-6 max-w-3xl space-y-5 text-lg leading-8 text-slate-700">
                <p>
                  <strong>{service.text}</strong>
                </p>
                <p>{service.detail}</p>
                <p>
                  Una buona richiesta parte da poche informazioni precise:
                  posizione, modello del veicolo, problema riscontrato e
                  destinazione desiderata. Con questi dati possiamo impostare il
                  recupero in modo più ordinato e ridurre perdite di tempo.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`tel:${site.tel}`}
                  className="rounded-full bg-[#1D4ED8] px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/20"
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
              src={service.image}
              alt={`${service.title} a Bergamo con carroattrezzi professionale`}
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              [
                'Prima capiamo il contesto',
                'Accessi, traffico, posizione del veicolo e condizioni del mezzo cambiano il modo in cui conviene procedere.',
              ],
              [
                'Poi concordiamo la destinazione',
                'Officina, carrozzeria, deposito o indirizzo privato: il punto di arrivo viene deciso prima del recupero.',
              ],
              [
                'Infine proteggiamo il veicolo',
                'Il carico viene gestito con attenzione, soprattutto quando il mezzo è danneggiato, basso, bloccato o in spazi stretti.',
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-[1.5rem] border border-slate-200 bg-[#F8FAFC] p-7"
              >
                <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-10 rounded-[2rem] bg-slate-950 p-8 text-white lg:grid-cols-[0.75fr_1.25fr] lg:p-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-300">
                quando chiamare
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold">
                Meglio fermarsi prima di peggiorare il danno.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-200">
              <p>
                Se l’auto perde liquidi, il motore si spegne, le spie rimangono
                accese o il mezzo vibra in modo anomalo, continuare a guidare
                può trasformare un guasto gestibile in una riparazione più
                pesante.
              </p>
              <p>
                Chiamare subito permette di valutare se serve un traino, un
                recupero in sicurezza o un trasporto programmato. È una scelta
                prudente, soprattutto in città, su strade trafficate o in punti
                con poco spazio.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
