'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import { site } from '@/data/site'

const TRACKING_KEYS = [
  'gclid',
  'utm_source',
  'utm_campaign',
  'utm_term',
  'utm_medium',
] as const

type TrackingKey = (typeof TRACKING_KEYS)[number]
type TrackingData = Record<TrackingKey, string>

const n8nWebhookUrl =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
  'https://alessiothrasos.app.n8n.cloud/webhook/landing-carroattrezzi-bergamo'
const telHref = `tel:${site.tel}`

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function conversione_click_telefono() {
  console.log('conversione_click_telefono')
  // TODO Google Ads: inserisci qui ID conversione click telefono.
  // window.gtag?.('event', 'conversion', { send_to: 'AW-XXXX/TELEFONO' })
}

function conversione_invio_posizione() {
  console.log('conversione_invio_posizione')
  window.gtag?.('event', 'conversion', {
    send_to: 'AW-972513984/xR7FCIn67sAcEMDF3cBD',
    value: 1.0,
    currency: 'EUR',
  })
}

function getStoredTracking(): TrackingData {
  return TRACKING_KEYS.reduce((acc, key) => {
    acc[key] =
      typeof window === 'undefined'
        ? ''
        : window.localStorage.getItem(`ads_${key}`) || ''
    return acc
  }, {} as TrackingData)
}

function PhoneButton({
  children = 'Chiama Ora',
  className = '',
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={telHref}
      onClick={conversione_click_telefono}
      className={`inline-flex items-center justify-center rounded-2xl bg-[#F59E0B] px-7 py-4 text-base font-black text-slate-950 shadow-[0_18px_50px_rgba(245,158,11,0.35)] transition hover:bg-[#FBBF24] ${className}`}
    >
      {children}
    </Link>
  )
}

