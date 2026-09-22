# W01 + W02: homepage copy package and three launch article corrections

- Role / assignee / run: writer / writer agent / run 01
- Date: 2026-09-10
- Status: complete (both tasks), with named inputs still owed by Evan
- Scope: preparation (copy and editorial), under the 2026-09-10 local-build authorization
- Candidate revision and URL, if applicable: none. No site code exists yet and nothing is deployed.
- Inputs actually inspected: CLAUDE.md, AGENT-WORKFLOW.md, website-plan.md (sections 1-9),
  todo.md rows W01/W02/H01/C04/W03, reports/TEMPLATE.md, and the private brand, voice, content
  brief, and four venture context files (their claim-safety and evidence sections in particular).
- Assigned write scope: context/homepage-copy.md, context/claim-review.md,
  writing/the-30x-bug.md, writing/distrust-your-best-results.md,
  writing/agents-that-cant-lie.md, reports/W01-W02-writer-01.md
- Files changed:
  - `context/homepage-copy.md` (new, private/ignored)
  - `context/claim-review.md` (new, private/ignored)
  - `writing/the-30x-bug.md` (rewritten, private/ignored)
  - `writing/distrust-your-best-results.md` (rewritten, private/ignored)
  - `writing/agents-that-cant-lie.md` (rewritten and retitled, private/ignored)
  - `reports/W01-W02-writer-01.md` (this file, public)

No shared file was touched. todo.md, website-plan.md, and DECISIONS.md were read only.

## Work and result

### W01, homepage copy

`context/homepage-copy.md` is a complete drop-in copy package for the compact homepage. It is
organized as labeled blocks so the coding agent can move each one into a component without
re-deciding anything. Rendered copy totals about 719 words across hero, two company entries,
four Selected Work entries, three writing links, About, contact, and footer, with a per-section
word count table for the design pass.

Structural decisions worth naming:

- The thesis appears exactly once, in About. The optional connective sentence between the two
  company entries was deliberately not used, because About already makes that connection and the
  plan warns against repeating the same identity claim.
- Each company entry carries a labeled technical point and a labeled commercial point. Both
  commercial points describe real product structure with a stated constraint, choice, and
  consequence. Neither invents a customer, a conversation, or a piece of feedback.
- Selected Work entry 4 (professional experience) states attribution twice: once in the source
  line and once in a closing sentence saying these were team-built systems and the contribution
  was a piece of each. Both are marked mandatory in the copy file so a later length edit does not
  quietly remove them.
- The Nucli8 entry carries a mandatory "built, not launched" status line.

Four link and date values are left as explicit unresolved tokens rather than guesses.

### W02, three launch articles

All three drafts were rewritten in place against the editorial queue. Private draft notes were
added at the top of each file inside HTML comments recording what changed and why. **Those notes
must be stripped when the text is transferred to `content/articles/`.** They are listed by file
in the handoff section below.

**The 30x bug.** The pre-launch, pre-billing fact now sits in the second paragraph instead of
two thirds of the way down, alongside a statement that the product is built but not launched.
The dimensional explanation was tightened and one thing was added that the draft was missing:
why the factor is specifically about 30. It is the number of days summed over, which follows
from sum equalling average times day count. That is a stated assumption rather than a magic
number. One unsupported characterization of the other audit findings was replaced with a
specific supported one.

**Distrust your best results.** The draft's strongest sentence was also its least supported one:
an assertion about how often a large apparent edge is a data error. There is no backtest and no
calibration data behind it. It is now written as the prior the system encodes, and the article
says out loud that there is no measured number. The argument that replaces it is an asymmetry
argument about which error is more expensive, which does not require a frequency estimate. The
implemented rules are described precisely and scoped correctly: the conservative rerun is a
player-prop rule above a 30% EV threshold, not a rule on every market, which the original draft
implied. The broader organizational generalization is now explicitly marked as the author's
experience rather than a law.

**Draft anything, send nothing** (retitled). This needed the most work and got it. The old title
claimed a truthfulness property the architecture does not deliver. Three substantive changes:
the mechanism description was scoped correctly (scheduled runs and the chat surface use two
different mechanisms, and the draft described only one of them as though it were universal); the
anti-false-completion mechanism is now labeled a mitigation rather than a guarantee, with a plain
statement that the model can still produce a false claim; and a new closing section states where
the guarantee stops, including that the prompt-injection handling raises the bar rather than
solving the problem. The claim that survives is narrower and true: a false claim cannot correspond
to a real action, because sending is not in the model's capability set.

