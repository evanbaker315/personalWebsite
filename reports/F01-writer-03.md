# F01: design-06 heading-semantics correction in the Demarly article

- Role / assignee / run: **writer / writer agent / run 03**
- Date: 2026-09-10
- Status: **complete**
- Scope: bounded copy-source correction. Local build only, under the 2026-09-10 local-preview
  authorization. Nothing deployed, pushed, or committed by this task.
- Candidate revision and URL, if applicable: source edit at 17:04:29. The static export at
  `out/` was rebuilt by coding at 17:04:34 and already contains this change. Preview at
  `http://localhost:4321/`, article at `/writing/draft-anything-send-nothing/`.
- Inputs actually inspected: `reports/D02-design-02.md` (finding design-06 and design-08),
  `reports/W03-writer-02.md`, `reports/TEMPLATE.md`, `writing/agents-that-cant-lie.md`,
  `content/articles/draft-anything-send-nothing.md`, the other two draft/article pairs (for the
  identity check only), `out/writing/draft-anything-send-nothing/index.html`, and the four
  `title` props in `app/page.tsx` (read only, for the design-08 proposal).
- Assigned write scope: `writing/agents-that-cant-lie.md`,
  `content/articles/draft-anything-send-nothing.md`, `reports/F01-writer-03.md`.
- Files changed: those three. No file in `app/`, `components/`, `lib/`, no other article, no
  context file, no shared file.

## Work and result

### The fix

Four lines changed from `**...**` to `## ...` in **both** files. No CSS was touched and none is
needed. `.prose h2` already carries the correct treatment.

The change was applied by a script that holds the four strings in one shared list, asserts each
occurs **exactly once** in each file, and rewrites it as `"## " + old[2:-2]`. That is a pure
marker substitution: it cannot alter a single interior character, and it cannot apply to one file
and not the other. The identical-change requirement is enforced structurally rather than by me
retyping the strings twice.

### Ruling on the four heading strings: all four ship verbatim

Design asked me to read them as 28px serif headings and decide, and explicitly did not request a
rewrite. **I am not changing a word.** Reasoning, per string:

1. `1) The agents can't send. Not "shouldn't." Can't.` (46 characters, three sentences) is the one
   that could have justified a cut, and it survives. Read as a heading it still names its section
   in the first four words, and the two fragments after it are the article's best line and the
   reason the piece exists. Shortening to `1) The agents can't send` would buy roughly 22
   characters and delete the argument's whole rhetorical turn, which is exactly the "do not change
   the argument" boundary the task set. Read aloud it works: a screen-reader user navigating by
   heading hears a complete claim rather than a label. It is within design's stated acceptance
   ceiling (see the limitation on 375px wrap below).
2. `2) Unknown tools are guilty by default.` Single declarative sentence, already heading-shaped.
   No change.
3. `3) The part people want to be stronger than it is.` Reads as a heading better than it read as
   a bold line, because a heading is allowed to withhold and a bold sentence is not. No change.
4. `Where the guarantee stops.` Already a section label. No change.

### Ruling on the `1)` `2)` `3)` numbering: keep it, and keep the fourth unnumbered

This was the closer call. The case for dropping the numbers is that they were doing the structural
work when these were bold paragraphs with identical spacing above and below, and now 64px of space
above each h2 does that work instead, so the numbers are arguably redundant.

I am keeping them, for three reasons that are about the argument rather than the styling:

- **The intro promises a list.** "Here's what that turned into, and here's exactly how far it
  goes" sets up two parts. The numbers deliver the first part and the *absence* of a number on the
  fourth heading is the signal that the list ended and the scope caveat began. That is a real
  distinction in the piece: three are mechanisms, the fourth is the boundary. Numbering all four
  would flatten it, and dropping all four would erase the seam.
- **Headings 1 and 3 lean on the number for their referent.** "The part people want to be stronger
  than it is" without a `3)` is floaty: part of what? The number supplies the antecedent.
