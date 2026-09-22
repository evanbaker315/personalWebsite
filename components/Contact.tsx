import styles from './Contact.module.css'

/**
 * Contact.
 *
 * Two channels, both approved. No icons: an icon set here would be a logo wall
 * and there is no icon system anywhere else on the site. No contact form, no
 * calendar link, no phone number, no address.
 */
export default function Contact() {
  return (
    <>
      <p>
        Building, investing, or working on something interesting? I&apos;d like
        to hear about it.
      </p>
      <ul className={styles.links}>
        <li>
          <a href="mailto:evanbaker315@gmail.com">evanbaker315@gmail.com</a>
        </li>
        <li>
          <a href="https://github.com/evanbaker315" rel="noopener">
            GitHub
          </a>
        </li>
      </ul>
    </>
  )
}
