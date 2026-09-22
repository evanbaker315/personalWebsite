import styles from './About.module.css'

/**
 * About.
 *
 * The photo is an optional value, not an empty slot. There is no approved photo
 * yet, so the block renders as prose in the normal column and nothing in the
 * DOM indicates a photo was ever planned: no empty box, no placeholder
 * rectangle, no reserved gap. When Evan supplies one, set `photo` and the block
 * becomes a two-column grid at >= 768px.
 */
const photo: {
  src: string
  alt: string
  width: number
  height: number
} | null = null

export default function About() {
  return (
    <div className={photo ? styles.withPhoto : undefined}>
      {photo ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          className={styles.photo}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
        />
      ) : null}
      <div className={styles.body}>
        <p>
          I&apos;m based in Colorado and studying Computer Science and Data
          Science at Colorado School of Mines. I like figuring out how complicated
          systems work, then seeing how much of that can become useful software.
        </p>
        <p>
          Alongside the companies I&apos;ve worked professionally across
          software engineering and applied AI, which is where I learned what
          production actually costs.
        </p>
      </div>
    </div>
  )
}
