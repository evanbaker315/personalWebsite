import Link from 'next/link'
import type { Article } from '@/lib/articles'
import { formatDate } from '@/lib/articles'
import styles from './WritingList.module.css'

/**
 * The writing list, used unchanged on the homepage and on /writing/.
 *
 * No separators or rules between items: whitespace does the grouping. No
 * reading time. The date renders only when an article actually has one, so an
 * unpublished piece never shows an invented publication date.
 *
 * headingLevel exists because the three hosts sit at different depths. On the
 * homepage the list lives inside a <Section> whose title is an h2, so the items
 * are h3. On /writing/ the page title is the h1 and there is no h2 above the
 * list, so hardcoding h3 skipped a level. The level is semantic only: the
 * .itemTitle class holds the h3 type scale either way, so nothing moves.
 *
 * showExcerpt exists for the third host: the "More writing" block at the foot
 * of an article. Every excerpt already renders on the homepage and on /writing/,
 * so repeating it to a reader who just finished a piece adds height without
 * adding information. It is a prop rather than a second component on purpose:
 * the title and meta rules must stay declared in one place.
 */
export default function WritingList({
  articles,
  headingLevel = 3,
  showExcerpt = true,
}: {
  articles: Article[]
  headingLevel?: 2 | 3
  showExcerpt?: boolean
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <li key={article.slug} className={styles.item}>
          <Heading className={styles.itemTitle}>
            <Link href={`/writing/${article.slug}/`}>{article.title}</Link>
          </Heading>
          <p className={styles.meta}>
            {article.date ? (
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            ) : null}
            <span>{article.category}</span>
          </p>
          {showExcerpt ? (
            <p className={styles.excerpt}>{article.excerpt}</p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
