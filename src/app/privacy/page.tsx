import { type Metadata } from 'next'

import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy policy',
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy">
      <p>
        I dati forniti tramite il sito, inclusi numero di telefono, posizione,
        tipo di veicolo e problema segnalato, vengono utilizzati per gestire la
        richiesta e individuare un professionista disponibile.
      </p>
      <h2 className="text-2xl font-bold text-slate-950">Ruolo del servizio</h2>
      <p>
        Il sito opera come piattaforma di intermediazione e può inoltrare la
        richiesta a diversi carroattrezzi indipendenti presenti nella rete. Non
        esegue direttamente il soccorso stradale e non rappresenta un singolo
        operatore.
      </p>
      <p>
        I dati strettamente necessari possono essere comunicati ai
        professionisti contattati per verificare disponibilità e compatibilità
        dell’intervento. Il carroattrezzi incaricato agisce quale soggetto
        autonomo per le attività di propria competenza.
      </p>
    </LegalPage>
  )
}
