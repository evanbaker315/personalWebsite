# F03b: writer's two homepage strings and design's article exit

- Role / assignee / run: coding / F03b / run 04
- Date: 2026-09-10
- Status: complete
- Scope: implementation. Local build only, under the 2026-09-10 local-preview authorization. Nothing deployed, pushed, committed, or configured on the remote. `git log` still shows one commit, `77a110a Initial commit`, and every file in this project is still untracked or unstaged.
- Candidate revision and URL: candidate C2 (successor to C1). Static export served at http://localhost:4321/, dev server at http://localhost:3100/. Export manifest hash `2b35607a0b8bc82c546ac807f1137142` over 58 files (`find out -type f | sort | xargs shasum -a256 | shasum -a256`). One build, produced after all three edits, and every check below was run against that one build. No rebuild after checks began.
- Inputs actually inspected: `reports/D03-design-03.md` in full (the "Exact instruction for coding" section and the seven numbered acceptance checks in the Handoff); `reports/F01b-writer-04.md` in full (the "Exact strings for coding" section); `reports/review-disposition.md` in full; `reports/TEMPLATE.md`; `app/page.tsx`, `app/writing/[slug]/page.tsx`, `app/writing/[slug]/article.module.css`, `app/globals.css`, `components/WritingList.tsx`, `components/WritingList.module.css`, `components/ArticleShell.tsx`, `components/ArticleShell.module.css`, `lib/articles.ts`, `package.json`. Rendered inspection of `/`, `/writing/`, `/404.html` and all three `/writing/<slug>/` pages at 375, 640 and 1440 CSS px plus the 200% zoom condition (640 CSS px at deviceScaleFactor 2), through headless Chrome 152 over CDP.
- Assigned write scope: `app/**`, `components/**`, `lib/**`, `reports/F03b-coding-04.md`.
- Files changed: `app/page.tsx`, `app/writing/[slug]/page.tsx`, `app/writing/[slug]/article.module.css`, `components/WritingList.tsx`, `reports/F03b-coding-04.md` (created). Nothing under `lib/`, `content/`, `writing/`, `public/`, no config file, no board, no plan, no decision record, no other agent's report. Scratch scripts and screenshots live outside the repo at `/Users/evanbaker/.claude/jobs/9fcd68ec/tmp/f03b/`.

## Work and result

Three items from the packet. Two were code changes, one was a no-action ruling to record.

### 1. R01-02 and R04-02: the writer's two homepage strings (applied)

Both applied verbatim from `reports/F01b-writer-04.md`, "Exact strings for coding". Nothing else in `app/page.tsx` changed, and each replacement was asserted unique in the file before being applied so a near-duplicate elsewhere could not have been hit instead.

- Line 28, Demarly link label: `label: 'demarly.ai'` becomes `label: 'Live at demarly.ai'`. The `href` is untouched and still `https://demarly.ai`.
- Line 110, Nucli8 work entry: `source="Nucli8, built, not launched"` becomes `source="Nucli8, my product, built, not launched"`. The mandatory words `built, not launched` survive verbatim.

**No pricing or trial term was added.** The investor's observed "$24.99/month after a 7-day trial" was not used. Verified negatively in the export rather than by intent: zero occurrences of `24.99`, `7-day`, `trial`, `per month` or `/month` anywhere in the rendered homepage, and zero occurrences of `my company`, `my startup` or `my third product`.

The writer flagged both strings for a design eye at 375px because both are longer than what they replaced. Measured rather than left open: `Live at demarly.ai` renders 137px wide on one line at both 1440 and 375, and `Nucli8, my product, built, not launched` renders on one line at both widths (597px at 1440, 335px in a 335px column at 375). Neither wraps at any width tested, so there is nothing for design to resolve. Screenshots at `shots/demarly-375.png` and `shots/nucli8-375.png`.

### 2. R04-03 / design-11: the article exit (implemented exactly as ruled in D03)

Implemented to the letter of the D03 instruction. The block is a sibling of `<article>` in `app/writing/[slug]/page.tsx`, after `</article>`, and **not** in `ArticleShell.tsx`. Confirmed by consequence rather than by intent: `/writing/` and `404.html` contain zero `<aside>` elements and zero occurrences of the string "More writing", which is what would have broken if the block had gone into the shared shell.

