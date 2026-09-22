import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { marked } from 'marked'

/**
 * The launch article list, enumerated by hand on purpose.
 *
 * Nothing globs a directory here. The private drafting folder `writing/` is
 * gitignored and is never a build input. An article becomes public only when
 * its reviewed text is copied into `content/articles/<slug>.md` AND its slug is
 * added to this array. Two steps, both deliberate.
 *
 * The order of this array is the reading order on the site. It is editorial,
 * not chronological, because these three pieces have no publication dates yet.
 */
export const ARTICLE_SLUGS = [
  'the-30x-bug',
  'distrust-your-best-results',
  'never-bill-twice',
] as const

export type ArticleSlug = (typeof ARTICLE_SLUGS)[number]

export interface Article {
  slug: string
  title: string
  /** One-word subject label: Engineering, Data, AI. */
  category: string
  /**
   * ISO date (YYYY-MM-DD), or an empty string when the piece has no real
   * publication date yet. Empty is the correct value for an unpublished
   * article: the pages render no date rather than an invented one.
   */
  date: string
  excerpt: string
  /** Rendered HTML for the article body (frontmatter stripped). */
  html: string
}

const ARTICLES_DIR = join(process.cwd(), 'content', 'articles')

/**
 * Minimal frontmatter reader for `key: value` lines between two `---` fences.
 *
 * These files are written by us and tracked in this repo, so the format is
 * fully under our control. That keeps the dependency list at one runtime
 * package. If frontmatter ever needs lists, nesting or multi-line values,
 * swap this for gray-matter rather than growing it.
 */
function splitFrontmatter(raw: string): {
  data: Record<string, string>
  body: string
} {
  const normalized = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n')
  if (!normalized.startsWith('---\n')) {
    return { data: {}, body: normalized }
  }
  const end = normalized.indexOf('\n---', 3)
  if (end === -1) {
    return { data: {}, body: normalized }
  }
  const block = normalized.slice(4, end)
  const body = normalized.slice(normalized.indexOf('\n', end + 1) + 1)

  const data: Record<string, string> = {}
  for (const line of block.split('\n')) {
    if (line.trim() === '' || line.trimStart().startsWith('#')) continue
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    let value = line.slice(colon + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }
  return { data, body }
}

function requireField(
  data: Record<string, string>,
  key: string,
  slug: string
): string {
  const value = data[key]
  if (!value) {
    throw new Error(
      `content/articles/${slug}.md is missing required frontmatter field "${key}".`
    )
  }
  return value
}

export function getArticle(slug: string): Article {
  if (!(ARTICLE_SLUGS as readonly string[]).includes(slug)) {
    throw new Error(`Unknown article slug: "${slug}". Add it to ARTICLE_SLUGS.`)
  }
  const raw = readFileSync(join(ARTICLES_DIR, `${slug}.md`), 'utf8')
  const { data, body } = splitFrontmatter(raw)

  return {
    slug,
    title: requireField(data, 'title', slug),
    category: requireField(data, 'category', slug),
    // Optional on purpose. See the Article interface.
    date: data.date ?? '',
    excerpt: requireField(data, 'excerpt', slug),
    // Markdown source is repo-tracked and written by us, so there is no
    // untrusted HTML to sanitize here. If that ever changes, sanitize.
    html: marked.parse(body, { async: false, gfm: true }),
  }
}

export function getAllArticles(): Article[] {
  // Deliberately unsorted: ARTICLE_SLUGS is the editorial order. Sorting by
  // date would be meaningless while the dates are empty, and would silently
  // reshuffle the list the day the first real date lands.
  return ARTICLE_SLUGS.map((slug) => getArticle(slug))
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/**
 * Format an ISO date for display, by string arithmetic rather than `new Date`.
 * `new Date('2026-09-12')` parses as UTC midnight and then renders in local
 * time, which shows the previous day for anyone west of Greenwich. Evan is in
 * Colorado, so that bug would be visible on every date the site ever shows.
 *
 * Returns an empty string for an empty or malformed date, so a caller that
 * forgets to check simply renders nothing.
 */
export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return ''
  const [, year, month, day] = match
  const name = MONTHS[Number(month) - 1]
  if (!name) return ''
  return `${name} ${Number(day)}, ${year}`
}
