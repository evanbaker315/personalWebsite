# F03: Bounded correction pass on the built site (design-05, design-08, design-09, W-12, W-13, W-15, C05-06)

- Role / assignee / run: coding agent, F03, round 03
- Date: 2026-09-10
- Status: complete
- Scope: implementation, plus the technical verification the task packet asked for
- Candidate revision and URL, if applicable: not frozen. Static export served at http://localhost:4321/, rebuilt from a clean `rm -rf .next out && npm run build` at 17:04. Dev server at http://localhost:3100/. **Local build only under the 2026-09-10 authorization. Nothing was deployed, pushed, committed, or changed in any remote or Pages setting.**
- Inputs actually inspected: `reports/D02-design-02.md` (findings design-05, design-08, design-09 and the Handoff section), `reports/W03-writer-02.md` (W-12, W-13, W-15 and the surrounding reasoning), `reports/C05-coding-02.md` (C05-06), `todo.md` rows FIX-003 / FIX-004 / FIX-005 / FIX-007, and the source files listed below. Skill invoked: none. This pass applies three already-specified CSS values, deletes one element, and changes three strings; it sets no visual direction, so `frontend-design` and `impeccable` were not the right tool. The `impeccable` PostToolUse hook did run automatically on all five edited style/component files and reported no deterministic issues.
- Assigned write scope: `app/**`, `components/**`, `lib/**`, and this report. Honored. `content/articles/**` was not opened or edited (the writer is editing `draft-anything-send-nothing.md` in parallel). `todo.md`, `website-plan.md`, `DECISIONS.md`, `reports/design-spec.md` and every other agent's report were not touched. `lib/**` needed no change.
- Files changed:
  - `components/MethodLine.module.css` (design-05: breakpoint 639 to 687, `.vertical` max-width 400px to 335px, caption width cap added)
  - `components/MethodLine.tsx` (W-12: `<figcaption>` deleted, component comment updated)
  - `app/page.tsx` (W-13: two `deck` strings)
  - `app/writing/page.tsx` (W-15: meta description)
  - `app/not-found.tsx` (C05-06: own meta description)
  - `components/Hero.module.css` (design-09: 44px tap-target floor)
  - `components/Contact.module.css` (design-09: same)
  - `app/globals.css` (design-09: the 8px-scale exception comment now records three exceptions, not two)
  - `reports/F03-coding-03.md` (this file, created)

## Work and result

All seven items are done and the housekeeping item is resolved with a correction to the premise. Nothing in the packet is outstanding.

**1. design-05, method line label sizing.** Applied design's fix exactly as specified. The variant switch moved from `@media (max-width: 639px)` to `@media (max-width: 687px)`, so the horizontal diagram first appears at 688px where the column is exactly 640px (688 minus a 24px gutter on each side) and the horizontal scale is exactly 1.0. `.vertical` went from `max-width: 400px` to `max-width: 335px`, its viewBox width, so it never scales above 1.0.

The measured result at the nine required widths, using the specified `font-size` multiplied by `svg.getBoundingClientRect().width / viewBox.width` on the one visible variant. `getComputedStyle` was deliberately not used as the criterion; it is reported alongside only to show that it reads 15px or 17px regardless and would have passed the old broken build too.

| Viewport | Variant | Column | SVG width | Scale | `getComputedStyle` (invalid as a check) | **Rendered label** | Stroke scale | Label 15.0-17.0 | Stroke >= 1.0 |
|---|---|---|---|---|---|---|---|---|---|
| 375 | vertical | 375 | 335 | 1.0000 | 17px | **17.00px** | 1.000 | pass | pass |
| 480 | vertical | 480 | 335 | 1.0000 | 17px | **17.00px** | 1.000 | pass | pass |
| 600 | vertical | 600 | 335 | 1.0000 | 17px | **17.00px** | 1.000 | pass | pass |
| 687 | vertical | 687 | 335 | 1.0000 | 17px | **17.00px** | 1.000 | pass | pass |
| 688 | horizontal | 688 | 640 | 1.0000 | 15px | **15.00px** | 1.000 | pass | pass |
| 767 | horizontal | 728 | 680 | 1.0625 | 15px | **15.94px** | 1.063 | pass | pass |
| 768 | horizontal | 744 | 680 | 1.0625 | 15px | **15.94px** | 1.063 | pass | pass |
| 1024 | horizontal | 744 | 680 | 1.0625 | 15px | **15.94px** | 1.063 | pass | pass |
| 1440 | horizontal | 744 | 680 | 1.0625 | 15px | **15.94px** | 1.063 | pass | pass |

Nine of nine pass on both criteria. The full rendered range is 15.00px to 17.00px, both endpoints inclusive and both hit exactly.

