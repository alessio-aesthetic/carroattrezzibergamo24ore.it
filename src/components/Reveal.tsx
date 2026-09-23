'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setReady(true)
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`ber-reveal ${ready ? 'is-ready' : ''} ${visible ? 'is-visible' : ''} ${className}`} style={{ '--ber-delay': `${delay}ms` } as CSSProperties}>{children}</div>
}
