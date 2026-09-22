# R04: Simulated classmate review of candidate C1

- Role / assignee / run: classmate / simulated newcomer reader / run 01
- Date: 2026-09-10
- Status: needs-fixes
- Scope: simulated audience review
- Candidate revision and URL, if applicable: C1. Given URL http://localhost:4321/. Commit `77a110a` plus uncommitted paths. Export manifest hash `4160a5a5516bf8caa281043465831407` per `reports/candidate.md`.
- Inputs actually inspected: the five routes and the 404, read as generated HTML under `out/`; `content/articles/the-30x-bug.md` for the full article text; the two outbound links on the homepage (demarly.ai and the App Store listing), fetched live on 2026-09-10. `reports/candidate.md` read only after the first pass and after the findings below were drafted.
- Assigned write scope: `reports/R04-classmate-01.md` only.
- Files changed: `reports/R04-classmate-01.md` (new).

**This is a simulated perspective.** I am not a real classmate, this is not a peer comment on Evan's site, and it does not satisfy the assignment's requirement that Evan comment on three classmates' sites (H05). It is also **not** the real 60-second comprehension check with an unfamiliar human (H02). That check needs an actual person and actual recorded answers. Nothing here was posted, sent, or submitted anywhere.

## How I read the site (access limits first)

WebFetch refused `http://localhost:4321/` as an invalid URL and this run has no Bash tool, so I could not load the site in anything that renders. I read the **generated static HTML in `out/`**, which is the artifact that would deploy. That means:

- I read the real published text, the real link targets, and the real heading structure.
- I saw **nothing rendered**. No screenshot, no browser, no layout. I make **no claims** about typography, spacing, colour, contrast, mobile layout, 200% zoom, focus states, or keyboard behaviour. Those are unchecked by me, not passed by me.

Everything below about "reading" the page means reading its text and markup in source order.

## 1. The 60-second skim, recorded first and not revised

These are my raw answers, written after a quick pass over the homepage only, before I clicked anything, before I read any article, and before I read `reports/candidate.md`. I have left the wrong and half-formed parts in on purpose.

**What does this person build?**

> Software. Two things specifically: an AI agent thing for small business owners called Demarly, where the agents are arranged like a company org chart and a human has to approve before anything gets sent out. And an iPhone app called EdgeBet for people who bet on sports, which compares prices across betting sites and does the math on whether a bet is actually good after fees. Both are his own companies as far as I can tell. There is also a third thing, Nucli8, about AWS costs, but I could not tell on the skim whether that is a company of his, an old job, or a school project. He also worked at two companies I have not heard of doing AI infrastructure.

**What connects the things on the page?**

> Honestly, on the skim: nothing obvious. Business software and sports betting felt like two unrelated products by one guy who can code. There is a diagram right under his name with four words on a line, "system, model, software, business," which I assume is supposed to be the connection, but there is no sentence next to it telling me what it means so I skipped it. I only got a real answer when I scrolled to the bottom and hit the About paragraph, which says the thread is taking how a complicated real thing works and encoding it into software. That is a good sentence. It is the last section I would have read.

**What would make you contact him, if anything?**

> If I needed someone to build a system where the hard part is the math or the modelling rather than the UI. The line "The part I actually care about is usually below the interface" told me what he wants to be hired for faster than anything else on the page. Contact is easy to find, it is an email and a GitHub, and the invitation is "Building, investing, or working on something interesting? I'd like to hear about it." That is low-pressure and I would actually email it.

**What did you not understand?**

> - "a prediction market whose per-contract fee is quadratic." I know what quadratic means and I still do not know what this sentence is telling me about the app.
> - "peer-to-peer exchanges" in a betting context. I guessed it means betting against another person instead of the house, but that is a guess.
> - "strips out the bookmaker margin." I sort of got it from context, that the posted odds are shaded in the house's favour and he removes that. I would not have been able to explain it back.
> - "a dynamic program over AWS's normalized-unit algebra." Lost me completely.
> - "took the serving footprint from 32 H100s to 4." I know H100s are expensive GPUs, so I got that this is a big cost win, but I do not know what "serving footprint" means precisely.
> - The four-word diagram, as above.
> - "Nucli8, built, not launched" as a label. Built by whom, and not launched by whom.