The discontinuity is also gone. Measured across the new boundary and through the old failure zone: 639 = 17.00px, 640 = 17.00px (was 13.88px), 660 = 17.00px (was 14.34px), 686 = 17.00px, 687 = 17.00px, 688 = 15.00px, 689 = 15.02px, 700 = 15.28px (unchanged coincidentally, but now on the correct side of 15). The jump at the boundary is 17.00 to 15.00, which is 11.8% and downward into the still-valid range, replacing a 32% jump that landed below the caption size. The 200%-zoom condition (640 CSS px at deviceScaleFactor 2, a 1280px window at 200%) now renders 17.00px with a stroke scale of 1.000; that was the worst case at 13.88px and 0.925px strokes.

The figcaption width cap is in the CSS as instructed, even though no caption element ships. It is a separate `@media (max-width: 687px)` block setting `.caption { max-width: 335px }`, with a comment saying why the rule exists with nothing to style, so a line Evan writes later inherits it instead of running wider than the 335px diagram.

**2. W-12 / FIX-005, band caption deleted.** The `<figcaption>` element and its sentence are gone from `components/MethodLine.tsx`. `grep -rc "Every company I build runs this line" out/` returns zero hits across the whole export, and there is no `figcaption` element anywhere in `out/`. I did not write a replacement and did not move any other copy into the slot. The component comment now records why the slot is empty and who owns filling it, so the next person to open the file does not read the empty `.caption` rule as dead code and delete it.

How the band reads without it, from the rendered screenshots rather than from the code:

- **1440px** (`/tmp/f03/band-1440.png`): the horizontal line sits alone in the black field, 680px wide, aligned exactly to the column edges shared with the "What I'm building" h2 below it. `band-pad` is symmetric at 96px, and because `figure` has `margin: 0` and the caption was the only thing below the drawing, removing it left the drawing optically centered in the band rather than sitting high in it. Measured black above the diagram is roughly equal to the black below. It reads as one deliberate object, and the four words carry themselves at 15.94px against the white. Nothing looks like it is missing.
- **688px** (`/tmp/f03/band-688.png`): this is the new boundary and the tightest case for the horizontal variant. The rule runs edge to edge of the column at scale 1.0, so the outer ticks land exactly above the left edge of "What I'm building" and the right edge of the body measure. The alignment is more obviously intentional here than at 1440, because the diagram and the text column are the same width. Labels at exactly 15.00px, hairlines at exactly 1.0px.
- **375px** (`/tmp/f03/band-375.png`): the vertical variant, 335px wide in a 335px column, with the four stations reading down the left. Design's "accepted cost" note about black to the right of the diagram does not apply at this width, because the diagram now fills the column exactly. The station labels at 17px are the largest type in the band and clearly primary, which was the whole point of the fix.

Between 480 and 687 the accepted cost does apply: a 335px diagram in a column up to 639px wide, black to its right. I looked at it and agree with design's ruling that it reads as band rather than as a hole, because there is no border, no box, and nothing else on that line to align against.

**3. W-13 / FIX-003, the `+` restored.** Both `deck` props in `app/page.tsx` are back to the approved strings. `out/index.html` contains "AI + business systems" and "Probability + market data", and contains neither "AI and business systems" nor "Probability and market data". Verified in the served page, not only in the source.

**4. W-15 / FIX-004, first-person meta description.** `/writing/` now carries `I write about engineering, AI, probability, and what I learn building companies.`, byte-identical to the visible intro directly below it and to the homepage Writing intro. Verified in `out/writing/index.html` and over HTTP on both servers.

**5. design-09, 44px tap targets.** Below 480px the hero action links and the Contact links get `display: flex; align-items: center; min-height: 44px`, keeping the existing `padding-block: var(--s1)`. `min-height` is recorded as the third documented exception to the 8px scale, both in a comment on the rule in `Hero.module.css` and in the scale comment in `app/globals.css`, which previously said "the two documented exceptions". Measured at 375, 414 and 479: all three `nav a` and both Contact `a` boxes are exactly 44.00px tall, up from 42px. At 480 and above the row layout is untouched at 20px inline boxes, confirming the rule is scoped correctly. **One consequence design should look at before closing this, described in finding F03-01 below: `display: flex` makes the anchor a block-level box, so it now spans the full 335px column and the focus ring spans with it.**

**6. C05-06 / FIX-007, 404 description.** `app/not-found.tsx` now exports its own `description: 'That URL does not exist on this site.'`, matching its visible sentence. `out/404.html` carries it instead of the homepage summary.

