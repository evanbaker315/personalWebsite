# C01: Deploy-path facts, check plan, and Next.js scaffold

- Role / assignee / run: coding / C01 + setup half of C03 / round 01
- Date: 2026-09-10
- Status: complete
- Scope: preparation (facts + check plan) and implementation (toolchain scaffold only, no site copy or design)
- Candidate revision and URL, if applicable: local only. Dev `http://localhost:3100/`, static export preview `http://localhost:4321/`. Nothing deployed, nothing committed, nothing pushed.
- Inputs actually inspected: `CLAUDE.md`, `AGENT-WORKFLOW.md`, `website-plan.md` (all sections, esp. 3), `README.md`, `reports/TEMPLATE.md`, root `index.html`, root `style.css`, `.gitignore`, `git remote -v`, current Next.js docs via context7 (`/vercel/next.js`: static exports, basePath, trailingSlash, ESLint in v16).
- Assigned write scope: Next.js app/config/dependency files, `package.json`, `.gitignore`, `public/`, `content/articles/`, `reports/C01-coding-01.md`.
- Files changed:
  - Created: `package.json`, `package-lock.json`, `next.config.mjs`, `tsconfig.json`, `eslint.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/not-found.tsx`, `app/writing/page.tsx`, `app/writing/[slug]/page.tsx`, `lib/articles.ts`, `lib/paths.ts`, `components/README.md`, `content/articles/scaffold-route-check.md`, `public/.nojekyll`
  - Modified: `.gitignore`
  - Generated and gitignored: `node_modules/`, `.next/`, `out/`, `next-env.d.ts`
  - **Touched outside scope and restored:** `AGENTS.md`. See "Out-of-scope edit, disclosed" below.

---

## Half 1: repo, remote, and deploy-path facts

Confirmed, not re-derived from assumption:

| Fact | How confirmed | Value |
|---|---|---|
| Node | `node -v` | v20.13.1 |
| npm | `npm -v` | 10.5.2 |
| git remote host/owner/repo | `git remote -v`, credentials redacted before printing | `github.com` / `evanbaker315` / `personalWebsite` |
| Repo is NOT `<user>.github.io` | same | confirmed: repo name is `personalWebsite` |
| Existing ignore rules | `cat .gitignore` | `.DS_Store`, `Thumbs.db`, `context/*`, `writing/*` (all preserved verbatim) |
| Root `.nojekyll` | `ls -la` | present, untouched |

**Deploy path consequence.** README lines 67-73 spell this out: a Pages site built from a repo not named `<user>.github.io` lives at `https://<user>.github.io/<repo-name>/`. With the repo named `personalWebsite` today, that URL is `https://evanbaker315.github.io/personalWebsite/` and the build needs `basePath: '/personalWebsite'`. If Evan renames the repo to `evanbaker315.github.io`, the site serves at the root and basePath must be empty. **Neither answer is hardcoded anywhere in this scaffold.** The prefix is a build-time environment variable that defaults to empty, and both settings are proven working below.

Note the second-order effect README warns about: a wrong prefix produces a *successful* deploy with a broken page. Under-prefixed, every `/_next/*` asset 404s and the page renders as unstyled text. Over-prefixed, the same thing happens at the root. That is why the basePath check below fetches assets under the prefix rather than only checking that the build ran.

### Check plan (named tools, and what this environment actually has)

Available here, verified by running it:

