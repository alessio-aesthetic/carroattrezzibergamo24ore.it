'use client'

import { useEffect, useMemo, useState } from 'react'
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

const phone = '035 068 3839'
const tel = '+390350683839'
const webhookFallback =
  'https://alessiothrasos.app.n8n.cloud/webhook/landing-carroattrezzi-bergamo'

const trackingKeys = [
  'gclid',
  'utm_source',
  'utm_campaign',
  'utm_term',
  'utm_medium',
] as const

type TrackingKey = (typeof trackingKeys)[number]
type TrackingData = Record<TrackingKey, string>
type Step = 0 | 1 | 2 | 3
type Status = 'idle' | 'loading' | 'success' | 'error'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string
        background?: string
        speed?: string
        loop?: boolean
        autoplay?: boolean
      }
    }
  }
}

const problems = [
  {
    value: 'Batteria scarica',
    title: 'Batteria scarica',
    lottie: '/lottie/request/batteria.json',
  },
  {
    value: 'Gomma forata',
    title: 'Gomma danneggiata',
    lottie: '/lottie/request/gomme.json',
    zoom: true,
  },
  {
    value: 'Guasto meccanico',
    title: 'Auto in panne',
    lottie: '/lottie/request/auto-rotta.json',
  },
  {
    value: 'Incidente',
    title: 'Incidente',
    lottie: '/lottie/request/incidente.json',
    zoom: true,
  },
  {
    value: 'Veicolo bloccato',
    title: 'Auto bloccata',
    lottie: '/lottie/request/auto-bloccata.json',
    zoom: true,
  },
  {
    value: 'Carburante esaurito',
    title: 'Senza benzina',
    lottie: '/lottie/request/senza-benzina.json',
  },
  {
    value: 'Nessuno tra questi',
    title: 'Nessuno di questi',
    lottie: '',
    wide: true,
  },
]

const vehicles = ['Auto', 'Moto o scooter', 'Furgone', 'SUV o 4x4', 'Camper', 'Altro']
const fuels = ['Benzina', 'Diesel', 'GPL', 'Metano', 'Elettrica', 'Ibrida', 'Non lo so']

const assistantMessages = [
  "Riceverai una CHIAMATA ISTANTANEA dopo l'invio del form. Risparmierai tempo e non dovrai dire tutto a voce.",
  'Così il carroattrezzi capirà quale mezzo utilizzare per il tuo caso specifico.',
  'Grazie alla posizione esatta, ti richiamerà immediatamente il carroattrezzi più vicino in assoluto.',
  'Scegli un numero con WhatsApp ed attendi pochi istanti, saremo velocissimi.',
]

const stepCopy = [
  { eyebrow: 'problema', title: 'Scegli il problema principale' },
  { eyebrow: 'veicolo', title: 'Aggiungi mezzo e carburante' },
  { eyebrow: 'posizione', title: 'Invia la posizione precisa' },
  { eyebrow: 'telefono', title: 'Ricevi la chiamata' },
] as const

function emptyTracking(): TrackingData {
  return trackingKeys.reduce((acc, key) => {
    acc[key] = ''
    return acc
  }, {} as TrackingData)
}

function trackCall() {
  console.log('conversione_click_telefono_bergamo_richiesta')
}

function trackLead() {
  console.log('conversione_invio_richiesta_bergamo')
}

function LottieAsset({
  src,
  className = '',
}: {
  src: string
  className?: string
}) {
  useEffect(() => {
    void import('@lottiefiles/lottie-player')
  }, [])

  return (
    <lottie-player
      src={src}
      background="transparent"
      speed="1"
      loop
      autoplay
      className={`block ${className}`}
      aria-hidden="true"
    />
  )
}

