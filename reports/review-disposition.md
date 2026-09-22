# P04: disposition of the four audience reviews

Coordinator, 2026-09-10. Candidate C1. Reviews: reports/R01-investor-01.md, R02-boss-01.md, R03-teacher-01.md, R04-classmate-01.md.

Totals as returned: R01 0 blocker / 5 important / 4 suggestion. R02 0 / 4 / 1. R03 6 / 8 / 2. R04 0 / 2 / 4.

Review completion is not site approval. Nothing here marks H01 satisfied or authorizes a deploy.

## A limitation of this round, stated before the findings

**Three of the four reviewers never saw the site rendered.** WebFetch refuses `localhost`, and R01, R02 and R04 had no shell tool, so they read the static HTML under `out/` with no CSS applied. Each said so unprompted, which is the correct behavior, and each correctly declined to offer layout, contrast, mobile or zoom judgment.

So this round is a **content, claim and structure** review. It is not audience sign-off on the rendered design. D02 inspected real renders, but that is the designer's lens, not a reader's. If a rendered audience pass is wanted, it needs screenshots supplied in the packet or a fetchable non-localhost URL. Recorded as a real gap rather than papered over. It does not block anything, because the findings that did land are content findings and are valid as written.

## The convergence that matters most

Four reviewers working blind and separately hit the same structural problem from four directions: **an article page carries no ownership context and no way out.**

- R02-05: `/writing/distrust-your-best-results/` publishes EdgeBet's weighting parameters and never says EdgeBet is Evan's.
- R04-03: every article page contains exactly two internal links and both go to `/`. Finishing an article dumps the reader at the top of a long homepage with the Writing list three sections down.
- R04-02: Nucli8's ownership is never stated before About; it first appears as a bare source label while the employer entry directly below it does state its relationship.
- R01-05: no public artifact linked anywhere ties Evan to any venture.

Independent convergence from readers who could not see each other's reports is the strongest signal this round produced. Treated as one root cause with one fix pass rather than four separate patches.

## The second convergence, which is a genuine tension rather than a defect

Three reviewers landed on the same sentence, `took the serving footprint from 32 H100s to 4`, and did not agree about it:

- R01-04: the largest quantitative claim carries the least specific attribution, so careful readers discount it to zero and careless ones over-credit. Fix is more specificity, not less claim.
- R02-02: credit is borrowed and vanished at the same time, because a first-person result sits under a blanket hedge covering three different systems.
- R04, unprompted, named that same hedge (`These were team-built systems and my contribution was a piece of each, not the whole thing`) as **the reason it believed the number**.

The hedge is simultaneously why the sentence is credible to a newcomer and why it is uncreditable to a professional. That cannot be resolved by rewording, because it is a factual gap: only Evan knows which of the three systems the H100 redesign was and what his part in it was. **Routed to Evan, not to the writer.**

## Disposition

Accepted means it becomes a named task. Needs Evan means no agent may resolve it.

