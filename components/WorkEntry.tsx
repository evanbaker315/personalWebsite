import styles from './WorkEntry.module.css'

/**
 * One piece of evidence in "Selected work": heading, attribution line, one
 * paragraph. No link, no logo, no numbering. These are parallel pieces of
 * evidence rather than a sequence, so numbered markers would encode ordering
 * information that is not there.
 *
 * `source` is load-bearing, not decoration. It carries the status of unlaunched
 * work and the team attribution on professional work.
 */
export default function WorkEntry({
  title,
  source,
  children,
}: {
  title: string
  source: string
  children: React.ReactNode
}) {
  return (
    <article className={styles.entry}>
      <h3>{title}</h3>
      <p className={styles.source}>{source}</p>
      <p className={styles.body}>{children}</p>
    </article>
  )
}
