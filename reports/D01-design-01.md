# D01: Visual specification from real structure and the approved palette

- Role / assignee / run: design agent, D01, round 01
- Date: 2026-09-10
- Status: complete
- Scope: preparation (specification). Local build is authorized, but implementation belongs to coding (C03, C04). No project application file was created or edited.
- Candidate revision and URL, if applicable: none. No site exists yet. Prototype rendered from `file://` in the session scratchpad only.
- Inputs actually inspected: `CLAUDE.md`, `AGENT-WORKFLOW.md` (task packet summary), `website-plan.md` (full), `RESOURCES.md` (rules 1-10 and the design/accessibility/font sections), `context/voice.md`, `todo.md` (D01, C03, C04, C05, D02, H02), `reports/TEMPLATE.md`. Skills invoked: `frontend-design:frontend-design` and `impeccable:impeccable` (plus `impeccable context`, `reference/new-work.md`, `reference/craft-floor.md`, and `impeccable detect`).
- Assigned write scope: `reports/design-spec.md`, `reports/D01-design-01.md`, scratchpad exploration files.
- Files changed:
  - `reports/design-spec.md` (created)
  - `reports/D01-design-01.md` (created)
  - Throwaway prototype, not shipping, not in the repo: `<scratchpad>/proto/tokens.css`, `<scratchpad>/proto/index.html`, `<scratchpad>/proto/article.html`, plus `contrast.js`, `shot.js`, `crop.js`, `mob.js`, `acheck.js`, `measure.js` and the PNG captures.

`<scratchpad>` = `/private/tmp/claude-501/-Users-evanbaker-Downloads-personalWebsite-personalWebsite/5b7c593a-c661-4ec5-8fdb-1e7bbf43b0b5/scratchpad`

## Work and result

### What was decided

1. **Direction: ink on paper.** White page, true black type, two typefaces, generous space, and no boxes, cards, borders, or shadows anywhere. One black surface on the whole site.
2. **The one bold move: the method line.** A full-bleed black band directly under the hero containing one hand-authored SVG dimension line with four stations (`system`, `model`, `software`, `business`) plus one caption. It is the only drawn element on the page. The rejected alternative was the oversized name in the hero; the reasoning and its cost are in `design-spec.md` section 1.
3. **Typefaces: Newsreader (display, weight 600) and Public Sans (text, 400/500/600),** loaded via `next/font/google` so the static export has no external font request and no layout shift. Rejected: Inter, Playfair, Instrument Serif, Fraunces, IBM Plex (default or currently fashionable choices).
4. **Accent roles are exclusive and exhaustive.** Navy `#1F3352` is interaction only (link underline, hover, focus ring). Brown `#6B4A2F` is annotation only (company decks, dates, article meta, list markers). Neither ever appears on the black band.
5. **About ships with no photo and no placeholder.** The photo is an optional value in the component, not an empty slot in the DOM.
6. **A palette-polarity change is proposed, not assumed.** See "Proposed decision-log update" below.

### What was actually built and inspected

A full-fidelity prototype of the homepage and one article page was written in the scratchpad, rendered in headless Chrome with the real webfonts loaded, screenshotted, measured programmatically, critiqued, fixed in one batch, and re-confirmed. Every number in `design-spec.md` came out of that prototype.

**This is not an implementation.** No file in the project application directory exists or was touched. The prototype is throwaway HTML and CSS, structured to mirror the spec so that the spec's values are known-good, not guessed. The coding agent still has to build the real thing in Next.js with CSS Modules, and its output must be re-inspected under D02.

### Defects found and fixed during the pass

| # | Found by | Fix |
|---|---|---|
| 1 | Computed-style measurement | **`clamp()` without whitespace around `+` silently collapses every heading to inherited 19px.** No console error, no broken-looking page, just a flat one. Fixed, and written into the spec as a hard warning plus an acceptance check. |
| 2 | Desktop render | h3 and its deck line merged visually because the deck was at body size and body color. Deck moved to 15px brown, which also gave the brown accent a second consistent home. |
| 3 | Desktop render | Band caption capped at `56ch` wrapped to two lines with a one-word orphan and unbalanced the band. Cap removed so it sits on one line. |
| 4 | Desktop render | Band bottom padding plus the next section's gap doubled into a large void. Added a reduced gap for the section directly after the band. |
| 5 | Desktop render | Hero grouping was inverted (24px name-to-tagline, 16px tagline-to-lead). Changed to 16px and 32px so name and tagline group as identity. |
| 6 | Article render | Inline `code` with a background box inserted a visible gap before the following comma. Background removed; the monospace face alone carries the distinction, and this matches the no-boxes principle. |
| 7 | Writing list render | `tabular-nums` made "September 12, 2026" read gappy for no alignment benefit at three items. Reverted to proportional figures. |
| 8 | 375px render | Stacked nav and contact links had roughly 27px tap targets. Added 8px block padding to reach about 43px. |
| 9 | 375px render | The vertical method line was 268px tall and ate most of the mobile viewport. Compressed to 208px. |

