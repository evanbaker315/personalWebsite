# F01b: ownership context, Demarly status, and a thesis draft

- Role / assignee / run: writer / F01b / run 04
- Date: 2026-09-10
- Status: complete (copy pass done; one item is a draft for Evan and does not ship)
- Scope: preparation
- Candidate revision and URL, if applicable: local build only. `npm run build` re-run after the edits, 8 routes generated, no deploy, no push, no commit. H01 byline approval still open, so nothing here is publishable.
- Inputs actually inspected: `reports/review-disposition.md`, `reports/R01-investor-01.md`, `reports/R02-boss-01.md`, `reports/R04-classmate-01.md`, `CLAUDE.md`, `website-plan.md` sections 1 to 3, `context/main.md` sections 46 and 51 to 52, `context/voice.md`, `context/nucli8-context.md` sections 26 to 28, `context/demarly-context.md` sections 6, 7 and 12, `context/homepage-copy.md`, `context/claim-review.md`, all three articles in `writing/` and `content/articles/`, `app/page.tsx`, `components/CompanyEntry.tsx`, `components/About.tsx`, `components/MethodLine.tsx`, `components/ArticleShell.tsx`, and the built `out/` HTML.
- Assigned write scope: `writing/*.md`, `content/articles/*.md`, `context/homepage-copy.md`, `context/claim-review.md`, `reports/F01b-writer-04.md`
- Files changed: `writing/distrust-your-best-results.md`, `content/articles/distrust-your-best-results.md`, `writing/the-30x-bug.md`, `content/articles/the-30x-bug.md`, `context/homepage-copy.md`, `context/claim-review.md`, `reports/F01b-writer-04.md`. No file under `app/`, `components/`, `lib/`, no board, no plan, no decision record, no other agent's report.

## Work and result

Treated as one problem, the way the disposition framed it: **a page that travels alone has to say whose systems it is describing.** Two article pages and one homepage entry failed that in the same way, so they got the same fix in the same register.

### 1. R02-05, EdgeBet ownership in "Distrust your best results" (changed)

The article publishes three consensus weight vectors, a +30% EV trigger and a 25 point divergence filter for a named product, and never said the product was Evan's. The closest it came was "the prior I built the system around", eight paragraphs of parameters later. A reader arriving from search read a plausible "engineer publishes his employer's model internals".

Exact change, one apposition in the second paragraph, which is the first paragraph that names anything:

- Was: `EdgeBet scores thousands of betting markets against a fair price.`
- Now: `EdgeBet, my iOS app, scores thousands of betting markets against a fair price.`

Claim evidence: this is the R02 reviewer's own suggested wording, and both halves are already supported homepage claims. "An iOS app" is claim E1 (`edgebet-mobile` section 12), "mine" is claim E4, "I built the mobile app and the backend" (both context files describe solo builds of their halves). No new evidence was needed and no new approval is implied. Recorded as claim row A2-14.

One scope note I want on the record rather than buried: EdgeBet's scoring runs in the backend, not in the iOS client. "My iOS app" names the product, which is what the sentence already treated as the subject ("EdgeBet scores..."), so it does not relocate the pipeline into the client. If anyone later tightens this to "my app's backend", that is also true and also fine.

### 2. The same check applied to the other two articles, as asked

**"The 30x bug" had the identical gap, and I think it is the more serious of the two.** R02 listed this article as already clear, on the strength of "the product it lived in, Nucli8, is built but not launched". That sentence is a status, not an owner, which is exactly R04-02's complaint about the homepage label. So the reviewer found the defect on the homepage and missed the same string in the article.

It matters more here because of what the article publishes: a billing formula, the dimensional bug in it, and a pre-launch audit that found ten launch-blocking defects including an impossible-in-AWS conversion design. Read without an owner, that is a person publishing someone else's launch blockers. Changed:

- Was: `And the product it lived in, Nucli8, is built but not launched.`
- Now: `And the product it lived in, Nucli8, is mine, built but not launched.`