**7. design-08, verification only.** **next/font did emit size-adjusted fallbacks, and the h3 does not reflow.** The generated stylesheet contains `@font-face{font-family:Newsreader Fallback;src:local(Times New Roman);ascent-override:69.68%;descent-override:25.12%;line-gap-override:0.0%;size-adjust:105.48%}` and the matching `Public Sans Fallback` over `local(Arial)` at 104.87%. Because `--font-display` resolves to `Newsreader, "Newsreader Fallback", Charter, ...`, the adjusted face is what the browser paints during the `display: swap` window, ahead of Charter and Georgia. Forcing `font-family: "Newsreader Fallback"` at 375px: the h3 renders on **1 line** with its text right edge at **336.80px** against a column right edge of 355px, so **18.2px of slack, inside the column**, and the element height is 26px in both states. Line count and height are identical before and after the swap, so there is no reflow at all, not merely no overflow. I also measured the raw stacks design named, all at 375px and all inside the column: `Charter, "Bitstream Charter", Georgia, "Times New Roman", serif` wraps to 2 lines with right edge 194.95px; `Georgia, serif` 2 lines at 214.89px; `"Times New Roman", serif` 1 line at 341.58px; `Arial, sans-serif` 2 lines at 197.34px. `scrollWidth === clientWidth` in every case. **design-08 closes with no CSS change and no writer change.** The one residual, recorded as a limitation rather than a defect: on a machine with no Times New Roman installed, `local(Times New Roman)` fails and the adjusted face never loads, so the pre-swap render falls through to Charter or Georgia and would paint 2 lines before settling to 1. That is a 26px vertical shift, not an overflow, and it cannot occur on macOS or Windows. I did not measure it on a Linux profile.

**8. Housekeeping, with a correction to the premise.** I could not reproduce the stale `out/404.html`. In the export design reviewed and in the one I inherited, `out/404.html` and `out/404/index.html` were **byte-identical** (`cmp` clean) and **neither carried a `/personalWebsite/` prefix**; every href in both was root-relative. So the artifact was not stale and would not have served unstyled CSS at the root. I rebuilt from scratch anyway (`rm -rf .next out && npm run build`) and re-checked: still byte-identical, still unprefixed, and now carrying the new 404 description.

What is real underneath design's observation is a **static-server artifact, not a build artifact**: `serve` applies clean-URL rewriting, so `curl http://localhost:4321/404.html` returns a **301 to `/404`**, and the page design inspected was indeed resolved from `out/404/index.html`. GitHub Pages does not do that; it serves `404.html` verbatim for unmatched paths. So the local preview genuinely does not exercise the same file Pages will, which is worth knowing, but the file on disk is correct. A request for a genuinely missing path (`/nope/`) returns a real 404 from the preview server.

One process note on the rebuild, because it cost a cycle and will bite whoever does this next: the first `rm -rf .next` ran **while `next dev` was still running**, and the dev server immediately regenerated a partial `.next/dev/types/validator.ts`, which failed the build with `error TS1128: Declaration or statement expected`. That is not a source defect. Stop the dev server before deleting `.next`. I stopped it, rebuilt clean, and restarted it.