- **Numbered lists are Evan's own pattern**, named as such in CLAUDE.md's voice section. Removing
  them sands the copy toward neutral, which is the direction the voice rules explicitly forbid.

Against: the mixed set (three numbered, one not) is a small asymmetry a reader could read as an
oversight rather than as a signal. I judged that acceptable because the fourth heading's wording
announces the shift on its own.

### One thing worth the coordinator's attention: the export moved under me again

Same failure mode W03 recorded. I initially treated the `out/` build as a pre-edit baseline and
started to conclude from it that the four `<h2>` elements already existed before I touched
anything. They did not. `out/` is timestamped **17:04:34**, five seconds **after** my source edit
at **17:04:29**, so coding rebuilt on top of my change while I was verifying. I caught it on the
mtimes and threw that check out rather than reporting a conclusion drawn from a build of my own
edit. Recording it because it is the second round in a row where a parallel rebuild nearly
produced a wrong result in a report, and the fix is cheap: builders should note the build
timestamp they are reasoning against.

## Evidence and checks

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| Byte-identity between draft and tracked article, **all three pairs**, re-verified after the edit with the W03 strip method (draft-note comment block, H1, provisional italic meta line; frontmatter on the article side) | scripted normalize-and-hash of both sides, `/tmp/f01_identity.py` | **pass, 3 of 3 identical.** `agents-that-cant-lie` 19 vs 19 blocks, sha `f09ba877bf40` both sides | This is the check the task exists to protect. Applying `## ` to one file and not the other, or retyping a string with one different apostrophe, would have printed the first differing block |
| The same identity check **before** the edit, as a baseline | same script, run pre-edit | **pass, 3 of 3.** `agents` pair hashed `63e62ee8f80f` both sides | Establishes that the post-edit match is the property surviving, not a script that always says yes |
| The two untouched pairs did not move | pre- and post-edit hashes `785167bbcff5` and `d7c01dd47e46`, unchanged; mtimes 16:04 / 16:35, both well before 17:04:29 | pass | A stray global substitution would have changed these hashes |
| The four heading strings are unchanged from the pre-edit text, verified against an **independent** baseline | each of the four `## ` inner strings tested as a verbatim substring of `reports/D02-design-02.md`, which another agent wrote from the pre-edit file | **pass, 4 of 4 found** | This is the real no-words-changed proof. A self-supplied baseline would have been circular; D02's quotes were recorded before I opened the file |
| Exactly four `## ` lines in the article, and the same four in the draft | `grep -c '^## '` = 4 in each, contents listed and equal | pass | A missed line would show as 3 |
| No standalone bold line remains in either file | `grep -cE '^\*\*.*\*\*$'` = 0 in both | pass | A fifth bold pseudo-heading elsewhere in the piece would have surfaced here |
| No em dash or en dash introduced | grep `U+2014` and `U+2013` over both files, and over the whole rebuilt `out/` tree | pass, 0 and 0 | One character fails a hard rule |
| No draft note, strip marker, or stale slug reintroduced into the public source or the export | `grep -ciE 'DRAFT NOTE\|STRIP BEFORE\|TODO\|FIXME\|PLACEHOLDER\|<!--'` = 0 on the article; same terms plus `agents-that-cant-lie` over `out/` = 0 files | pass | The draft note lives in the private file and must never cross; the transfer strip is the only thing keeping it out |
| Rendered outline is h1 then four h2 with no level skipped | `grep -o '<h[1-6]'` on `out/writing/draft-anything-send-nothing/index.html` returns `h1, h2, h2, h2, h2` | pass | This is design-06's first acceptance condition. Note the build is coding's, not mine |
| Heading text renders with straight quotes, not silently smart-quoted | rendered `<h2>1) The agents can&#39;t send. Not &quot;shouldn&#39;t.&quot; Can&#39;t.</h2>` | pass | A typographic-quote transform in the markdown pipeline would have changed characters the identity check cannot see, because it compares source to source |
| Article prose word stream matches the rendered article | 670 words, source vs export, markers stripped | pass, identical | **Weakened, and reported as such:** the export was built *from* my edited source, so this confirms source-to-render fidelity only. It is not independent evidence about the edit |
| Computed h2 `font-size` 28px at 1440, 64px above / 16px below, no h2 wrapping past two lines at 375px | **not run** | not run | Design-06's measured acceptance conditions. No browser was opened and nothing was measured at any viewport. **Design and coding own these**, and heading 1 at 46 characters is the one to check at 375px |
| Whether `1)` at the start of an h2 collides with any heading-anchor or slug generation | **not run** | not run | `app/writing/[slug]/` is coding's. If anchors are generated later, a heading starting with a digit and a paren is worth one look |
| Claim review of the article body | **not re-run, deliberately** | not run | No word changed, so every row in the private claim record for this piece stands exactly as W03 left it. Re-running would have been theater |
| Whether Evan approves this text | **not run and not obtainable by me** | not run | H01 is open and this task did not touch it |