**One more honest note from the skim:** the very first sentence under his name, "I build software, systems, and technology-driven businesses," did not tell me anything. It is the kind of line I skim past. Everything I actually learned came from the two company blocks below it.

## 2. Then I used the site

- Clicked into **The 30x bug** from the homepage and read it in full. It is good. It teaches an actual thing (a snapshot is a level, not a rate, so summing daily snapshots and then multiplying by hours double counts the day axis) and it does the arithmetic intuition for you: "The inflation factor is just the number of days you summed over." It also front-loads the honesty, that this was caught in a pre-launch audit before anyone was billed and the product is built but not launched, which made me trust the rest of it. I followed the argument on one pass. The only term I could not fully unpack was "a commitment-exchange design that AWS's API can't actually perform the way I'd modeled it," which arrives near the end and is not load-bearing.
- Tried the header nav. On the homepage it is three anchor links: "What I'm building," "Selected work," "Contact." There are five sections on the page. Writing and About are not in it.
- Tried to get from the article back to the other two articles. There is no way to do it from the article. The article header is "Evan Baker" and the footer is "Back to Evan Baker," and both go to `/`, which drops you at the top of the homepage. To reach the second article I had to scroll back down past three sections.
- Found `/writing/` only because the task packet listed the URL. Nothing on the homepage or on any article links to it. (I later read in `reports/candidate.md` that this is a recorded decision, design-07, so I am not reporting the orphaned index itself as a discovery. The missing article-to-article path is a separate thing.)
- Looked at the 404. It says "Page not found," "That URL does not exist on this site," and offers "Back to Evan Baker." It is plain and it works. It carries the same header and footer as the article pages, so it does not feel like you fell off the site.
- Clicked both outbound links. Both resolve and both match what the site claims. `https://demarly.ai` loads and its own headline is "Run your entire business with a team of AI agents," which is the same product the homepage describes. `https://apps.apple.com/us/app/edgebet/id6759763418` loads, the app is listed as Edgebet by Edgebet LLC, and its description leads with finding arbitrage, spotting +EV bets and tracking wagers, which is consistent with the site's "sells tools, not picks" framing rather than contradicting it. Checking a claim by clicking one link and having it hold up is rarer than it should be.
- Found no broken internal links. Every internal `href` in the export points at a page that exists, and all three homepage anchors (`#building`, `#work`, `#contact`) match real section ids.

**Can I tell the four things apart?** Demarly and EdgeBet, yes, immediately and without needing to understand the internals. Professional work, yes, and the sentence "These were team-built systems and my contribution was a piece of each, not the whole thing" is unusually clear about attribution. Nucli8, no, not on the first pass. See R04-02.

## Evidence and checks

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| Load the candidate in a browser | http://localhost:4321/ via WebFetch | fail | WebFetch returned "Invalid URL" for the localhost host and no Bash tool is available in this run. Fell back to the export. |
| Read all five routes plus 404 | `out/index.html`, `out/writing/index.html`, three article files, `out/404.html` | pass | Reading source, not rendering. A CSS rule that hid or reordered content would not be visible to me. |
| Internal links resolve to real pages | All `href="/..."` values in the export vs the file list under `out/` | pass | A link to a route with no exported directory would have failed. |
| Homepage anchor targets exist | `#building`, `#work`, `#contact` vs `id="building"`, `id="work"`, `id="contact"` | pass | A renamed section id would have failed. |
| Article reachable and readable end to end | `/writing/the-30x-bug/` rendered text plus `content/articles/the-30x-bug.md` | pass | Truncated prose or a missing body would have failed. |
| Path from an article back to other writing | All `href` values in `out/writing/the-30x-bug/index.html` | fail | Only two internal links exist and both are `/`. See R04-03. |
| Outbound company links resolve and match the claim | `https://demarly.ai` and `https://apps.apple.com/us/app/edgebet/id6759763418`, fetched 2026-09-10 | pass | A dead domain, a pulled listing, or a destination describing a different product would have failed. |
| Heading order on the homepage | Single `h1` "Evan Baker", `h2` per section, `h3` per entry | pass | A skipped level would have failed. Source inspection only, not an accessibility tool run. |
| Rendered visual quality, mobile, zoom, contrast, keyboard, focus | none | not run | No browser, no screenshots available to this run. I make no claim in either direction. |
| Live deployed site | none exists | not run | Out of scope for this role; recorded as pending in `reports/candidate.md`. |