## Evidence and checks

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| design-05: rendered station-label size within 15.0-17.0 inclusive at 375, 480, 600, 687, 688, 767, 768, 1024, 1440 | Headless Chrome 152 over CDP against the static export; `font-size` x `getBoundingClientRect().width / viewBox.width` on the single visible `svg[role="img"]`; script `/tmp/f03/design05.mjs` | **pass, 9 of 9** (15.00 to 17.00) | Would have failed if the breakpoint had been left at 639 (13.88px at 640) or `.vertical` left at 400px (20.3px at 639). The script asserts exactly one visible diagram, so it would also have failed loudly if both variants had rendered |
| design-05: stroke scale >= 1.0 at all nine widths | Same run, `getComputedStyle(line).strokeWidth` x scale | **pass, 9 of 9** (1.000 to 1.063) | Would have failed at any width where the column is narrower than the viewBox; that was 0.925 at 640 before the fix |
| design-05: no size discontinuity at the boundary | Measured 639, 640, 660, 686, 687, 688, 689, 700 | pass | 17.00px holds to 687, 15.00px from 688. The old 20.3-to-13.88 jump is gone |
| design-05: 200% zoom worst case | 640 CSS px at deviceScaleFactor 2 | pass, 17.00px label, 1.000 stroke | This was the worst case in D02 at 13.88px |
| `getComputedStyle` is not a valid check here | Same run reports 15px / 17px at every width regardless of scale | confirmed, recorded as invalid | Reported so nobody re-closes this finding with the wrong measurement |
| W-12: caption string gone from the export | `grep -rc "Every company I build runs this line" out/` | pass, 0 hits repo-export-wide | Would have failed if the element had been hidden with CSS rather than deleted |
| W-12: no `figcaption` element anywhere | `grep -rc figcaption out/`; DOM count of figures without a caption | pass, 0 elements, 1 caption-less figure | |
| W-12: nothing lost from the accessibility tree | DOM walk: two `svg[role="img"]`, both with `aria-label="A four stage line: system, model, software, business."`, exactly one visible | pass | The hidden variant is `display: none`, so the sentence is announced once, not twice |
| W-12: how the band reads at 1440 / 688 / 375 | Screenshots `/tmp/f03/band-1440.png`, `band-688.png`, `band-375.png`, read as images | pass, described above | I judged this visually; design owns the final call on whether the band wants words |
| W-13: approved deck strings render | `out/index.html` and `curl http://localhost:4321/` | pass, "AI + business systems" and "Probability + market data" present, "and" variants absent | |
| W-15: `/writing/` description matches the visible intro | `out/writing/index.html` meta tag vs the rendered `<p>` | pass, byte-identical | |
| C05-06: 404 carries its own description | `out/404.html` meta tag | pass, "That URL does not exist on this site." | Would have failed if `metadata` had been exported from a client component or misspelled |
| design-09: every `nav a` and Contact `a` >= 44px tall at 375 | CDP `getBoundingClientRect()`, script `/tmp/f03/tap.mjs` | **pass, 5 of 5 at exactly 44.00px** | Also measured 414 and 479 (pass) and 480 and 1440 (row layout, 20px, correctly unaffected) |
| design-09: stacked pitch stays on the 8px scale | `row-gap` computed at 375 | pass for the gap: 8px, one `--s1` unit | **Stated precisely: the gap is on the scale; the li box is 44px, so the pitch is 52px.** 52 is not an 8px multiple. That follows directly from the 44px exception design authorized, and is reported rather than glossed |
| design-09: focus indicator still visible on the changed links | Real `Input.dispatchKeyEvent` Tab presses, not programmatic `.focus()`; `:focus-visible` matched on all six first tab stops; screenshot `/tmp/f03/focus-ring-375.png` | pass, but see finding F03-01 | Programmatic `.focus()` does not set `:focus-visible` and would have produced a false negative; that is why keystrokes were used |
| Band re-audit: no navy or brown resolves inside `.band` or any descendant | CDP walk of the band plus all 25 descendants, 12 color properties each, compared against the computed values of `--navy` (rgb(31,51,82)) and `--brown` (rgb(107,74,47)); at 375, 640, 1440 | **pass, 0 hits at all three widths** | Every color, background, fill and stroke inside the band resolves to pure black, pure white, or transparent. My first attempt at this scoped the selector to `<main>` by mistake and returned 79 hits from `CompanyEntry` and `WritingList` outside the band; the corrected run is the one reported |
| Band re-audit: `scrollWidth === clientWidth` at 375 / 640 / 1440 | `document.documentElement` on the static export | pass, equal at all three | Would have failed if the 335px cap had been applied as a `width` on a wider column, or if full-bleed had been done with `100vw` |
| `npm run typecheck` | `tsc --noEmit`, run after all edits | pass, clean | |
| `npm run lint` | `eslint .`, run after all edits | pass, exit 0, no output | |
| `npm run build` | Clean `rm -rf .next out && npm run build` with the dev server stopped | pass, 8 static pages, 3 SSG article routes | The first attempt failed on a partial `.next/dev/types/validator.ts` because the dev server was running during `rm -rf .next`; documented above |
| All routes return 200 from the static server | `/`, `/writing/`, and all three articles | pass, 200 text/html on all five | |
| `/404.html` behavior | 301 to `/404` from `serve`'s clean-URL rewrite, then 200; file on disk correct | pass, with the caveat recorded | `serve` does not reproduce Pages' 404 handling. A genuinely missing path (`/nope/`) returns a real 404 |
| Every `/_next/*` asset referenced by `index.html` resolves | 14 URLs curled individually | pass, 200 on all 14 (3 CSS, 8 JS, 3 woff2) | |
| `public/.nojekyll` reaches `out/` | `out/.nojekyll` present, 0 bytes, served 200 | pass | |
| `out/404.html` is not stale | `cmp out/404.html out/404/index.html`; href scan of both | pass, byte-identical and unprefixed, before and after the clean rebuild | This contradicts the premise of the housekeeping item; reported honestly rather than silently "fixed" |
| Dev and export agree on all four changed strings | Both servers curled and grepped for the two deck strings, the deleted caption, and `figcaption`; plus the `/writing/` meta tag on both | pass, identical on all five comparisons | |
| Heading structure unchanged by the caption removal | DOM walk of the homepage: 1 h1, 5 h2, 9 h3, no level skips | pass | Would have failed if the figure had been restructured rather than just emptied |
| Landmarks and image alt text | 1 `header`, 1 `nav`, 1 `main`, 1 `footer`; 0 `<img>` elements on the homepage | pass | No images ship, so there is no alt text to be missing. Not a claim that image handling is verified |
| Lighthouse accessibility pass | | **not run** | Lighthouse is not installed and I did not attempt a network install under a local-build-only authorization. The structural, contrast-relevant and focus checks above are real measurements but they are **not** a substitute for the Lighthouse pass CLAUDE.md requires before any page is called done. It remains owed |
| Article pages re-verified | | **not run, deliberately** | `content/articles/**` is outside my write scope this round and the writer is editing `draft-anything-send-nothing.md` in parallel. I confirmed the three article routes return 200 and did not inspect their content |
| Real-device touch testing | | **not run** | All tap-target measurement is emulated viewport geometry in headless Chrome, not a physical device |

