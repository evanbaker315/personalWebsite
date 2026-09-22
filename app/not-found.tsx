import type { Metadata } from 'next'
import ArticleShell from '@/components/ArticleShell'
import shell from '@/components/ArticleShell.module.css'

/* Its own description, so a 404 that does get crawled or link-previewed does not
   advertise itself with the homepage summary. Finding C05-06. */
export const metadata: Metadata = {
  title: 'Page not found | Evan Baker',
  description: 'That URL does not exist on this site.',
}

export default function NotFound() {
  return (
    <ArticleShell>
      <h1 className={shell.title}>Page not found</h1>
      <p className={shell.pageIntro}>That URL does not exist on this site.</p>
    </ArticleShell>
  )
}
