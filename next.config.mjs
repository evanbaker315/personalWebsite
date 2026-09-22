/**
 * Next.js config for Evan Baker's site.
 *
 * Static export only. There is no runtime server: `npm run build` writes a
 * fully static site to `out/`, which is what GitHub Pages serves.
 *
 * basePath:
 *   Defaults to empty so `npm run dev` and a local static server both work at
 *   the root (http://localhost:3000/ and http://localhost:4321/).
 *
 *   GitHub Pages serves a project repo at
 *   https://<user>.github.io/<repo-name>/, which needs basePath="/<repo-name>".
 *   A user/organization repo named <user>.github.io serves at the root and
 *   needs no basePath. The repo name is not decided yet, so nothing is
 *   hardcoded here. Set the prefix at build time instead:
 *
 *     NEXT_PUBLIC_BASE_PATH=/personalWebsite npm run build   (or: npm run build:pages)
 *
 * assetPrefix:
 *   Deliberately not set. When basePath is set and assetPrefix is not, Next
 *   derives the asset prefix from basePath, so /_next/* files, next/link hrefs
 *   and next/image srcs all get the prefix once, with no chance of doubling it.
 *   assetPrefix is only needed to serve /_next/* from a different origin (a
 *   CDN), which GitHub Pages does not do.
 *
 *   Files in public/ are the one thing basePath does NOT rewrite: a literal
 *   src="/photo.jpg" would 404 under a project-repo prefix. Build those URLs
 *   with assetPath() from lib/paths.ts, which reads the same env var.
 */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

if (basePath !== '' && (!basePath.startsWith('/') || basePath.endsWith('/'))) {
  throw new Error(
    `NEXT_PUBLIC_BASE_PATH must be empty or look like "/repo-name" (leading slash, no trailing slash). Got: "${basePath}"`
  )
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  // Next 16's `next dev` appends a managed block to AGENTS.md (and can create a
  // CLAUDE.md) on every start. This repo's AGENTS.md and CLAUDE.md are
  // hand-written project contracts, so that auto-edit is turned off here.
  agentRules: false,
  images: {
    // next/image's default optimizer needs a running server. Static export has none.
    unoptimized: true,
  },
}

export default nextConfig
