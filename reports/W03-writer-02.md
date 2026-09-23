# W03: rendered-site copy and claim review

- Role / assignee / run: **writer / writer agent / run 02**
- Date: 2026-09-10
- Status: **needs-fixes** (one string must not ship as written; six lower-severity items)
- Scope: technical review of a local build. Nothing deployed, pushed, or committed by this task.
- Candidate revision and URL: static export at `out/`, all eight HTML files built `2026-09-10 16:45:31`,
  served at `http://localhost:4321/`. Dev server `http://localhost:3100/`. Repo at `77a110a` plus
  uncommitted working tree.
- Inputs actually inspected: `context/homepage-copy.md` (including the COORDINATOR RESOLUTIONS block),
  `context/claim-review.md` (all 71 rows), `writing/the-30x-bug.md`,
  `writing/distrust-your-best-results.md`, `writing/agents-that-cant-lie.md`,
  `content/articles/*.md` (3 files), `reports/W01-W02-writer-01.md`,
  `reports/C03-C04-coordinator-01.md`, `reports/design-spec.md` (sections 5.4, 5.5, 8, and the
  deck copy note at line 319), `components/WritingList.tsx`, `components/WorkEntry.tsx`,
  `components/WorkEntry.module.css`, `components/SiteFooter.module.css`, `app/page.tsx`,
  `app/writing/page.tsx`, `app/writing/[slug]/page.tsx`, `app/globals.css`, `CLAUDE.md`,
  `context/demarly-context.md` (one connector claim, see W-CLAIM-NEW below).
- Assigned write scope: `reports/W03-writer-02.md` only.
- Files changed: this file. No site code, no article source, no shared file, no context file was edited.

**Method.** Everything below was read from the **static export**, which is the artifact that would
actually deploy: `curl` against `http://localhost:4321/` plus direct reads of the on-disk files under
`out/`. String matching and greps were scripted, not eyeballed. The dev server was used only for the
export-vs-dev parity check. No browser was opened and no page was viewed at any viewport.

**A note on timing.** The export moved during this review. My first fetch of `/writing/` showed the
`h1 -> h3` level skip from coordinator finding FIX-001; a re-read minutes later showed `h1 -> h2`, and
`out/` had been rebuilt at 16:45:31. Coding was fixing FIX-001 and FIX-002 in parallel. **Every result
in this report was re-run against the 16:45:31 build.** FIX-001 and FIX-002 both read as fixed in that
build and are not re-reported here.

## Work and result

### Acceptance criterion 1: rendered homepage copy vs the approved package

45 approved copy blocks were checked as exact substrings of the rendered homepage text.
**42 of 45 render verbatim.** Three differ, all three are reported below (W-13, W-14), and none of the
three touches a claim.

I also ran the check in the other direction, which is the stronger one: every visible string and every
`aria-label` on all six exported pages, matched against a corpus built from the fenced blocks in the
copy package plus the three article sources. That produces a complete inventory of writer-unreviewed
copy on the site. It is short:

| Rendered string | Where | Verdict |
|---|---|---|
| "Every company I build runs this line. What changes is the math in the middle." | homepage band `<figcaption>` | **Does not ship. W-12** |
| `system` / `model` / `software` / `business` (SVG text) and aria-label "A four stage line: system, model, software, business." | homepage band | Passes as written. W-18 |
| "AI and business systems", "Probability and market data" | company decks | Altered from approved. W-13 |
| "Skip to content", "Page sections" (aria-label), "Back to Evan Baker" | site chrome | Accept. Standard navigation and a11y strings, no claim, on voice |
| "Page not found", "That URL does not exist on this site." | `/404.html` | Accept. Plain, declarative, no claim, no em dash |
| "The 30x bug \| Evan Baker" and the other three page titles | `<title>` | Accept. Pipe separator, no invented text |
| "Evan Baker writes about engineering, AI, probability, and what he learns building companies." | `/writing/` meta description | Third person, inconsistent with everything else. W-15 |

