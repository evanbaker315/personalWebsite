# R02: Simulated employer review of candidate C1

- Role / assignee / run: boss (**simulated employer perspective**) / run 01
- Date: 2026-09-10
- Status: needs-fixes
- Scope: simulated audience review
- Candidate revision and URL: C1. Static export at http://localhost:4321/, source commit `77a110a` with uncommitted paths, `out/index.html` md5 `374597ccaa64fe4dd07189066a5e0826`. Nothing is deployed.
- Inputs actually inspected: `reports/candidate.md` (known-limitations list only), `reports/TEMPLATE.md`, `AGENT-WORKFLOW.md`, `CLAUDE.md`, and the five candidate routes read as generated HTML under `out/`
- Assigned write scope: `reports/R02-boss-01.md` only
- Files changed: `reports/R02-boss-01.md` (new)

**This is a simulated perspective.** I am a professional reader assessing published evidence. I have no access to Evan's employment agreements, offer letters, IP assignment terms, invention disclosure policy, or outside-work policy, and nothing here clears or condemns anything under those terms. Nothing in this report is an employer approval.

**First impression was independent.** I read only the candidate URL and my role brief. I did not read `context/`, the plan, the copy package, or any other reviewer's findings before forming the view below.

## How I read the site

WebFetch refuses `localhost`, so I read the generated HTML directly under `/Users/evanbaker/Downloads/personalWebsite/personalWebsite/out/`: `out/index.html`, `out/writing/index.html`, and the three article pages. I spot-checked `out/writing/the-30x-bug/index.html` against `content/articles/the-30x-bug.md` and confirmed the rendered prose matches the tracked source, then read the other two article bodies from their tracked sources. I did not open a browser and did not assess visual rendering.

## Work and result

### Overall read

Read as an employer would read it, this is a careful page. The density of self-limiting language is higher than almost anything I see from an engineer describing their own work: "my contribution was a piece of each, not the whole thing," "EdgeBet has no backtest," "that is a mitigation, not a guarantee," "Nucli8, built, not launched," "there is no pick record to point at." Someone who oversells does not write those sentences, and the site publishes its author's own 30x math bug under his own name. My read is that this person is careful about what he claims.

The problem is that the one place the care thins out is the one place it matters most to an employer. The only hard performance number on the entire site sits in the only block about work done inside other people's production environments, it is a named-employer infrastructure capacity figure, and the sentence around it never says which of the two named companies it belongs to or what Evan's specific part in it was. So the site's least verifiable claim, its most clearance-sensitive disclosure, and its weakest attribution are all the same sentence. That sentence is where I would start.

Separately, the About section and the Selected work section give different answers to when the employment happened relative to the companies. That is a small wording gap with a large employer-facing consequence, and it is the cheapest fix on this list.

### What Evan appears to do

Clear on one read. He builds software systems and the businesses around them, currently Demarly (AI agents doing business workflows behind a human approval queue) and EdgeBet (an iOS app pricing betting markets net of fees), with Nucli8 built but not launched, while finishing a degree at Colorado School of Mines. The connecting idea is stated plainly in About: understand how a system actually works, then encode as much of it as possible into software. The employment history is one entry in "Selected work," not a timeline, which is the correct weight for a founder's site.

### What the page suggests about his judgment

Strong, with evidence:

- "Draft anything, send nothing" contains a section headed "Where the guarantee stops" that narrows the claim on purpose: "The send-permission guarantee covers integration write actions going through the platform's own tool layer. It says nothing about what the model asserts in text." Engineers who write that section are not the engineers who cause incidents.
- "Distrust your best results" volunteers the absence of evidence for its own thesis: "Not because I ran a study, and I want to be straight about that. EdgeBet has no backtest."
- The homepage refuses the easy commercial claim: "EdgeBet sells tools, not picks. That is the harder thing to sell and it means there is no pick record to point at."
- Nothing on the page implies any employer endorses, funds, or is associated with his ventures. "Before the companies, I worked on AI systems inside other people's production environments" keeps the two worlds separate. That separation is deliberate and it reads well.

The strongest single claim on the site, "I built it end to end, product to infrastructure," is about his own company, not an employer's system. That is the right place for the boldest sentence to sit.

### What I can assess versus what depends on terms I cannot see

**I can assess:** whether the page states contribution clearly, whether the timeline is internally consistent, whether an article establishes who owns the system it describes, and what category of information each employer-facing sentence falls into.