Claim evidence: `nucli8` section 27 "Definitely Supported" is written throughout in Evan's first person ("Built a multi-tenant SaaS...", "Ran a systematic pre-launch audit..."), and plan section 1 groups Nucli8 with Demarly and EdgeBet. Status half unchanged and still sourced to plan section 2. Recorded as claim row A1-14.

**"Draft anything, send nothing" passes and was not changed.** "When I built Demarly" sits in the second paragraph of the body, which meets R02's own acceptance check. Recorded as claim row A3-19 so the check is visible rather than silent.

### 3. R04-02, Nucli8 ownership on the homepage (copy specified, not applied)

Coding owns `app/page.tsx`. The exact string is in the handoff section below. The reasoning: the reader who never reaches About is looking at a work entry whose source line names a status but no owner, directly above an entry whose source line does name its relationship ("as part of engineering teams"). The fix is to make the two lines answer the same question.

I chose **"my product"** over the reviewer's suggested "my third product" and over "my company", deliberately:

- "third" asserts an ordering that no context file establishes.
- "company" asserts incorporation, which is evidenced for EdgeBet ("Edgebet LLC" on the App Store listing) and not for Nucli8.
- "product" also keeps me out of the fight I was told not to enter. About and work-4 disagree about whether the professional work came "alongside" or "before" **the companies**. Calling Nucli8 a company would widen what that phrase covers and would quietly take a side in a factual question that belongs to Evan. "Product" does not touch it.

The mandatory status words `built, not launched` survive verbatim. I updated the mandatory-string note in the copy package so the file and the build stop disagreeing about what exactly is protected.

### 4. R01-02, Demarly status line (copy specified, not applied)

Was the bare domain, now a status label in the same shape as the other two. Exact string in the handoff. Claim evidence is a direct quote from plan section 2: "**Demarly is live at demarly.ai.** The site may say so and link it." The word "Live" is the confirmed claim used as written, so this needs no new approval from Evan.

**No pricing, and I opened a standing claim row to keep it that way.** The investor observed "$24.99/month after a 7-day trial" on the landing page. That is an unconfirmed observation of a page that can change under us, and price is exactly the class of number the credibility rules cut. Recorded as row D14, status CUT and standing, with the reason attached so a later round does not "helpfully" add it back after seeing it in R01.

Side benefit worth naming: "Live at demarly.ai" is better link text than a bare domain for a screen reader running a links list, where "demarly.ai" alone says nothing about where it goes.

### 5. R01-03, the thesis. Drafted, not shipped

Full draft with three options and the two constraints any wording has to respect is in `context/homepage-copy.md`, section 5, under a heading marked **DRAFTED, NOT APPROVED, NOT FOR IMPLEMENTATION**. It is deliberately not inside a fenced `BLOCK:` so that coding cannot copy it by convention. Options and recommendation are repeated in "Ideas and alternatives" below. The About block ships unchanged until Evan answers.

### 6. What I did not touch, on purpose

- The `32 H100s to 4` sentence and its blanket caveat. Untouched, byte for byte. Logged as blocked row B10.
- The "Alongside the companies" / "Before the companies" contradiction. Untouched. Logged as B11. My Nucli8 edit came within two entries of it, which is why I picked "product" over "company"; see above.
- The band caption. No caption written, no caption proposed, `MethodLine.tsx` not opened for editing.
- No metric, customer, traction number, or price added anywhere.

