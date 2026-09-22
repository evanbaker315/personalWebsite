# C05 + FIX-001 + FIX-002: technical verification of the built candidate

- Role / assignee / run: coding / run 02
- Date: 2026-09-10
- Status: complete
- Scope: technical review, plus two authorized code fixes
- Candidate revision and URL: local only. Dev `http://localhost:3100/`, static export preview `http://localhost:4321/` (both left running). Nothing deployed, pushed or committed.
- Inputs actually inspected: `reports/C03-C04-coordinator-01.md`, `reports/design-spec.md` sections 6 and 11, `reports/C01-coding-01.md`, `CLAUDE.md`, `todo.md` rows C05 / FIX-001 / FIX-002, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/writing/page.tsx`, `app/writing/[slug]/page.tsx`, `lib/articles.ts`, `components/WritingList.tsx`, `content/articles/*.md`, `next.config.mjs`, `package.json`, `.gitignore`, and the rendered pages of both builds in headless Chrome
- Assigned write scope: `app/**`, `components/**`, `lib/**`, `reports/C05-coding-02.md`
- Files changed:
  - `components/WritingList.tsx` (heading-level prop)
  - `components/WritingList.module.css` (`.itemTitle` type-scale class)
  - `app/writing/page.tsx` (passes `headingLevel={2}`)
  - `app/globals.css` (`.skip` visually-hidden pattern)
  - `reports/C05-coding-02.md` (this file)

No layout, spacing, color or copy changed. Both fixes are semantics and hidden-element geometry only, and the measurements below prove nothing moved.

---

## Work and result

### FIX-001, heading levels on `/writing/` (important, fixed)

`WritingList` hardcoded `<h3>`. That is right on the homepage, where the list sits under a `<Section>` whose title is an `h2`, and wrong on `/writing/`, where the page title is the `h1` and there is no `h2` above the list. The page went h1 to h3.

`WritingList` now takes `headingLevel?: 2 | 3`, defaulting to 3. `/writing/` passes 2. The rendered type scale is pinned by a new `.itemTitle` class holding the `--t-h3` values, so the tag changes and the pixels do not.

Result on `/writing/`: `h1, h2, h2, h2`. Result on the homepage: unchanged, `h1, h2, h3, h3, h2, h3, h3, h3, h3, h2, h3, h3, h3, h2, h2`. Both have exactly one `h1` and zero level skips.

Computed item-heading type, both pages, three widths:

| Width | Homepage (`h3`) | `/writing/` (`h2`) | Identical |
|---|---|---|---|
| 1440 | 22px / 28.6px / -0.22px | 22px / 28.6px / -0.22px | yes |
| 640 | 21.44px / 27.872px / -0.2144px | 21.44px / 27.872px / -0.2144px | yes |
| 375 | 20px / 26px / -0.2px | 20px / 26px / -0.2px | yes |

(font-size / line-height / letter-spacing; family Newsreader and weight 600 also match.)

### FIX-002, skip link (suggestion, fixed)

`.skip` parked at `left: -9999px`. It never caused horizontal scroll, but it put a real bounding box far outside the viewport, which any honest overflow audit has to either flag or special-case. It is now the clip-path visually-hidden pattern (1px box at its static position, `clip-path: inset(50%)`), and `position: fixed` on focus so it pins to the viewport instead of the top of the document.

- Hidden state, measured: `position: absolute`, `clip-path: inset(50%)`, `overflow: hidden`, box `[0, 0, 1, 1]`, still in the accessibility tree.
- Overflow audit (`width > clientWidth` OR `right > clientWidth` OR `left < 0`, over every non-`display:none` node under `body`): **empty list** at 375, 640 and 1440 on all page types. It was not empty before.
- Focused state, driven by real `Input.dispatchKeyEvent` Tab presses: visible at `[8, 8, 166, 46]`, inside the viewport, `:focus-visible` true, `outline: solid 2px rgb(31, 51, 82)` at `outline-offset: 3px`.
- The `position: fixed` half earns its keep: on an article scrolled to y=1200, the focused skip link still lands at `[8, 8]`. Under the old `absolute` it would have rendered 1200px above the fold, focused but off screen.

---

## Evidence and checks

Static export at `http://localhost:4321` unless stated. Browser work is headless Chrome 152 driven over CDP. "not run" means not run, with the reason.

### The two fixes

| Check or claim | Evidence | Result | What could have made it fail / limitation |
|---|---|---|---|
| `/writing/` heading order | DOM walk, exported HTML and hydrated DOM | pass, `h1, h2, h2, h2`, zero skips | The pre-fix page reported one `1->3` skip |
| Homepage heading order unchanged | DOM walk | pass, 15 headings, zero skips, one h1 | Promoting the homepage list to h2 as well would have produced two peer h2 meanings under one section |
| Item heading type unchanged | computed `fontSize`/`lineHeight`/`letterSpacing` on both pages at 1440/640/375 | pass, identical at all six points | Forgetting `.itemTitle` would have rendered `/writing/` items at the h2 scale (28px at 1440), a visible 6px jump |
| Overflow audit empty | every node under `body`, 375/640/1440, all page types | pass, `[]` everywhere | Any `left < -0.5` node reappears in this list; the old `.skip` was the only entry |
| Skip link still first, visible, focusable | real Tab keypresses on `/`, `/writing/`, an article, and `/` at 375 | pass on all four | `display: none` or `visibility: hidden` would have removed it from tab order entirely, which is the classic way to break this "fix" |
| Skip link pins while scrolled | article at scrollY 1200 | pass, box `[8, 8]` | Under `position: absolute` this returns a negative `top` |

### Checks assigned to this round

| # | Check or claim | Evidence | Result | What could have made it fail / limitation |
|---|---|---|---|---|
| 1 | Lighthouse accessibility, real run | Lighthouse **13.4.1** (installed in a scratch dir, not added to `package.json`), `--only-categories=accessibility`, attached to the same Chrome | **100 on all four page types.** Homepage 21 audits passed / 0 failed / 45 n.a. / 10 manual-only. `/writing/` 20 passed. Article 20 passed. 404 18 passed. **Zero flagged items on any page.** | Reported honestly: Lighthouse a11y is axe under the hood and it scores only what it can decide. See limitation in row 1b |
| 1b | What Lighthouse's 100 does **not** cover | 4 `color-contrast` nodes came back **incomplete**, not passed: the `<text>` labels inside the band diagram (`system`, `model`, `software`, `business`). axe cannot resolve a background through an SVG node | resolved manually: `rgb(255,255,255)` on `rgb(0,0,0)` = **21:1** at 15px/500 | Incomplete results are excluded from the score. A genuinely low-contrast SVG label would have scored 100 too. This one is computed, not assumed |
| 1c | axe-core direct, wider than Lighthouse | axe-core 4.13.0 run in-page over `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice` | **0 violations** on home@1440/640/375, `/writing/`@1440/375, all three articles, and the 404 | Running only `wcag2a` would have hidden `target-size` and `heading-order`, which are the two rules this build could plausibly have failed |
| 1d | The a11y check has teeth | Counterfactual: after hydration, the three `/writing/` item headings were demoted back to `h3` in the live DOM and axe re-run on the same page | **1 violation, `heading-order`, moderate**, on the first item. Same page with the fix: **0** | This is the falsifiable half of FIX-001. Method note in finding C05-03 |
| 2 | Keyboard pass, actually driven | `Input.dispatchKeyEvent` Tab on 4 page/width combos; `activeElement` and computed outline read after each press | pass. **Skip link is focus stop 1 on every page.** All 11 homepage stops, all 6 `/writing/` stops and all 3 article stops show `outline: solid 2px rgb(31, 51, 82)`, `outline-offset: 3px`, `:focus-visible` true, and scrolled into the viewport | Reading the CSS proves the rule exists; it does not prove `:focus-visible` matches, that no element steals focus, or that the ring is not clipped by an ancestor |
| 2b | The skip link does something | Tab, then Enter | pass. Hash becomes `#main`, page scrolls to y=471, and the **next** Tab lands on `demarly.ai`, the first link inside `<main>`, skipping the three header nav links | A skip link that focuses nothing would have continued from the header and put `What I'm building` next |
| 3 | 200% zoom | 640x400 CSS viewport at `deviceScaleFactor: 2` (a 1280x800 window at 200%), home / `/writing/` / article, plus screenshots of the band and a company deck | pass. No horizontal scroll, **zero** elements outside the viewport, gutters 24px, column 592px, h1 48px vs h2 28px vs body 19px (hierarchy intact), the band diagram still renders its horizontal variant at 592px with 15px labels, brown deck legible at 15px and **7.94:1** on paper | Matches design-spec section 6's stated 200% expectations. A `vw`-based band or a px root font-size would have overflowed here |
| 4 | Console errors and warnings, every route | CDP `Runtime.consoleAPICalled`, `Log.entryAdded`, `Runtime.exceptionThrown`, `Network.loadingFailed`, `Network.responseReceived` on `/`, `/writing/`, all three articles, `/404.html`, `/icon.svg`, and a missing path | **zero console messages of any level, zero exceptions, zero HTTP >= 400** on all real routes | The only `Log` entry anywhere was a `/favicon.ico` 404 while loading `/icon.svg` **as a document**, which no real page does: every page ships `<link rel="icon">`, so no page requests `/favicon.ico` |
| 4b | The `ERR_ABORTED` fetches are benign | Mapped `Network.loadingFailed` request ids back to URLs | They are Next's App Router `<Link>` prefetches of routes already in the export. Aborted, silent, no console output | Proven harmless by row 4c rather than assumed |
| 4c | Client-side navigation actually works in the export | Clicked the `/writing/the-30x-bug/` link on the homepage and waited for the route change | pass. Path, `document.title` and `h1` all update; 14 body paragraphs render; zero console output | If the aborted prefetches had broken RSC navigation, a click would have left a blank or stale `<main>`. `curl` cannot see this |
| 5 | Direct article URLs, fetched cold | `curl` at each URL with no prior navigation | 200 with the correct `<title>` for all three articles, `/`, `/writing/`, `/icon.svg`, `/.nojekyll` | A client-only route would have 404'd here even though in-app links worked |
| 5b | Trailing slash | `/writing/the-30x-bug` and `/writing` without the slash | both 200, same bytes as the slashed form | Local only. See limitation L-2: `serve` and GitHub Pages do not resolve extensionless paths identically |
| 5c | 404 | `/nope/` and `/404.html` | `/nope/` returns **HTTP 404** and serves the site's own page, `<title>Page not found | Evan Baker</title>` | A missing `out/404.html` would have produced the host's default page |
| 6 | basePath export | `npm run build:pages` (`NEXT_PUBLIC_BASE_PATH=/personalWebsite`), export copied to `<root>/personalWebsite/` and served, so the URL shape matches a Pages project site | pass. All 24 distinct internal URLs in the prefixed HTML carry the prefix; **zero unprefixed internal URLs**; all 19 assets and routes fetched **200**; `/personalWebsite/writing/` 200, `/personalWebsite/nope/` 404 | Serving `out/` at the root would have "passed" while proving nothing |
| 6b | Prefixed build in a browser | Loaded `/`, `/writing/`, an article under the prefix | pass. h1 56px, Newsreader resolved, white paper, `icon.svg` href prefixed, article links prefixed, client navigation works, **0 console messages, 0 HTTP errors** | A `curl` sweep cannot catch a font or CSS chunk that resolves but fails to apply |
| 6c | Unprefixed build restored | `npm run build`, then re-fetched the preview | pass. Zero `/personalWebsite` hrefs in `out/index.html`; preview at 4321 serves the current pages | The preview server would otherwise be serving a build whose assets all 404 |
| 7 | `.nojekyll` reaches `out/` | `ls out/.nojekyll` after both builds | pass, present (0 bytes) in the plain build, the prefixed build, and reachable over HTTP at `/.nojekyll` | Without it GitHub Pages runs Jekyll and drops the whole `_next/` directory, breaking every asset |
| 8 | External links resolve, **checked 2026-09-10 22:53 UTC** | `curl -L` with a browser UA | `https://demarly.ai` **200** (one 301 to `https://www.demarly.ai/`), title "Demarly.ai: Run your entire business with a team of AI agents \| 7-day free trial". `https://github.com/evanbaker315` **200**, title "evanbaker315 · GitHub". `https://apps.apple.com/us/app/edgebet/id6759763418` **200**, title "Edgebet App - App Store" | Status only. This proves the URLs resolve today, not that the pages say what the site implies. See finding C05-05 |
| 9 | No private material in the export | greps over `out/` plus a tags-stripped text extraction of every HTML page | `DRAFT NOTE` **0**. Em dash (U+2014) **0** in `out/` and **0** in `app/ components/ lib/ content/`. En dash and horizontal bar **0**. No phone-shaped strings. One email, `evanbaker315@gmail.com`, which is the approved contact | The `writing/` hits are `/writing/` route URLs. `GPA` was `SVGPathSegList` in a framework chunk. `resume` and `localhost` are `NEXT_RESUME_HEADER` and a URL parser inside Next's own bundle. `api key` is the approved BYO-key sentence. No `sk-`, `ghp_`, `AKIA` or JWT-shaped token anywhere |
| 9b | Nothing private would be staged | `git add -A --dry-run`, 67 paths, plus `git check-ignore` | pass. **Zero** paths under `context/` or top-level `writing/`; zero under `node_modules/`, `.next/`, `out/`; `next-env.d.ts` and `tsconfig.tsbuildinfo` ignored. `.gitignore` still carries `context/*` and `writing/*` verbatim | Weakening either ignore line is the failure this catches. Nothing was committed; this is a dry run |
| 10 | Article body renders completely | Word-level diff of each source body against the rendered `<article>` text | pass. **Every** source word appears in all three pages; first and last twelve words present. `the-30x-bug` shows 3 "missing" tokens, which are the `1.` `2.` `3.` list markers now drawn by `<ol>` numbering | A markdown renderer silently dropping a block would show up as dozens of missing words. This is mechanical, not editorial: approved-copy review is W03's |
| 10b | Per-page metadata | `<title>`, `<meta name="description">`, `lang`, `charset`, viewport on all 8 exported pages | pass. Distinct correct titles and descriptions per route; `lang="en"`, utf-8 and a viewport tag on every page | A shared layout `<title>` would have given all five pages "Evan Baker" |
| 11 | Typecheck / lint / build after the fixes | `npm run typecheck`, `npm run lint`, `npm run build` | pass, clean, 8 routes, 3 SSG article pages | Re-run because the fixes touched TSX and CSS. The C03/C04 results are cited, not re-derived, for the clamp/measure/band-accent/SVG audits |
| 12 | Structural audit re-run | The C03/C04 audit script against the rebuilt export | unchanged: h1 56/48/36.08px, h2 28px, body 19px, measure 70 chars at 1440, `scrollWidth == clientWidth` at all widths, 0 accents in the band, 0 unlabelled SVGs, exactly one method-line variant `display: block`, 0 images without alt | Confirms the fixes regressed nothing that C03/C04 had already measured |
| 13 | Dev server matches the export | `curl` all five routes on `http://localhost:3100` | pass, 200 each; `/writing/` serves the `h2` item headings, so dev picked the fix up | A stale dev server would still be serving `h3` |

### Not run

| Item | Reason |
|---|---|
| Live-URL verification | Deployment is not authorized. C02/C06 own this, and a localhost 200 is not evidence about GitHub Pages |
| Lighthouse performance / SEO / best-practices | Out of scope for C05, which asked for accessibility. Also meaningless against a localhost static server |
| Real assistive-technology pass (VoiceOver, NVDA) | No screen reader available in this environment. axe and a driven keyboard pass are automation, and automation catches roughly a third of real a11y defects |
| Real-device mobile | 375px was emulated, not run on hardware. Tap-target sizes were measured (43px on the stacked hero row), not felt |
| Copy and claim review | W03's task. Row 10 checks that the approved text survived the pipeline, not that the text is approved |

---

## Findings

| ID | Location / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| C05-01 | `/writing/` | **Nothing on the site links to it.** The full href inventory of `out/index.html` is the three article URLs, three in-page anchors, three external links and the mailto; the article pages link only to `/`. Tab order confirms it: no page has a focus stop that reaches `/writing/`. It is reachable only by typing or truncating a URL | suggestion | Observation, not a bug: P01 decision 7 kept the index precisely so a truncated article URL lands somewhere real. But a reader who arrives on one article from search has no path to the other two except the homepage, and the index carries three excerpts nobody will see | design to rule, coding to implement | If design wants it linked: either the homepage Writing section gets an "All writing" link, or the article back-link becomes "Back to writing" instead of "Back to Evan Baker". Accept when a link to `/writing/` appears in the tab order of at least one shipped page. If design rules it stays orphaned, record that as intentional so it is not re-raised in review |
| C05-02 | Band diagram SVG `<text>` labels | axe returns 4 `color-contrast` **incomplete** results here, not passes: it cannot resolve a background through an SVG node. Manually computed, white on black is **21:1** | suggestion | **No fix recommended.** Recorded so nobody reads "Lighthouse 100" as covering these four nodes. Any future SVG text on a non-black ground has to be computed by hand for the same reason | coding | None. Accept as documented. If SVG text ever lands on a lighter ground, compute the ratio explicitly rather than trusting the audit |
| C05-03 | Verification method, not the site | The first FIX-001 counterfactual was **invalid**: editing `h2` back to `h3` in the exported HTML and serving it produced axe `heading-order` = pass, because React hydration re-rendered the RSC payload and restored the `h2`. The valid counterfactual mutates the DOM after hydration, and does report the violation | important (process) | Any future check that edits `out/*.html` and reloads is measuring pre-hydration HTML that the browser then throws away. That silently turns real failures into passes | coding | Verify against the hydrated DOM or against a real rebuild, never a hand-edited export. Accept when a counterfactual demonstrably changes the result it is supposed to change |
| C05-04 | `https://demarly.ai` in `components/CompanyEntry` usage on the homepage | Resolves 200 through one 301 to `https://www.demarly.ai/` | suggestion | Works. Costs one redirect on click and, if the apex ever stops redirecting, breaks silently | coding, only if design/writer wants it | Leave as is (the short form is the better thing to show a reader), or link `https://www.demarly.ai`. Accept when the link fetches 200 with 0 redirects |
| C05-05 | App Store listing | The live listing's page title renders as "**Edgebet App** - App Store"; the site writes "EdgeBet" | suggestion | Not a link defect (200). It is a naming-consistency question a reviewer may notice, and product naming is not coding's call | writer | Confirm with Evan which spelling is canonical, and whether the listing or the site should change. Accept when the site's spelling matches whatever Evan confirms |
| C05-06 | `out/404.html` | The 404 page inherits the site-wide meta description ("Engineer and founder building Demarly and EdgeBet...") rather than describing itself | suggestion | Cosmetic and low impact (404s should not be indexed). Costs one `metadata` export in `app/not-found.tsx` | coding | Add a `description` to the not-found metadata. Accept when `out/404.html` carries its own description string |

Everything else in the inspected scope passed.

---

## Limitations

- **L-1.** Lighthouse 13.4.1 was installed into a scratch directory outside the repo, on purpose: `package.json` is not in this task's write scope and the site does not need Lighthouse as a dependency. It ran under Node 20.13.1 against its declared `^20.19.0` engine and printed an `EBADENGINE` warning. It produced complete reports on all four pages, but the version skew is worth knowing.
- **L-2.** `serve` is not GitHub Pages. It resolved `/writing/the-30x-bug` (no trailing slash) directly with **0 redirects**, and 301'd `/404.html` to `/404`. GitHub Pages issues a 301 for the first case and serves `404.html` directly for the second. Redirect behavior, real 404 handling and Pages' own caching can only be confirmed on the live host, in C06.
- **L-3.** The prefixed-build check simulates a project-site URL shape by copying `out/` into a `personalWebsite/` directory. It proves the prefix is correct and complete. It does not prove GitHub Pages will serve it, and the repo-name decision (`personalWebsite` vs renaming to `evanbaker315.github.io`) is still open. If the repo is renamed, **`npm run build`, not `build:pages`, becomes the deploy command**, and this check has to be redone the other way around.
- **L-4.** All browser work is one engine, headless Chrome 152. No Safari, no Firefox, no real iOS. `text-wrap: balance`, `clip-path` on the skip link, and the `clamp()` type scale are all well supported, but "measured in Chrome" is not "measured everywhere".
- **L-5.** Automated accessibility testing catches a minority of real defects. Zero axe violations and Lighthouse 100 mean no machine-detectable failure, not that the page reads well in a screen reader.

---

## Ideas and alternatives

- **Rejected: `React.createElement(\`h${level}\`)` for the dynamic heading.** The two-branch `const Heading = headingLevel === 2 ? 'h2' : 'h3'` keeps the union type intact, so TypeScript rejects `headingLevel={4}` at build time instead of rendering an `<h4>` nobody styled. A template literal would have made every level compile.
- **Rejected: dropping the `.itemTitle` class and letting `h2` style itself on `/writing/`.** That is the version where the fix is invisible in code review and visible on the page: `/writing/` items would jump from 22px to 28px at 1440. The class is what makes "semantic change only" a checkable claim rather than an intention.
- **Rejected: `clip: rect(0 0 0 0)` for the skip link.** The legacy `clip` property still works, but `clip-path: inset(50%)` is the current pattern and does not need the `overflow: hidden` crutch on older engines. Both were kept here because `overflow: hidden` costs nothing and covers the case where `clip-path` is unsupported.
- **Rejected: `position: fixed` in the hidden state too.** A fixed 1px element still participates in stacking. Leaving the hidden state `absolute` and switching to `fixed` only on focus keeps the resting page identical to before the fix.
- **Idea, backlog:** the overflow audit, the heading walk, the `clamp()` assertion and the accent-in-band scan are four checks that have now run twice by hand. They would work as one committed script (`scripts/audit.mjs`) run against `out/` after every build. Not built: it is new tooling, outside this task, and it needs a decision about whether the repo carries a dev-only CDP dependency.
- **Idea, backlog:** the aborted `<Link>` prefetches are harmless but they do fetch full route payloads on hover/viewport for a three-article site. `prefetch={false}` on the writing links would cut the request count on `/writing/` from 26 to about 14. Not done: it trades a measured non-problem for slower navigation.

---

## Proposed decision-log update

**Q4 (verification), strongest candidate produced this round.** Two checks that could genuinely have failed and were proven capable of failing:

1. **The heading-level counterfactual.** `/writing/` skipped from `h1` to `h3`. The fix was verified not by asserting the new markup but by putting the old markup back into the hydrated DOM and re-running axe: **1 `heading-order` violation before, 0 after**. The first attempt at that counterfactual was itself wrong (editing the exported HTML, which React hydration overwrites), which is exactly why the check is worth citing: it had to be made falsifiable twice.
2. **The basePath export.** `npm run build:pages` was exported into a directory that reproduces a GitHub Pages project-site URL shape, and all 24 internal URLs plus 19 fetched assets carried `/personalWebsite`. Zero unprefixed internal URLs. Had `assetPrefix` been set alongside `basePath`, every `_next` asset would have been double-prefixed and 404'd, while the root page still returned 200.

**Q1 (what changed), supporting detail.** Nothing new. The palette and layout decisions were made earlier; this round only verified them (200% zoom, the 7.94:1 brown deck, 21:1 band labels).

**Q3, factual candidate note only, for the coordinator's running list.** Nothing new from this task. Evan did not overrule anything here. **Evan writes the final Q3 answer.**

---

## Handoff

- **Acceptance criteria met:** typecheck, lint, `npm run build` producing `out/`, static-server preview of that output, direct article URLs, basePath and assets, console errors, keyboard, headings and alt text, 375px mobile, 200% zoom, and real Lighthouse accessibility results are all documented above with results and failure conditions. FIX-001 and FIX-002 are implemented and their acceptance checks pass.
- **Acceptance criteria unmet:** none in this task's scope. Live-URL verification is C06, correctly still pending.
- **Blocker or missing input:** none. C05-01 needs a design ruling but does not block anything.
- **Note for design (D02), reviewing the same pages in parallel:** the pages were **rebuilt** during this task and `out/` is currently the unprefixed build. Nothing visual changed. The only two edits are the `/writing/` item headings becoming `h2` at an identical rendered size, and the skip link's hidden geometry. Any D02 screenshot taken before 16:45 local is still valid. C05-01 (the orphan `/writing/` route) is the one finding that wants a design decision.
- **Next owner:** coordinator (P03), after W03 and D02 return. C05-05 routes to the writer.
- **Checks to rerun after any further change:** the overflow audit at 375/640/1440, the heading walk on all page types, `npm run build`, and, if `next.config.mjs` or any asset path is touched, the full basePath sweep. If the repo is renamed to `evanbaker315.github.io`, redo the basePath check with the empty prefix and update the deploy command.
- **Servers, both left running and verified working after the final build:**
  - Dev: `http://localhost:3100/` (`npm run dev`) - all five routes 200
  - Static export: `http://localhost:4321/` (`npm run build`, then `npx serve out --listen 4321`) - all routes plus `/icon.svg` 200
  - Restart either with the commands above from the repo root. The two scratch servers used for the basePath and counterfactual checks (ports 4322 and 4399) were stopped.