**I cannot assess, and am not treating as findings:** whether any published detail is permitted under Evan's agreements, whether Demarly, EdgeBet, or Nucli8 required outside-work approval or triggered any invention assignment provision, and who owns the IP in any of it. The site places the employment "before the companies" in one section, which if accurate reduces the overlap question considerably. I am flagging R02-01 because the site gives two different answers, not because I believe there is a problem. Missing evidence is an unknown, not a violation.

## Evidence and checks

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| All five in-scope routes read | `out/index.html`, `out/writing/index.html`, three article pages | pass | A route rendering different text than its tracked source |
| Rendered prose matches tracked article source | `out/writing/the-30x-bug/index.html` h1 and opening prose vs `content/articles/the-30x-bug.md` | pass | Build-time text injection or a stale export |
| Named employers appear only in the one Selected work entry | case-insensitive grep for both employer names across `out/` | pass, 1 visible-HTML occurrence in `out/index.html` plus its RSC payload copies | A second, less hedged employer mention elsewhere |
| Any client, customer, or account name published | grep for `client|customer` across `out/` | pass, no named third party anywhere | A named client engagement in an article |
| Credentials, keys, phone, or address published | read of all five routes; contact block is `mailto:evanbaker315@gmail.com` and a GitHub profile link | pass | Any secret in copy or markup |
| Local filesystem paths or source maps leaked into export | grep for `/Users/`, `sourceMappingURL` across `out/` | pass, no matches | Dev source maps shipped in the export |
| Employer architecture detail assessed by category | "Document pipelines with confidence scores and human review, distributed inference" | low concern, no finding raised | These are published industry patterns, not employer-specific design |
| Employer capacity or operational figures | "took the serving footprint from 32 H100s to 4" | fail, see R02-04 | See finding |
| Any implication an employer endorses the ventures | full read of homepage and articles | pass, none found | Wording like "at X, I built the technology behind Demarly" |
| Live site behavior, deploy, or visual rendering | none | not run | Nothing is deployed; visuals and accessibility are other reviewers' scope |
| External links followed (demarly.ai, App Store listing) | none | not run | I did not corroborate the ventures against public pages |
| Employment terms, IP assignment, outside-work policy | none available | not run | Structurally out of reach for this role |

## Findings (reviews or discovered defects)

### Attribution findings

| ID | Location / quote / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| R02-01 | Homepage. About says "Alongside the companies I've worked professionally across software engineering and applied AI." Selected work says "Before the companies, I worked on AI systems inside other people's production environments." | Observation that the two sentences conflict. Inference that a reader cannot tell whether the employment was prior or concurrent. | important | "Alongside" and "before" describe two different situations. Concurrent founding while employed is the version that would normally prompt an outside-work or invention-disclosure conversation at most employers. I am not asserting either is true or that anything is wrong; I am saying the site should not be ambiguous about a fact that a professional reader will notice immediately, especially when the more conservative reading is already present elsewhere on the same page. | writer | Pick the accurate framing and use it in both places. If the work was prior, change "Alongside the companies" to match. If it genuinely overlapped, say so plainly rather than leaving two readings. Acceptance check: grep the export for "Alongside the companies" and "Before the companies" and confirm only one temporal framing appears, and that it matches what Evan confirms. |
| R02-02 | Homepage, Selected work, "Production AI infrastructure." Full text: "Document pipelines with confidence scores and human review, distributed inference, and one redesign that moved semantic search onto CPU with selective model fallback and took the serving footprint from 32 H100s to 4. These were team-built systems and my contribution was a piece of each, not the whole thing." | Observation on the wording. Inference on how a reader resolves it. | important | This fails in both directions at once, which is why it is one finding rather than two. The grammatical subject of the specific, impressive 32-to-4 result is "I," so a fast reader banks the result. The blanket disclaimer then removes all of it without putting anything back, so a careful reader learns only that Evan did an unspecified fraction of three unspecified things. Borrowed credit and vanished credit from the same sentence. A hiring manager cannot form any view of what he actually did, and the honest hedge ends up reading as a formality attached to a number the writer still wanted kept. | writer | Replace the blanket disclaimer with one concrete statement of his own part in one of the three items, in the same understated register the rest of the site uses. Something of the shape "I owned the fallback path" or "I did the evaluation work behind the CPU decision" and let the team framing stand on its own. Acceptance check: the entry names at least one specific component or decision that was Evan's, and no impressive outcome in the block is left with an unidentified owner. |
| R02-03 | Homepage, Selected work, source line: the two named employers, "as part of engineering teams" | Observation. | suggestion | Two employers are named jointly and none of the three described systems is mapped to either one. The joint framing is more conservative in one sense, since it obscures which employer each item belongs to, but it also lets a reader attribute all three systems to both companies. If R02-02 is fixed by naming his specific part, this is likely fixed alongside it. Raising it only so the fix considers both. | writer | Optional. Either keep the joint framing and accept the vagueness, or attach the one concrete contribution from R02-02 to its actual employer. Acceptance check: no reader can reasonably conclude that all three described systems existed at both named companies. |

