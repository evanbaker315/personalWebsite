import type { Metadata } from 'next'
import ArticleShell from '@/components/ArticleShell'
import WritingList from '@/components/WritingList'
import { getAllArticles } from '@/lib/articles'
import shell from '@/components/ArticleShell.module.css'

export const metadata: Metadata = {
  title: 'Writing | Evan Baker',
  description:
    'I write about engineering, AI, probability, and what I learn building companies.',
}

/**
 * The parent page for the three articles. It exists so a reader who truncates
 * an article URL lands somewhere real instead of on a 404. It gets no new
 * design vocabulary and no navigation: three items do not need filters, tags or
 * year headings.
 */
export default function WritingIndexPage() {
  const articles = getAllArticles()

  return (
    <ArticleShell>
      <h1 className={shell.title}>Writing</h1>
      <p className={shell.pageIntro}>
        I write about engineering, AI, probability, and what I learn building
        companies.
      </p>
      <WritingList articles={articles} headingLevel={2} />
    </ArticleShell>
  )
}