New title: **Draft anything, send nothing**. Proposed public slug: **`draft-anything-send-nothing`**.
The private draft filename is still `agents-that-cant-lie.md` and is now stale; I did not rename
it, because renaming needs a coordinated path and link update the coordinator owns.

### Claim record

`context/claim-review.md` maps every material public claim across the homepage and all three
articles to its evidence, with scope (implemented / live-confirmed / planned / unverified) and
status. It covers 71 numbered claims plus a set of standing build-time prohibitions for coding
and design. It stays private and gitignored, and contains no personal background.

## Evidence and checks

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| Every venture claim traced to a named context section or a dated confirmation | context/claim-review.md, 71 rows | pass | A claim with no traceable source would have been marked unverified and cut. Six were |
| No em dash in any produced file | `grep -c` for the character across all five content files | pass (0 in each) | A single occurrence anywhere would fail the hard rule |
| No banned word in any produced file | case-insensitive grep for the CLAUDE.md banned list plus the academic-polish list | pass | The only hit is the literal prohibition text inside a builder note, not copy |
| No invented metric | manual read of every number in the copy and articles against the venture metric tables | pass | Any number not appearing in a context evidence table would fail. The homepage carries exactly one professional number and it is flagged for Evan |
| Nucli8 never presented as live | homepage Selected Work entry 3 and article 1 paragraph 2 | pass | The label is marked mandatory in both places |
| Nucli8 never called AI-powered | grep | pass | |
| EdgeBet never framed as picks or implying profit | manual read of the company entry, Selected Work entry 2, and article 2 | pass | The commercial line asserts the opposite on purpose |
| Planned features excluded | cross-check against each context file's planned/feature-flagged lists | pass | Named exclusions are recorded in claim-review section 6 |
| Personal background excluded from every produced file | manual read | pass | Applies to the private files too, not just public ones |
| EdgeBet consensus weights and thresholds verified against the backend evidence | article 2 numbers vs the backend context weighting table and guard descriptions | pass, with two corrections applied | The original draft's rule scope was wrong. See findings W-02 |
| Nucli8 30x arithmetic | sum equals average times day count, so the error factor is the day count | pass | Self-checkable arithmetic. Consistent with the ~30x recorded in the context |
| Demarly approval mechanism scope | article 3 vs the context's tool-authorization description | pass, with correction applied | The draft generalized the chat-surface mechanism to all surfaces. See findings W-03 |
| LinkedIn URL | searched every context file | not found | Recorded as a gap for Evan rather than guessed |
| EdgeBet App Store listing URL | searched every context file | not found | Presence is confirmed; the URL is not in the context |
| demarly.ai and github.com/evanbaker315 reachable | not run | not run | No network check was performed. Coding should open both during the build check |
| Rendered page output | not run | not run | No site code exists yet. Copy has not been seen rendered, at any width |

## Findings (reviews or discovered defects)