## Evidence and checks

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| Byte-identity between each private draft and its tracked article, all three pairs, re-verified after the edits with the same normalize-and-hash method used in F01 | `/tmp/f01_identity.py` over the three pairs | **pass, 3 of 3 identical.** `the-30x-bug` sha `061267fa7635` both sides, `distrust-your-best-results` sha `5359bec40519` both sides, `agents-that-cant-lie` sha `f09ba877bf40` both sides | This is the property the task exists to protect. Editing `content/articles/` and forgetting `writing/`, or retyping the sentence with one different comma, would have printed the first differing block. Baseline was captured before the edits and matched too |
| The untouched article really was untouched | Its hash is `f09ba877bf40` before and after this session, identical to the value recorded in F01 | pass | A stray whitespace edit would have moved it |
| Both replacements were unique in their files before being applied | scripted `assert count == 1` on each of the four files | pass | A near-duplicate sentence elsewhere in the article would have aborted the edit instead of silently changing the wrong one |
| Production export rebuilds after the edits | `npm run build` | pass, 8 routes, 3 article pages | A malformed frontmatter block would have failed the build or dropped an article from `generateStaticParams` |
| The new sentences actually render | `out/writing/distrust-your-best-results/index.html`, `out/writing/the-30x-bug/index.html` | pass, both strings present in the rendered HTML | The Markdown could have rendered the apposition commas oddly, or the article route could have served a stale copy |
| No draft note, review marker or private reasoning leaked into the export | grep for `DRAFT NOTE`, `STRIP BEFORE`, `writer, 2026` across `out/index.html` and all three article pages | pass, 0 hits | The draft notes live in `writing/` only. Copying a draft file into `content/articles/` wholesale would have shipped the whole note block |
| No em dash or en dash in any article source | grep for both characters across `writing/*.md` and `content/articles/*.md` | pass, none | Typing the apposition with dashes instead of commas is the obvious way to break this rule, and it was a real temptation in both edits |
| No em dash in the private files I wrote | grep across `context/homepage-copy.md`, `context/claim-review.md` | pass, 0 each | The rule covers every file written for this project, not only site copy |
| No metric, price, customer or traction number added | Diff of all four article files plus the two proposed homepage strings | pass | The investor report hands you "$24.99/month after a 7-day trial" in plain text. Pasting it would have looked like sourcing |
| The `32 H100s to 4` sentence is unchanged | `grep` of the sentence in `app/page.tsx` and of the `work-4` block in `context/homepage-copy.md` | pass, unchanged | An "improvement" to the neighbouring source line could have reflowed it |
| The employment timeline sentences are unchanged | Same two locations, both strings intact | pass | My Nucli8 edit is two entries above work-4 |
| Rendered visual quality, contrast, mobile, 200% zoom | not run | **not run** | Outside a writer's scope and outside this task's scope. The two homepage strings are not applied yet, so there is nothing rendered to inspect. `Live at demarly.ai` is longer than `demarly.ai` and `Nucli8, my product, built, not launched` is longer than the current source line; both need a design eye at 375px once coding applies them |
| Whether a cold reader now names the ownership correctly | not run | **not run** | This is what the 60 second comprehension check in CLAUDE.md is for, and it needs a person. I can verify the words are on the page; I cannot verify they land |

## Findings (reviews or discovered defects)

| ID | Location / quote / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| F01b-01 | `content/articles/the-30x-bug.md`, formerly "the product it lived in, Nucli8, is built but not launched". R02-05 explicitly listed this article as already establishing ownership. | Observation of the string, plus an inference that the reviewer read "built but not launched" as an ownership statement when it is a status statement. | important | This is R04-02's exact defect living inside an article, and R02 walked past it while writing up the same defect elsewhere. The article publishes a billing bug and a ten-defect pre-launch audit for a named product, so an unattributed read is worse here than in the EdgeBet piece. Two blind reviewers found two of the three instances; nobody found all three, which is an argument for checking the class rather than the reported instances. | writer, done | Fixed in this pass. **Check:** read each article page in isolation with no homepage context and confirm the reader knows within two paragraphs that the systems described are the author's. All three now pass that check. |
| F01b-02 | `context/homepage-copy.md` work-3 note: "The status line `Nucli8, built, not launched` is mandatory and may not be softened". | Observation. | suggestion | The note protected an exact string, which meant any ownership fix technically violated the copy package even when it added information rather than removing it. The note now protects the status **words** and states that prepending the relationship is the intended change. Left unfixed, the next agent either refuses a good fix or quietly ignores a mandatory note, and both are bad habits. | writer, done | **Check:** the copy package's mandatory-string note and the string in `app/page.tsx` agree after coding applies the change. |
| F01b-03 | R01-03 as literally worded: "every system Evan builds is structurally prevented from acting alone". | Inference, on the wording rather than the insight. | important | The insight is right and it is the most interesting thing this review round produced. The sentence, taken literally, has the two defects that killed the band caption in W-12: a universal quantifier about Evan's own method that no source supports, and a flattening of two different mechanisms. Demarly, Nucli8 and the professional work have a human gate; EdgeBet has no gate at all, it has a self-distrust rule and a decision to sell tools instead of picks. All four facts are true and the summary of them can still be false. | writer, drafted; **Evan decides** | Draft in `context/homepage-copy.md` section 5, scoped to "these systems" and split so the mechanisms stay distinct. **Check:** whatever ships contains no universal claim about Evan's method and does not assert that EdgeBet has an approval gate. |
| F01b-04 | `components/ArticleShell.tsx`: article pages carry only "Evan Baker" in the header. | Observation, raised and then rejected as a fix. | suggestion | R02-05 offered a persistent affiliation note in the shell as an alternative to the in-text fix. I recommend against it and want the reason recorded so it does not get re-proposed: a standing byline affiliation reads as corporate disclosure boilerplate, which R02 itself argued against elsewhere in the same report, and it does not survive the ways articles actually travel (quoted, excerpted, pasted). The in-text fix travels with the sentence. | none, no change | No change. **Check:** if a future round adds a shell affiliation line anyway, confirm the in-text ownership clauses are not removed at the same time, because the shell version is weaker, not equivalent. |

