import { SECTIONS } from '@/lib/sections'
import styles from './Hero.module.css'

/**
 * The banner. These are the same five anchors as MethodLine's fixed side
 * rail (both read from lib/sections.ts), shown large and up front here so a
 * first-time visitor sees them before any scrolling; MethodLine repeats them
 * as a small persistent progress rail for the rest of the page.
 */

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className="wrap">
        <h1>Evan Baker</h1>
        <p className={styles.lead}>
          I build software for running businesses and making sense of markets.
        </p>
        <p className={styles.tagline}>
          Currently building Demarly and EdgeBet while finishing my degree at
          Colorado School of Mines.
        </p>
        <nav aria-label="Page sections">
          <ul className={styles.actions}>
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
