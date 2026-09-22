import { assetPath } from '@/lib/paths'
import styles from './CompanyEntry.module.css'

/** Company introduction with its original product screenshot and full-size link. */
export default function CompanyEntry({
  name,
  deck,
  screenshot,
  link,
  children,
}: {
  name: string
  deck: string
  screenshot?: {
    src: string
    width: number
    height: number
    alt: string
    caption: string
    portrait?: boolean
  }
  link?: { href: string; label: string }
  children: React.ReactNode
}) {
  return (
    <article className={styles.entry}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.deck}>{deck}</p>
      <div className={`${styles.content}${screenshot?.portrait ? ` ${styles.portrait}` : ''}`}>
        <div>
          <div className={styles.body}>{children}</div>
          {link ? (
            <p className={styles.link}>
              <a href={link.href} rel="noopener">
                {link.label}
              </a>
            </p>
          ) : null}
        </div>
        {screenshot ? (
          <figure className={styles.figure}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.image}
              src={assetPath(screenshot.src)}
              width={screenshot.width}
              height={screenshot.height}
              alt={screenshot.alt}
              loading="lazy"
              decoding="async"
            />
            <figcaption className={styles.caption}>
              {screenshot.caption}
              <a href={assetPath(screenshot.src)}>
                View full-size {name} screenshot
              </a>
            </figcaption>
          </figure>
        ) : null}
      </div>
    </article>
  )
}
