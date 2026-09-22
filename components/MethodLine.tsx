'use client'

import { useEffect, useState } from 'react'
import { SECTIONS } from '@/lib/sections'
import styles from './MethodLine.module.css'

/**
 * The progress rail. It replaced the original full-bleed black band, which
 * sat once below the hero and scrolled out of view for the rest of the page,
 * with a sticky top bar. Evan then tried the top bar and asked for two more
 * changes (2026-09-17): a fixed vertical rail on the side instead of a top
 * bar, and live bidirectional progress instead of "once lit, stays lit."
 *
 * Desktop: `position: fixed`, vertically centered on the right edge, visible
 * for the whole page rather than pinned only after scrolling past the hero.
 * Below 640px it becomes a full-width bar fixed to the bottom instead: a
 * side rail that narrow has no room in the 20px mobile gutter without
 * crowding body text, and a bottom bar puts it in the thumb zone besides.
 * The black surface keeps the same band tokens the original full-bleed
 * surface used, so the site's one non-white surface survives in miniature.
 *
 * Its five stops are the site's actual sections (from lib/sections.ts, the
 * same list Hero's nav uses), in actual order, each a real link. Which ones
 * are lit is recomputed on every scroll tick from actual element position,
 * not tracked as a one-way ratchet, so scrolling back up un-lights them the
 * same way scrolling down lights them.
 *
 * The fill amount is passed down as the `--fill` custom property rather than
 * an inline `transform`, so the same number drives a vertical scaleY on
 * desktop and a horizontal scaleX on mobile purely from CSS, without the
 * component needing to know which orientation is currently in effect.
 */
function useActiveSection() {
  const [index, setIndex] = useState(-1)

  useEffect(() => {
    let frame = 0

    // A section counts as "current" once its top has crossed into the upper
    // 40% of the viewport, and stops counting the moment it scrolls back
    // below that line, so this reflects live position, not a high-water mark.
    const measure = () => {
      frame = 0
      const threshold = window.innerHeight * 0.4
      let current = -1
      SECTIONS.forEach((section, i) => {
        const el = document.getElementById(section.id)
        if (el && el.getBoundingClientRect().top <= threshold) current = i
      })
      setIndex(current)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return index
}

export default function MethodLine() {
  const currentIndex = useActiveSection()
  const fillFraction = currentIndex < 0 ? 0 : currentIndex / (SECTIONS.length - 1)

  return (
    <div className={styles.rail}>
      <nav aria-label="Section navigation and reading progress">
        <div className={styles.track}>
          <div className={styles.line} aria-hidden="true" />
          <div
            className={styles.fill}
            aria-hidden="true"
            style={{ '--fill': fillFraction } as React.CSSProperties}
          />
          <ul className={styles.stops}>
            {SECTIONS.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-label={section.label}
                  title={section.label}
                  className={i <= currentIndex ? styles.reached : undefined}
                >
                  <span className={styles.dot} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}