## Findings (reviews or discovered defects)

| ID | Location / quote / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| W-19 | Homepage `#work`, `app/page.tsx` line 96: `title="A fair-price engine for betting markets"` (design-08) | **Copy proposal, not a defect.** The other three Selected Work titles are "Approval architecture for AI agents", "Cloud commitments as an optimization problem", "Production AI infrastructure". Three of four take no leading article. This one does, and it is also the only heading design measured inside 5px of its column at 375 | suggestion | Two things at once: it removes the leading article that breaks the section's parallelism, and it takes two characters off the string design measured at 0.8px of slack. It is worth doing on copy grounds even if coding's font-fallback check comes back clean | coding (I did not edit `app/page.tsx`) | Change to **`Fair-price engine for betting markets`**. No claim changes: same product, same audience, same words minus the article. Accept when the string appears in `out/index.html` and the four work titles read as a parallel set. **This does not replace coding's design-08 check.** A size-adjusted fallback is the actual fix for reflow-on-swap; two characters only widens the margin |
| W-20 | `out/` timestamped 17:04:34, five seconds after this task's source edit at 17:04:29 | **Observation, from mtimes.** Coding rebuilt during this task. Any conclusion drawn from that export about the pre-edit state is invalid, and I discarded one of mine on those grounds | suggestion | Second consecutive round where a parallel rebuild moved the artifact mid-verification. W03 hit the same thing at 16:45:31. It has not caused a wrong report yet, but only because both rounds happened to catch it | coordinator | No code change. When two agents are live, have the rebuilding agent state the build timestamp in its handoff, and have reviewers record the timestamp they measured against. Accept when the next parallel round's reports each name a build time |

No other findings in the inspected scope. Everything W03 cleared is untouched and was not re-reviewed,
per the task instruction.

## Ideas and alternatives

- **Rejected: shortening heading 1 to `1) The agents can't send`.** It is the obvious cut and it is
  wrong. "Not 'shouldn't.' Can't." is the sentence the whole article is arguing for, and moving it
  into the body under a flatter heading would make the heading a label and the section a
  restatement. Design said shortening was a copy call; the copy call is no.
- **Rejected: numbering all four headings.** It would produce a tidy 1-2-3-4 set and destroy the
  distinction between three mechanisms and one scope boundary. The piece is careful about exactly
  that boundary, so flattening it in the outline would work against the article's own argument.