## Findings

| ID | Location / quote / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| R04-01 | Homepage hero, `<nav aria-label="Page sections">` contains exactly three links: "What I'm building", "Selected work", "Contact". The page has five sections: building, work, writing, about, contact. | Observation | suggestion | The only nav on the page advertises three of five sections, so Writing and About read as afterthoughts. My skim answer to "what connects these things" is sitting in the About section that the nav does not point at. | design | Either add "Writing" and "About" to the section nav, or drop the nav to a deliberate two-item shortcut so it does not read as a table of contents that is missing entries. Check: the hero nav either lists every `<section>` on the page or lists at most two items. |
| R04-02 | Homepage. Nucli8 appears only as a source label, "Nucli8, built, not launched", under the work entry "Cloud commitments as an optimization problem", and then in About as "Nucli8 is that applied to cloud economics". It is absent from "What I'm building", which contains only Demarly and EdgeBet. | Observation of the text; inference about reader confusion, from my own recorded first pass | important | On the skim I could not tell whether Nucli8 was his company, a client, a former employer, or a school project, and the label "built, not launched" reads as a status note about something whose owner is unstated. The About sentence resolves it, but About is the fourth section down and I only reached it after the confusion had already set. Distinguishing the ventures from the professional work is exactly what a newcomer is supposed to be able to do. | writer | Name the relationship at first mention, in the work entry itself, in the same register as the existing line for the employers. Something as small as "Nucli8, my third product, built and not launched" would have closed it. Check: a reader who reads only the "Selected work" section, and never reaches About, can say who owns Nucli8. |
| R04-03 | `/writing/the-30x-bug/`. The entire page contains two internal links, both to `/`: the header "Evan Baker" and the footer "Back to Evan Baker". No link to the other two articles, no next/previous, no link to `/writing/`. Same on the other two articles. | Observation | important | Finishing an article is the moment a reader is most willing to read a second one, and at that moment the site's only offer is to send them to the top of a long homepage, where the Writing list is the third section down and is not in the nav. I actually did this and it was the most annoying part of using the site. The unlinked `/writing/` index is a recorded decision (design-07) and I am not asking to reverse it; the fix does not require it. | coding | Add a short "More writing" block at the foot of each article listing the other two titles as direct links, or a next/previous pair. Check: from any article, a reader can reach either other article in one click without returning to the homepage. |
| R04-04 | Homepage hero: "Engineer. Founder. Builder." followed by "I build software, systems, and technology-driven businesses." The same sentence is also the page `<meta name="description">`. | Observation of the text; inference that it underperforms, from my recorded skim | suggestion | This is the first full sentence on the site and it was the least informative thing I read. "Software, systems, and technology-driven businesses" is a category list, not a thing. The concrete answer is one screen below and it is excellent, so nothing is lost permanently, but the hero currently spends the highest-attention line on a sentence I skimmed past. Compare "The part I actually care about is usually below the interface," which is buried in "Selected work" and told me more about him in one line than the hero did in three. | writer | Consider promoting a concrete sentence into the hero, or letting the hero be shorter and get out of the way faster. Preference, not a defect. Check: the first sentence a reader hits names something specific rather than three abstract nouns. |
| R04-05 | Homepage, the band under the hero: an SVG line with four labels, "system", "model", "software", "business", and the alt text "A four stage line: system, model, software, business." No caption or explanatory sentence anywhere near it. | Observation | suggestion | It is the second thing on the page and it is the most prominent non-text element, and on the skim I could not decode it, so I skipped it. I later read in `reports/candidate.md` that the caption slot is deliberately empty pending Evan's input, so this is **not** a discovery, it is a reader-side data point on that open item: with no caption, the diagram did not communicate its idea to me, and the idea it seems to be carrying is the same one the About paragraph carries well. | writer | This is Evan's open input, not an agent's to write. My only contribution: if no supportable caption exists, an undecoded diagram in the second-most prominent slot is doing less work than the About sentence it duplicates. Check: a reader who sees only the band can state what the four words mean, or the band is removed. |
| R04-06 | Homepage, EdgeBet: "a prediction market whose per-contract fee is quadratic". Also "peer-to-peer exchanges", "strips out the bookmaker margin", and in the Nucli8 entry "a dynamic program over AWS's normalized-unit algebra". | Observation | suggestion | These are the four places a first-time reader stops. Some density is the point and I would not sand it all off, since the specificity is what makes the page credible. But "per-contract fee is quadratic" costs a whole sentence and I got nothing from it, and its job in the paragraph, showing that fee modelling is per-venue and non-trivial, survives without the word quadratic. Contrast the article, which explains its jargon as it goes and is much easier to follow than the homepage. | writer | Spend a few words where the jargon is load-bearing and cut it where it is decoration. For example "a prediction market whose fees grow faster than the size of the trade" carries the same point. Check: a reader outside betting and cloud infrastructure can restate what each of the three company blocks does. |

