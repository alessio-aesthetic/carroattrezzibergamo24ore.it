'use client'

import { useEffect, useState } from 'react'

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(localStorage.getItem('cookie-consent') !== 'accepted')
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-2xl shadow-slate-950/20 sm:left-4 sm:right-auto sm:mx-0">
      <p className="text-sm font-semibold">Privacy e cookie</p>
      <p className="mt-2 text-xs leading-5 text-slate-600">
        Usiamo solo strumenti tecnici necessari al funzionamento del sito e al
        miglioramento dell’esperienza. Puoi continuare accettando questo avviso.
      </p>
      <button
        type="button"
        onClick={() => {
          localStorage.setItem('cookie-consent', 'accepted')
          setVisible(false)
        }}
        className="mt-3 rounded-full bg-[#1D4ED8] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#1E40AF]"
      >
        Accetto
      </button>
    </div>
  )
}