export function RichiestaBergamoClient() {
  const [step, setStep] = useState<Step>(0)
  const [problem, setProblem] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [fuel, setFuel] = useState('')
  const [highway, setHighway] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [coordinates, setCoordinates] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [tracking, setTracking] = useState<TrackingData>(emptyTracking)
  const [typedAssistant, setTypedAssistant] = useState('')
  const [showGpsInfo, setShowGpsInfo] = useState(false)
  const [gpsCallStatus, setGpsCallStatus] = useState<
    'idle' | 'loading' | 'success' | 'sent' | 'error'
  >('idle')
  const [gpsCallPhone, setGpsCallPhone] = useState('')

  const cleanPhone = useMemo(
    () => customerPhone.replace(/[^\d+]/g, ''),
    [customerPhone],
  )
  const mapsLink = coordinates
    ? `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
    : ''

  useEffect(() => {
    const fullText = assistantMessages[step]
    setTypedAssistant('')
    let index = 0
    const interval = window.setInterval(() => {
      index += 1
      setTypedAssistant(fullText.slice(0, index))
      if (index >= fullText.length) window.clearInterval(interval)
    }, 12)

    return () => window.clearInterval(interval)
  }, [step])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const saved = emptyTracking()

    trackingKeys.forEach((key) => {
      const value = params.get(key) || window.localStorage.getItem(`ads_${key}`)
      if (value) {
        saved[key] = value
        window.localStorage.setItem(`ads_${key}`, value)
      }
    })

    setTracking(saved)
  }, [])

  function goBack() {
    setStatus('idle')
    setMessage('')
    setStep((current) => Math.max(0, current - 1) as Step)
  }

  function selectProblem(value: string) {
    setProblem(value)
    setStatus('idle')
    setMessage('')
    setStep(1)
  }

  function continueFromVehicle() {
    if (!vehicle || !fuel) {
      setStatus('error')
      setMessage('Seleziona tipo di veicolo e carburante.')
      return
    }

    setStatus('idle')
    setMessage('')
    setStep(2)
  }

  function detectPosition() {
    if (!navigator.geolocation) {
      setStatus('error')
      setMessage('Il browser non supporta la posizione. Puoi chiamare subito.')
      return
    }

    setStatus('loading')
    setMessage('Rilevamento posizione in corso...')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setStatus('success')
        setMessage('Posizione rilevata. Puoi continuare.')
      },
      () => {
        setStatus('error')
        setMessage('Posizione non concessa. Riprova o chiama direttamente.')
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
    )
  }

  function prepareGpsCall() {
    setShowGpsInfo(true)

    if (!navigator.geolocation) {
      setGpsCallStatus('error')
      return
    }

    setGpsCallStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setGpsCallStatus('success')
      },
      () => {
        setGpsCallStatus('error')
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
    )
  }

  async function submitGpsCallRequest() {
    const popupPhone = gpsCallPhone.replace(/[^\d+]/g, '')

    if (popupPhone.replace(/[^\d]/g, '').length < 8) {
      setGpsCallStatus('error')
      return
    }

    if (!coordinates) {
      prepareGpsCall()
      return
    }

    setGpsCallStatus('loading')

    const popupMapsLink = `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
    const payload = {
      telefono_cliente: popupPhone,
      telefono_centrale: phone,
      latitudine: coordinates.latitude,
      longitudine: coordinates.longitude,
      google_maps_link: popupMapsLink,
      citta: 'Bergamo',
      sorgente: 'google_ads_gps_call_popup',
      pagina: '/richiesta-bergamo',
      timestamp: new Date().toISOString(),
      ...tracking,
    }

    try {
      const webhook = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || webhookFallback
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      trackLead()
      setGpsCallStatus('sent')
      setGpsCallPhone('')
      setStatus('success')
      setMessage(
        'Richiesta inviata. Tieni il telefono libero: il carroattrezzi più vicino ti richiamerà rapidamente.',
      )
    } catch {
      setGpsCallStatus('error')
    }
  }

  function continueFromLocation() {
    if (!highway) {
      setStatus('error')
      setMessage('Indica se ti trovi in autostrada.')
      return
    }

    if (!coordinates) {
      setStatus('error')
      setMessage('Usa il pulsante posizione prima di continuare.')
      return
    }

    setStatus('idle')
    setMessage('')
    setStep(3)
  }

  async function submitRequest() {
    if (cleanPhone.replace(/[^\d]/g, '').length < 8) {
      setStatus('error')
      setMessage('Inserisci un numero di telefono valido.')
      return
    }

    if (!coordinates) {
      setStatus('error')
      setMessage('Manca la posizione del veicolo.')
      setStep(2)
      return
    }

    setStatus('loading')
    setMessage('Invio richiesta in corso...')

    const payload = {
      telefono_cliente: cleanPhone,
      telefono_centrale: phone,
      latitudine: coordinates.latitude,
      longitudine: coordinates.longitude,
      google_maps_link: mapsLink,
      citta: 'Bergamo',
      mezzo: vehicle,
      carburante: fuel,
      problema: problem,
      autostrada: highway,
      note: notes,
      sorgente: 'google_ads_landing_step_form',
      pagina: '/richiesta-bergamo',
      timestamp: new Date().toISOString(),
      ...tracking,
    }

    try {
      const webhook = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || webhookFallback
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      trackLead()
      setStatus('success')
      setMessage(
        'Richiesta inviata. Tieni il telefono libero: ti ricontatteremo rapidamente.',
      )
    } catch {
      setStatus('error')
      setMessage('Invio non riuscito. Chiama ora il numero indicato.')
    }
  }

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[#07111f] text-slate-950">
      <div className="pointer-events-none absolute inset-0 min-h-full bg-[radial-gradient(circle_at_16%_18%,rgba(45,212,191,0.22),transparent_30%),radial-gradient(circle_at_84%_12%,rgba(245,158,11,0.20),transparent_28%),linear-gradient(135deg,#07111f_0%,#0f2742_44%,#042f2e_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]" />

      <div className="relative mx-auto flex w-full max-w-[1800px] items-start px-2 py-2 pb-8 sm:px-4 sm:py-4 sm:pb-10 lg:px-6 lg:py-6 lg:pb-12">
        <section className="mx-auto grid w-full overflow-hidden rounded-[1.4rem] border border-white/25 bg-white/94 shadow-[0_34px_120px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl sm:rounded-[2rem] lg:min-h-[calc(100dvh-3rem)] lg:grid-cols-[0.34fr_0.66fr]">
          <aside className="relative overflow-hidden bg-[#07111f] p-2 text-white sm:p-6 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(45,212,191,0.32),transparent_32%),radial-gradient(circle_at_100%_22%,rgba(255,204,0,0.20),transparent_28%)]" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between gap-3">
                <a
                  href="/landing"
                  className="block rounded-2xl border border-white/55 bg-white/95 px-3 py-2 shadow-[0_18px_48px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur"
                >
                  <img
                    src="/images/logo-bergamo-24ore.png"
                    alt="Carroattrezzi Bergamo 24 Ore"
                    className="h-10 w-auto max-w-[140px] object-contain sm:h-16 sm:max-w-[260px]"
                  />
                </a>
              </div>

              <div className="mt-2 sm:mt-6">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-teal-100 sm:text-xs">
                  avanzamento
                </p>
                <div className="mt-2 grid grid-cols-4 gap-1.5 sm:mt-3 sm:block sm:space-y-2">
                  {['Problema', 'Veicolo', 'Posizione', 'Telefono'].map(
                    (item, index) => (
                      <div
                        key={item}
                        className={`flex flex-col items-center gap-1 rounded-xl border p-1.5 text-center transition sm:flex-row sm:gap-2 sm:p-2 sm:text-left ${
                          index <= step
                            ? 'border-[#2dd4bf]/50 bg-[#2dd4bf]/12'
                            : 'border-white/10 bg-white/[0.04]'
                        }`}
                      >
                        <span
                          className={`flex size-6 items-center justify-center rounded-lg text-[11px] font-black sm:size-7 sm:text-xs ${
                            index <= step
                              ? 'bg-[#2dd4bf] text-[#07111f]'
                              : 'bg-white/10 text-white/60'
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span className="text-[10px] font-bold leading-tight sm:text-sm">{item}</span>
                      </div>
                    ),
                  )}
                </div>
                <p className="mt-2 rounded-2xl border border-[#facc15]/35 bg-[#facc15]/16 px-3 py-2 text-center text-[11px] font-black uppercase leading-tight tracking-[0.08em] text-[#facc15] shadow-[0_14px_34px_rgba(250,204,21,0.10)] sm:mt-4 sm:px-4 sm:py-3 sm:text-sm">
                  Tempo di completamento stimato: 13 secondi
                </p>
                <div className="mt-2 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                    Oppure
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${tel}`}
                      onClick={trackCall}
                      className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 bg-white px-2.5 text-center text-[11px] font-black leading-tight text-[#07111f] shadow-[0_14px_34px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.9)] transition hover:-translate-y-0.5 sm:min-h-16 sm:px-4 sm:text-sm"
                    >
                      Chiama ora - Senza GPS
                    </a>
                    <button
                      type="button"
                      onClick={prepareGpsCall}
                      className="call-premium inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#fff4b8] bg-[#facc15] px-2.5 text-center text-[11px] font-black leading-tight text-[#07111f] shadow-[0_18px_48px_rgba(250,204,21,0.32),inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-8px_18px_rgba(180,83,9,0.20)] sm:min-h-16 sm:px-4 sm:text-sm"
                    >
                      Chiama Ora - Con Invio GPS
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-auto hidden pt-8 sm:block" />
            </div>
          </aside>

          <div className="p-2 sm:p-7 lg:flex lg:min-h-full lg:flex-col lg:p-10">
            <div className="mx-auto w-full max-w-5xl rounded-[1.3rem] border border-slate-200 bg-white p-3 shadow-[0_18px_60px_rgba(15,23,42,0.10)] sm:rounded-[1.8rem] sm:p-5">
              <div className="flex items-center gap-3 sm:gap-5">
                <div className="grid size-20 shrink-0 place-items-center sm:size-28">
                  <LottieAsset
                    src="/lottie/request/uomo-sopra.json"
                    className="h-20 w-20 sm:h-28 sm:w-28"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0f766e] sm:text-xs">
                    {stepCopy[step].eyebrow}
                  </p>
                  <h1 className="mt-1 text-base font-black tracking-tight text-[#07111f] sm:text-2xl">
                    {stepCopy[step].title}
                  </h1>
                  <p
                    className={`mt-2 min-h-12 text-sm font-extrabold leading-snug tracking-[0.02em] sm:min-h-14 sm:text-lg ${
                      step === 0
                        ? 'text-[#dc2626]'
                        : 'text-slate-700'
                    }`}
                  >
                    <span className="typing-text">{typedAssistant}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2 lg:flex-1 sm:mt-8">
              {step === 0 && (
                <div className="grid grid-cols-2 gap-2 sm:gap-4 xl:grid-cols-3">
                  {problems.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => selectProblem(item.value)}
                      className={`group relative overflow-hidden rounded-[1rem] border-2 border-slate-200 bg-white p-2 text-center shadow-[0_14px_34px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 hover:border-[#0f766e] hover:shadow-[0_28px_76px_rgba(15,118,110,0.18)] sm:rounded-[1.6rem] sm:p-4 ${
                        item.wide
                          ? 'col-span-2 min-h-11 xl:col-span-3 sm:min-h-20'
                          : 'min-h-32 sm:min-h-64'
                      }`}
                    >
                      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-teal-50 to-transparent" />
                      {!item.wide && (
                        <div className="relative flex h-20 items-center justify-center rounded-[0.8rem] border border-slate-100 bg-[#f8fafc] sm:h-36 sm:rounded-[1.2rem]">
                          <LottieAsset
                            src={item.lottie}
                            className={
                              item.zoom
                                ? 'h-24 w-24 sm:h-40 sm:w-40'
                                : 'h-20 w-20 sm:h-36 sm:w-36'
                            }
                          />
                        </div>
                      )}
                      <h2
                        className={`relative mt-2 text-center font-black leading-tight tracking-tight text-[#07111f] sm:mt-4 ${
                          item.wide
                            ? 'mt-0 flex min-h-7 items-center justify-center text-sm sm:min-h-16 sm:text-2xl'
                            : 'text-sm sm:text-2xl'
                        }`}
                      >
                        {item.title}
                      </h2>
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="mx-auto grid max-w-4xl gap-5">
                  <PremiumSelect
                    label="Tipo di veicolo"
                    value={vehicle}
                    onChange={setVehicle}
                    options={vehicles}
                  />
                  <PremiumSelect
                    label="Tipo di carburante"
                    value={fuel}
                    onChange={setFuel}
                    options={fuels}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="mx-auto max-w-4xl">
                  <div className="rounded-[1.4rem] border-2 border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:rounded-[1.8rem] sm:p-7">
                    <div className="grid gap-4 sm:grid-cols-[0.58fr_1fr] sm:items-center">
                      <div className="pointer-events-none mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-[1.2rem] border border-slate-200 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_14px_34px_rgba(15,23,42,0.08)] sm:h-40 sm:w-40">
                        <LottieAsset
                          src="/lottie/request/gps.json"
                          className="h-20 w-20 sm:h-36 sm:w-36"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-[#07111f] sm:text-3xl">
                          Condividi la posizione GPS.
                        </h2>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={detectPosition}
                      disabled={status === 'loading'}
                      className="relative z-20 mt-4 w-full touch-manipulation rounded-2xl bg-[#0f766e] px-5 py-5 text-base font-black text-white shadow-[0_22px_54px_rgba(15,118,110,0.30)] transition hover:-translate-y-0.5 hover:bg-[#115e59] disabled:opacity-70 sm:mt-6 sm:py-5 sm:text-lg"
                    >
                      {status === 'loading'
                        ? 'Rilevamento in corso...'
                        : 'Rileva posizione GPS'}
                    </button>
                    {mapsLink && (
                      <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-black text-emerald-800">
                        Posizione acquisita. Ora possiamo inviare un punto
                        preciso al carroattrezzi.
                      </p>
                    )}
                  </div>

                  <div className="mt-4 rounded-[1.4rem] border-2 border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:mt-5 sm:rounded-[1.8rem] sm:p-5">
                    <h3 className="text-sm font-black uppercase tracking-[0.12em] text-[#0f766e]">
                      Ti trovi in autostrada?
                    </h3>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {[
                        ['No', 'No'],
                        ['Sì', 'Sì'],
                      ].map(([value, label]) => (
                        <label
                          key={value}
                          className={`cursor-pointer rounded-2xl border px-5 py-4 text-center text-lg font-black transition ${
                            highway === value
                              ? 'border-[#0f766e] bg-[#0f766e] text-white shadow-[0_18px_44px_rgba(15,118,110,0.22)]'
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
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="mx-auto grid max-w-4xl gap-5">
                  <label className="grid gap-2">
                    <span className="text-sm font-black uppercase tracking-[0.12em] text-[#0f766e]">
                      Numero di telefono
                    </span>
                    <input
                      value={customerPhone}
                      onChange={(event) => setCustomerPhone(event.target.value)}
                      inputMode="tel"
                      placeholder="Es. 333 123 4567"
                      className="h-14 rounded-2xl border-2 border-slate-300 bg-white px-5 text-base font-black shadow-[0_18px_42px_rgba(15,23,42,0.12)] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-teal-100 sm:h-16 sm:text-lg"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-black uppercase tracking-[0.12em] text-[#0f766e]">
                      Note facoltative
                    </span>
                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Esempio: parcheggio supermercato, uscita autostrada, destinazione preferita..."
                      className="min-h-20 rounded-2xl border-2 border-slate-300 bg-white px-5 py-3 text-sm font-bold shadow-[0_18px_42px_rgba(15,23,42,0.12)] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-teal-100 sm:min-h-28 sm:py-4 sm:text-base"
                    />
                  </label>
                </div>
              )}

              {message && (
                <p
                  className={`mx-auto mt-5 max-w-4xl rounded-2xl px-4 py-3 text-sm font-bold ${
                    status === 'success'
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-amber-50 text-amber-900'
                  }`}
                >
                  {message}
                </p>
              )}

              {step === 3 && (
                <div className="mx-auto mt-6 max-w-4xl rounded-[1.4rem] border-2 border-[#facc15]/45 bg-[#fffbeb] p-4 text-center shadow-[0_22px_70px_rgba(250,204,21,0.20),inset_0_1px_0_rgba(255,255,255,0.9)] sm:p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#b45309]">
                    risposta immediata
                  </p>
                  <p className="mt-2 text-base font-black leading-snug text-[#07111f] sm:text-xl">
                    Dopo l’invio ti richiamerà il nostro carroattrezzi più
                    vicino in pochi secondi.
                  </p>
                </div>
              )}

              <div className="mx-auto mt-5 flex max-w-4xl gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="rounded-2xl border border-slate-300 bg-white px-5 py-4 text-base font-black text-slate-700 shadow-sm"
                  >
                    Indietro
                  </button>
                )}
                {step === 1 && (
                  <PrimaryButton onClick={continueFromVehicle}>
                    Vai alla posizione
                  </PrimaryButton>
                )}
                {step === 2 && (
                  <PrimaryButton onClick={continueFromLocation}>
                    Conferma posizione
                  </PrimaryButton>
                )}
                {step === 3 && (
                  <PrimaryButton
                    onClick={submitRequest}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading'
                      ? 'Invio in corso...'
                      : 'Invia richiesta'}
                  </PrimaryButton>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {showGpsInfo && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#07111f]/72 px-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-[1.6rem] border border-white/70 bg-white p-5 text-center shadow-[0_34px_110px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.95)] sm:p-7">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#0f766e]">
              {gpsCallStatus === 'loading'
                ? 'Rilevamento GPS'
                : gpsCallStatus === 'success' || gpsCallStatus === 'sent'
                  ? 'Successo'
                  : 'GPS non disponibile'}
            </p>
            <h2 className={`mt-2 text-2xl font-black leading-tight sm:text-3xl ${
              gpsCallStatus === 'success' || gpsCallStatus === 'sent'
                ? 'text-[#0f766e]'
                : 'text-[#07111f]'
            }`}>
              {gpsCallStatus === 'sent'
                ? 'Richiesta inviata correttamente.'
                : gpsCallStatus === 'loading'
                  ? 'Stiamo rilevando la tua posizione.'
                  : gpsCallStatus === 'success'
                    ? 'Posizione rilevata correttamente.'
                    : 'Puoi chiamare subito e comunicare la posizione a voce.'}
            </h2>
            <p className="mt-4 text-sm font-bold leading-relaxed text-slate-700 sm:text-base">
              {gpsCallStatus === 'sent'
                ? 'Attendi qualche istante con il telefono. Ti abbiamo inviato un WhatsApp per seguire la richiesta.'
                : gpsCallStatus === 'success'
                  ? 'Inserisci solo il tuo numero: verrai chiamato immediatamente dal carroattrezzi più vicino a te.'
                  : gpsCallStatus === 'loading'
                    ? 'Mantieni aperta questa schermata per pochi secondi e consenti l’accesso alla posizione dal browser.'
                    : 'Se il GPS non viene concesso, puoi comunque telefonare: ti guideremo rapidamente per capire dove intervenire.'}
            </p>
            {gpsCallStatus === 'success' && (
              <input
                type="tel"
                value={gpsCallPhone}
                onChange={(event) => setGpsCallPhone(event.target.value)}
                placeholder="Il tuo numero di telefono"
                className="mt-5 h-14 w-full rounded-2xl border-2 border-slate-300 bg-white px-5 text-center text-base font-black text-[#07111f] shadow-[0_18px_42px_rgba(15,23,42,0.12)] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-teal-100"
              />
            )}
            <div className="mt-5 grid gap-2">
              <button
                type="button"
                onClick={
                  gpsCallStatus === 'sent'
                    ? () => setShowGpsInfo(false)
                    : gpsCallStatus === 'success'
                      ? submitGpsCallRequest
                      : prepareGpsCall
                }
                className="rounded-2xl bg-[#0f766e] px-5 py-4 text-base font-black text-white shadow-[0_20px_54px_rgba(15,118,110,0.28)]"
              >
                {gpsCallStatus === 'sent'
                  ? 'Chiudi'
                  : gpsCallStatus === 'loading'
                    ? 'Rilevamento...'
                    : 'Invia'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowGpsInfo(false)
                  setGpsCallStatus('idle')
                }}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-600"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        html,
        body {
          min-height: 100%;
          overflow-y: auto;
        }
        @keyframes fadeMessage {
          0%,
          100% {
            opacity: 0.45;
            transform: translateY(2px);
          }
          20%,
          80% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .typing-text {
          display: inline-block;
          overflow: hidden;
          border-right: 0.16em solid rgba(250, 204, 21, 0.95);
          animation:
            fadeMessage 3.2s ease-in-out infinite,
            caretBlink 0.8s steps(1) infinite;
        }
        .call-premium {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          transform: translateZ(0);
        }
        .call-premium::before {
          content: '';
          position: absolute;
          inset: 1px;
          z-index: -1;
          border-radius: inherit;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.62), transparent 34%),
            radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.55), transparent 42%);
          opacity: 0.9;
        }
        .call-premium::after {
          content: '';
          position: absolute;
          inset: -60% auto -60% -45%;
          width: 42%;
          transform: rotate(18deg);
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.62), transparent);
          animation: executiveSweep 3.2s ease-in-out infinite;
        }
        @keyframes executiveSweep {
          0%,
          42% {
            left: -55%;
            opacity: 0;
          }
          52% {
            opacity: 0.9;
          }
          72%,
          100% {
            left: 112%;
            opacity: 0;
          }
        }
        @keyframes caretBlink {
          0%,
          49% {
            border-color: rgba(250, 204, 21, 0.95);
          }
          50%,
          100% {
            border-color: transparent;
          }
        }
      `}</style>
    </main>
  )
}

function PremiumSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black uppercase tracking-[0.12em] text-[#0f766e]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 rounded-2xl border-2 border-slate-300 bg-white px-5 text-base font-black shadow-[0_18px_42px_rgba(15,23,42,0.12)] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-teal-100 sm:h-16 sm:text-lg"
      >
        <option value="">Seleziona</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  )
}

function PrimaryButton({
  children,
  onClick,
  disabled = false,
}: {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex-1 rounded-2xl border border-[#115e59]/20 bg-[#0f766e] px-6 py-4 text-lg font-black text-white shadow-[0_20px_48px_rgba(15,118,110,0.28),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-10px_20px_rgba(19,78,74,0.24)] transition hover:-translate-y-0.5 hover:bg-[#115e59] disabled:opacity-70"
    >
      {children}
    </button>
  )
}