- `others` is `ARTICLE_SLUGS.filter(s => s !== slug)`, so the reader meets the same sequence as on the homepage. Guarded by `others.length > 0`.
- `<aside className={styles.more} aria-labelledby="more-writing">` containing `<h2 id="more-writing">More writing</h2>` and `<WritingList articles={others} headingLevel={3} showExcerpt={false} />`.
- `WritingList` gained exactly one optional prop, `showExcerpt?: boolean`, defaulting to `true`. The component was not forked; the two existing hosts render byte-identically to before and the title and meta rules stay declared in one module. Verified by computed style, not by reading: the aside item and the homepage item resolve to the same two class names and the same font family, size, weight, line-height, letter-spacing and color for both the title and the brown meta line.
- `article.module.css` gained `.more { margin-top: var(--s7) }` and `.more :global(ul) { margin-top: var(--s4) }`, with the reason for the 96px-at-every-width override written into the file so a later breakpoint pass does not "fix" it down to 64px.
- Wording is `More writing`, exactly.
- Nothing forbidden appeared. Audited the whole aside subtree in the browser: no `<hr>`, no border on any element, no background, no `::before` or `::after` content, `list-style: none` on the `ul`, no `href="/writing/"`, no "view all", no count, no non-ASCII glyph in the block's text, and no excerpt, date or `<time>`.

### 3. design-12: no action, recorded

Design ruled that the homepage hero nav stays at three items and that "Writing" is not added, because adding it would reverse design-07 through a side door and because the article exit removes most of the pressure that motivated it. **I changed nothing.** Verified the nav is still exactly `#building`, `#work`, `#contact` in the built homepage: the full anchor enumeration on `/` is `["#main","#building","#work","#contact", ...]` with no `#writing` and no `#about`. Recorded here so R04-01 reads as decided rather than ignored.

## Evidence and checks

All HTTP checks are against the static export at http://localhost:4321/, not against source. All rendered measurements are headless Chrome 152 over CDP against the same server.

### Per-page link enumeration (D03 acceptance check 1, the primary one)

`a[href^="/writing/"]`, counted on the exported HTML served over HTTP:

| Page | count | hrefs |
|---|---|---|
| `/writing/the-30x-bug/` | **2** | `/writing/distrust-your-best-results/`, `/writing/draft-anything-send-nothing/` |
| `/writing/distrust-your-best-results/` | **2** | `/writing/the-30x-bug/`, `/writing/draft-anything-send-nothing/` |
| `/writing/draft-anything-send-nothing/` | **2** | `/writing/the-30x-bug/`, `/writing/distrust-your-best-results/` |
| `/404.html` | **0** | none |
| `/writing/` | 3 | its own index list, unchanged from before this round |
| `/` | 3 | its own Writing section list, unchanged from before this round |

Two on every article, each matching exactly the other two slugs, no self-link. **One clarification on the packet wording**, so the record is not misread: the packet asked for "zero on `/writing/` and `404.html`". `404.html` is zero anchors. `/writing/` is zero *More writing blocks* but three `/writing/` links, because it is the writing index and those three links are its own content, present before this round and untouched by it. The property that actually distinguishes them is the aside, so I measured that too: aside count is 1 on each article and 0 on `/`, `/writing/` and `404.html`. Reading it as "zero links on `/writing/`" would have required deleting the index's own list, which no one asked for.

Full anchor sets on an article page are `["#main", "/", "/writing/<other-a>/", "/writing/<other-b>/", "/"]`. That is the R04-03 defect closed: previously both internal links went to `/`.