| # | Check | Exact command / tool | Available |
|---|---|---|---|
| 1 | Type check | `npm run typecheck` (`tsc --noEmit`, TypeScript 5.9.3) | yes |
| 2 | Lint | `npm run lint` (`eslint .`, ESLint 9.39.5 + `eslint-config-next` flat config incl. `jsx-a11y`) | yes |
| 3 | Production export | `npm run build` (`next build`, `output: 'export'`), then `find out -type f` | yes |
| 4 | Static-server validation of `out/` | `npm run preview` (`serve out --listen 4321`) then `curl` | yes |
| 5 | Direct article URL | `curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/writing/<slug>/` plus grepping the returned HTML for real body text | yes |
| 6 | basePath + asset paths | `npm run build:pages`, copy `out/` to `<scratch>/personalWebsite/`, serve the parent, curl `/personalWebsite/` and each `/_next/static/*` URL found in the HTML | yes |
| 7 | Console errors | Lighthouse `errors-in-console` audit (best-practices category) against the static preview | yes |
| 8 | Keyboard navigation | inspect exported HTML for `tabindex`, confirm skip link is the first focusable node, confirm `:focus-visible` rules exist. Live tab-through with a real browser is deferred to round 2 with design | partial |
| 9 | Heading structure and alt text | Lighthouse `heading-order`, `image-alt`, `link-name`, `landmark-one-main`; plus `grep` of `<h1-6>` sequence in the export | yes |
| 10 | 375px mobile | Lighthouse `--screenEmulation.mobile --screenEmulation.width=375` full-page screenshot (real device-metrics override) | yes |
| 11 | 200% zoom | render at 640px CSS width, which is what a 1280px window shows at 200% zoom, and check for clipping / horizontal scroll | yes |
| 12 | Contrast | Lighthouse `color-contrast` audit + manual ratio math on the token values | yes |
| 13 | Lighthouse accessibility | `npx lighthouse@latest <url> --only-categories=accessibility --chrome-flags="--headless=new"` | yes (via npx; not installed globally) |
| 14 | Nothing private or generated is stageable | `git status --porcelain`, `git check-ignore -v <path>`, `git add -A --dry-run` followed by `git reset` | yes |

Not available / not used:
- **`lighthouse` is not installed globally.** It runs through `npx --yes lighthouse@latest`, which works. Google Chrome is installed at `/Applications/Google Chrome.app`.
- **No Playwright/Puppeteer, and no Python `websocket-client`.** So I cannot script arbitrary DevTools interactions such as sending real Tab keypresses or reading `document.activeElement`. That is why check 8 is marked partial.
- **`--window-size` on headless Chrome will not go below ~500px** on this machine, so a naive `--screenshot --window-size=375,900` produces a *misleading* clipped image. I hit exactly that and initially misread it as a layout overflow bug. The Lighthouse `screenEmulation` path applies a real device-metrics override and is the correct tool; a hand-injected DOM probe measuring `documentElement.scrollWidth` vs `clientWidth` confirmed the window-size result was an artifact (it reported `clientW=500` for a requested 375). Recording this so round 2 does not repeat the mistake.
- **No live-URL check of any kind**, because nothing is deployed. Deployment, `verification/`, `curl` of the public URL, and the URL-bar screenshot are all still outstanding and were not touched.

---

## Half 2: what was built

### Versions installed

| Package | Version | Why |
|---|---|---|
| `next` | 16.3.4 | current stable. `engines.node >= 20.9.0`, satisfied by the installed 20.13.1. Builds with Turbopack. |
| `react` / `react-dom` | 19.3.0 | current stable, within Next 16's peer range |
| `marked` | 18.0.12 | Markdown renderer for article bodies. Chosen for **zero runtime dependencies** (`npm view marked dependencies` returns nothing), active maintenance, synchronous `parse()` which suits build-time rendering, and GFM support. Rejected: `markdown-it` (dependency tree, plugin-oriented, more than needed), a full `unified`/`remark`/`rehype` chain (five-plus packages for the same output at this scale), and any MDX setup (the writer is producing plain Markdown, not components). |
| `typescript` | 5.9.3 (dev) | TypeScript 7.0.2 exists but is a new native port; 5.9.3 is what `eslint-config-next` and Next's own types are exercised against. |
| `@types/node` 22.20.2, `@types/react` 19.3.0, `@types/react-dom` 19.3.0 | dev | matched to runtime |
| `eslint` | 9.39.5 (dev) | see limitation L3 |
| `eslint-config-next` | 16.3.4 (dev) | matches Next; brings `@next/next`, `jsx-a11y`, and TypeScript rules |
| `serve` | 14.2.6 (dev) | static server for validating `out/`. Dev-only, never ships. |