## Findings (reviews or discovered defects)

| ID | Location / quote / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| F03-01 | Hero action links and Contact links below 480px, after the design-09 fix. Each anchor's box is now **335 x 44** at 375px (full column width) where it was previously text-width by 42px tall. The `:focus-visible` ring therefore spans the whole column. Screenshot `/tmp/f03/focus-ring-375.png` | **Observation, measured and seen.** Direct consequence of `display: flex`, which makes the anchor a block-level flex container filling its `li`. Design's fix text specified `display: flex` literally, so I implemented it literally rather than substituting | suggestion | Not a defect: the ring is clearly visible, the contrast is unchanged, and a full-width row is a normal mobile-nav pattern. But it is a **visual change design did not explicitly ask for**, on the site's only navigation, and design owns visual direction. It should be a choice, not a side effect | design to rule, coding to apply if changed | `display: inline-flex` gives the identical 44px height while keeping the box hugging the text, which is closer to the previous appearance. Measured at 375 with inline-flex: "What I'm building" 137 x 44, "Selected work" 113.3 x 44, "Contact" 62.2 x 44, all still >= 44px tall and all still >= 44px in both dimensions for the two longer labels. **Accept either way**; if design prefers the hugging ring, change one word in each of `Hero.module.css` and `Contact.module.css` and re-run the tap measurement at 375 |
| F03-02 | `out/404.html` was reported as a stale artifact carrying `/personalWebsite/` basePath prefixes | **Observation, not reproduced.** `cmp` shows it byte-identical to `out/404/index.html`, and every href in both is root-relative, both in the inherited export and after a clean rebuild. The real effect underneath the report is that `serve` 301-redirects `/404.html` to `/404`, so the local preview resolves `out/404/index.html` and never exercises the file Pages will actually serve | suggestion | The build is fine, so no fix is needed. But the local preview does not reproduce Pages' 404 path, which means **the 404 page is one of the few things a static-server check cannot fully verify**. It has to be confirmed on the live URL | coding, at deployment time | Add to the deployment verification list: fetch `https://<live-host>/<a-path-that-does-not-exist>` and confirm the response body is the site's 404 page with its stylesheet resolving. Accept when the live 404 renders styled. Nothing to do before then |
| F03-03 | `next/font`'s `Newsreader Fallback` face is `src: local(Times New Roman)` | **Inference, labelled.** On a system without Times New Roman the adjusted face never loads and the pre-swap render falls through to Charter or Georgia, which wrap the EdgeBet h3 to 2 lines at 375px before the webfont settles it to 1 | suggestion | A one-line-to-two-line settle is a visible shift, though never an overflow and never horizontal scroll. Cannot occur on macOS or Windows, which is nearly all of the audience | none | No change requested. Recorded so design-08 is closed with its actual boundary stated rather than as an unqualified pass. If it ever matters, the fix is the writer's (one word shorter), not a CSS change |

No other defect was found in the inspected scope.

## Ideas and alternatives

- **Rejected: writing a replacement band caption, or moving approved copy into the empty slot.** The packet said the deletion is decided and that no agent gets to replace the sentence. I also think it is right on the merits: the slot's problem was the claim, not the phrasing, so any agent-written substitute reproduces the defect behind better words. The band reads as a complete object without it, which the three screenshots support. The `.caption` rule and its width cap are the only thing left in place, ready for Evan's line.
- **Rejected: the thorough design-05 fix.** Design already scoped this as backlog and explicitly did not request it: split the drawing so the rule and ticks are an SVG with `preserveAspectRatio="none"` and `vector-effect="non-scaling-stroke"`, and the four station words are an HTML flex row at a literal 15px. That gives invariant type and exactly-1px hairlines at every width and removes the duplicated text between the two variants. The three-value fix gets the measured range to 15.00-17.00 with strokes at 1.000-1.063, which clears the acceptance bar, so the rewrite is not worth doing before the site ships. **Backlog, not a requirement.**
- **Considered and not done: dropping `padding-block: var(--s1)` from the stacked links now that `min-height` sets the height.** It is redundant at the current 17px type size, since 44px dominates. I left it because it is the thing that keeps the target >= 44px if the UI type scale ever grows, and removing it would make the floor a single point of failure. Cost is one dead-ish declaration.
- **Considered: a `figure`-level `max-width: 335px` instead of capping the caption separately.** It would have been one rule instead of two, but it would also have capped the horizontal variant at 335px above 688, which is exactly wrong. The separate cap inside the mobile query is more code and less clever, and it cannot break the desktop case.
- **Backlog, not a requirement: a preview server that matches Pages' 404 behavior.** `serve`'s clean-URL rewriting is what made the 404 hard to reason about (F03-02). If the 404 page ever gets more than one sentence, it would be worth serving the export with something that does not rewrite `.html`, or adding a `serve.json` with `"cleanUrls": false`, so what is inspected locally is what Pages serves. Not worth doing for a one-sentence page.