### The check table

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| D03 check 1: exactly two `a[href^="/writing/"]` per article, matching the other two slugs | enumeration table above, over HTTP against `out/` | **pass**, 2/2/2 | A self-link, a `/writing/` index link, or a third internal link would have shown in the full anchor list, which I printed rather than only counting |
| D03 check 2: block on all three articles and on neither `/writing/` nor `404.html` | `<aside` count, `aria-labelledby="more-writing"` count, `id="more-writing"` count, and the literal string "More writing", per exported file | **pass**, 1/1/1 on articles, 0/0/0 on `/`, `/writing/`, `404.html` | Putting the block in `ArticleShell.tsx` instead of the page component would have put it on `/writing/` and the 404, and this check is exactly what would have caught it |
| D03 check 3: heading order, exactly one h1, no level skipped | parsed heading outline of all six exported pages | **pass** | See the outlines below |
| D03 check 3, the design-06 case specifically | `/writing/draft-anything-send-nothing/`: `h1` "Draft anything, send nothing", four in-article `h2`, then `h2` "More writing", then `h3` "The 30x bug", `h3` "Distrust your best results" | **pass**, h1count=1, no skip | Using `h3` for the aside heading would have skipped from h2 to h3 to h4; using `h2` for the items would have flattened them out of the aside |
| Accessibility tree exposes the landmark and its name | CDP `Accessibility.getFullAXTree` on `/writing/the-30x-bug/`: `complementary name="More writing"`, alongside banner, main, contentinfo, article | **pass**. `/writing/` and `404.html` expose no complementary | A missing or misspelled `aria-labelledby`/`id` pair would have produced an unnamed complementary landmark |
| D03 check 4: 96px last prose element to aside top | measured on all three articles at 1440 and at 375 | **pass**, 96.0 at every width, `margin-top` computes `96px` | A `--s6` typo or a breakpoint override would have shown 64 |
| D03 check 4: 96px **not** compressed below 480px | same measurement at 375 | **pass**, 96.0 | This is the documented section-4 override and the reason it is written into the CSS comment |
| D03 check 4: 32px h2 to list | measured, all three articles, 1440 and 375 | **pass**, 32.0, `ul` `margin-top` computes `32px` | `WritingList.module.css .list` sets 48px; the `.more :global(ul)` rule at specificity (0,1,1) beats it at (0,1,0). If it had not, this would read 48 |
| D03 check 4: 8px title to brown label | measured, both items, all three articles, both widths | **pass**, 8.0 / 8.0 | |
| D03 check 4: 48px between items | measured, all three articles, both widths | **pass**, 48.0 | |
| D03 check 4: 96px last item to "Back to Evan Baker" | footer `padding-top` computes `96px` and the gap from the last `li` box to the `<footer>` box is 0.0, so the box gap is exactly 96 | **pass, with a stated measurement caveat** | Measured link-rect to link-rect it reads 98.0, because the footer link is inline and its client rect starts at the glyph box rather than the line box. The 2px is inline leading, not a spacing error. I am reporting both numbers rather than the flattering one |
| Rendered block geometry vs D03's prediction | 1440: aside 231.8px tall (predicted 232), article document 2290 to **2522** (predicted 2522). 375: aside 221.8px (predicted 222), document 3426 to **3744** (predicted 3744) | **pass**, matches to within 0.2px | A different type scale or a stray margin would have moved these |
| D03 check 5: `scrollWidth === clientWidth` at 375 / 640 / 1440 | all six pages at all three widths, 18 measurements | **pass**, equal in all 18 | |
| D03 check 5: 200% zoom condition, 640 CSS px at deviceScaleFactor 2 | five pages, `devicePixelRatio` confirmed 2 | **pass**, 640 = 640 on all five | |
| Title wrapping at 375 | `getClientRects().length` on every aside title link, all three articles | **pass**, 1 line each. Widths 110 to 254px in a 335px column | A longer future title would wrap, which is acceptable; `text-wrap: balance` is already on `h3` |
| D03 check 6: tab order, new links after the article and before the footer link | real `Input.dispatchKeyEvent` Tab sequence on `/writing/the-30x-bug/`, plus DOM-order enumeration on all three articles | **pass**. Order is Skip to content, Evan Baker (header), aside link 1, aside link 2, Back to Evan Baker (footer) | |
| D03 check 6: focus ring on the new links | same Tab sequence, computed style of `document.activeElement` | **pass**. Both aside links: `:focus-visible` matches, outline `solid 2px rgb(31, 51, 82)`, offset `3px`, identical to every other tab stop | `outline: none` anywhere, or a link that never receives focus, would have failed here. This is the check D03 explicitly could not run on injected DOM |
| Tap-target spacing at 375 (WCAG 2.2 AA 2.5.8) | aside link rects 218x20 and 254x20, 105px between centers | **pass on the spacing exception** | Under the 24px height minimum, so it passes because 24px circles centered on each target do not intersect. Any future change bringing the items closer than 24px apart breaks this |
| D03 check 7: no new color inside the block | walked the whole aside subtree, every color-bearing property including `::before`/`::after` | **pass**. Exactly two colors resolve: `rgb(0, 0, 0)` and `rgb(107, 74, 47)` (brown `#6B4A2F`). No background on any element | |
| D03 check 7: no new font size | same walk | **pass**. Four sizes, all existing tokens: 19px body, 28px `--t-h2`, 22px `--t-h3`, 15px `--t-meta` | |
| D03 check 7: no spacing value off the 8px scale | same walk, all non-zero margins and paddings | **pass**. Exactly four: 96, 32, 8, 48 | |
| D03 check 7: no `hr`, border, box, arrow or glyph | same walk plus a text scan | **pass**. No `<hr>`, all border widths 0, no background, `::before`/`::after` content `none` on every element, `list-style: none` on the `ul`, zero non-ASCII characters in the block's text | |
| D03 check 7: the brown label is the homepage's rule, not a re-declaration | computed-style comparison of a homepage `#writing li` against an aside `li` | **pass**. Same class names (`WritingList-module__DzX96a__itemTitle`, `...__meta`) and identical computed title and meta type: Newsreader 22px/600/28.6px/-0.22px black, Public Sans 15px/400/22.5px/0.075px `rgb(107, 74, 47)` | Forking the component, which D03 forbade, is exactly what this would have caught |
| Writer string 1 present in the rendered export, over HTTP | `curl` of `/`: `Live at demarly.ai` present, `href="https://demarly.ai"` present, the old bare `>demarly.ai<` label gone. Rendered as a single 137px line at both 1440 and 375 | **pass** | Checked over HTTP against `out/`, not in `app/page.tsx` |
| Writer string 2 present in the rendered export, over HTTP | `curl` of `/`: `Nucli8, my product, built, not launched` present, single line at both widths, `--ink-2` `rgb(77, 77, 77)` at 15px, consistent with the D03 spec amendment for a non-classifying source line | **pass** | |
| No pricing or commercial term added | homepage export scanned for `24.99`, `7-day`, `trial`, `per month`, `/month` | **pass**, 0 each | The investor report hands the string over in plain text; pasting it would have looked like sourcing |
| No unapproved upgrade of the Nucli8 wording | homepage export scanned for `my company`, `my startup`, `my third product` | **pass**, 0 each | |
| design-12: nav unchanged | full anchor enumeration on `/` | **pass**. Hero nav is still `#building`, `#work`, `#contact`; no `#writing`, no `#about` | |
| `npm run typecheck` | `tsc --noEmit` | **pass**, no output | The new optional prop and the `others` derivation are both typed |
| `npm run lint` | `eslint .` | **pass**, no output | |
| `npm run build` | `next build` | **pass**. 8 routes, three article pages via `generateStaticParams` | |
| All routes 200 on the static server | `/`, `/writing/`, all three articles, `/icon.svg` | **pass**, 200 each. `/404.html` returns 301 to `/404` under `serve`'s clean-URL behavior and 200 when followed; an unknown path returns 404 | The 301 is a `serve` behavior, not an export defect. GitHub Pages serves `404.html` directly. Noted rather than hidden |
| Every referenced build asset resolves | 14 `/_next/static/*` js, css and woff2 URLs extracted from an article page and fetched | **pass**, 200 each | My first extraction regex produced spurious 404s by concatenating adjacent paths; re-extracted with a bounded pattern and all 14 are 200. Recording the false alarm rather than only the clean result |
| `.nojekyll` reaches the export | `out/.nojekyll` present, 0 bytes | **pass** | |
| No em dash or en dash anywhere in `out/` | 37 text-bearing files scanned for U+2014, U+2013, `&mdash;`, `&ndash;`, `&#8212;`, `&#x2014;` | **pass**, 0 hits | |
| No draft marker or unresolved token in `out/` | same 37 files scanned for `DRAFT NOTE`, `STRIP BEFORE`, `<!-- DRAFT`, `NOT FOR IMPLEMENTATION`, `writer, 2026`, `TODO`, `FIXME`, `XXX`, `PLACEHOLDER`, `Lorem ipsum`, `TK` | **pass**, 0 hits | |
| No unresolved token in **visible text** | visible body text of all six pages, scripts and styles stripped, scanned for `undefined`, `NaN`, `[object Object]`, `{{`, `}}` | **pass**, none on any page | The raw-file scan does hit `undefined` in framework runtime JS and flight payloads and `}}` in minified CSS. Both are framework internals, neither is visible text. Reporting the raw hits and the reason rather than suppressing them |
| Band re-audit: zero navy or brown inside `.band` or any descendant | `MethodLine-module__Er_V3W__band` plus all 24 descendants, at 375, 640 and 1440. Every color-bearing property checked including `fill`, `stroke`, `textDecorationColor`, `caretColor`, `columnRuleColor`, and `::before`/`::after` | **pass**, 0 violations at all three widths. Only `rgb(0,0,0)` and `rgb(255,255,255)` resolve anywhere in the band | A navy `text-decoration-color` inherited from the global `a` rule is the realistic way this breaks, and it is one of the properties checked |
| Band: `scrollWidth === clientWidth` at 375 / 640 / 1440 | homepage document and the band element | **pass**, equal at all three | |
| Lighthouse accessibility, article page, **re-measured** | Lighthouse 13.4.1, `/writing/the-30x-bug/`, `--only-categories=accessibility`, fetched 2026-09-10T23:42:02Z | **pass, 100**, zero failing audits, 10 manual-only | Re-measured rather than carried forward, because the page gained a landmark and three headings. Prior measurement on this URL was also 100, so the score is unchanged, not improved |
| Lighthouse accessibility, the other two affected pages | `/writing/draft-anything-send-nothing/` **100**, `/` **100**, zero failing audits each | **pass** | The draft-anything article is the one with four in-article h2 headings, so it is the hardest heading-order case |
| axe-core 4.13.0, wcag2a/2aa/21a/21aa/22aa **plus best-practice** | `/writing/the-30x-bug/` at 1440 and 375, `/writing/draft-anything-send-nothing/`, `/`, `/writing/`, `/404.html` | **pass**, **0 violations on all six runs** | Run in addition to Lighthouse specifically because `landmark-complementary-is-top-level`, `landmark-unique` and `heading-order` are axe best-practice rules that Lighthouse's default set does not include, and this change adds a landmark. One `incomplete` remains on `/` only: `color-contrast`, on the band, pre-existing and unrelated to this round (axe cannot compute contrast against the SVG field). Article pages have zero incomplete |
| Dev server serves the same content | `npm run dev` on :3100, `/` and `/writing/the-30x-bug/` both 200, both writer strings present, `aria-labelledby="more-writing"` present | **pass** | Dev and the static export were checked separately, per the build rules |
| `content/articles/` and `writing/` untouched by me | `git status --porcelain` on those paths shows only the pre-existing untracked-directory entries; file mtimes are 17:04 to 17:30, all before this session's first edit at 17:38 | **pass** | |
| Writer's approved article text renders in this build | `EdgeBet, my iOS app, scores thousands` in `/writing/distrust-your-best-results/`, `Nucli8, is mine, built but not launched` in `/writing/the-30x-bug/`, both over HTTP | **pass** | |
| Writer's normalized byte-identity check between `writing/` and `content/articles/` | **not re-run** | **not run** | Out of my write scope and not my check. My naive raw `shasum` comparison reported DIFFER, which is a defect in my method, not evidence: the pairs have different filenames (`writing/agents-that-cant-lie.md` maps to `content/articles/draft-anything-send-nothing.md`) and the writer's method normalizes and strips draft notes before hashing. `reports/F01b-writer-04.md` is the authority and reports 3 of 3 identical. Recording my wrong result so nobody re-derives it and reads it as a regression |
| Screen reader, Safari, Firefox, a real touch device | **not run** | **not run** | No such tool available in this environment. Chrome 152 headless only. The complementary landmark and its accessible name were verified through the CDP accessibility tree, which is the platform a11y tree Chrome exposes, but that is not the same as hearing a screen reader announce it |
| Live-URL verification | **not run**, and correctly so | **not run** | Deployment is unauthorized this round. Nothing was pushed, so there is no live URL to check and no `verification/` file was written or touched |
| Rendered design judgment of the new block | **not mine**. Screenshots captured for design at `shots/tail-1440.png`, `shots/tail-375.png`, `shots/article-1440.png`, `shots/article-375.png`, `shots/demarly-375.png`, `shots/nucli8-375.png` | n/a | D03 already rendered and approved this exact element before ruling, including the 96px-vs-64px comparison. I implemented to spec and measured; I did not re-open any visual decision |