### Disclosure findings

Framing for this section, held deliberately: I do not know what any agreement permits. Each item below says what category of information it falls into and whether it is the kind of thing that usually requires clearance. None of them says a policy was broken, because I have no basis to say that.

| ID | Location / quote / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| R02-04 | Homepage, Selected work, "Production AI infrastructure": "took the serving footprint from 32 H100s to 4," in an entry sourced to the two named employers, "as part of engineering teams" | Observation that the sentence publishes a named-employer hardware fleet count with a before and after. Inference that this reads as an internal operating figure. | important | Category: employer infrastructure capacity and operational scale. This pairs two named companies with an absolute GPU inventory for a production service and the efficiency delta on it. Absolute fleet counts are commonly treated as confidential infrastructure detail, because they imply serving scale and cost, and this is the kind of thing that usually requires clearance before publication. It is also the only hard performance number anywhere on the site and the only one a reader cannot check, which is the opposite of the pattern the rest of the page follows. I am deliberately not calling this a blocker: it is not a credential, not a client identity, not a demonstrably false attribution, and I cannot see the terms that would decide it. I am equally not clearing it. This should go to Evan as a judgment call, not be resolved by an agent. | writer | Preferred: confirm with Evan whether this figure was ever externally disclosed by the employer or is otherwise cleared. If not confirmed, narrow it. Options, in descending order of preference: state the ratio without absolute counts ("cut the serving footprint by roughly 8x"), describe the technique with no figure at all, or keep the figure and drop the employer names from that line so no capacity number is attached to a named company. Acceptance check: either Evan records a dated confirmation that the figure is publishable, or the export contains no absolute hardware count in the same entry as a named employer. Grep for "H100" returns zero visible-HTML hits under the narrowing options. |
| R02-05 | `/writing/distrust-your-best-results/`. The article publishes specific model parameters ("On main lines the weights are 38/38/24," "17/17/66 instead of 32/32/36," "more than 25 percentage points away") and never states that EdgeBet is the author's own company. Closest it comes is "the prior I built the system around." The article shell shows only "Evan Baker" in the header, with no byline affiliation and no ownership note. | Observation on what the page does and does not say. Inference about how a direct-landing reader resolves it. | important | Category: ownership framing around disclosed system internals. Anyone arriving from a search result, a link, or a shared URL sees a named product's proprietary weighting scheme and outlier thresholds published in detail by someone who does not say he owns the product. The plain reading available to that reader is "engineer publishes his employer's internal model parameters," which is the exact thing this review is looking for. Nothing about the actual situation is a problem as far as I can tell, since the homepage establishes the ventures. The problem is that the article does not travel with that context, and article pages travel alone. The other two articles do not have this issue: "When I built Demarly" and "the product it lived in, Nucli8, is built but not launched" both establish ownership inside the text. | writer | Add one clause establishing ownership early in the article, in Evan's register. The existing sentence is one word away: "EdgeBet, my iOS app, scores thousands of betting markets against a fair price." Alternatively add a persistent one-line author or affiliation note in the article shell so every article carries it. Acceptance check: read each of the three article pages in isolation with no homepage context and confirm that within the first two paragraphs the reader knows the systems described belong to the author. |

No further findings in the inspected scope. I considered and did not raise: the generic architecture description in the same employer entry ("Document pipelines with confidence scores and human review, distributed inference"), which describes published industry patterns rather than employer-specific design and reads as safely non-specific; the Demarly claim "I built it end to end, product to infrastructure," which is a sole-contribution claim about his own company and is the appropriate place for the site's strongest sentence; and the detailed self-disclosure in the Nucli8 and Demarly articles, which is his own material to give away. The unlinked `/writing/` index, absent publication dates, missing photo, and undeployed state are recorded known limitations in `reports/candidate.md` and are not mine to report.

