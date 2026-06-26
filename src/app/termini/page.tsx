import { type Metadata } from 'next'

import { LegalPage } from '@/components/LegalPage'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Termini e condizioni',
  description: `Termini di utilizzo del servizio di intermediazione ${site.name}.`,
  robots: { index: false, follow: true },
}

export default function TermsPage() {
  return (
    <LegalPage title="Termini e condizioni">
      <p className="text-sm font-semibold text-slate-500">
        Ultimo aggiornamento: 26 giugno 2026
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Oggetto del servizio</h2>
      <p>
        {site.name} raccoglie la richiesta dell’utente e la inoltra a uno o più
        carroattrezzi indipendenti potenzialmente disponibili. La piattaforma non
        esegue direttamente traino, recupero, riparazione, custodia o trasporto e
        non opera come singola impresa di soccorso stradale.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Invio della richiesta</h2>
      <p>
        L’utente si impegna a fornire dati corretti su posizione, veicolo,
        problema e recapito telefonico. L’invio del modulo non costituisce
        accettazione automatica dell’intervento né garantisce disponibilità o
        tempi di arrivo determinati.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Preventivo e incarico</h2>
      <p>
        Prezzo, diritto di chiamata, destinazione, modalità operative e ogni
        costo accessorio devono essere comunicati o confermati dal carroattrezzi.
        L’utente resta libero di accettare o rifiutare il servizio prima di
        confermare l’incarico, salvo attività già espressamente autorizzate.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Responsabilità del professionista</h2>
      <p>
        Il carroattrezzi incaricato è responsabile della valutazione tecnica,
        della sicurezza, dei tempi comunicati, del mezzo impiegato, del recupero,
        della custodia e del trasporto. Eventuali contestazioni sull’intervento o
        sul pagamento devono essere rivolte al professionista che ha eseguito il
        servizio.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Limiti della piattaforma</h2>
      <p>
        Nei limiti consentiti dalla legge, la piattaforma non risponde di ritardi,
        indisponibilità, preventivi, condotte, danni o inadempimenti direttamente
        imputabili ai professionisti indipendenti. Rimane responsabile delle sole
        attività di intermediazione e trattamento dei dati di propria competenza.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Uso corretto</h2>
      <p>
        È vietato inviare richieste false, dati di terzi senza autorizzazione o
        contenuti illeciti. In caso di pericolo immediato, incidente con feriti o
        rischio per la circolazione occorre contattare prima i servizi pubblici
        di emergenza competenti.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Contatti e legge applicabile</h2>
      <p>
        Per informazioni puoi scrivere a{' '}
        <a className="font-semibold text-[#1D4ED8] underline" href={`mailto:${site.email}`}>
          {site.email}
        </a>. I presenti termini sono regolati dalla legge italiana, fatti salvi
        i diritti inderogabili riconosciuti ai consumatori.
      </p>
    </LegalPage>
  )
}