### Heading outlines, all six exported pages

Exactly one `h1` on every page and no skipped level on any page.

```
/                                     h1 Evan Baker
                                      h2 What I'm building > h3 Demarly, h3 EdgeBet
                                      h2 Selected work > h3 x4
                                      h2 Writing > h3 x3
                                      h2 About
                                      h2 Contact
/writing/                             h1 Writing > h2 x3
/404.html                             h1 Page not found
/writing/the-30x-bug/                 h1 The 30x bug
                                      h2 More writing > h3 Distrust your best results, h3 Draft anything, send nothing
/writing/distrust-your-best-results/  h1 Distrust your best results
                                      h2 More writing > h3 The 30x bug, h3 Draft anything, send nothing
/writing/draft-anything-send-nothing/ h1 Draft anything, send nothing
                                      h2 1) The agents can't send. Not "shouldn't." Can't
                                      h2 2) Unknown tools are guilty by default.
                                      h2 3) The part people want to be stronger than it is.
                                      h2 Where the guarantee stops.
                                      h2 More writing > h3 The 30x bug, h3 Distrust your best results
```

The third article is the design-06 case the packet asked about: the new `More writing` h2 sits as a fifth sibling h2 alongside the four in-article ones, and its two `headingLevel={3}` items nest under it. The other two articles have no in-article h2 at all, so `More writing` is their only h2. Both shapes are sequential.