## Evidence and checks

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| Every foreground/background pair meets WCAG | `<scratchpad>/contrast.js`, computed from relative luminance, 18 pairs tested | pass, lowest shipping ratio 6.16:1 | A pair below 4.5:1 would have failed. `#CFCFCF` on white was tested at 1.56:1 and the token was removed as a result. |
| No dark navy or brown small text on black | Structural: accents are permitted only on `--paper`; the band contains `#FFFFFF` and `#B8B8B8` only | pass | Would fail if any module CSS put `--navy` or `--brown` inside `.band`. Grep is listed as an acceptance check. |
| Type scale resolves to the specified px | `<scratchpad>/measure.js`, computed styles at 1440 / 640 / 375 | pass after fix: h1 56/48/36, h2 28/28/24, h3 22/21.4/20, body 19 everywhere | Caught the silent `clamp()` failure, which had every heading at 19px. |
| Body measure inside 65-75 characters | `measure.js` range-rect line count on a real entry paragraph | pass, 66 chars/line at 1440px | Would have failed if the column were set to 720px+. |
| No horizontal overflow at 375 / 640 / 1440 | `shot.js` scrollWidth vs clientWidth; `mob.js` per-node bounding-box audit at 375px | pass, zero overflowing nodes | The SVG or the code block could have pushed past the viewport. |
| 200% zoom holds | `<scratchpad>/zoom200-top.png`, 640px effective viewport (1280px window at 200%) | pass, hierarchy intact, no overflow, diagram legible | Root font-size is never set in px, so browser text-size preferences also scale. |
| 375px mobile layout | `<scratchpad>/m0.png`, `home-375.png`, `article-m0.png` | pass, page height 5678px, no overflow, vertical diagram reads correctly | |
| Focus ring visible and passes contrast | `<scratchpad>/crop-focus.png`, navy ring at 3px offset on a hero action | pass, 12.7:1 against white | |
| Hover state distinguishable | `<scratchpad>/crop-hover.png`, article title link | pass, navy text plus 2px navy underline | |
| Heading order, landmarks, lang, alt/label coverage | `<scratchpad>/acheck.js` on both pages | pass: sequential h1>h2>h3, one h1 per page, banner/main/nav/contentinfo present, `lang="en"`, zero unlabeled SVGs, zero images without alt | Article page had no body-level `<footer>`; the spec now requires one. |
| Impeccable mechanical detector | `impeccable detect --json` on the prototype | 2 warnings, both triaged as false positives against the renders | See "Detector findings" below. |
| Lighthouse accessibility | not run | **not run** | There is no built site to run it against. Assigned to coding under C05. |
| Real copy fits the layout | not possible | **not run** | Writer output (W01/W02) did not exist during this task. See limitations. |

### Detector findings, triaged

- **`tight-leading` (1.22x).** Fires on a display heading. h1 is 1.05, h2 is 1.2, article h1 is 1.15. The rule targets multi-line body text; body is 1.6. Every heading was verified single-line at 375, 640, and 1440px in the captures. Deliberate deviation, kept, because 1.3+ leading on a 28px serif heading looks loose.
- **`cramped-padding` on `.band`.** Fires because `.band` carries `padding-block` but no `padding-inline`; the inner `.wrap` supplies the horizontal gutter. Verified false in the renders at every breakpoint: the diagram is inset from the viewport edge by the gutter and aligns exactly with the h1 above it. No change.

Neither was ignored silently.

## Findings (reviews or discovered defects)

No findings against a site candidate, because no candidate exists. Findings against the plan and the incoming copy:

| ID | Location / quote / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| design-01 | `website-plan.md` section 4, "**Demarly · AI + Business Systems**" | A metadata string joined with middle dots is a generic template construction, and it also fails to separate the heading from its descriptor typographically | suggestion | Reads as generated boilerplate; weakens the h3 | writer | Split into an h3 title line and a separate deck line ("Demarly" / "AI and business systems"). Accept when no rendered heading contains a middle dot. |
| design-02 | `website-plan.md` section 4, optional connective sentence "Two different kinds of complexity ... Same approach: encode the system into software." | The method line now carries this information. If the sentence is also written as prose, the diagram becomes decoration, which the design brief bans | important | Duplication turns the one bold move into ornament | writer | Drop the prose sentence; supply the band caption instead, one sentence at most about 90 characters. Accept when the homepage states the connection exactly once. |
| design-03 | `website-plan.md` section 5, "black remains the provisional base ... with white for the main text" | The approved brown and navy accents cannot function at ink strength on a black base; they must be lightened into tan and pale blue, which reaches the banned beige outcome | important | Affects the whole palette and the article reading surface | coordinator (decision), then coding | Record the light-base decision with the black band, or tell design to re-spec on a dark base. Accept when `website-plan.md` section 5 reflects one polarity unambiguously. |
| design-04 | `website-plan.md` section 4, Contact links | The LinkedIn URL is not recorded anywhere in the plan | suggestion | Coding cannot build the link without it | coordinator to route to Evan | Supply the URL or drop the link. Accept when Contact has no placeholder or dead href. |
| design-05 | `design-spec.md` section 3, `clamp()` whitespace | This failure is silent and produces a page that looks plausible but flat | important | Would be easy to ship unnoticed and would quietly destroy the type scale | coding | Assert computed h1 is `56px` at 1440px, per acceptance check 1. |