Total: 4 runtime dependencies (`next`, `react`, `react-dom`, `marked`). No component kit, no CSS framework, no CMS.

`package-lock.json` was generated. **Not committed** (committing is unauthorized this session).

### Configuration

`next.config.mjs`:

```js
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
// ... validation guard ...
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  agentRules: false,
  images: { unoptimized: true },
}
```

- `output: 'export'` + `trailingSlash: true` matches the current Next docs I pulled through context7: with both set, `/writing/x` is emitted as `writing/x/index.html`, which is exactly the shape GitHub Pages serves without rewrite rules.
- `basePath` defaults to empty so localhost works at the root. **How to flip it once Evan decides the repo name:** run `npm run build:pages` (which is `NEXT_PUBLIC_BASE_PATH=/personalWebsite next build`), or set `NEXT_PUBLIC_BASE_PATH` in the deploy workflow. If the repo is renamed to `evanbaker315.github.io`, change nothing: the default empty value is already correct.
- A guard in the config throws at build time if the value is malformed (missing leading slash or has a trailing slash), so a typo fails the build instead of silently shipping broken asset URLs. Verified: `NEXT_PUBLIC_BASE_PATH=personalWebsite/ npx next build` exits with `Error: NEXT_PUBLIC_BASE_PATH must be empty or look like "/repo-name"`.
- **`assetPrefix` is deliberately not set.** When `basePath` is set and `assetPrefix` is not, Next derives the asset prefix from `basePath`, so `/_next/*`, `next/link` hrefs and `next/image` srcs each get the prefix exactly once. Setting both to the same string is redundant and only adds a way to double-prefix. `assetPrefix` earns its place only when `/_next/*` is served from a separate origin (a CDN), which Pages does not do. This is documented in the config file itself so nobody "fixes" it later.
- The one thing `basePath` does *not* rewrite is a literal path to a `public/` file. `lib/paths.ts` exports `assetPath()` for that, reading the same env var. Nothing uses it yet because there are no images yet; it is there so the About photo slot does not 404 on Pages.
- `images.unoptimized: true` because the default `next/image` optimizer needs a running server and static export has none.
- `agentRules: false` is explained under "Out-of-scope edit, disclosed".

### Structure

```
app/layout.tsx              header/nav/main/footer, skip link, lang="en"
app/page.tsx                placeholder homepage (scaffolding, clearly labeled)
app/globals.css             minimal readable base, NOT the design
app/not-found.tsx           exports out/404.html for Pages
app/writing/page.tsx        placeholder article index
app/writing/[slug]/page.tsx generateStaticParams + dynamicParams = false
components/README.md        empty on purpose, real components land in round 2
content/articles/*.md       tracked public article sources
lib/articles.ts             ARTICLE_SLUGS (hand-enumerated) + frontmatter + marked
lib/paths.ts                assetPath() for public/ files under a basePath
public/.nojekyll            copied into out/ by the build
```

Two deliberate points about the article pipeline:

1. **Nothing globs.** `lib/articles.ts` exports a literal `ARTICLE_SLUGS` array and `getArticle()` throws on any slug not in it. Publishing an article takes two separate deliberate acts: copy the reviewed text into `content/articles/<slug>.md`, and add the slug to the array. There is no code path that reads `writing/` or `context/`. Both are gitignored *and* in the ESLint `globalIgnores` *and* in `tsconfig.exclude`.
2. **Frontmatter is parsed by ~40 lines in `lib/articles.ts`, not `gray-matter`.** These files are written by us and tracked in this repo, so the `key: value` format is fully under our control, and this keeps the runtime dependency count at one. It throws a named error if `title`, `date` or `excerpt` is missing, so a malformed article fails the build rather than rendering blank. Tradeoff stated in a comment: if frontmatter ever needs lists, nesting or multi-line values, swap in `gray-matter` rather than growing this.