## Findings (reviews or discovered defects)

| ID | Location / quote / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| F03b-01 | Packet wording: "exactly two [`a[href^="/writing/"]`] on all three articles, and **zero** on `/writing/` and `404.html`". `/writing/` in fact has three such links: its own index list. | Observation, on the instruction rather than the code. | suggestion | Read literally the instruction would have required deleting the writing index's own list. The property that actually separates the two cases is the presence of the `More writing` aside, which is what D03 check 2 says and what I measured. Recording it so a later round re-running this check does not report a false failure on `/writing/`. | none, no change | **Check as:** aside count is 1 on each article and 0 on `/`, `/writing/` and `404.html`; link count is 2 on each article and 0 on `404.html`. |
| F03b-02 | `.more :global(ul)` overrides `WritingList.module.css .list { margin-top: var(--s5) }` by specificity, (0,1,1) beating (0,1,0). | Observation of a real fragility, currently passing. | suggestion | It works and it is measured at 32px, but it is a cross-module override reaching into a component's internals, which is the drift `WritingList.module.css` was written to prevent. If `WritingList` ever raises `.list` to a compound selector or an `!important`, this silently becomes 48px and nobody would notice without re-measuring. D03 anticipated this and permitted an escape hatch as long as the rendered value is 32px. | coding, backlog | Optional and not a requirement now: replace with a `listGap` boolean prop on `WritingList` that sets a second class on the `ul`, keeping the value inside the module that owns the element. **Accept when:** the rendered h2-to-list gap is still exactly 32px and no `:global()` reaches into `WritingList`. |
| F03b-03 | `curl http://localhost:4321/404.html` returns 301 to `/404`. | Observation of the preview server, not of the export. | suggestion | It is `serve`'s clean-URL rewriting, not an export defect: `out/404.html` exists and serves 200 when followed, and GitHub Pages serves `404.html` directly for unmatched paths. Worth recording because a later verification round that checks `/404.html` for a bare 200 on this preview server will see a 301 and may report a defect that does not exist. | none, no change | **Check as:** `curl -sL` (follow redirects), or fetch an unknown path and confirm 404, which it does. |