| ID | Source | Disposition | Owner | Rationale |
|---|---|---|---|---|
| R01-01 | GitHub profile has 0 public repositories and no bio | **needs Evan** | Evan | The only technical-evidence route on the site. Private repos are a normal explanation the visitor cannot see. Pin something public, add a bio, or accept the cost knowingly. No agent can decide which. |
| R01-02 | Demarly entry states no status while EdgeBet and Nucli8 both do | **accepted** | writer | `Demarly live` is already a verified claim recorded in website-plan.md section 2, so a status line needs no new approval. The reviewer separately confirmed a live signup flow. Availability is not a traction claim. Do NOT add pricing: it was observed on a landing page, not confirmed by Evan, and it can change. |
| R01-03 | The stated thesis is generic; the site's real, unstated thesis is that every system is structurally prevented from acting alone | **accepted, draft only** | writer, then Evan | Four for four across Demarly, Nucli8, EdgeBet and the employed work, and Evan already wrote the line himself in an article ("Prompts are requests. Architecture is the rule."). This is derived from the site's own published evidence, not invented. It is still a claim about how Evan thinks, so the draft goes to Evan rather than shipping. |
| R01-04, R02-02 | The 32 H100s attribution is too blanket to credit | **needs Evan** | Evan | See the tension above. Factual gap, not a wording problem. |
| R01-05 | No public artifact ties Evan to any venture | **needs Evan, outside this repo** | Evan | An unknown, not an allegation, and the reviewer labeled it that way. The cheapest fix is a founder line on demarly.ai, which is not this repository. |
| R02-01 | About says "Alongside the companies I've worked professionally"; Selected work says "Before the companies, I worked on AI systems" | **needs Evan** | Evan | Two different situations, only one accurate. A one-word fix once he says which. The best catch of the round: four other passes read both sentences and none noticed they disagree. |
| R02-03 | Attribution suggestion, folded into the R02-02 copy pass | **deferred into** R02-02 | writer | Not a separate task. |
| R02-04 | The 32 H100s figure as a named-employer capacity number needing clearance | **already closed, not re-asked** | none | P01 closed this: Evan approved the resume metrics on 2026-09-10 and that dated decision supersedes the older verify-before-publication caution. AGENT-WORKFLOW.md forbids re-requesting accepted preferences. The reviewer reached it blind and from the employer lens rather than the "did Evan approve it" lens, so it is surfaced to Evan once, as information, and not re-routed as an open question. |
| R02-05, R04-02 | Article pages and work entries carry no ownership context | **accepted** | writer | Root cause above. One copy pass, not two. |
| R04-03 | Article pages are a dead end; both internal links go to `/` | **accepted** | coding, design consulted | Does not require reversing design-07. Design explicitly rejected a "view all" row with an arrow glyph on the homepage; that ruling is about the homepage and does not forbid an exit from an article. |
| R04, first-impression note | The method line did not decode; the reader skipped it and found the connection only in About | **needs Evan** | Evan | **Evidence against a design assumption, recorded as such.** The method line was chosen over an oversized name specifically because it would answer "what connects the companies" in about two seconds (design-spec section 1). A blind first reader says it did not. This is partly downstream of the coordinator's own W-12 fix: the caption that was meant to decode the diagram was deleted for making an unsupported claim, and no agent may write its replacement. Either Evan writes a caption line, or the diagram is reconsidered on this evidence. Do not let an agent quietly resolve this by writing new words. |
| R03-01, R03-08 | Nothing is committed; no deploy mechanism exists | **accepted, blocked on authorization** | coding | Correct and already known. Deployment is explicitly unauthorized in this session. Stays pending, not silently deferred. |
| R03-09 | Repo name decides basePath and therefore the build command | **needs Evan** | Evan | One sentence from him unblocks the whole deploy chain. |
| R03-10 | H01 open, so deploying now publishes three unapproved articles under Evan's byline | **accepted as a gate** | coordinator | Correctly identified as gating the deploy rather than following it. The reviewer's optional middle path (deploy the homepage first to prove the pipeline, add articles after H01) is recorded as a real option for Evan. |
| R03-02..07, R03-11..16 | Remaining deliverable and process items | **accepted as already-tracked** | mixed | Verification folder, video, classmate comments, Q3 and Q5 are all already unchecked tasks on the board. No new tasks created for items the board already carries. R03-15 (README's stale framework recommendation) noted; CLAUDE.md already records that the Next.js decision supersedes it. |

## Rejected

Nothing was rejected outright. Two items were closed rather than actioned (R02-04, already decided) and one was folded (R02-03).

## What no agent may do next

Writing the band caption, resolving the employment timeline, deciding the GitHub profile question, supplying the H100 attribution, approving the articles, choosing the repository name, deploying, recording the video, writing Q3, or contacting classmates. Every one of these is Evan's, and several were reached independently by reviewers who could not see each other's work.