`marked` output goes through `dangerouslySetInnerHTML`. That is acceptable *specifically because* the Markdown source is repo-tracked and authored in this project, and it is commented as such. If article sources ever come from anywhere else, that needs sanitizing.

### Placeholder honesty

`app/page.tsx` says "Scaffolding build ... This page is structural scaffolding for the Next.js static export. It is not the homepage." No lorem ipsum, no fake finished copy, no claims about Evan or his companies anywhere in the scaffold. `content/articles/scaffold-route-check.md` is titled "Scaffolding: article route check", its first heading is "This is not an article", and it ends with a bolded instruction to delete it when the three approved articles land. **It must be removed in round 2**, along with its slug.

---

## Evidence and checks

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| Type check passes | `npm run typecheck` -> `tsc --noEmit`, exit 0, no output | pass | `strict` and `noUncheckedIndexedAccess` are on; a bad `params` type on the async article page would have failed here |
| Lint passes | `npm run lint` -> `eslint .`, exit 0, no output | pass | see next row: proven not to be a no-op |
| Lint is actually enforcing rules | temporary `app/__linttest.tsx` with `any`, `<img>` and an unused var produced 4 problems including `jsx-a11y/alt-text` and `@next/next/no-img-element`, then the probe file was deleted | pass | a silently misconfigured flat config would have reported "0 problems" here too, which is why the probe was run |
| `npm run build` produces `out/` | build log shows `Next.js 16.3.4 (Turbopack)`, `Generating static pages (5/5)`, routes `/`, `/_not-found`, `/writing`, `● /writing/scaffold-route-check` | pass | |
| Export contains `.nojekyll` | `ls -la out/.nojekyll` -> present, 0 bytes; served at `http://localhost:4321/.nojekyll` -> 200 | pass | if `public/.nojekyll` had been missed, Pages would strip `_next/` and the site would deploy "successfully" with no CSS or JS |
| Export contains a 404 page | `out/404.html` and `out/404/index.html` both exist; `out/404.html` contains `<h1>Page not found</h1>`; unknown path on the preview server returns 404 with that body | pass | GitHub Pages serves `/404.html` for unknown paths |
| Static server serves the export and returns real content | `npm run preview` (`serve out --listen 4321`); `curl -sI http://localhost:4321/` -> `200`, `Content-Length: 7182`; body contains `<h1>Scaffolding build</h1>` and `<title>Evan Baker</title>` | pass | an empty or error page would have shown here |
| Direct article URL in the export | `curl http://localhost:4321/writing/scaffold-route-check/` -> 200, body contains `<title>Scaffolding: article route check | Evan Baker</title>`, `<h1>`, and the rendered Markdown list items | pass | this is the check that catches a route that only works via client-side navigation |
| Assets resolve at the root build | every `/_next/static/chunks/*.js|css` URL found in `out/index.html` fetched individually -> all 200, `application/javascript` / css | pass | |
| basePath build emits a single prefix | `npm run build:pages`; `out/index.html` contains `href="/personalWebsite/"`, `href="/personalWebsite/_next/static/chunks/...css"`, `src="/personalWebsite/_next/static/chunks/...js"` and no doubled prefix | pass | doubling (`/personalWebsite/personalWebsite/...`) is the classic `assetPrefix` mistake; not present |
| basePath build works when actually served under the subpath | copied `out/` to `<scratch>/pages-root/personalWebsite/`, served the parent on 4322: `/personalWebsite/` -> 200 with `<h1>Scaffolding build</h1>`, `/personalWebsite/writing/scaffold-route-check/` -> 200, three `_next` assets -> 200, `/personalWebsite/.nojekyll` -> 200 | pass | this reproduces the real Pages URL shape rather than trusting the build log |
| Malformed basePath fails loudly | `NEXT_PUBLIC_BASE_PATH=personalWebsite/ npx next build` -> `Error: NEXT_PUBLIC_BASE_PATH must be empty or look like "/repo-name"...` | pass | |
| `npm run dev` starts and serves | `next dev --port 3100`, "Ready in 289ms"; `/` -> 200 with `<h1>Scaffolding build</h1>`; `/writing/` -> 200; `/writing/scaffold-route-check/` -> 200 with the correct `<title>` | pass | port 3000 is occupied by Docker on this machine, so `dev` is pinned to 3100 |
| Lighthouse accessibility, homepage | `npx lighthouse@latest http://localhost:4321/ --only-categories=accessibility` -> **score 1.0**; `color-contrast` 1, `heading-order` 1, `html-has-lang` 1, `document-title` 1, `link-name` 1, `list` 1, `landmark-one-main` 1, `meta-viewport` 1 | pass | on placeholder scaffolding. Must be rerun on the real page in round 2. `image-alt` was `notApplicable` because there are no images yet. |
| Lighthouse accessibility, article page | same command on `/writing/scaffold-route-check/` -> **score 1.0** | pass | |
| Console errors | Lighthouse `errors-in-console` on the article page -> **score 0, one item** | **fail** | `GET /favicon.ico` 404. Real defect, see finding `coding-01`. Best-practices category 0.96 solely because of this. |
| Heading structure | homepage `h1` -> `h2` -> `h2`; article `h1` -> `h2`. No level skipped. | pass | |
| Landmarks and skip link | export contains `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, `<footer>`; `<a class="skip-link" href="#main">Skip to content</a>` is the first element in `<body>` | pass | |
| Keyboard navigation | no `tabindex` attributes anywhere in the export, so tab order is DOM order; skip link is first focusable; `:focus-visible` gives a 3px outline with 3px offset on links and buttons | partial | **not tab-tested in a live browser.** No Playwright/Puppeteer here to send real keypresses. Round 2, with design. |
| Alt text | zero `<img>` elements exist yet | not run | nothing to check. Becomes a real check when the About photo lands. |
| 375px mobile | Lighthouse device-metrics override at 375x667 DPR 2, full-page screenshot inspected: nav, h1, note, both lists and footer all fit; no clipping; no horizontal scroll | pass | first attempt with `--window-size=375,900` produced a clipped image, which was a headless minimum-window artifact (the DOM probe reported `clientW=500` for a requested 375), not a layout bug |
| 200% zoom | rendered the article page at 640px CSS width (= a 1280px window at 200%): full text visible, code spans wrap, no clipping. DOM probe: `scrollWidth == clientWidth` at 375, 640 and 1280 | pass | |
| Contrast | `#111111` on `#ffffff` ~= 18.9:1; muted `#4a4a4a` on `#ffffff` ~= 8.9:1. Lighthouse `color-contrast` audit scored 1 | pass | these are placeholder tokens, not design's palette. Contrast must be re-verified against the real shades, especially any navy or brown surface. |
| Private files cannot be staged | `git check-ignore -v` -> IGNORED for `context/main.md`, `writing/the-30x-bug.md`, `node_modules/next/package.json`, `out/index.html`, `.next/BUILD_ID`, `.env` | pass | |
| Build output cannot be staged | `git add -A --dry-run` lists 36 paths, none under `node_modules/`, `out/`, `.next/`, `context/` or `writing/`. `public/.nojekyll` **is** listed (correct, it is a source file). Index reset afterward. | pass | this is the check that would have caught a missing `out/` ignore, which is the most likely way a 400-file build artifact ends up in public git history |
| Starter files do not leak into the export | `out/style.css` does not exist; `out/index.html` does not contain "Hello, world" | pass | see recommendation below |
| Live deployed site | none | **not run** | nothing is deployed. No `verification/` file was created, per instructions. |

