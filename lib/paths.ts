/**
 * Public-asset path helper.
 *
 * next/link and next/image already apply `basePath` from next.config.mjs.
 * Files served straight out of public/ do not get that treatment, so any
 * literal "/something.png" would 404 when the site is deployed under a
 * project-repo prefix like /personalWebsite.
 *
 * Read the prefix from the same env var the config reads, and build the URL
 * through this helper instead of hardcoding a leading slash.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function assetPath(pathFromPublicRoot: string): string {
  const normalized = pathFromPublicRoot.startsWith('/')
    ? pathFromPublicRoot
    : `/${pathFromPublicRoot}`
  return `${BASE_PATH}${normalized}`
}
