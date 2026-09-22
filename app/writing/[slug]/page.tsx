import type { Metadata } from 'next'
import ArticleShell from '@/components/ArticleShell'
import WritingList from '@/components/WritingList'
import { ARTICLE_SLUGS, formatDate, getArticle } from '@/lib/articles'
import shell from '@/components/ArticleShell.module.css'
import styles from './article.module.css'

export function generateStaticParams() {
  // Explicit list. Adding an article means editing ARTICLE_SLUGS on purpose.
  return ARTICLE_SLUGS.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  return {
    title: `${article.title} | Evan Baker`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticle(slug)
  // ARTICLE_SLUGS order minus the current piece, so a reader meets the same
  // sequence here as on the homepage rather than a reshuffle.
  const others = ARTICLE_SLUGS.filter((s) => s !== slug).map((s) =>
    getArticle(s)
  )

  return (
    <ArticleShell>
      <article>
        <h1 className={shell.title}>{article.title}</h1>
        {/* A flex row, not a middle dot or a spaced dash. The date renders only
            when the piece actually has one. */}
        <p className={styles.meta}>
          {article.date ? (
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          ) : null}
          <span>{article.category}</span>
        </p>
        {/* Markdown source is repo-tracked and authored in this project. */}
        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      </article>
      {/* The exit. A sibling of <article>, not part of it, and deliberately not
          in ArticleShell: the shell is shared with /writing/ and the 404, where
          a "more writing" list would be a duplicate of the page or nonsense. */}
      {others.length > 0 && (
        <aside className={styles.more} aria-labelledby="more-writing">
          <h2 id="more-writing">More writing</h2>
          <WritingList articles={others} headingLevel={3} showExcerpt={false} />
        </aside>
      )}
    </ArticleShell>
  )
}