---

## Findings (discovered defects)

| ID | Location / quote / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| coding-01 | Every page. Lighthouse `errors-in-console`: `Failed to load resource: 404 (Not Found)` for `http://localhost:4321/favicon.ico` | observation | important | It is a genuine console error on a site whose whole point is that it was verified. A reviewer opening devtools sees a red 404 on page one. It also means the browser tab has no mark. | design (choose the mark), coding (implement) | Add `app/icon.svg` (App Router picks it up automatically and emits the `<link>` with the correct basePath, so it cannot break under `/personalWebsite`). Accept when the Lighthouse `errors-in-console` audit scores 1 on both the homepage and an article page. If design has not picked a mark by round 2, say the word and I will drop in a neutral monogram as a placeholder. |
| coding-02 | `out/404.html` `<title>` is "Evan Baker", not "Page not found" | observation | suggestion | Minor polish. The 404 body is correct; only the tab title is generic. | coding | Add a `metadata` export to `app/not-found.tsx`. Accept by grepping the exported `out/404.html` for the new title. |

No other findings in the inspected scope. The scaffold is placeholder content by design, so "the homepage says nothing about Evan" is not a defect; it is round 2's job.

---

## Out-of-scope edit, disclosed

`AGENTS.md` is not in my write scope, and I changed it and then changed it back. Disclosing rather than hoping nobody diffs it.