No other defects found in the inspected scope.

## Ideas and alternatives

**The thesis, R01-03. Three options, and I recommend A as a draft that goes to Evan.**

Option A, four sentences appended to the second About paragraph:

> There's a second thread too. None of these systems get to act on their own. The agents draft and a person sends. The cloud purchases sit behind approval and a kill switch. The betting math hands you numbers instead of picks.

Option B, one sentence appended to the same paragraph, a strict subset of A:

> The other thing they have in common: none of them get to act on their own.

Option C, leave About alone.

**Recommendation: A, drafted and sent to Evan, not shipped.** Reasons. It uses only claims already published on the same page, so it adds a summary rather than a new claim. It is concrete, which is the voice, and the reader can check it against the three entries directly above it in about five seconds. It scopes to "these systems" rather than "every system I build", which is the difference between an observation and the universal claim that got the band caption rejected. And it keeps the two mechanisms distinct in three separate sentences instead of merging them into one that would be wrong about EdgeBet.

B is defensible if About is running long. Its cost is that it asserts the pattern without showing it, so a skimmer takes it on faith and a skeptic has nothing to check.

C is a real option and I am not dismissing it. The stated thesis is true, the plan puts it in exactly one place on purpose, and adding to About trades against the compactness the whole homepage was designed around. What moves me off C is that two readers who could not see each other's work said the connection did not land: R01 said a 60 second reader will not assemble it, and R04's first-impression note said the connection was only found in About. That is the same complaint from two directions.

**The risk, stated plainly, because this is the part that must not get lost in a summary.** Each of the four facts is supported and already public. The pattern is not. "This is how I build" is a claim about how Evan thinks, inferred by a reviewer from four instances. It could equally be four separate answers to four separate problems: Demarly needed it for product trust, Nucli8 because it moves real money, the employed work possibly because a client required it, EdgeBet for a completely different reason that has nothing to do with human gates. If it is the second, the sentence is false as a thesis even though every fact under it is true, and it is false in the most expensive way, because it is a claim about character. **Only Evan can answer it, and no agent should resolve it by picking the version that reads better.** Logged as blocked row B9.

**Optional and backlog, not requirements:**

- If Evan likes the pattern but not a new About sentence, "Prompts are requests. Architecture is the rule." already exists in article three and could carry it as a pull quote instead. I did not draft this because pulling a Demarly-scoped line up to site level over-extends it, and because pull quotes are a design decision, not a copy one.
- R01-09 (EdgeBet's commercial paragraph is softer than Demarly's) and R01-07 (no distribution reasoning) stay backlog. Both need a real decision from Evan and neither is worth inventing.
- A cheap partial answer to R01-05 that costs nothing here: one founder line on demarly.ai. Outside this repo, and it is Evan's property and Evan's call.

