import { type Metadata } from 'next'

import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Termini e condizioni',
  robots: { index: false, follow: true },
}

export default function TermsPage() {
  return (
    <LegalPage title="Termini e condizioni">
      <h2 className="text-2xl font-bold text-slate-950">Servizio di intermediazione</h2>
      <p>
        Il sito raccoglie la richiesta dell’utente e la trasmette a uno o più
        carroattrezzi indipendenti potenzialmente disponibili. Non svolge
        direttamente attività di traino, recupero, riparazione o trasporto e
        non opera come singola impresa di soccorso stradale.
      </p>
      <h2 className="text-2xl font-bold text-slate-950">Responsabilità dell’intervento</h2>
      <p>
        Preventivo, accettazione dell’incarico, tempi di arrivo, modalità
        operative, custodia del veicolo, trasporto ed esecuzione del servizio
        sono concordati con il carroattrezzi incaricato e restano sotto la sua
        responsabilità professionale. L’utente è invitato a verificare prezzo e
        condizioni prima di autorizzare l’intervento.
      </p>
      <p>
        Nei limiti consentiti dalla legge, la piattaforma non risponde di
        ritardi, indisponibilità, danni o inadempimenti riconducibili al
        professionista indipendente che esegue il servizio.
      </p>
    </LegalPage>
  )
}