| ID | Location / quote / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| W-01 | `writing/distrust-your-best-results.md`, original claim that a large edge "almost never" means the market is wrong | Unmeasured frequency claim. No backtest or calibration data exists | blocker | It is the article's central assertion and it was unsupported | writer (done) | Rewritten as an encoded prior with the absence of measurement stated in the text. Accept when the published text contains no frequency claim |
| W-02 | Same file, the conservative rerun and divergence rules | Draft implied both applied to every bet. They are player-prop rules, and the rerun weights were described loosely | important | Overstates the reach of the safeguard | writer (done) | Scoped to player props with exact weights. Accept by comparing the published numbers to the backend evidence |
| W-03 | `writing/agents-that-cant-lie.md`, "every integration write-tool gets rebuilt at runtime" | True of the chat surface only. Scheduled workflows drop write tools entirely | important | A mechanism claim that is wrong about half the system | writer (done) | Both mechanisms now described separately. Accept when the published text names both |
| W-04 | Same file, "the model can't learn to imitate success claims, because it has never once seen itself make one" | A mitigation presented as a guarantee. System-labeled confirmations are not evidence a model cannot lie | blocker | This is the exact overclaim the editorial queue flagged, and it is the article's premise | writer (done) | Labeled a mitigation, with the residual risk stated and the guarantee scoped to the execution path. Accept when the published text contains an explicit "not a guarantee" statement |
| W-05 | Same file, title "Your AI agents shouldn't be able to lie to you" | The title claims more than the architecture delivers | important | A reader who only sees the title takes away the overclaim | writer (done) | Retitled "Draft anything, send nothing", slug `draft-anything-send-nothing`. Accept when homepage link, route, and article H1 all agree |
| W-06 | `writing/the-30x-bug.md`, pre-launch discovery appeared late | The draft led with "wrong invoices" before disclosing nothing was billed | important | Reads as a story about billing customers incorrectly, which did not happen | writer (done) | Moved to paragraph two. Accept by reading the first 80 words |
| W-07 | `writing/the-30x-bug.md`, personal attribution | Evidence supports that an audit found the bug, not who wrote it or found it | blocker for publication | A byline piece should not misstate who did what | Evan | Confirm both halves. Draft note in the file. Accept on a dated yes |
| W-08 | Selected Work entry 4, facility and patient counts offered by the plan | These are named in the private context's verify-before-publication list and attach large operational numbers to named employers | important | Highest disclosure risk available, and the entry works without them | writer (done, needs Evan on the remaining number) | Both counts cut. The one remaining professional number is flagged for a yes/no from Evan |
| W-09 | `writing/agents-that-cant-lie.md`, "Nobody's solved injection" | A general claim about the field with no source cited | suggestion | It is an unsourced generalization, though it argues against the product's own safety rather than for it | Evan | Keep or cut, Evan's call. Noted as claim A3-12 |
| W-10 | Draft article filename `agents-that-cant-lie.md` no longer matches its title or slug | Stale private filename | suggestion | Only a confusion risk during handoff, since the file is ignored | coordinator | Decide whether to rename. If renamed, update this report's references and the copy file's builder note |
| W-11 | HTML-comment draft notes now exist at the top of all three drafts | They are private editorial notes, not article content | important | If transferred verbatim they would ship inside the public article source | coding | Strip everything between `<!-- DRAFT NOTE` and the closing `-->` in each of the three files during C04. Accept by grepping `content/articles/*.md` and the exported HTML for "DRAFT NOTE" and finding nothing |

## Ideas and alternatives

- **Alternative considered for article 3's title:** keeping a "lying" framing and just adding
  caveats. Rejected. The title is the part most readers repeat, and caveats in paragraph nine do
  not fix an overclaim in the headline. "Draft anything, send nothing" also happens to be the
  actual architectural property, which makes it both punchier and more accurate.
- **Alternative considered for article 2:** dropping the generalization section entirely and
  keeping it purely as an EdgeBet engineering note. Rejected, because the brief requires each
  piece to be useful to someone who will never use the product. Instead the generalizations were
  demoted from assertions to prompts to check.
- **Deliberately not done:** the seven backlog drafts. No expansion happened.
- **Optional, backlog:** the honest-limits section at the end of article 3 could become its own
  short backlog piece on scoping oversight to risk rather than applying it everywhere. That
  overlaps a backlog idea already listed in the plan. Not a launch requirement.
- **Optional, design:** the copy file suggests cutting Selected Work entries from the bottom if
  the page runs long, never the company blocks. Entry 4 is the one that can lose its middle
  sentence without losing anything load-bearing.
- **Suggestion for the coordinator:** the plan's Selected Work entry 4 currently names the
  facility and patient counts as intended homepage content. The copy drops them for disclosure
  reasons. If the coordinator agrees, the plan line should be updated so the two documents do not
  disagree.

## Proposed decision-log update

**Q1 (what the site is and who it is for), supporting detail.** The homepage leads with product
usefulness before architecture for both companies: who it serves and what they can do, then
Evan's role, then one technical point and one commercial point. The alternative was leading with
system architecture and scale, which reads impressively to engineers and tells an investor
nothing about whether the thing is useful. What was given up: the most quantitatively impressive
material (code size, endpoint counts, agent counts) is not on the homepage at all.

**Q2 (a real tradeoff), candidate.** Three separate cases where a stronger claim was available
and a weaker one was published instead: an unmeasured frequency claim in the EdgeBet piece
replaced with an asymmetry argument, an absolute truthfulness framing in the Demarly piece
replaced with a scoped send-permission guarantee, and two large employer-linked operational
numbers dropped from Selected Work. Cost: the copy is less immediately impressive. Benefit: every
sentence survives someone checking it.