The first `next dev` run printed `✓ Generated AGENTS.md for AI agents` and **appended a managed block** to the repo's existing `AGENTS.md`, between `<!-- BEGIN:nextjs-agent-rules -->` and `<!-- END:nextjs-agent-rules -->` markers (Next 16 behavior, implemented in `node_modules/next/dist/server/lib/generate-agent-files.js`). The coordinator's original 11 lines were preserved above it; nothing was overwritten. `CLAUDE.md` was checked and is untouched (still 16,927 bytes, 15:55 timestamp, no injected block), though the same Next module can create a `CLAUDE.md` containing `@AGENTS.md` in a repo that lacks one.

Two reasons this could not stay: it is an unrequested edit to a coordinator-owned file, and the injected text contains an em dash, which CLAUDE.md bans in every file written for this project.

What I did: stopped the dev server, truncated `AGENTS.md` back to its original 11 lines, and set `agentRules: false` in `next.config.mjs`. Verified by restarting `next dev` and confirming the generation message no longer appears and `AGENTS.md` is still 11 lines with zero occurrences of `nextjs-agent-rules`. **`AGENTS.md` is byte-for-byte its pre-run content and is still untracked (`??`) in git.** Coordinator: worth a glance to confirm you agree.

---

## The root `index.html` and `style.css`

Recommendation: **keep both for now, delete them in the same commit that lands the real homepage, and only after the Pages Actions deploy has been verified live.**

- **They do not collide with the export.** They are not in `public/`, so `next build` never copies them. Confirmed: `out/style.css` does not exist, and `out/index.html` is the Next page, not "Hello, world."
- **The real risk is the Pages source setting, not the files.** If Pages is left on "Deploy from a branch, / (root)", GitHub publishes the repo root, which means the starter Hello World page stays live and the Next site never appears. `out/` is gitignored, so a branch-root deploy could not serve the built site even if you wanted it to. The fix is the Pages source setting (GitHub Actions), and website-plan.md already calls for that. The starter files just make the failure look like success, which is the exact trap README warns about.
- **Why not delete them yet:** while the Pages Actions workflow is unproven, those two files are the only thing currently standing between Evan and a blank github.io URL. Deleting them early removes the fallback and gains nothing, since they cannot pollute the export.
- Keep the root `.nojekyll` permanently regardless. README asks for it, and it costs nothing.

I have not deleted anything. Tell me when.

---

## Ideas and alternatives

