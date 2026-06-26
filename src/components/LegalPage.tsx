import Link from 'next/link'

import { Container } from '@/components/Container'
import { site } from '@/data/site'

export function LegalPage({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-slate-50 py-12 text-slate-900 sm:py-20">
      <Container>
        <Link href="/" className="text-sm font-bold text-[#1D4ED8]">
          Torna alla home
        </Link>
        <div className="mt-8 max-w-3xl rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-950/5 sm:p-10">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
            {children}
          </div>
          <p className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
            P. IVA {site.vatNumber}
          </p>
        </div>
      </Container>
    </main>
  )
}