No other defects found in the inspected scope. Nothing in this round regressed: Lighthouse accessibility is 100 on all three measured pages, axe returns zero violations including best-practice rules, and the band audit is clean at three widths.

## Ideas and alternatives

- **Rejected during implementation: computing `others` inside `WritingList`.** It would have removed three lines from the page component, but it would have put per-page filtering logic into a component whose whole point is that all three hosts render the same item. The page knows its own slug; the list should not have to. Kept the filter in the page.
- **Rejected: a `variant="compact"` prop instead of `showExcerpt`.** A named variant invites a second and a third, and each one is a place for the two hosts to drift. A single boolean that removes exactly one element cannot grow into a fork by accident. D03 asked for one optional prop and one optional prop is what shipped.
- **Not done, and deliberately: `prefetch` tuning on the two new links.** `next/link` prefetches by default, which on a static export means two extra RSC payload fetches when the block scrolls into view at the foot of every article. It is small and it makes the click instant, so it is a real tradeoff rather than a defect. Not touched because it is not in the packet and because changing it would be a performance decision nobody asked for. Backlog, and only if a performance pass ever measures it as costing something.
- **Observation for whoever revisits D03's n>4 condition.** The current implementation already scales: `others` is derived, not hardcoded, so a fourth article appears in every existing article's block automatically. The thing that would break at n>4 is the ruling, not the code. When the count passes four, the block will show three or more items and D03's own instruction says to revisit it together with design-07 in one pass.
- **Backlog, not a requirement:** the article pages still have no `<nav>` landmark and no in-page path other than the header word mark, the aside and the footer link. That is by design and I am not proposing changing it. Noting only that if a table of contents is ever wanted for the long third article, it is a separate design decision and not an extension of this block.