## Proposed decision-log update

**No new decision.** Nothing in this pass chose between real alternatives; every item applied a fix another agent had already specified and routed. Two items are worth recording as facts somewhere the coordinator owns, if they are wanted:

- The 8px spacing scale now has **three** documented exceptions, not two: the 3px focus offset, the 0.18em underline offset, and the 44px `min-height` tap-target floor on the stacked link rows below 480px. This is already recorded in `app/globals.css` where the scale is defined, so it does not need `DECISIONS.md` unless the coordinator wants the spec amended to match.
- design-08 is closed by verification rather than by a change: `next/font` emits size-adjusted fallback faces, so no headline reflows on the font swap.

**Q3 candidate note: none from this round.** Evan did not review, reject or correct anything here; every input came from other agents.

## Handoff

- **Acceptance criteria met:** all seven work items complete. design-05 passes at 9 of 9 widths on both the label-size and stroke-scale criteria, measured the way design specified and not with `getComputedStyle`. W-12, W-13, W-15 and C05-06 verified in the rendered export and over HTTP on both servers, not in source. design-09 measured at exactly 44.00px on all five links at 375, 414 and 479. design-08 verified with no change needed. The band re-audit passes: zero navy or brown anywhere inside `.band` or its 25 descendants at 375, 640 and 1440, and `scrollWidth === clientWidth` at all three. `typecheck`, `lint` and a clean `build` all pass, and all five routes plus all 14 referenced assets return 200.
- **Acceptance criteria unmet:** one, stated plainly. The **Lighthouse accessibility pass CLAUDE.md requires was not run** (not installed, and I did not install under a local-build-only authorization). The structural, focus and contrast-relevant checks I did run are real but do not replace it. It is owed before any page is called done.
- **Blocker and missing input:** none for this pass. The standing publication blockers are unchanged and none of them are mine: H01 byline approval for the three article revisions, the 30x bug attribution, and whether the band wants a caption at all. **Nothing here is publication approval, and nothing was deployed, pushed or committed.**
- **Next owner and task recommendation:** **design**, to re-inspect the band at 1440 / 688 / 375 as they said they would, and to rule on **F03-01** (full-width vs text-width focus ring on the stacked links; both options measured, both pass 44px, one word to switch). **Coordinator**, to close FIX-003, FIX-004, FIX-005 and FIX-007, to note that design-08 closed by verification, and to decide whether the spec's spacing section should record the third exception. **Nobody**, on the `out/404.html` housekeeping item: the premise did not reproduce, and F03-02 converts it into a deployment-time check instead.
- **Checks or reviews that must be rerun after a change:** any edit to `MethodLine.module.css` or to the `--gutter` / `--w-page` tokens re-opens the full nine-width design-05 measurement, because the fix depends on the arithmetic that 688 minus two 24px gutters is exactly 640. Any change to the stacked link rules re-opens the 375px tap measurement and the keyboard-Tab focus check. Any rebuild re-opens the route and asset 200 sweep. If the writer's `draft-anything-send-nothing.md` edit lands, the article routes need rebuilding and re-checking; I did not touch or verify article content this round.
- **Servers left running and working:** dev at **http://localhost:3100/** (restart: `npm run dev`), static export preview at **http://localhost:4321/** (restart: `npm run preview`). Both confirmed serving the corrected build at the end of this pass. **Stop the dev server before any `rm -rf .next`**, or the build will fail on a partially regenerated types file.

---

# Addendum, round 03b: coordinator follow-ups (F03-01 ruling, Lighthouse re-measure, design-06)

- Date: 2026-09-10, after the main F03 pass was accepted
- Status: complete
- Authorization unchanged: local build only. Nothing deployed, pushed, or committed.
- Files changed in this addendum: `components/Hero.module.css`, `components/Contact.module.css` (one keyword each), and this report.
- **Frozen build:** everything below was measured against a single export built at **17:14**, `out/index.html` md5 `374597ccaa64fe4dd07189066a5e0826`. The build ran once, before any check, with the dev server stopped. **No rebuild happened afterward**, so every number in this addendum describes the same artifact.

## 1. F03-01: `inline-flex` applied, per the coordinator ruling

`display: flex` became `display: inline-flex` in the below-480px rule in both `Hero.module.css` and `Contact.module.css`. Nothing else changed: `align-items: center`, `min-height: 44px` and `padding-block: var(--s1)` are all as before, and the 8px-scale exception note in `app/globals.css` still stands unchanged.

Re-measured at 375, 414 and 479, with 480 included to confirm the rule is still correctly scoped:

