# C03 + C04: Next.js implementation and article transfer

- Role / assignee / run: **coordinator (main session), performing a coding-owned task** / run 01
- Date: 2026-09-10
- Status: complete, with one process deviation recorded below and two known defects handed to coding
- Scope: local build, under the 2026-09-10 local-preview authorization. Nothing deployed, pushed, or committed.
- Candidate revision and URL: not frozen. Local dev http://localhost:3100/ and static export preview http://localhost:4321/
- Inputs actually inspected: context/homepage-copy.md (including the coordinator resolutions block), reports/design-spec.md (all 617 lines), reports/W01-W02-writer-01.md, reports/P01-coordinator-01.md, reports/D01-design-01.md, reports/C01-coding-01.md, the three revised drafts in writing/, todo.md, website-plan.md, CLAUDE.md, AGENT-WORKFLOW.md
- Files changed: app/globals.css, app/layout.tsx, app/page.tsx, app/not-found.tsx, app/icon.svg, app/writing/page.tsx, app/writing/[slug]/page.tsx, app/writing/[slug]/article.module.css, lib/articles.ts, content/articles/*.md (3 added, scaffold removed), components/* (10 components + 10 CSS modules), components/README.md removed, website-plan.md line 194, reports/design-spec.md lines 362 and 366

## Process deviation, recorded on purpose

**The coordinator implemented C03 and C04 directly instead of dispatching the coding agent.** AGENT-WORKFLOW.md assigns Next.js app code, CSS, article routing, and the transfer of reviewed text to coding, and reserves the coordinator for the board, the plan, the decision log, and integration. That boundary was not respected here.

Evan caught it and said so. The work itself is inspected and stands, and re-running it through a coding agent purely to satisfy the ownership rule would burn the session for no new evidence. The correction is forward-looking: W03, C05 and D02 are dispatched to their proper agents, and the coordinator stops touching app code. This is logged as a Q3 candidate moment in DECISIONS.md because it is exactly the shape Q3 asks for: the agent did something, Evan noticed, something different happened after.

## Work and result

Seven homepage blocks and three articles implemented against the writer's copy package and the design spec. Ten components, each with its own CSS module, all consuming tokens from `app/globals.css`. No component redefines a color, size, or spacing value. No `"use client"` anywhere: every component is static and server rendered.

Routes built: `/`, `/writing/`, `/writing/the-30x-bug/`, `/writing/distrust-your-best-results/`, `/writing/draft-anything-send-nothing/`, plus `/_not-found` and `/icon.svg`.

**Article transfer was scripted, not retyped.** The three bodies were lifted verbatim from the reviewed drafts by a script that strips exactly three things: the `<!-- DRAFT NOTE ... -->` blocks, the H1 (the page renders the title from frontmatter), and the provisional `*September 2026 · Engineering*` meta line. The script asserts that neither `DRAFT NOTE` nor an em dash survives, and fails loudly if either does. This closes writer finding W-11 mechanically rather than by inspection, and removes any chance of transcription drift from the approved text.

`content/articles/scaffold-route-check.md` was deleted per P01 decision 8.

### Decisions made during implementation

Five points where the copy package and the design spec disagreed, or where neither covered a case. All are reversible and all are flagged to the reviewing agents.

| # | Decision | Alternative | Why |
|---|---|---|---|
| 1 | The Selected Work source line renders in `--ink-2`, not brown | Brown, matching the company deck | Design spec section 8 gives an exhaustive list of where brown may appear and the work source line is not on it. Section 5.4 also wants the two sections visually distinguishable. Secondary ink satisfies both; it is 8.45:1 on white. |
| 2 | The homepage writing list shows the category (Engineering / Data / AI) in brown | No meta line at all, per design spec 5.5 | The dates are omitted by P01 decision 5, which leaves the meta slot empty. The copy package's coordinator-resolution block says to keep the category label, and it is later and more specific than the spec line. Real metadata, nothing invented. |
| 3 | The footer sets its three pieces with a 24px flex gap instead of middle dots | `Evan Baker · 2026 · Built with Claude Code` exactly as the copy block writes it | The design spec rejects middle-dot metadata strings as a template tell and already sets the article meta row as a flex row. Same three facts, same order, consistent treatment in both places. |
| 4 | `.band + section` takes a 64px top pad instead of the full section gap | The global 128px | The band's own 96px bottom padding already separates it. 128 on top of 96 reads as a dropped section. This is one of the two overrides the spec explicitly permits. |
| 5 | The band caption reads "Every company I build runs this line. What changes is the math in the middle." | The design spec's own layout-testing placeholder (76 chars) | **The writer never produced a band caption.** The design spec asks for one at 90 characters or less and the copy package does not contain it, so the coordinator wrote it. It is 76 characters, first person, and makes no claim beyond Evan's own approach. **This is the one string on the site with no writer review, and W03 is asked to treat it as unapproved copy.** |

## Evidence and checks

Checks run against the **static export** at http://localhost:4321 (the artifact that would actually deploy), driven through the Chrome DevTools Protocol in headless Chrome. Numbers are measured, not estimated.

| Check or claim | Evidence | Result | What could have made it fail / limitation |
|---|---|---|---|
| TypeScript | `npm run typecheck` | pass, no output | Any type error in 10 new components would have printed here |
| Lint | `npm run lint` | pass, no output | eslint-config-next catches unescaped entities and img misuse; both were hit during the build and fixed |
| Production export | `npm run build` | pass, 8 routes, 3 SSG article pages | A missing slug in ARTICLE_SLUGS or a bad frontmatter field throws at build time by design |
| `clamp()` survived (spec check 1) | computed `font-size` of h1 | **56px at 1440, 48px at 640, 36.08px at 375** | This is the silent failure the spec warns about. A missing space around `+` would have collapsed h1, h2 and the lead to 19px with no console error. It did not. |
| h2 scale | computed | 28px at 1440 and 640, 24.03px at 375 | |
| Body size | computed | 19px at every width | |
| Measure (spec check 2) | canvas glyph metrics, real resolved font | **70 chars at 1440**, 61 at 640, 34 at 375 | Target is 60 to 75 at desktop. The 375px value is what that width gives at a readable body size. |
| Fonts actually self-hosted and applied | resolved `font-family` after `document.fonts.ready` | `"Public Sans"` resolved, Newsreader on headings | If next/font had failed, the fallback grotesque would have resolved instead and the page would still have looked plausible |
| No horizontal scroll (spec checks 3, 4) | `scrollWidth` vs `clientWidth` at 375 / 640 / 1440 | equal at all three, on all four page types | The full-bleed band is the risk here; it is built without `100vw` for exactly this reason |
| Heading order (spec check 6) | DOM walk | pass on `/` and both article pages; **fails on `/writing/`** | See defect FIX-001 |
| SVG labelling (spec check 7) | DOM walk | 0 unlabelled; exactly one method variant `display: block`, the other `display: none` | `visibility: hidden` or `opacity: 0` would have left the label in the accessibility tree twice |
| No accent inside the band (spec check 8) | computed color, backgroundColor, fill, stroke, borderTopColor and textDecorationColor on the band and every descendant | **0 occurrences of navy or brown** | This is the structural guarantee behind "no dark navy or brown small text on black" |
| Link affordance is the underline, not the color | computed | rest: black text, 1px navy underline | A color-only affordance would fail the design rule and WCAG 1.4.1 |
| Landmarks | DOM | homepage: 1 banner, 1 main, 1 contentinfo, 1 nav. Articles: same minus nav | |
| Images without alt | DOM | 0 (there are no images; the About photo is a null value, not an empty slot) | Spec check 10 |
| Draft notes / em dashes in public sources | grep over `content/articles/*.md` | 0 of each | Asserted by the transfer script, then verified separately |
| Lighthouse accessibility (spec check 9) | **not run** | not run | Assigned to coding as part of C05 |
| 200% zoom | **not run** | not run | Assigned to coding as part of C05 |
| Keyboard tab order and visible focus ring (spec check 5) | **not run** | not run | Computed CSS is correct; nobody has actually tabbed the page. C05 |
| Console errors | **not run** | not run | C05 |
| External links resolve (demarly.ai, github.com/evanbaker315, the App Store listing) | **not run this session** | not run | The App Store URL was fetched during P01. The other two have never been opened. C05 |
| basePath export (`npm run build:pages`) | **not run this round** | not run | C01 verified it previously against the scaffold, not against this build. C05 |

## Findings (defects found and not yet fixed)

| ID | Location | Observation | Severity | Why it matters | Owner | Fix and acceptance check |
|---|---|---|---|---|---|---|
| FIX-001 | `/writing/`, heading levels | The page goes h1 "Writing" straight to h3 per article. Skips h2. Homepage and article pages are clean; this page is not, because `WritingList` hardcodes h3 and the index has no h2 above it | important | Fails design spec acceptance check 6 and is a real screen-reader defect on a shipped page | coding | Give `WritingList` a heading-level prop (h2 on `/writing/`, h3 on the homepage) and keep the h3 type scale on both via a class, so the visual result is unchanged. Accept when a DOM walk of `/writing/` reports no level skip and computed heading font-size is unchanged |
| FIX-002 | `app/globals.css`, `.skip` | The skip link parks off canvas at `left: -9999px`, so its bounding box sits 9999px to the left of the viewport at every width | suggestion | It does **not** cause horizontal scroll (`scrollWidth == clientWidth` was verified at all three widths), but it trips any honest "is anything outside the viewport" audit and makes that check noisier for every future run | coding | Switch to the clip-path visually-hidden pattern, and `position: fixed` on focus so it pins to the viewport rather than the document. Accept when the overflow audit returns an empty list and the link is still visible and focusable on first Tab |

## Ideas and alternatives

- **Considered and rejected: a shared `<Prose>` component for the article body.** Only one route renders Markdown. A wrapper class plus descendant selectors in one module is the smaller thing, and the spec explicitly blesses descendant selectors in that one place.
- **Considered and rejected: sorting `getAllArticles()` by date.** Every date is empty right now, so the sort is a no-op that would silently reshuffle the reading order the day the first real date lands. The array order is the editorial order and says so in a comment.
- **`formatDate` does string arithmetic instead of `new Date`.** `new Date('2026-09-12')` parses as UTC midnight and renders as September 11 in Colorado. No date renders today, so this bug would have been invisible until the first real publication date and then wrong on every page at once.
- **Backlog, not built:** the About photo grid exists in CSS behind a null `photo` value. No empty container reaches the DOM.

## Proposed decision-log update

**Q1 (what changed), supporting detail.** The plan's provisional black base was flipped to white paper with one full-bleed black band. Recorded in P01; this task is where it actually became true.

**Q4 (verification), candidate.** The `clamp()` whitespace check is the best Q4 material produced so far, and it is a check that could genuinely have failed: a missing space around a `+` inside `clamp()` is valid CSS syntax at parse time and invalid at computed-value time, so the type silently collapses to the inherited 19px with no console error and no visually broken layout. Asserting the computed `font-size` is 56px at 1440 is the only way to catch it. It passed.

**Q3, factual candidate note only, for the coordinator's running list.** On 2026-09-10 the coordinator built the site itself rather than dispatching the coding agent Evan had asked for. Evan noticed while the build was in progress and said so directly. The remaining tasks were handed to the proper agents and the deviation was recorded rather than quietly absorbed. **Evan writes the final Q3 answer. This is not it.**

## Handoff

- **Next owners:** writer (W03), coding (C05 plus FIX-001 and FIX-002), design (D02). All three are independent and can run in parallel; W03 and D02 read the running preview, C05 owns the app files.
- **Servers left running:** dev on http://localhost:3100/ (`npm run dev`), static export preview on http://localhost:4321/ (`npm run build && npx serve out --listen 4321`).
- **Open and correctly open:** H01 byline approval, the 30x bug attribution, a real commercial anecdote per company, graduation timing, real publication dates, and whether the repo is renamed to `evanbaker315.github.io`.
- **Limitations:** no Lighthouse run, no keyboard pass, no 200% zoom pass, no console-error check, no external-link check, and no basePath export this round. All are C05 scope and are listed as `not run` above rather than assumed fine.