Six findings: **0 blockers, 2 important, 4 suggestions.** I did not find a broken link, a dead end other than R04-03, or anything that stopped me using the site.

## The assignment part: one strength and one change

**One specific strength.** The attribution line in the "Production AI infrastructure" entry: *"These were team-built systems and my contribution was a piece of each, not the whole thing."* Nobody writes that sentence on a personal site. It sits directly under the most impressive number on the page, "took the serving footprint from 32 H100s to 4," and it voluntarily gives back credit at the exact moment most people would take it. The effect is the opposite of modesty: I believed the 32-to-4 number *because* he limited it. The same instinct shows up in the article ("caught before launch and before a single person was billed") and in the EdgeBet block ("there is no pick record to point at"). It is the most distinctive thing about the writing and it should be protected in any future edit.

**One specific change.** Add a "More writing" block at the foot of each article with the other two titles as links (R04-03). Right now, `/writing/the-30x-bug/` ends and the only thing on offer is "Back to Evan Baker," which lands at the top of the homepage with the Writing list three sections down and absent from the nav. I had just finished an article I liked and the site made me work to read a second one. Two links at the bottom of the page fixes it, and it does not require reversing the decision to keep `/writing/` unlinked.

## Ideas and alternatives

Optional, not launch scope, and clearly labelled as my preference:

- Outbound links (`demarly.ai`, the App Store) carry `rel="noopener"` with no `target`, so they open in the same tab and replace the site. Either behaviour is defensible; I mention it only because the App Store link is the single strongest credibility artifact on the page and clicking it currently ends the visit.
- The homepage article list and the `/writing/` index render identical excerpts and categories. If the index stays deliberately unlinked, that duplication is fine and there is nothing to do.
- I considered arguing that "Nucli8, built, not launched" is too self-deprecating for a work section, and decided against it. The honesty is the point, and R04-02 is about ownership being unstated, not about the status being admitted.

## Proposed decision-log update

No new decision. R04-02 and R04-03 are proposed fixes for the coordinator to triage, not decisions. R04-05 touches an input only Evan can close (the band caption) and I have deliberately not drafted copy for it.

For Q3 candidate notes: nothing from this review. I am a simulated reviewer and no agent proposal was overruled here.

## Handoff

- Acceptance criteria met or unmet: met for the review as scoped. Unmet through no fault of the candidate: I could not view the site rendered, so the visual, responsive, contrast, zoom and keyboard portions of a normal newcomer pass are **not run** by me and must come from the design and coding reports instead.
- Blocker and missing input, if any: no blocker. Access limitation only, recorded above.
- Next owner and task recommendation: coordinator triage. R04-03 to coding (article footer links), R04-02 to writer (name Nucli8's relationship at first mention). R04-01 and R04-04 to design and writer as optional. R04-05 stays with Evan.
- Checks or reviews that must be rerun after a change: if the article footer or the homepage nav changes, re-run the internal-link and navigation-path check, and re-run this classmate pass on the new candidate. Copy edits to the Nucli8 entry or the hero would invalidate the comprehension findings above but nothing else in this report. Neither this review nor any rerun of it substitutes for H02, the real 60-second check with an unfamiliar person, or for H05, Evan's own comments on three classmates' sites.