export function LandingClient() {
  const [phone, setPhone] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [mainProblem, setMainProblem] = useState('')
  const [highway, setHighway] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )
  const [message, setMessage] = useState('')
  const [tracking, setTracking] = useState<TrackingData>(() =>
    TRACKING_KEYS.reduce((acc, key) => {
      acc[key] = ''
      return acc
    }, {} as TrackingData),
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const nextTracking = getStoredTracking()

    TRACKING_KEYS.forEach((key) => {
      const value = params.get(key)
      if (value) {
        window.localStorage.setItem(`ads_${key}`, value)
        nextTracking[key] = value
      }
    })

    setTracking(nextTracking)
  }, [])

  const cleanPhone = useMemo(() => phone.replace(/[^\d+]/g, ''), [phone])
  const validPhone = cleanPhone.replace(/[^\d]/g, '').length >= 8

  async function submitPosition() {
    if (!validPhone) {
      setStatus('error')
      setMessage('Inserisci un numero di telefono valido prima di inviare.')
      return
    }

    if (!vehicleType) {
      setStatus('error')
      setMessage('Seleziona il tipo di mezzo prima di inviare la richiesta.')
      return
    }

    if (!mainProblem) {
      setStatus('error')
      setMessage('Seleziona il problema principale prima di inviare la richiesta.')
      return
    }

    if (!highway) {
      setStatus('error')
      setMessage('Indica se ti trovi in autostrada: aiuta a gestire meglio il recupero.')
      return
    }

    if (!navigator.geolocation) {
      setStatus('error')
      setMessage(
        'Il browser non supporta la posizione. Puoi chiamare subito e comunicare dove ti trovi.',
      )
      return
    }

    setStatus('loading')
    setMessage('Rilevamento posizione in corso...')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitudine = position.coords.latitude
        const longitudine = position.coords.longitude
        const googleMapsLink = `https://www.google.com/maps?q=${latitudine},${longitudine}`
        const payload = {
          telefono_cliente: cleanPhone,
          tipo_mezzo: vehicleType,
          problema_principale: mainProblem,
          in_autostrada: highway === 'si',
          posizione_stradale: highway === 'si' ? 'Autostrada' : 'Strada ordinaria',
          latitudine,
          longitudine,
          google_maps_link: googleMapsLink,
          citta: 'Bergamo',
          sorgente: 'google_ads_landing',
          pagina: '/landing',
          ...tracking,
          timestamp: new Date().toISOString(),
        }

        try {
          if (!n8nWebhookUrl) {
            throw new Error('Webhook n8n non configurato')
          }

          const response = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })

          if (!response.ok) {
            throw new Error('Invio non riuscito')
          }

          conversione_invio_posizione()
          setStatus('success')
          setMessage(
            'Richiesta inviata. Ti ricontattiamo rapidamente al numero indicato.',
          )
        } catch {
          setStatus('error')
          setMessage(
            'Non siamo riusciti a inviare la richiesta dal sito. Puoi chiamare subito o riprovare tra qualche secondo.',
          )
        }
      },
      () => {
        setStatus('error')
        setMessage(
          'Posizione non concessa. Puoi chiamare subito e comunicare dove ti trovi.',
        )
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
    )
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-950">
      <header className="border-b border-slate-200 bg-white/95 shadow-sm shadow-slate-950/5 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <img
            src="/images/logo-bergamo-24ore.png"
            alt="Carroattrezzi Bergamo 24 Ore"
            className="h-16 w-auto max-w-[300px] object-contain sm:h-20 sm:max-w-[420px]"
          />
          <div className="hidden items-center gap-4 sm:flex">
            <div className="text-right">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#EA580C]">
                Centrale operativa
              </p>
              <p className="text-xl font-black text-slate-950">{site.phone}</p>
            </div>
            <PhoneButton className="py-3">Chiama Ora</PhoneButton>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,113,22,0.22),transparent_36%),linear-gradient(135deg,#080808_0%,#171717_52%,#2A1206_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-9 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-16">
          <div className="order-2 lg:order-1">
            <p className="inline-flex rounded-full border border-orange-300/25 bg-orange-400/10 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-orange-200">
              Emergenza stradale 24/7
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Carroattrezzi Bergamo 24 Ore
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-slate-200">
              Auto ferma? Richiedi subito un soccorso stradale rapido a Bergamo
              e provincia.
            </p>
            <div className="mt-8 grid gap-3 sm:flex">
              <PhoneButton className="w-full text-lg sm:w-auto">
                Chiama Ora
              </PhoneButton>
              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById('posizione')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white px-7 py-4 text-lg font-black text-slate-950 transition hover:bg-slate-100 sm:w-auto"
              >
                Invia Posizione
              </button>
            </div>
            <p className="mt-6 text-3xl font-black text-[#FBBF24]">
              {site.phone}
            </p>
          </div>

          <div
            id="posizione"
            className="order-1 rounded-[2rem] border border-white/80 bg-linear-to-b from-white via-white to-orange-50 p-4 text-slate-950 shadow-[0_42px_100px_rgba(0,0,0,0.42),0_18px_50px_rgba(234,88,12,0.24),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-orange-200/70 sm:p-7 lg:order-2"
          >
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#EA580C]">
              richiesta veloce
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Invia la posizione al carroattrezzi
            </h2>
            <p className="mt-3 rounded-3xl border border-orange-200 bg-white/90 p-4 text-base font-black leading-7 text-slate-950 shadow-[0_16px_36px_rgba(124,45,18,0.10)]">
              Dopo il completamento del form troveremo il carroattrezzi più
              vicino a te in meno di 40 secondi.
            </p>
            <label className="mt-6 block text-sm font-black">
              Telefono obbligatorio
            </label>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              inputMode="tel"
              placeholder="Es. 333 123 4567"
              className="mt-2 w-full rounded-2xl border border-slate-300 px-5 py-4 text-lg font-bold outline-none ring-orange-300 transition focus:ring-4"
            />
            <label className="mt-5 block text-sm font-black">
              Tipo di mezzo
            </label>
            <select
              value={vehicleType}
              onChange={(event) => setVehicleType(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-lg font-bold outline-none ring-orange-300 transition focus:ring-4"
            >
              <option value="">Seleziona il mezzo</option>
              <option value="Auto">Auto</option>
              <option value="Moto o scooter">Moto o scooter</option>
              <option value="Furgone">Furgone</option>
              <option value="SUV o 4x4">SUV o 4x4</option>
              <option value="Altro veicolo">Altro veicolo</option>
            </select>
            <label className="mt-5 block text-sm font-black">
              Problema principale
            </label>
            <select
              value={mainProblem}
              onChange={(event) => setMainProblem(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-lg font-bold outline-none ring-orange-300 transition focus:ring-4"
            >
              <option value="">Seleziona il problema</option>
              <option value="Batteria scarica">Batteria scarica</option>
              <option value="Guasto meccanico">Guasto meccanico</option>
              <option value="Gomma forata">Gomma forata</option>
              <option value="Incidente">Incidente</option>
              <option value="Carburante esaurito">Carburante esaurito</option>
              <option value="Altro">Altro</option>
            </select>
            <fieldset className="mt-5">
              <legend className="text-sm font-black">Sei in autostrada?</legend>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {[
                  ['no', 'No'],
                  ['si', 'Sì'],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-center justify-center rounded-2xl border px-4 py-4 text-base font-black transition ${
                      highway === value
                        ? 'border-[#EA580C] bg-orange-50 text-[#9A3412]'
                        : 'border-slate-300 bg-white text-slate-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="highway"
                      value={value}
                      checked={highway === value}
                      onChange={(event) => setHighway(event.target.value)}
                      className="sr-only"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              type="button"
              onClick={submitPosition}
              disabled={status === 'loading'}
              className="mt-4 w-full rounded-2xl bg-[#EA580C] px-5 py-5 text-lg font-black text-white shadow-xl shadow-orange-700/25 transition hover:bg-[#C2410C] disabled:cursor-wait disabled:opacity-70"
            >
              {status === 'loading'
                ? 'Invio in corso...'
                : 'Rileva posizione e invia richiesta'}
            </button>
            {message ? (
              <div
                className={`mt-4 rounded-2xl p-4 text-sm font-bold leading-6 ${
                  status === 'success'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-orange-50 text-orange-900'
                }`}
              >
                {message}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 text-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black">Come funziona</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              [
                'Chiami o invii la posizione',
                'Puoi telefonare subito oppure inviare GPS e numero dal modulo.',
              ],
              [
                'La richiesta arriva al carroattrezzi',
                'Riceviamo telefono, coordinate e link Google Maps per capire dove sei.',
              ],
              [
                'Vieni ricontattato rapidamente',
                'Ti guidiamo sul passaggio successivo e concordiamo la destinazione.',
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm"
              >
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#FFF7ED] to-white py-16 text-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#EA580C]">
              interventi urgenti
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Servizi disponibili subito
            </h2>
            <p className="mt-3 text-lg leading-8 text-slate-700">
              Indica il problema nel form o al telefono: il recupero parte con
              informazioni piÃ¹ precise e meno passaggi inutili.
            </p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                '/images/landing-assets/servizio-soccorso-stradale.webp',
                'Soccorso stradale',
                'Supporto urgente quando il veicolo non puÃ² proseguire.',
              ],
              [
                '/images/landing-assets/servizio-recupero-auto.webp',
                'Recupero auto',
                'Carico e trasporto verso officina, deposito o carrozzeria.',
              ],
              [
                '/images/landing-assets/servizio-auto-in-panne.webp',
                'Auto in panne',
                'Gestione di guasti improvvisi, spie accese e motore fermo.',
              ],
              [
                '/images/landing-assets/servizio-incidente-stradale.webp',
                'Incidente stradale',
                'Rimozione ordinata del mezzo dopo un sinistro.',
              ],
              [
                '/images/landing-assets/servizio-batteria-scarica.webp',
                'Batteria scarica',
                'Valutazione rapida e traino se il veicolo non riparte.',
              ],
              [
                '/images/landing-assets/servizio-recupero-moto.webp',
                'Recupero moto',
                'Fissaggio attento per scooter, moto e due ruote ferme.',
              ],
              [
                '/images/landing-assets/servizio-trasporto-veicoli.webp',
                'Trasporto veicoli',
                'Spostamenti programmati o urgenti in cittÃ  e provincia.',
              ],
            ].map(([image, service, description]) => (
              <div
                key={service}
                className="group flex min-h-44 gap-4 rounded-3xl border border-orange-200 bg-white p-5 text-slate-950 shadow-xl shadow-orange-950/10 transition hover:-translate-y-1 hover:border-[#EA580C]"
              >
                <img
                  src={image}
                  alt=""
                  className="h-24 w-24 shrink-0 object-contain transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <span>
                  <span className="block text-lg font-black leading-tight">
                    {service}
                  </span>
                  <span className="mt-2 block text-sm font-semibold leading-6 text-slate-600">
                    {description}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black">Zone servite</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              'Bergamo centro',
              'CittÃ  Alta',
              'Borgo Palazzo',
              'Longuelo',
              'Redona',
              'Valtesse',
              'Boccaleone',
              'Seriate',
              'Dalmine',
              'Treviolo',
              'Stezzano',
              'Orio al Serio',
              'Azzano San Paolo',
              'Curno',
              'Gorle',
            ].map((zone) => (
              <div
                key={zone}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-bold text-slate-100"
              >
                {zone}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#EA580C]">
                fiducia immediata
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Clienti che hanno risolto
              </h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              [
                'Auto ferma in serata, chiamata semplice e rientro organizzato senza stress.',
                'Marco, Bergamo',
              ],
              [
                'Ho inviato la posizione e sono stato ricontattato subito. Servizio chiaro.',
                'Elena, Seriate',
              ],
              [
                'Recupero moto gestito con attenzione. Mi hanno spiegato tutto prima.',
                'Davide, Dalmine',
              ],
            ].map(([text, author]) => (
              <figure
                key={author}
                className="rounded-3xl border border-orange-300/30 bg-white p-6 text-slate-950 shadow-xl shadow-black/25"
              >
                <p className="text-[#EA580C]">â˜…â˜…â˜…â˜…â˜…</p>
                <blockquote className="mt-4 leading-7 text-slate-800">
                  â€œ{text}â€
                </blockquote>
                <figcaption className="mt-4 font-black text-slate-950">
                  {author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FFF7ED] py-16 text-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#EA580C]">
            risposte rapide
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Domande frequenti
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              [
                'Quanto tempo serve per un carroattrezzi a Bergamo?',
                'Dipende dal traffico, dal punto esatto e dal tipo di veicolo. Inviare la posizione aiuta a capire prima dove intervenire.',
              ],
              [
                'Posso mandare la posizione senza telefonare?',
                'SÃ¬. Inserisci il telefono, premi il bottone della posizione e consenti il GPS dal browser.',
              ],
              [
                'Cosa succede se rifiuto la posizione?',
                'Puoi riprovare dal modulo oppure chiamare e comunicare il punto in cui ti trovi.',
              ],
              [
                'Posso scegliere dove portare lâ€™auto?',
                'SÃ¬. Puoi indicare officina, carrozzeria, deposito o un indirizzo concordato.',
              ],
            ].map(([question, answer]) => (
              <div
                key={question}
                className="rounded-3xl border border-orange-200 bg-white p-6 shadow-xl shadow-orange-950/10"
              >
                <h3 className="text-xl font-black">{question}</h3>
                <p className="mt-3 leading-7 text-slate-700">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EA580C] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black">Hai bisogno ora?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-orange-50">
            Chiama o invia la posizione: ti aiutiamo a organizzare il recupero
            nel modo piÃ¹ rapido e chiaro possibile.
          </p>
          <div className="mt-8 flex justify-center">
            <PhoneButton className="bg-slate-950 text-white hover:bg-slate-900">
              Chiama {site.phone}
            </PhoneButton>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#080808]/95 p-3 backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-3">
          <PhoneButton className="rounded-xl px-3 py-4 text-sm">
            Chiama Ora
          </PhoneButton>
          <button
            type="button"
            onClick={() => {
              document
                .getElementById('posizione')
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
            className="rounded-xl border border-white/20 bg-white px-3 py-4 text-sm font-black text-slate-950"
          >
            Invia Posizione
          </button>
        </div>
      </div>
    </main>
  )
}