Nothing else on the site is unapproved. There is no invented sentence, no filler paragraph, and no
copy anywhere that I did not write or explicitly account for above.

### Acceptance criterion 2: claims still trace to evidence

The five corrections from round 01 were re-verified **against the rendered HTML**, not against the
Markdown source, and all five survive:

1. **EdgeBet rerun scope.** Renders as "When a prop scores above +30% EV, the engine recomputes the
   fair price... 17/17/66 instead of 32/32/36, then keeps the **lower** of the two EVs", introduced two
   paragraphs earlier by "Every so often a **player prop** would score above +30% expected value."
   Prop-scoped in both places. Matches claim A2-4. The divergence guard renders scoped the same way
   ("gets dropped for that prop entirely"), matching A2-5. **Pass.**
2. **Nucli8 "built, not launched".** Renders in two places: the homepage Selected Work source line
   `Nucli8, built, not launched`, and article one paragraph two, "the product it lived in, Nucli8, is
   built but not launched." Neither is softened. Matches N1 and A1-2. **Pass.**
3. **Demarly two-mechanism description.** The article renders "Two surfaces, two mechanisms", then the
   scheduled-workflow mechanism ("integration write tools are never handed to the agent at all")
   separately from the chat mechanism. The homepage Selected Work entry carries the same split in one
   sentence pair. Matches A3-1 and A3-2. **Pass.**
4. **No frequency claim in the EdgeBet piece.** `grep -c 'almost never'` returns 0. The replacement
   text renders in full, including "EdgeBet has no backtest. I have no measured number for how often a
   30% edge turns out to be a data artifact versus a genuine one." Matches A2-6. **Pass.**
5. **"Not a guarantee" in the Demarly piece.** Renders as "That is a mitigation, not a guarantee...
   It still can. Mine can. Any of them can.", and the scoping paragraph "The send-permission guarantee
   covers integration write actions going through the platform's own tool layer. It says nothing about
   what the model asserts in text." Matches A3-7 and A3-10, both of which round 01 marked mandatory.
   **Pass.**

**Article text is byte-identical to the reviewed drafts.** I diffed each draft against its
`content/articles/` counterpart after stripping exactly the three things the transfer script strips
(the HTML-comment draft note, the H1, the provisional italic meta line). All three bodies came back
identical, block for block: 16, 12 and 19 blocks. No transcription drift, no silent edit.

**Every number rendered on the homepage was inventoried.** There are exactly two: "30x" in an article
excerpt (claim A1, supported) and "32 H100s to 4" (claim P4, closed as approved in P01). Plus the
footer year and the email address. No metric that is not in the claim record reaches the page.

### Acceptance criterion 3: greps for leakage

All run over the full `out/` tree at the 16:45:31 build, not by reading.

| Grep | Result |
|---|---|
| Em dash `U+2014`, en dash `U+2013`, `&mdash;`, `&#8212;`, `&#x2014;` | **0** |
| `DRAFT NOTE`, `STRIP BEFORE`, `TODO`, `FIXME`, `XXX`, `PLACEHOLDER`, `LOREM` | **0** |
| Unresolved `<<TOKEN>>` angle-bracket placeholders | **0** |
| CLAUDE.md banned list plus the academic-polish list (16 terms) | **0** |
| `AI-powered`, `enterprise-grade` | **0** |
| Phone-number and street-address patterns | **0** |
| `GPA`, `HIPAA`, `medical facilit`, `patient` | **0** |
| The `main.md` section 53 verify-list numbers: `400+`, `250K`, `12% accuracy`, `p99`, `200ms`, `requests/sec`, `80% of` | **0** |
| `revenue`, `subscribers`, `downloads`, `uptime`, `ROI`, `SOC2`, `backtested`, `calibrated` | **0** |
| `users` / `conversion` | 4 hits, all inside article two, all benign: "a user misses one bet" and the A/B-test checkout example. No venture metric |
| `LinkedIn` | 1 hit, inside article three's connector list "Gmail, Slack, LinkedIn". Not a profile link. See W-CLAIM-NEW |
| The old article title and old slug (`shouldn't be able to lie`, `agents-that-cant-lie`) | **0** |

