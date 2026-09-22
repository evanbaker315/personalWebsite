import styles from './SiteFooter.module.css'

/**
 * One low-emphasis line. The pieces are separated by a flex gap rather than
 * middle dots, matching the article meta row: a metadata string joined with
 * middle dots is a template tell, and the site avoids it in both places.
 */
export default function SiteFooter() {
  // Computed at build time, not per visit (the site is statically exported
  // with no server), but that still beats a year hardcoded once and left to
  // go stale: every rebuild picks up the current year on its own.
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <p className={styles.line}>
          <span>Evan Baker</span>
          <span>{year}</span>
        </p>
      </div>
    </footer>
  )
}
