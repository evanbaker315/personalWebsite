'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import styles from './Section.module.css'

/** Opt-in, once-only motion. Server output and unsupported browsers stay visible. */
export default function Section({
  id,
  title,
  children,
  reveal = false,
}: {
  id: string
  title: string
  children: React.ReactNode
  reveal?: boolean
}) {
  const headingId = `h-${id}`
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(true)
  const [instant, setInstant] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!reveal || !el || typeof IntersectionObserver === 'undefined') return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isTarget = () => {
      const target = document.getElementById(window.location.hash.slice(1))
      return target !== null && el.contains(target)
    }
    const rect = el.getBoundingClientRect()
    if (motion.matches || isTarget() || el.contains(document.activeElement)
      || rect.top < window.innerHeight) return

    const show = (immediately = false) => {
      if (immediately) setInstant(true)
      setVisible(true)
      observer.disconnect()
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) show()
      },
      // A zero threshold works even when a section is taller than the viewport.
      { threshold: 0 },
    )
    const onFocus = () => show(true)
    const onHashChange = () => { if (isTarget()) show(true) }
    const onMotionChange = () => { if (motion.matches) show(true) }

    observer.observe(el)
    setVisible(false)
    el.addEventListener('focusin', onFocus)
    window.addEventListener('hashchange', onHashChange)
    motion.addEventListener('change', onMotionChange)
    return () => {
      observer.disconnect()
      el.removeEventListener('focusin', onFocus)
      window.removeEventListener('hashchange', onHashChange)
      motion.removeEventListener('change', onMotionChange)
    }
  }, [reveal])

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      ref={ref}
      className={`${reveal ? styles.reveal : ''} ${visible ? '' : styles.pending} ${instant ? styles.instant : ''}`}
    >
      <div className="wrap">
        <h2 id={headingId}>{title}</h2>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  )
}
