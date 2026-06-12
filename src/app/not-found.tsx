import Link from 'next/link'

import { Container } from '@/components/Container'
import { site } from '@/data/site'

export default function NotFound() {
  return (
    <main className="bg-slate-950 py-28 text-white">
      <Container>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-300">
          pagina non trovata
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold">
          Torna al servizio di carroattrezzi a Bergamo
        </h1>
        <p className="mt-5 max-w-2xl text-slate-300">
          La pagina richiesta non è disponibile. Per assistenza stradale,
          recupero o traino auto puoi tornare alla home o chiamare direttamente.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
          >
            Home
          </Link>
          <Link
            href={`tel:${site.tel}`}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold"
          >
            Chiama {site.phone}
          </Link>
        </div>
      </Container>
    </main>
  )
}