**Q4 (verification), supporting detail.** A check that could actually have failed and did: the
EdgeBet article's described safeguard did not match the implemented rule's scope. The draft said
the conservative rerun applied to bets scoring above 30% EV generally. The evidence shows it is a
player-prop rule with specific weights. Reading the draft against the source caught it. A voice
review alone would not have, because the sentence sounded fine.

**Q5**, no new decision from this task.

**Q3**, factual candidate note only, for the coordinator to add to the running list, not an answer:
on 2026-09-10 the agent-drafted article "Your AI agents shouldn't be able to lie to you" asserted
that a system-labeled-confirmation mechanism made it impossible for the model to claim false
completions. Evan's own review instruction had already flagged that an approval gate restricts
execution and does not prove a model cannot lie. The article was retitled and the guarantee
rescoped to the execution path. **Evan writes the final Q3 answer. Nothing here is it.**

## Handoff

**Acceptance criteria met:**

- W01: product usefulness leads both company entries; Evan's role is stated in each; one
  supported commercial decision per company with constraint, choice, and consequence; the thesis
  and current status appear once each and are not duplicated in a separate section; every claim
  source is recorded in the claim file. Compact, about 719 rendered words.
- W02: all three editorial-queue items addressed; unsupported absolutes narrowed or cut; claim and
  voice checks recorded separately; no expansion into the backlog.

**Unmet / pending:**

- H01 byline approval is open and stays open. Approval of the plan, of this report, or of the
  role setup is not approval of article text. Nothing here should be recorded as approved.
- Six inputs are owed by Evan (list below).

**The exact article revisions awaiting Evan's byline approval** (all three, in full, as currently
written in the private drafts):

1. `writing/the-30x-bug.md`, title "The 30x bug". Additionally blocked on the personal
   attribution question in its draft note.
2. `writing/distrust-your-best-results.md`, title "Distrust your best results".
3. `writing/agents-that-cant-lie.md`, **retitled** "Draft anything, send nothing", proposed slug
   `draft-anything-send-nothing`. The retitle itself needs Evan's yes, since the homepage link,
   the route, and the article heading all depend on it.

**Outstanding personal inputs for Evan:**

1. Byline approval for each of the three revisions above.
2. The 30x bug attribution: who wrote the original formula, and who found it in the audit.
3. The EdgeBet App Store listing URL.
4. The LinkedIn profile URL, or a decision to drop the row. It is not in any context file and I
   will not guess one.
5. Real publication dates for the three articles.
6. Yes or no on publishing the one professional infrastructure number attached to named employers.
7. Optional, no blocker: a real product or customer decision anecdote for either company, and
   graduation timing for the bio. Both slots are marked as deliberate gaps. Do not let anyone
   fill them with an invented story.

**Next owner and task recommendation:**

- **Coordinator:** record the retitle and slug, the plan/copy disagreement noted under Ideas, and
  the Q3 candidate note. Route the six inputs to Evan as one batch rather than one at a time, and
  do not re-ask anything already confirmed on 2026-09-10 (email, live statuses, palette, resume
  metrics in general, three-article scope).
- **Coding (C03/C04):** implement from `context/homepage-copy.md` blocks. Under the local-preview
  authorization the article text may render provisionally; leave H01 unchecked. Strip the
  `<!-- DRAFT NOTE ... -->` blocks from all three files during transfer. Do not resolve the four
  unresolved tokens by guessing.
- **Design (D01):** the section word counts table is the real content budget. Two company blocks
  at roughly 100 words each, four work entries at 48 to 64 words, About at 122.
- **Writer (W03):** after C03/C04, compare rendered pages to these blocks, confirm no draft note
  or private material leaked, and confirm the retitled article's heading, homepage link text, and
  route slug all agree.

**Checks to rerun after any change:** the em dash grep, the banned-word grep, and the draft-note
grep against both `content/articles/*.md` and the exported HTML. Any edit to article claims
re-opens the corresponding rows in `context/claim-review.md`.

**Limitations:** no network check was run against any external link. No page has been rendered or
read at any viewport. Simulated review is not Evan's approval, and no approval was received during
this task.