| Viewport | Link | Display | Box | 44x44 |
|---|---|---|---|---|
| 375 | nav "What I'm building" | inline-flex | 136.97 x 44.00 | pass |
| 375 | nav "Selected work" | inline-flex | 113.30 x 44.00 | pass |
| 375 | nav "Contact" | inline-flex | 62.16 x 44.00 | pass |
| 375 | contact "evanbaker315@gmail.com" | inline-flex | 206.02 x 44.00 | pass |
| 375 | contact "GitHub" | inline-flex | 56.44 x 44.00 | pass |
| 414 | all five | inline-flex | identical widths, 44.00 tall | pass |
| 479 | all five | inline-flex | identical widths, 44.00 tall | pass |
| 480 | all five | inline | 20px tall, row layout | correctly unaffected |

**All five links clear 44px in both dimensions**, not just height. The narrowest is "GitHub" at 56.44 x 44 and the shortest label is "Contact" at 62.16 x 44, so the 44x44 convention is met on width as well, which is the thing `display: flex` was buying and which `inline-flex` turns out not to have cost. Row gap is still 8px (one `--s1`), li height 44px, pitch 52px, exactly as reported in the main pass.

Keyboard check with real `Tab` keystrokes on the frozen build: all of the first five tab stops match `:focus-visible` and paint a 2px navy outline at a 3px offset. The rings now hug the words (`"Contact"` 62.2 x 44 instead of 335 x 44), which is what the ruling was for. Screenshot `/tmp/f03/focus-final-375.png` confirms it visually: the ring is a tight box around the link text, consistent with `demarly.ai` and every other link on the site. Tab stop 1 is still the skip link at 165.6 x 46.4.

**Recorded as the coordinator asked: design may override this at its recheck.** Both options were measured and both pass the design-09 acceptance criterion; this is a box-model choice, not an accessibility one, and design owns it.

## 2. Lighthouse accessibility, re-measured on the frozen build

The coordinator was right that it was still installed. I used `/Users/evanbaker/.claude/jobs/9fcd68ec/tmp/lhtool/node_modules/.bin/lighthouse` (v13.4.1) directly; the `lh` wrapper is not in that directory, only the round-02 result JSONs. No network install. Each run: `--only-categories=accessibility` against the static export, headless Chrome 152.

| Page type | URL | Score | Audits passed | **Failed** | n/a | Manual-only |
|---|---|---|---|---|---|---|
| Homepage | `/` | **100/100** | 21 | **0** | 45 | 10 |
| Writing index | `/writing/` | **100/100** | 20 | **0** | 46 | 10 |
| Article | `/writing/draft-anything-send-nothing/` | **100/100** | 18 | **0** | 48 | 10 |
| 404 | `/404/` | **100/100** | 18 | **0** | 48 | 10 |

**No flagged items. Zero failing audits on all four page types.** No regression from C05's 100/100.

Because a headline score can hide the fact that the relevant audit did not run, here is the per-audit status for the things that actually changed since C05, which is the reason this re-measure was worth doing:

| Audit | 404 | Homepage | Writing index | Article | Covers |
|---|---|---|---|---|---|
| `heading-order` | pass | pass | pass | pass | the `/writing/` heading-level change and the writer's four new h2 |
| `link-name` | pass | pass | pass | pass | the rewritten skip link, the stacked nav links |
| `target-size` | pass | pass | pass | pass | the tap-target change |
| `color-contrast` | pass | pass | pass | pass | band and body text |
| `landmark-one-main` | pass | pass | pass | pass | structure after the figcaption removal |
| `document-title` | pass | pass | pass | pass | the two changed meta descriptions' pages |
| `html-has-lang`, `meta-viewport`, `aria-allowed-attr` | pass | pass | pass | pass | |
| `list`, `listitem` | n/a | pass | pass | n/a | the stacked link lists |
| `image-alt`, `frame-title`, `duplicate-id-aria` | n/a | n/a | n/a | n/a | no images, iframes or duplicate ARIA ids exist |
| `bypass`, `skip-link` | n/a | n/a | n/a | n/a | **see the limitation below** |

**Two honest limitations on this result, so the 100/100 is not over-read:**

1. **`target-size` passing does not prove the design-09 fix worked.** Lighthouse's `target-size` audit checks the WCAG 2.2 AA minimum of 24x24, not the 44x44 platform convention. It passed at 42px before this pass too. The evidence that the fix landed is the direct `getBoundingClientRect()` measurement in section 1, not this audit.
2. **`bypass` and `skip-link` came back `notApplicable` on all four pages**, so Lighthouse did not verify the skip link. I verified it directly instead: on the frozen build at 375px it is the first `Tab` stop, matches `:focus-visible`, and paints a 165.6 x 46.4 focus box. That is a real check, but it is mine, not Lighthouse's.