No personal background from any private file appears anywhere. The exhaustive unapproved-string
inventory in criterion 1 is the positive form of that check: I did not only grep for known-bad
strings, I enumerated everything the site says and accounted for each line.

### Acceptance criterion 4: the retitled article agrees with itself

| Surface | Value |
|---|---|
| Article H1 | `Draft anything, send nothing` |
| Article `<title>` | `Draft anything, send nothing \| Evan Baker` |
| Homepage link text | `Draft anything, send nothing` |
| Homepage `href` | `/writing/draft-anything-send-nothing/` |
| `/writing/` link text and href | identical to the homepage |
| Route on disk | `out/writing/draft-anything-send-nothing/index.html` |

All six agree. The old slug returns 404, which is correct: it was never published. **Pass.**

### Acceptance criterion 5: no invented publication date

No date string of any form renders anywhere in the export. I checked this structurally as well as by
grep, because absence in one build is weak evidence. Both `WritingList.tsx` and the article page
render the date behind `{article.date ? ... : null}`, so an empty frontmatter `date` produces no
element at all rather than an empty slot, and all three article sources carry `date: ""` with a
comment saying it stays empty until real publication. A date cannot appear until someone supplies a
real one. **Pass.**

### Export and dev agree

Visible text on all five real pages is identical between `http://localhost:3100/` and the on-disk
export. One first-pass difference on `/writing/the-30x-bug/` was a dev-server mid-compile artifact and
did not reproduce on three retries.

## Specific asks this round

**a. The band caption. It does not ship as written.** See W-12 for the full reasoning and the routing.
Short version: it is a second statement of the thesis, placed above the company blocks, and the copy
package and plan both say the thesis appears exactly once, in About. It is also a universal
first-person claim about all of Evan's companies that no context file supports and that only Evan can
make. Voice is not the problem. Duplication and an unsupported universal are.

**b. Category in place of the date: acceptable, and not a claim.** "Engineering", "Data" and "AI" are
topic labels chosen editorially in article frontmatter. They assert nothing about the world, carry no
date format and no year, and cannot be mistaken for a publication date. They are real metadata rather
than something invented to fill a slot, which is the standard the plan actually sets. The three labels
are also accurate to their pieces. **Confirmed, no change.** One standing constraint: if a real date
lands later, the category must not be restyled into anything that reads as publication metadata about
the article's history.

