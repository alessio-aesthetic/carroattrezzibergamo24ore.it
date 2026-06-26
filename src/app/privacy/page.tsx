import { type Metadata } from 'next'

import { LegalPage } from '@/components/LegalPage'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: `Informativa sul trattamento dei dati personali di ${site.name}.`,
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy">
      <p className="text-sm font-semibold text-slate-500">
        Ultimo aggiornamento: 26 giugno 2026
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Titolare del trattamento</h2>
      <p>
        Il titolare del trattamento è il gestore di {site.domain}, P. IVA{' '}
        {site.vatNumber}. Per richieste relative alla privacy puoi scrivere a{' '}
        <a className="font-semibold text-[#1D4ED8] underline" href={`mailto:${site.email}`}>
          {site.email}
        </a>.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Dati trattati</h2>
      <p>
        Quando richiedi assistenza possiamo raccogliere numero di telefono,
        tipologia del veicolo, problema segnalato, eventuale presenza in
        autostrada, posizione GPS, link Google Maps e dati tecnici relativi alla
        richiesta. La posizione viene acquisita solo dopo un’azione esplicita e
        l’autorizzazione del browser.
      </p>
      <p>
        Durante la navigazione possono inoltre essere trattati indirizzo IP,
        tipo di dispositivo, log tecnici, pagina visitata e parametri della
        campagna pubblicitaria, come gclid e parametri UTM.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Finalità e basi giuridiche</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Gestire la richiesta e individuare un carroattrezzi compatibile.</li>
        <li>Ricontattarti e trasmettere le informazioni necessarie al professionista.</li>
        <li>Garantire sicurezza, prevenire abusi e risolvere problemi tecnici.</li>
        <li>Misurare le campagne pubblicitarie quando hai espresso il consenso richiesto.</li>
      </ul>
      <p>
        Il trattamento si basa sull’esecuzione di misure precontrattuali richieste
        dall’utente, sul consenso quando necessario, sull’adempimento di obblighi
        di legge e sul legittimo interesse alla sicurezza del servizio.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Intermediazione e destinatari</h2>
      <p>
        Il sito opera come intermediario e non come singola impresa di
        carroattrezzi. I dati essenziali possono essere comunicati a più
        professionisti indipendenti presenti nella rete per verificare
        disponibilità e compatibilità. Il carroattrezzi che accetta l’incarico
        tratta i dati ricevuti sotto la propria responsabilità.
      </p>
      <p>
        Possono inoltre accedere ai dati fornitori tecnici strettamente necessari,
        come hosting, automazioni, messaggistica e strumenti di misurazione,
        nominati responsabili quando richiesto dalla normativa.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Conservazione e sicurezza</h2>
      <p>
        I dati vengono conservati per il tempo necessario a gestire la richiesta,
        documentare il servizio e rispettare gli obblighi applicabili. I tempi
        possono essere estesi in presenza di contestazioni o obblighi di legge.
        Sono adottate misure tecniche e organizzative proporzionate al rischio.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Diritti dell’interessato</h2>
      <p>
        Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità
        e opposizione, oltre a revocare il consenso senza pregiudicare i
        trattamenti già effettuati. Puoi inoltre presentare reclamo al Garante per
        la protezione dei dati personali.
      </p>

      <h2 className="text-2xl font-bold text-slate-950">Aggiornamenti</h2>
      <p>
        Questa informativa può essere aggiornata in seguito a modifiche del
        servizio o degli strumenti utilizzati. La versione pubblicata su questa
        pagina è quella vigente.
      </p>
    </LegalPage>
  )
}
