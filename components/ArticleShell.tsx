import Link from 'next/link'
import styles from './ArticleShell.module.css'

/**
 * Chrome shared by /writing/ and every /writing/<slug>/ page: a back link at
 * the top, the same single column, and a body-level footer so the page has a
 * contentinfo landmark like the homepage does.
 *
 * These pages get no new design vocabulary. Same tokens, same two faces.
 */
export default function ArticleShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className={`${styles.chrome} ${styles.header}`}>
        <div className="wrap">
          <Link href="/">Evan Baker</Link>
        </div>
      </header>
      <main id="main" className={styles.main}>
        <div className="wrap">{children}</div>
      </main>
      <footer className={`${styles.chrome} ${styles.footer}`}>
        <div className="wrap">
          <Link href="/">Back to Evan Baker</Link>
        </div>
      </footer>
    </>
  )
}