## Ideas and alternatives

**Considered and rejected during the pass:**

- **Oversized name as the bold move.** Rejected: it answers nothing for the 60-second reader, it does not solve the page's total absence of imagery, and it is the default gesture `RESOURCES.md` itself names.
- **Fully light with zero black surfaces.** Genuinely tempting and maximally disciplined, but the page then has no graphic anchor at all, and it moves further from the recorded black-base note than necessary. The single band is the compromise that keeps the black-first impression.
- **Fully dark page.** Rejected on the accent-contrast and long-form-reading arguments in design-03.
- **Navy as the resting link color.** Would put navy on roughly fifteen elements. Rejected as not restrained. Ink text with a navy underline keeps the first impression pure black and white and still gives navy one consistent job.
- **A boxes-and-arrows flowchart for the method.** Rejected as a consultancy-slide artifact. The dimension line is the engineering vernacular version and encodes endpoint-vs-transformation in the stroke lengths.
- **Section rules and separators between writing items.** Rejected in favor of whitespace, which also let the method line be the only rule on the homepage.

**Optional and backlog, not requirements:**

- If Evan ever supplies a photo, the About grid is already specified. It changes nothing else.
- A phase-2 venture page could reuse every token unchanged; only the article prose rules would need extending for figures.
- The band caption is the one place a small amount of additional personality could go later without disturbing the system.

## Proposed decision-log update

**Q2 (or the section-structure question, coordinator's call on numbering).**

- **Chosen:** ink on paper. White background, true black text, Newsreader and Public Sans, one 680px column, 8px spacing scale, and exactly one bold move: a full-bleed black band under the hero holding a hand-authored SVG dimension line labeled system, model, software, business.
- **Rejected alternative:** the oversized name in the hero, which was the other candidate recorded in `website-plan.md` section 5.
- **Given up:** a loud hero. The name is set at a disciplined 3x body rather than a display size, so nothing competes with the band.
- **Evidence:** the diagram answers "what connects the companies" in about two seconds, which is exactly what the 60-second reader check asks; the page otherwise has no imagery at all; and the oversized name is the default move `RESOURCES.md` names as its own example.

**Q5 or the accessibility question.**

- **Chosen:** every foreground/background pair on the site was computed from WCAG relative luminance before implementation rather than checked afterward. Eighteen pairs tested, lowest shipping ratio 6.16:1, all above the 4.5:1 requirement.
- **Given up:** a light grey hairline rule, which computed to 1.56:1 on white and was removed from the token set rather than kept as decoration.

**Candidate moment for Q3 (factual note only, not an answer):** the plan recorded black as the provisional page base. Design proposes flipping to a white base with a single black band, because the brown and navy accents Evan approved cannot hold ink-strength contrast on black without becoming tan and pale blue. This is a proposal awaiting Evan's confirmation, not an override that happened.

## Handoff

- **Acceptance criteria met:** concrete type scale, color roles with computed contrast, 8px spacing scale, desktop/mobile/article layouts, focus states, and one justified signature choice are all specified. No project CSS or prototype was added to the repo.
- **Acceptance criteria unmet:** none for D01. Lighthouse and real-copy fitting cannot be done at this stage and are assigned onward.
- **Blockers and missing inputs:**
  1. **No writer copy existed.** Everything in the prototype is layout filler written to plausible lengths from `website-plan.md` section 4 directions. It is not approved text and must not be copied into the site. Three places where the layout depends on copy length are flagged in the spec: the hero lead (capped at 40ch, balanced), the band caption (about 90 characters maximum for a single line), and the company deck lines (must stay on one line at 15px).
  2. **The palette-polarity decision (design-03) should be confirmed** before coding builds the band.
  3. **LinkedIn URL missing** (design-04).
- **Next owner:** coordinator, to record design-03 and route design-01, design-02, design-04. Then coding for C03 and C04, building against `reports/design-spec.md`.
- **Checks that must be rerun after implementation:** all ten acceptance checks in `design-spec.md` section 11, against the real Next.js build, in both `npm run dev` and a static server serving `out/`. My prototype evidence does not transfer to the built site. D02 is the pass where the actual renders get inspected, and it should not be marked complete from this spec.
- **Limitation to carry forward:** the prototype captures live in a session scratchpad and are not committed (design has no write scope in the repo beyond these two reports). They are referenced by path above but will not persist. D02 will produce fresh captures from the real build, which is the evidence that matters.