**c. The two mandatory Selected Work source lines: both render in full, neither is buried.** Exact
strings `Nucli8, built, not launched` and the employer source line `..., as part of engineering
teams` are present verbatim. Each sits as the second line of its entry, directly under the h3 and
above the paragraph, at 8px, well above the fold of its own section. `WorkEntry.tsx` makes `source` a
required prop with a comment saying it is load-bearing, so it cannot be dropped by a later edit
without a type error. Rendering is 15px in `--ink-2` (#4d4d4d on white, 8.45:1). The mandatory closing
sentence "These were team-built systems and my contribution was a piece of each, not the whole thing."
also renders in full. **Pass**, with one non-blocking suggestion at W-16.

**d. The "32 H100s to 4" sentence renders exactly as approved.** Verbatim match on the full sentence:
"Document pipelines with confidence scores and human review, distributed inference, and one redesign
that moved semantic search onto CPU with selective model fallback and took the serving footprint from
32 H100s to 4." Not re-routed to Evan. P01 closed it and I am treating it as closed.

## Evidence and checks

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| 45 approved copy blocks render verbatim | scripted substring match against rendered text of `out/index.html` | **42 pass, 3 differ** | Any silent retype during implementation would have shown as a missing block. Three did |
| Every rendered string traces to approved copy or is accounted for | scripted reverse match, all six exported pages, visible text plus `aria-label` | pass, 14 unapproved strings found and all listed | This is the check that catches invented copy. A fabricated sentence anywhere would have appeared in that list |
| Article bodies identical to the reviewed drafts | scripted diff, drafts minus draft note / H1 / meta line vs `content/articles/*.md` | pass, 3 of 3 identical | A single reworded sentence in transfer would have printed as a diff hunk |
| EdgeBet rerun scoped to player props | rendered HTML, `out/writing/distrust-your-best-results/index.html` | pass | A generalized "any bet above 30%" would fail claim A2-4 |
| Divergence guard scoped and named to the rec-book average | same file | pass | |
| No frequency claim in article two | `grep -c 'almost never'` = 0, plus the explicit no-backtest sentence present | pass | The round-01 blocker W-01 would have reappeared |
| "Not a guarantee" present in article three | rendered HTML, both the mitigation sentence and the scoping paragraph | pass | Round-01 blocker W-04. A length edit that cut either would fail |
| Both Demarly mechanisms described separately | rendered HTML, article three and homepage work entry 1 | pass | Round-01 finding W-03 |
| Nucli8 never presented as live | homepage source line + article one paragraph two | pass | |
| Retitle agreement across six surfaces | rendered HTML, hrefs, on-disk route | pass | A stale link text or a mismatched slug would have 404'd or disagreed |
| Old slug does not resolve | `curl` `/writing/agents-that-cant-lie/` | 404, correct | |
| Em dash and en dash absent from the whole export | grep over `out/`, HTML/txt/js/css | pass, 0 | One character anywhere fails a hard rule |
| Draft notes, TODOs, unresolved tokens absent | grep over `out/` | pass, 0 | Round-01 finding W-11 closed mechanically and now confirmed in the artifact |
| Banned words and academic polish absent | case-insensitive grep, 16 terms | pass, 0 | |
| Private / prohibited data absent | grep for phone, address, GPA, compliance regimes, section-53 numbers | pass, 0 | |
| Every rendered number inventoried | scripted extraction of all numeric tokens in homepage visible text | pass, exactly 2 claim-bearing numbers, both in the claim record | An extrapolated metric would have shown up here with its surrounding sentence |
| No invented date, by grep and by construction | grep for date patterns over `out/`; read of the conditional render in `WritingList.tsx` and the article page | pass | Structural check matters more than the grep: the grep only proves this build |
| Dev and export render identical visible text | scripted diff, all five real pages | pass on 5 of 5 | A build-time-only bug would have shown as export-side drift |
| App Store link points at the P01-resolved URL | rendered `href` | pass, `https://apps.apple.com/us/app/edgebet/id6759763418` | A guessed URL would fail |
| LinkedIn row dropped from Contact | rendered contact links: email and GitHub only | pass | |
| External links actually resolve | **not run** | not run | No network fetch of demarly.ai, github.com/evanbaker315, or the App Store listing this round. C05 owns it |
| Any visual rendering, at any viewport | **not run** | not run | No browser opened, no screenshot. Line length, wrapping and the caption's on-screen prominence are unverified. D02 owns it |
| Lighthouse, keyboard pass, 200% zoom, console errors, basePath export | **not run** | not run | C05 |
| The seven backlog drafts | **not run** | not run | Out of scope by the editorial queue. Not a launch requirement |
| Whether Evan approves any of this text | **not run and not obtainable by me** | not run | H01 is open. No agent message, report, or task approval is Evan's approval |

## Findings

| ID | Location / quote / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| W-12 | Homepage band `<figcaption>`: "Every company I build runs this line. What changes is the math in the middle." | Three separate problems. (1) **Duplicate thesis.** The copy package says About is the only place the thesis appears and the plan forbids repeating the same identity claim in a separate section. This caption states the thread-connecting-the-companies claim before the company blocks, and About states it again below. (2) **Unsupported universal.** "Every company I build" quantifies over all of Evan's companies. No context file supports it, and it is a claim about his own method that only he can make. (3) **It misdescribes its own diagram.** The middle of a four-stage line is `model` and `software`; "the math" describes neither Demarly's differentiator (an architectural approval boundary, not math) nor the `software` stage. The final stage `business` also sits awkwardly against the mandatory "Nucli8, built, not launched" two sections down. Voice is fine; the sentence is short, declarative and first person. Voice is not why it fails | **blocker for publication** (not a blocker for the local preview) | It is the one string on the site with no writer review, it sits near the top of the page, and it asserts something broader than anything else on the site while the rest of the copy was deliberately narrowed | coding, to remove. Coordinator, to route the caption question to Evan if design wants one | **Preferred: delete the `<figcaption>`.** The SVG already carries `aria-label="A four stage line: system, model, software, business."`, so nothing accessible is lost, and the band works as a silent structural motif. **If design needs a caption for the layout, it comes from Evan, not from an agent.** Accept when `grep -rc "Every company I build runs this line" out/` returns 0, or when the replacement string is one Evan supplied and the coordinator recorded with a date in `website-plan.md`. A caption I write is not a fix here |
| W-13 | Homepage company decks render "AI and business systems" and "Probability and market data". Approved copy is "AI + business systems" and "Probability + market data" | The design spec's layout example at line 311 spells the deck with "and", and the implementation followed the spec example over the copy block. The spec's actual instruction, at line 319, only rejects the middle-dot construction from `website-plan.md`; it does not ask for "+" to become "and" | suggestion | No claim impact. But "+" is Evan's own construction from plan section 4 and reads as founder shorthand where "and" reads flat, and copy fidelity is the thing this pass exists to protect | coding | Change both `deck` props in `app/page.tsx` to the approved strings. Accept when "AI + business systems" and "Probability + market data" both appear in `out/index.html` |
| W-14 | Footer renders "Evan Baker" / "2026" / "Built with Claude Code" as three flex items with a 24px gap. Approved copy block is "Evan Baker · 2026 · Built with Claude Code" | Coordinator implementation decision 3, documented. Same three facts, same order, no claim change | suggestion | Recorded because criterion 1 requires every difference to be reported, not because it needs fixing. The reasoning (middle-dot metadata strings are a template tell) is sound and consistent with the article meta row | none, accepted as built | **No change requested.** If it is ever revisited, check the three items at 375px: `flex-wrap: wrap` with a bare gap and no separator can read as a run-on if two items land on one line |
| W-15 | `/writing/` meta description: "Evan Baker writes about engineering, AI, probability, and what he learns building companies." | Third person, while the visible intro directly below it says the same thing in first person, and every other line on the site is first person | suggestion | Only surfaces in search results and link previews, but it is the one place the site talks about Evan instead of as him | coding | Set the description to the approved first-person intro: "I write about engineering, AI, probability, and what I learn building companies." Accept when the `<meta name="description">` on `out/writing/index.html` matches the visible intro |
| W-16 | Selected Work source lines render at 15px in `--ink-2` (#4d4d4d), the same treatment as the decorative company decks | Both mandatory lines pass: present, verbatim, in position, 8.45:1. But "Nucli8, built, not launched" and the employer attribution are **disclosures**, not metadata, and they currently carry the visual weight of metadata. A reader skimming headings and body paragraphs can miss them | suggestion | These two lines are the difference between honest credit and borrowed credit, and between an unlaunched product and an implied live one. Their legibility should not depend on a skim pattern | design (D02) | Consider `--ink` rather than `--ink-2`, or a small weight bump, for the `source` line specifically. This is a judgment call for the design pass, not a defect. Accept either way; if unchanged, contrast is already sufficient and the finding closes as "reviewed, no change" |
| W-17 | `/writing/` has no inbound link. The homepage Writing section links to the three articles directly, article pages link back to `/`, and nothing anywhere links to the index | Intentional and documented: the component comment says the page exists so a truncated article URL lands somewhere real. With three articles I agree that is the right v1 call | suggestion | A page with zero inbound links will not be discovered or indexed. Harmless now, wrong once the backlog lands | coding / design, backlog | No change for v1. When the writing list exceeds roughly six items, add an "All writing" link under the homepage Writing section. Accept when `/writing/` has at least one inbound link from `/` |
| W-18 | Band SVG text nodes `system`, `model`, `software`, `business`, and the `aria-label` "A four stage line: system, model, software, business." | Also writer-unreviewed copy, recorded so the W-12 decision covers the whole element rather than just the caption. Reviewed and they pass: four common nouns, no claim, no metric, no identity assertion, and the aria-label is purely descriptive of the shape | suggestion | Recording it is the point. If the caption is cut, the diagram stands alone and asserts nothing, which is the state I am approving | none | **No change.** Confirmed as reviewed copy. If the caption stays in any form, this row reopens with it |

Round-01 findings W-01 through W-06, W-08 and W-11 are all confirmed closed in the rendered artifact,
with the evidence in the table above. W-07 (30x bug attribution) and W-09 ("Nobody's solved injection")
remain open on Evan and are unchanged. W-10 (the stale draft filename `agents-that-cant-lie.md`) is
still open with the coordinator and is now purely cosmetic, since the public slug is correct
everywhere and the private filename never ships.

### Proposed addition to the private claim record

Not made, because this round's write scope is the report only. Routing it to the coordinator:

**A3-18.** Article three renders "The agent needs real tools to be useful, Gmail, Slack, LinkedIn".
I checked this because it names specific third-party integrations and round 01 did not have a row for
it. It is supported: the Demarly context states the problem in almost exactly those words and lists
those connectors among the curated toolkits. Scope `implemented`, status `OK`. Worth a row so nobody
later reads the site's only "LinkedIn" hit as a contact channel, which it is not.

## Ideas and alternatives

- **Rejected: writing a replacement band caption myself.** It would have been the fast fix and it is
  the wrong one. The caption's problem is that it makes a claim about how Evan works across all his
  companies. Substituting a different agent-written sentence keeps the defect and hides it behind
  better phrasing. Cutting it costs nothing, and if design wants words there, the words are Evan's.
- **Rejected: moving the About thesis paragraph up under the band.** It would fill the caption slot
  with approved copy, but it puts the site's one identity claim above any evidence for it, which
  inverts the "show, then let them conclude" rule and leaves About with a hole.
- **Rejected: flagging the category labels as a claim.** They looked like a candidate at first because
  they occupy a slot the copy package reserved for a date. They are not. A topic label is editorial
  metadata about a piece of writing, not an assertion about the world, and treating it as a claim
  would be the kind of over-narrowing that makes a review less useful.
- **Adopted, and worth keeping as a habit:** the reverse string check. Grepping for known-bad strings
  only finds what you already suspect. Enumerating every rendered string and matching it back to an
  approved source is what turned up the caption, the deck change and the third-person meta description
  in one pass, and it is cheap to re-run after any content change. Suggested as a standing check
  before any deploy.
- **Backlog, not a requirement:** once real publication dates exist, the article meta row will carry
  date and category together. `formatDate` does string arithmetic specifically to avoid a UTC-parsing
  off-by-one, per the coordinator's note. Worth one check on the day the first real date lands, since
  that is the first time the function's output is ever visible.

## Proposed decision-log update

**Q2 (a real tradeoff), supporting detail.** A fourth case of choosing the weaker claim, on top of the
three from round 01: the site's only universal statement about how Evan works, the band caption, is
recommended for deletion rather than rewriting. What is given up is the one line that ties the whole
page together visually and rhetorically. What is bought is that no sentence on the site claims
something broader than its evidence, including sentences that are only about Evan himself. The site
now states its thesis once, in About, in the section a reader reaches after seeing the work.

**Q4 (verification), supporting detail.** A check that could actually have failed and did: comparing
rendered strings back to the approved copy package in **both** directions. The forward direction
(are the approved blocks present?) passed 42 of 45 and would have missed the caption entirely, because
the caption is not a modified approved block, it is an addition. Only the reverse direction, listing
every string the site renders and matching each back to a source, surfaced it. A copy review that only
checks whether the approved words are present cannot find words that were never approved.

**Q3, factual candidate note only, for the coordinator's running list.** On 2026-09-10, during the
build, an agent wrote a homepage caption that no writer had reviewed, asserting "Every company I build
runs this line." The agent flagged it as unreviewed rather than letting it pass silently, and the
review that followed recommended cutting it as an unsupported claim and a duplicate of the About
thesis. **Evan writes the final Q3 answer. This is not it, and I am not proposing that it is.**

**Q1 and Q5:** no new decision from this task.

## Handoff

**Acceptance criteria met:**

1. Homepage copy vs approved package: **met.** 42 of 45 blocks verbatim, all three differences
   reported (W-13, W-14).
2. Claims trace to evidence, including all five round-01 corrections: **met**, verified in rendered
   HTML rather than in source.
3. No draft marker, private material, personal background, em dash, or banned word: **met**, by grep
   over the export plus an exhaustive reverse string inventory.
4. Retitled article agrees across H1, homepage link, `/writing/` link and slug: **met**, six surfaces.
5. No invented publication date: **met**, by grep and by the conditional render.
6. Each discrepancy routed to a named owner with a fix and an acceptance check: **met**, seven rows.

**Unmet:**

- One string does not ship as written (W-12). Until it is cut or replaced with copy from Evan, the
  homepage is not publication-ready even if H01 closes.

**H01 remains open.** Nothing in this report is an approval of any article text. The three revisions
awaiting Evan's byline approval are unchanged from round 01 and are, in full as currently rendered:
"The 30x bug", "Distrust your best results", and "Draft anything, send nothing" (retitled; the retitle
itself needs his yes). The article text renders provisionally under the local-preview authorization
only.

**Outstanding personal inputs, unchanged and not re-asked:**

1. Byline approval for the three revisions (H01).
2. The 30x bug attribution: who wrote the original formula, who found it.
3. Whether the band caption should exist at all, and if so what it says (new this round, W-12).
4. Optional: a real product or customer decision anecdote for either company. Still a deliberate gap.
   Nobody should fill it with an invented story.
5. Optional: graduation timing for the bio.
6. Real publication dates, whenever the articles actually publish.

The App Store URL, the LinkedIn decision, the date omission and the "32 H100s to 4" sentence are all
**closed** per the coordinator resolutions block. I did not re-route any of them.

**Next owner and task recommendation:**

- **Coding:** W-12 (delete the `<figcaption>`), W-13 (two deck strings), W-15 (one meta description).
  All three are one-line changes in files coding already owns. Rebuild the export afterward.
- **Design (D02):** W-16 is a judgment call on the Selected Work source line and belongs in the design
  pass. W-17 is backlog. Neither blocks.
- **Coordinator:** route the band caption question to Evan as part of the existing input batch rather
  than as a new ask, add claim row A3-18 to `context/claim-review.md`, and record W-14 as an accepted
  deviation so the copy package and the build stop disagreeing on the footer.

**Checks to rerun after any change:** the em dash grep, the banned-word grep, the draft-note grep, the
reverse string inventory (the one that found W-12), and the dev-vs-export parity diff. Any edit to
article text re-opens the matching rows in `context/claim-review.md` and requires the draft-to-article
diff to be re-run.

**Limitations.** No page was viewed in a browser at any width, so nothing here speaks to line length,
wrapping, visual prominence, or how the band reads on screen. No external link was fetched. No
Lighthouse, keyboard, zoom, console or basePath check was run; those are C05's. The export moved
mid-review and all results were re-run against the 16:45:31 build, but a later rebuild invalidates
them. Simulated review is not Evan's approval, and no approval was received during this task.