## Proposed decision-log update

**No new decision** for Q1, Q2, Q4 or Q5. This round applied accepted review findings inside decisions that already exist; it did not choose between alternatives at the site level. If the coordinator wants a line somewhere for the record, the honest framing is that the ownership pass is an application of the existing credibility rules, not a new rule.

**Q3 candidate note, factual only, for Evan to write from or discard:**

- The agent-written band caption ("Every company I build runs this line. What changes is the math in the middle.") was rejected in an earlier round for making a universal claim about Evan's method. In this round an outside reviewer independently proposed a differently worded version of the same universal claim ("every system Evan builds is structurally prevented from acting alone") and the writer flagged it as the same defect rather than adopting it. Nothing about Evan's method was written by an agent in either round, and both times the sentence was routed back to Evan.

I have not written and will not write the Q3 answer.

## Handoff

- Acceptance criteria met or unmet:
  1. R02-05, EdgeBet ownership in the article: **met**, changed in both copies.
  2. R04-02, Nucli8 ownership: **met as copy**, exact string specified below and awaiting coding. Not applied by me, since `app/page.tsx` is outside my write scope.
  3. R01-02, Demarly status: **met as copy**, same, availability only, no commercial term.
  4. The other two articles checked and the finding stated either way: **met**. One had the same gap and was fixed, one passed and was left alone.
  5. R01-03 thesis: **met as a draft with options and a recommendation**, explicitly not shipped.
  6. Byte-identity across all three draft/article pairs: **met**, 3 of 3.
  7. Nothing touched in the forbidden set: **met**. H100 sentence, timeline contradiction and band caption all unchanged.
- Blocker and missing input, if any: no blocker for this task. Open and belonging to Evan: **B9** the thesis question, **B10** the H100 attribution, **B11** the employment timeline, plus the standing **B1** byline approval that gates publication of all three articles. None of the four may be closed by an agent.
- Next owner and task recommendation: **coding**, to apply the two homepage strings exactly as written below, and separately to handle R04-03 (article exit links), which was routed to coding and is not in this pass. **Design** should look at both new strings at 375px: `Nucli8, my product, built, not launched` is four comma-separated pieces on one source line and may want a wrap check, and `Live at demarly.ai` changes the length of the only link in the Demarly entry. **Coordinator** to carry B9, B10 and B11 to Evan as three factual questions, and to note that the thesis draft lives in a private file marked not-for-implementation.
- Checks or reviews that must be rerun after a change: rebuild the export and re-run the byte-identity script before any commit that touches an article. Re-run the R02-05 acceptance check (read each article page cold, with no homepage context) after the export is rebuilt. The boss review R02 and the classmate review R04 are both invalidated for the specific findings they raised and should be re-run against a new candidate ID once coding applies the homepage strings. The investor review R01 is invalidated for R01-02 and, if Evan approves any thesis option, for R01-03 as well. And if the thesis sentence ever ships, every claim and voice check covering the About block has to be redone, because that block is the one place the thesis appears.

### Exact strings for coding

Two changes, both in `app/page.tsx`. Nothing else in that file changes. Neither string may be reworded during implementation; if either does not fit the layout, come back rather than paraphrasing.

**1. Demarly link label (R01-02).** Line 28.

- From: `link={{ href: 'https://demarly.ai', label: 'demarly.ai' }}`
- To:   `link={{ href: 'https://demarly.ai', label: 'Live at demarly.ai' }}`

The `href` does not change. Do not add a price, a trial length, a tier, or any other commercial term to this entry, now or later, even though one appears in the investor report.

**2. Nucli8 work entry source line (R04-02).** Line 110.

- From: `source="Nucli8, built, not launched"`
- To:   `source="Nucli8, my product, built, not launched"`

The words `built, not launched` are mandatory and unchanged. Do not upgrade `my product` to `my company`, `my startup`, or `my third product`.

Both changes are already reflected in `context/homepage-copy.md`, blocks `company-demarly` and `work-3`, with the reasoning attached.
