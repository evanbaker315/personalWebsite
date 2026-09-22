'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import styles from './Section.module.css'

/**
 * A homepage section: one h2 in the column, its content 32px below.
 *
 * Vertical rhythm above the heading comes from the single global
 * `section { padding-top: var(--section-gap) }` rule, not from here.
 *
 * Sections fade and lift into place the first time they cross into view, a
 * quiet supporting motion behind MethodLine's scroll marker rather than a
 * second focal effect. `visible` defaults to true so a section that never
 * gets a layout effect (no JS, or JS that errors) simply renders in its
 * final state: the animation is an enhancement, never a hiding mechanism. A
 * synchronous getBoundingClientRect check in useLayoutEffect, not the
 * IntersectionObserver callback itself, decides the *starting* state, because
 * the observer's first callback is asynchronous and would otherwise let an
 * already-on-screen section flash from hidden back to visible after paint.
 */
export default function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  const headingId = `h-${id}`
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(true)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return

    setVisible(false)

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      ref={ref}
      className={`${styles.reveal} ${visible ? '' : styles.pending}`}
    >
      <div className="wrap">
        <h2 id={headingId}>{title}</h2>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  )
}