## Proposed decision-log update

Nothing new from me. Both of this round's changes implement decisions other agents already made and the coordinator already has the entries in hand:

- **Q2**, already proposed in `reports/D03-design-03.md`: article pages get a "More writing" block; the rejected alternative was a link to `/writing/`; what was given up is that `/writing/` stays orphaned and the block needs revisiting past four articles. **It is now implemented and measured**, so if the coordinator writes it, it can be written in the past tense with the acceptance evidence in this report.
- **Q2 reconciliation**, also from D03: design-07 stands, and design-12 keeps the hero nav at three items. Implemented as no-change, verified as no-change.
- The two homepage strings are copy applications inside decisions that already exist, not new decisions. `reports/F01b-writer-04.md` says the same.

**No Q3 candidate note from this round.** Nothing of mine was overruled and Evan was not in the loop on any of it.

## Handoff

- **Acceptance criteria met or unmet:** **met**, all of them. D03 acceptance checks 1 through 7 all pass with measured values, including the two D03 could not run itself (check 6, the focus ring on real DOM, and the Lighthouse re-measure). Both writer strings are present in the rendered export, verified over HTTP. Heading order is sequential with exactly one h1 on all six pages. The band re-audit is clean. Typecheck, lint and build pass and every route serves. No em dash, draft marker or unresolved token in `out/`.
- **Blocker and missing input, if any:** no blocker for this task. The standing gates are unchanged and none of them moved this round: **H01** byline approval still open, so nothing here is publishable; deployment still unauthorized; the repository name (R03-09), the H100 attribution (B10), the employment timeline (B11), the thesis (B9), the band's method line and the GitHub profile question all remain Evan's and were not touched.
- **Both servers are running and serving this build.** Static export at **http://localhost:4321/** (`npm run preview`, pid 19777). Dev server at **http://localhost:3100/** (`npm run dev`, pid 30872). Restart commands: `npm run preview` and `npm run dev` from the repo root. The export they serve is manifest hash `2b35607a0b8bc82c546ac807f1137142`.
- **Next owner and task recommendation:** **coordinator**, to verify acceptance, mark F03b complete, and carry the two Q2 entries into `DECISIONS.md`. **Design**, optionally, to fold the D03 element definition into `design-spec.md` section 5.9 now that it exists and its rendered numbers are confirmed, and to note that section 8's forward-looking clause about the More writing block is no longer forward-looking. **No writer task** comes out of this round: both strings were applied verbatim and neither needed a paraphrase, so there is nothing to report back as a substantive copy change. Design's 375px wrap question on the two new strings is answered in the table above and needs no separate pass.
- **Checks or reruns after any further change:** if `WritingList.module.css` changes, re-measure the 32px h2-to-list gap, because the override is by specificity (F03b-02). If `ArticleShell.tsx` changes, re-run the aside-count check on `/writing/` and `404.html`. If a fourth article is added, re-run the link enumeration (each article should then show three) and re-open D03's n>4 condition. R02 and R04 remain invalidated for the specific findings they raised and can be re-run against candidate C2 at the coordinator's discretion; a rendered reviewer pass still needs screenshots supplied in the packet or a fetchable non-localhost URL, which this round does not change.