- **Rejected: dropping the numbers entirely.** Covered above. Cleaner-looking, worse-reading.
- **Rejected: adding a fifth heading over the closing two-sentence paragraph** ("Prompts are
  requests. Architecture is the rule."). It would have exercised more of the heading vocabulary,
  which is a design want, not a reader want. A conclusion that short does not need a sign over it,
  and inventing structure to fill out a stylesheet is how copy gets padded.
- **Noted for whoever picks up the other two articles:** they still render zero `<h2>`, because
  neither draft has section breaks in its source. That is a property of those pieces, not a
  defect, and I am **not** proposing headings be added to them. If the backlog drafts ever land,
  the `.prose h2` treatment is now exercised and known good.
- **Backlog, not a requirement:** `code`, `pre`, `blockquote`, `hr` and `ul` are still unexercised
  across all three articles, which D02 recorded as an unverifiable-by-inspection limitation. The
  30x-bug piece is the natural candidate for a real code or formula block if it is ever revised.
  Not a launch requirement and not worth opening now with H01 still pending.

## Proposed decision-log update

**Q4 (verification), candidate.** A check that could have failed and that a weaker version would
have missed. Confirming this edit needed a baseline for "the words did not change," and the
obvious baseline, the built export, was **five seconds too new**: coding rebuilt on top of the
edit while I was checking it, so comparing source to export would have compared my change against
a render of my change and returned a confident pass that proved nothing. The check that actually
holds is comparing the four heading strings against how another agent quoted them in
`reports/D02-design-02.md`, written before the file was touched. The general lesson is that a
baseline has to predate the change, and in a parallel build an artifact's timestamp is the only
thing that tells you whether it does.

**Q2 (a real tradeoff), supporting detail.** The heading fix was a semantics change, not a copy
change, and it was kept that way on purpose: four markdown markers changed and zero words did.
What was given up is the chance to tighten a 46-character heading while the file was already open.
What was bought is that the article Evan has not yet approved is still, word for word, the article
W03 reviewed, so his byline decision is not quietly re-scoped by an accessibility fix.

**No new Q3 note from this round.** Nothing here involved Evan rejecting or correcting an agent.
The W-12 caption ruling that is now with the coordinator is W03's note, not a new one.

**Q1 and Q5:** no new decision.

## Handoff

**Acceptance criteria met:**

1. Four `**...**` lines changed to `## ...`: **met**, four in each file, listed and verified.
2. The identical change in both files: **met**, and enforced by a shared-list script rather than by
   retyping.
3. Byte-identity between the private draft and the tracked article re-verified: **met**, 3 of 3
   pairs identical, `agents` pair at sha `f09ba877bf40` on both sides.
4. No em dash introduced, no draft note reintroduced, no words changed: **met**, the last of these
   against an independent pre-edit baseline.
5. A ruling on the four heading strings and the numbering: **met**, above, with reasons.
6. No CSS change: **met**, no file outside my write scope was opened for editing.

**Blocker or missing input:** none for this task.

**H01 is unchanged and untouched.** The three revisions awaiting Evan's byline approval are still
"The 30x bug", "Distrust your best results", and "Draft anything, send nothing". This task changed
formatting semantics in the third and no text in any of them, so nothing here alters what he would
be approving. Article text continues to render provisionally under the local-preview
authorization. No approval was received or implied during this task.

**Outstanding personal inputs, unchanged and not re-asked:** the six items listed in W03's handoff
still stand, including the band-caption question the coordinator has already routed to Evan. I am
adding nothing to that list.

**Next owner and task recommendation:**

- **Coding:** rebuild and run design-06's measured acceptance checks (h2 at 28px at 1440, 64px
  above and 16px below, no h2 past two lines at 375px, heading 1 is the one to watch). Optionally
  apply W-19, the one-word-shorter work title, alongside the design-08 fallback check that coding
  already owns.
- **Design:** re-inspect the article visually once coding rebuilds, as D02's handoff already
  planned.
- **Coordinator:** W-20 is a process note, not a task.

**Checks to rerun after a change:** if any word of this article moves again, re-run the
draft-to-article identity check (`/tmp/f01_identity.py`, or the W03 equivalent), the em dash grep,
the draft-note grep, and the reverse string inventory from W03. Any edit to article *text*, as
opposed to markers, also reopens the matching rows in the private claim record.

**Limitations.** No browser was opened and nothing was measured at any viewport, so heading size,
spacing, and the 375px wrap of heading 1 are unverified by me. No Lighthouse or screen-reader pass
was run. The rebuilt export I inspected was produced by coding during this task and is not an
independent artifact. Simulated review is not Evan's approval.