## Strengths worth preserving

Listing these because a fix pass should not sand them off.

1. "These were team-built systems and my contribution was a piece of each, not the whole thing." The instinct is exactly right. R02-02 asks for more specificity, not for less humility. Do not delete this sentence, extend it.
2. "Before the companies, I worked on AI systems inside other people's production environments." Clean separation between employment and ventures, with no implication of endorsement anywhere on the page. Keep this framing and let it settle R02-01.
3. "Where the guarantee stops." A named section in a public article that narrows the author's own claim, ending "Nobody's solved injection." This is the single most credible thing on the site to a professional reader.
4. "Not because I ran a study, and I want to be straight about that. EdgeBet has no backtest." Volunteering the absence of evidence for your own thesis is rare and it buys trust for everything around it.
5. "Nucli8, built, not launched" and "It was caught before launch and before a single person was billed anything." Precise scoping of what did and did not happen, in both directions.
6. Publishing his own 30x math bug under his own name, bounded honestly. This reads as confidence, not as a liability.
7. No client or customer is named anywhere on the site, and no traction number appears for any venture.

## Ideas and alternatives

Optional, backlog, not launch scope, and none of these should become requirements:

- If R02-04 is narrowed rather than cleared, the entry loses its only concrete outcome. A specific technical decision that was Evan's own, described without any figure, would carry more weight with an engineering reader than the fleet count does. "I did the evaluation that showed CPU serving held quality" is more persuasive than "32 to 4" precisely because the reader can tell what the author did.
- The employer entry currently sits fourth in Selected work, after three venture entries. That ordering is correct for a founder's site and I would leave it.
- I considered whether the site should carry a standard "views are my own" style note. I do not recommend it. It would add a defensive, corporate register that clashes with the voice, and the concrete fixes in R02-02, R02-04, and R02-05 address the underlying concerns directly.

Explicitly out of scope and not recommended, per the brief: no skills grid, no certifications section, no years-of-experience line, no employment timeline. This is a founder's home base by decision, and none of my findings would be improved by making it a resume.

## What I did not check

- Nothing is deployed, so I reviewed the frozen static export rather than a live site. No browser was used; visual rendering, responsive behavior, and accessibility were not assessed and belong to other reviewers.
- I did not follow `https://demarly.ai` or the App Store listing, so I did not corroborate the venture descriptions against public pages.
- I did not read `context/`, `website-plan.md`, the copy package, `DECISIONS.md`, or any other reviewer's report. I read only the known-limitations list in `reports/candidate.md`, as permitted, so I would not report known gaps as discoveries.
- I did not inspect git history for previously committed content.
- I have no access to any employment agreement, IP assignment, outside-work policy, or invention disclosure process, and no view on whether any published detail is permitted under them.

## Proposed decision-log update

No new decision from this review. R02-04 produces a factual input only Evan can close: whether the "32 H100s to 4" figure is cleared for publication or should be narrowed. R02-01 produces a second factual input only Evan can close: whether the professional work was prior to or concurrent with the companies. Neither is an agent decision and neither should be resolved by a builder guessing. No Q3 candidate note arises from this task.

## Handoff

- Acceptance criteria met or unmet: met. Independent first-pass review performed against candidate C1, attribution and disclosure findings recorded separately with stable IDs, assessable concerns separated from unknown employment terms, write scope respected.
- Blocker and missing input, if any: no blocker. Two findings need Evan's factual input before a builder can act: R02-04 (clearance status of the hardware figure) and R02-01 (actual employment timeline relative to the companies). R02-02, R02-03, and R02-05 can be drafted by writer now.
- Priority order: R02-04 and R02-01 to Evan first, then R02-02 and R02-05 to writer, then R02-03 folded into the R02-02 fix.
- Next owner and task recommendation: coordinator triages. Route R02-01 and R02-04 to Evan as factual questions. Assign R02-02, R02-03, and R02-05 to writer as one copy pass touching the Selected work entry, the About paragraph, and the opening of `content/articles/distrust-your-best-results.md`.
- Checks or reviews that must be rerun after a change: rerun this boss review against the corrected candidate. A change to the Selected work entry or the About paragraph also invalidates any claim or voice check covering that copy. Article-body edits require the export to be rebuilt and the article read again in isolation for the R02-05 acceptance check.
