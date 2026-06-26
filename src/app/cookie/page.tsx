import { type Metadata } from 'next'

import { LegalPage } from '@/components/LegalPage'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Cookie policy',
  description: `Informativa sui cookie e sugli strumenti di tracciamento di ${site.name}.`,
  robots: { index: false, follow: true },
}

export default function CookiePage() {
  return (
    <LegalPage title="Cookie policy">
      <p className="text-sm font-semibold text-slate-500">
        Ultimo aggiornamento: 26 giugno 2026
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Cosa sono i cookie</h2>
      <p>
        I cookie e tecnologie analoghe sono piccoli strumenti utilizzati per
        consentire funzioni tecniche, ricordare preferenze e, previo consenso,
        misurare l’efficacia delle campagne pubblicitarie.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Cookie tecnici</h2>
      <p>
        Il sito può utilizzare strumenti strettamente necessari per sicurezza,
        navigazione, memorizzazione delle preferenze e funzionamento dei moduli.
        Questi strumenti non richiedono consenso quando sono indispensabili al
        servizio richiesto.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Misurazione e pubblicità</h2>
      <p>
        Le pagine dedicate alle campagne possono utilizzare Google Ads e relativi
        identificatori per attribuire chiamate o richieste alla campagna. Tali
        strumenti devono essere attivati solo in presenza del consenso richiesto,
        salvo configurazioni che non comportino archiviazione o lettura di dati
        sul dispositivo.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Gestione delle preferenze</h2>
      <p>
        Puoi accettare o rifiutare gli strumenti non necessari attraverso il
        banner, quando presente, e cancellare i cookie dalle impostazioni del
        browser. Il rifiuto non impedisce l’utilizzo delle funzioni essenziali.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Contatti</h2>
      <p>
        Per chiarimenti scrivi a{' '}
        <a className="font-semibold text-[#1D4ED8] underline" href={`mailto:${site.email}`}>
          {site.email}
        </a>.
      </p>
    </LegalPage>
  )
}