- **Next 16 vs 15.** Considered pinning Next 15.5.x as the better-trodden static-export path. Went with 16.3.4 because it is current stable, its `engines` field explicitly allows Node 20.9+, and the export path worked first try with no workarounds. If round 2 hits a Turbopack export problem, 15.5.x is the fallback and the config translates unchanged.
- **`marked` vs a remark chain.** A remark/rehype pipeline buys plugin composability (footnotes, syntax highlighting, heading anchors) at five-plus packages. If the launch articles want code-block highlighting, that is the moment to reconsider, not now. `marked` has a plugin API that covers heading anchors cheaply.
- **Hand-rolled frontmatter vs `gray-matter`.** Covered above. The named-error-on-missing-field behavior is worth keeping either way: it turns a content mistake into a build failure instead of a blank page on the live site.
- **Article route shape.** Used `/writing/[slug]/` per the plan. `dynamicParams = false` means an unlisted slug is a build error rather than a runtime surprise, which matters because static export has no runtime.
- **`preview` script uses `serve`, not `next start`.** `next start` cannot serve an `output: 'export'` build at all; this is the single most common way people "verify" a Next static site without actually verifying it. The `preview` script exists so nobody reaches for `next start` out of habit.
- **Optional, not scope:** a build-time link checker over `out/` (crawl every `href`, assert 200) would turn "assets resolve" from a spot check into a complete one, and would catch a bad basePath across every page rather than just the homepage. Roughly 30 lines. Backlog, only if it earns its place.
- **Optional, not scope:** the Pages Actions workflow file. Not written, since deployment is not authorized. When it is, it needs `NEXT_PUBLIC_BASE_PATH` set to match whatever repo name Evan lands on.

## Limitations

- **L1.** No live-browser keyboard test. Focus styles and tab order were verified statically only. Needs a real tab-through in round 2.
- **L2.** Every accessibility, contrast and responsive result above is against **placeholder scaffolding with no real content, no real palette and no real type**. None of it transfers to the finished page. All of it must be rerun in round 2. A 1.0 accessibility score on a page with three headings and four links proves the toolchain works, not that the site is accessible.
- **L3.** `npm install` warned that `eslint@9.39.5` is EOL and that a transitive dep (`eslint-visitor-keys@5.0.1`) wants Node `^20.19.0 || ^22.13.0 || >=24` while this machine has 20.13.1. Lint runs correctly today and was proven to catch real violations, so this is not blocking. Recommend Evan upgrade Node to 20.19+ or 22 LTS before the deploy phase; the same warning appeared for Lighthouse's deps. The Pages Actions workflow should pin a Node version explicitly rather than inherit the runner default.
- **L4.** `serve` is more permissive than GitHub Pages about trailing slashes (it returned 200 for `/writing/scaffold-route-check` without the slash, where Pages issues a 301). This makes local preview slightly more forgiving than production. The trailing-slash form is the one the site actually links to, so this is low risk, but real deep-link behavior is only provable against the live URL.
- **L5.** Nothing was committed, pushed, or deployed. No `verification/` file was created. No `todo.md`, `website-plan.md`, `DECISIONS.md`, `context/`, `writing/`, or `reports/design-spec.md` edit was made.
- **L6.** The `preview` script depends on `serve`, and `npm run dev` is pinned to port 3100 because port 3000 is held by Docker on this machine. If Evan frees 3000, the pin can go.

---

## Proposed decision-log update

**Q2 (the fork).** Choice: build on Next.js 16 App Router with TypeScript and `output: 'export'`, deploying the generated `out/` through GitHub Pages Actions, rather than hand-writing HTML and letting Pages serve the repo root. Rejected alternative: the template's plain-HTML, no-build-step approach, which is genuinely simpler and has fewer ways to break. What was given up: a build step now has to succeed before anything can deploy, `node_modules` and a lockfile enter the project, and the deployed artifact is generated rather than readable in the repo. What was bought: three articles render from one reviewed Markdown source and one layout instead of three hand-maintained HTML files that drift, and the deploy path prefix is one environment variable instead of a find-and-replace across every link. Evidence: `npm run build` emits `out/` with `/writing/<slug>/index.html` per article; the same source built with `NEXT_PUBLIC_BASE_PATH=/personalWebsite` produced correctly prefixed asset URLs that all returned 200 when served under that subpath.