Lighthouse also reports 10 manual-only audits per page that it never scores (they require human judgment). Those remain unverified by the tool on every page, as they always do.

## 3. design-06 acceptance checks on `/writing/draft-anything-send-nothing/`

The writer's four bold paragraphs are now real headings. Measured on the frozen build.

**DOM walk at 1440.** One h1 followed by exactly four h2, **no level skipped**, and **zero bold-only paragraphs left over** (I checked specifically for `<p>` elements whose entire text content is a single `<strong>`, which is what the old markup produced):

```
h1  "Draft anything, send nothing"
  h2  "1) The agents can't send. Not "shouldn't." Can't."
  h2  "2) Unknown tools are guilty by default."
  h2  "3) The part people want to be stronger than it is."
  h2  "Where the guarantee stops."
```

**h2 size and vertical rhythm at 1440.** All four identical:

| Measure | Expected | Measured | Result |
|---|---|---|---|
| computed `font-size` | 28px | **28px** on all four | pass |
| gap above (rect bottom of previous `<p>` to rect top of h2) | 64px | **64.00px** on all four | pass |
| gap below (rect bottom of h2 to rect top of next `<p>`) | 16px | **16.00px** on all four | pass |

Computed `margin-top: 64px` and `margin-bottom: 16px` match the measured rect gaps exactly, so nothing is collapsing or double-counting. Computed `line-height` is 33.6px (1.2). Screenshot `/tmp/f03/article-1440-h2.png` shows the result: the numbered headings read as Newsreader display type clearly separated from the body, not as emphasized sentences.

**Wrapping at 375.** No h2 exceeds two lines:

| Heading | Rendered chars | Lines at 375 | Height | Text right edge vs column (355px) |
|---|---|---|---|---|
| "1) The agents can't send. Not "shouldn't." Can't." | 49 | **2** | 57.66px | 267.41 |
| "2) Unknown tools are guilty by default." | 39 | **2** | 57.66px | 229.03 |
| "3) The part people want to be stronger than it is." | 50 | **2** | 57.66px | 263.38 |
| "Where the guarantee stops." | 26 | **1** | 28.83px | 298.44 |

**Pass.** The heading the coordinator flagged to watch holds at two lines with 87.6px of horizontal slack, so it is not close to a third line. `scrollWidth === clientWidth` at 375, no horizontal scroll. Screenshot `/tmp/f03/article-375.png`.

One small correction to the brief, not a defect: heading 1 renders at **49 characters**, not 46. The count in the task packet appears to omit the three straight quote marks around `"shouldn't."`. It changes nothing about the result; I am recording it so the number in the tracker matches the artifact if anyone re-checks it later.

## 4. Build health, re-confirmed

| Check | Result |
|---|---|
| `npm run typecheck` (`tsc --noEmit`) | pass, clean, run after the `inline-flex` edit |
| `npm run lint` (`eslint .`) | pass, exit 0, no output |
| `npm run build` | pass, 8 static pages, 3 SSG article routes, single run at 17:14 |
| Static export served and all routes 200 | pass (re-confirmed on the frozen build) |

Sequence followed as instructed: edit, then typecheck, then lint, then one build with the dev server stopped, then every measurement against that frozen `out/`. No rebuild occurred after the first check ran.

## Addendum findings

**No new findings.** F03-01 is closed by the coordinator's ruling and applied. The Lighthouse re-measure found no regression on any of the four page types. design-06 passes every acceptance check the writer set.

The two limitations in section 2 (`target-size` measures 24x24 not 44x44; `bypass`/`skip-link` were `notApplicable` and were verified by hand instead) are stated as limitations rather than findings, because neither indicates a defect in the site.

## Addendum handoff

- **Acceptance criteria met:** all four requested items. `inline-flex` applied and re-measured at 375/414/479, all five links 44x44 or better. Lighthouse accessibility re-measured on all four page types against the post-correction build: 100/100, zero failing audits, no regression. design-06 fully measured: heading walk clean, 28px h2, 64px above / 16px below on all four, no h2 past two lines at 375. typecheck, lint and build all pass.
- **Unmet:** none. The Lighthouse gap recorded as unmet in the main F03 handoff is now closed.
- **Next owner:** **design**, for the band recheck it planned plus the optional override on F03-01 (`inline-flex` vs `flex`; both measured, both pass). **Coordinator**, to close the round.
- **Checks to rerun after any further change:** any edit to the stacked link rules re-opens the 375/414/479 tap measurement and the keyboard focus check. Any edit to `content/articles/draft-anything-send-nothing.md` re-opens the design-06 heading walk, the 1440 gap measurement and the 375 wrap check, and requires a rebuild first. Any rebuild re-opens the four Lighthouse runs, since this score describes one specific artifact.
- **Servers:** dev restarted at **http://localhost:3100/** after all measurements were taken, so it did not disturb the frozen export. Static preview still at **http://localhost:4321/** serving the 17:14 build.