**Q4 (verification).** A check that could actually have failed, and this one nearly did: the site is exported, not served by a Next server, so `next start` cannot serve it. The `preview` script runs a plain static server over `out/` and each page is fetched with `curl`. `/writing/scaffold-route-check/` returned 200 with its real `<h1>` and rendered Markdown in the response body. Had the article route existed only as a client-side transition, that fetch would have 404'd while the dev server looked perfect. The second one: because the repo is named `personalWebsite` and not `evanbaker315.github.io`, the site will live under a `/personalWebsite/` prefix. That was tested by copying the prefixed build into a subdirectory, serving the parent, and fetching every `_next` asset by URL. Each returned 200. Under-prefixed, those would have 404'd and the page would have rendered as unstyled text after a deploy that reported success. Reference `verification/` here once the live URL is checked; nothing in that folder exists yet.

**Q3 candidate moment (factual note only, Evan writes the answer).** During this task, `next dev` silently appended a Next.js-authored block to the repo's `AGENTS.md`, a file the agent was told not to touch, and that block contained an em dash, which project rules ban. The agent noticed it in the dev-server log output, removed the block, restored the file to its original 11 lines, disabled the behavior with `agentRules: false`, and disclosed the edit. Logged as a factual note about tooling writing to files behind an agent's back, not as anything Evan said or decided.

---

## Handoff

**Acceptance criteria met:**
- Repo/remote/deploy-path facts confirmed and recorded without printing credentials.
- Check plan written with named commands and an honest available/not-available split.
- Next.js 16 App Router + TypeScript scaffold builds, type-checks, lints, exports, serves, and runs in dev. All five proofs have command evidence above.
- `output: 'export'`, `trailingSlash: true`, env-driven `basePath` defaulting to empty, `assetPrefix` handled and documented, both basePath modes proven by fetching assets.
- `public/.nojekyll` exists and reaches `out/`; root `.nojekyll` untouched.
- `.gitignore` extended; `context/*` and `writing/*` preserved verbatim; proven by `git check-ignore` and `git add -A --dry-run` that nothing private or generated is stageable.
- Directory structure created; `generateStaticParams` reads a hand-enumerated slug list; nothing globs `writing/`; nothing imports `context/`.
- Starter `index.html` / `style.css` left in place with a written recommendation.
- Placeholder content is labeled as scaffolding, contains no claims about Evan, and contains no lorem ipsum.

**Unmet / open:** finding `coding-01` (favicon 404) is a real open defect. Finding `coding-02` is cosmetic. Live-browser keyboard test deferred (L1).

**Blockers: none.** Nothing is waiting on me.

**What I need before round 2:**
- **From writer:** approved homepage copy; the three launch article slugs, titles, publication dates and one-line excerpts; and the final reviewed article bodies as plain Markdown. I will place them in `content/articles/<slug>.md` and register the slugs. Tell me the exact slug strings you want in the URLs, since they become public and permanent.
- **From design:** `reports/design-spec.md` with actual hex values for the black/white base and the brown/navy accents, the two typefaces and how they load, the type scale, the spacing scale, and which single signature element was chosen. Also: a favicon mark for `coding-01`, and a decision on the About photo slot's aspect ratio so I can reserve it without layout shift.
- **From the coordinator:** whether the repo gets renamed to `evanbaker315.github.io`. Not blocking (both paths are proven), but it determines whether the deploy workflow sets `NEXT_PUBLIC_BASE_PATH`.
- **From the coordinator:** the say-so to delete root `index.html` and `style.css`, once Pages Actions is proven.

**Checks to rerun after any round-2 change:** typecheck, lint, build, static-preview fetch of every page, both basePath modes, Lighthouse accessibility and `errors-in-console` on the homepage and all three articles, 375px, 200% zoom, contrast against the real palette, and a live keyboard tab-through.

**Local preview, left running:**

| What | URL | Restart command (from the repo root) |
|---|---|---|
| Dev server | `http://localhost:3100/` | `npm run dev` |
| Static export preview | `http://localhost:4321/` | `npm run build && npm run preview` |
| Export with the Pages prefix | n/a | `npm run build:pages`, then serve `out/` from a directory named `personalWebsite` |

Both servers are running now. If they are gone by the time you read this, the commands above bring them back. After a fresh clone, run `npm install` first.

**Next owner:** coordinator, to review this report, then hand me the writer's copy and design's spec for round 2 (C03 implementation).
