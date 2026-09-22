# P01: Accept implementation handoffs and record accepted decisions

- Role / assignee / run: coordinator / main session / run 01
- Date: 2026-09-10
- Status: complete
- Scope: implementation (handoff acceptance)
- Candidate revision and URL, if applicable: none frozen yet; candidate is prepared under P03
- Inputs actually inspected: context/homepage-copy.md, context/claim-review.md, the three revised drafts in writing/, reports/W01-W02-writer-01.md, reports/design-spec.md, reports/D01-design-01.md, reports/C01-coding-01.md, package.json, next.config.mjs, .gitignore, AGENTS.md, the running dev and preview servers
- Assigned write scope: todo.md, website-plan.md, DECISIONS.md, reports/P01-coordinator-01.md, and the coordinator-resolution block appended to context/homepage-copy.md
- Files changed: todo.md, website-plan.md, context/homepage-copy.md, reports/P01-coordinator-01.md

## Work and result

Accepted the three preparation handoffs on the LOCAL-PREVIEW path that AGENT-WORKFLOW.md allows: W01/W02 provisional revisions stand in for H01, which stays open. This is not publication approval and nothing here marks H01 complete.

Verified each handoff rather than accepting the agents' summaries:

- **Writer.** Read the full copy package and all three revised articles. The editorial queue in website-plan.md section 4 is genuinely addressed, not just claimed. The two corrections that mattered most both landed: the unmeasured "a 30% edge almost never means the market is wrong" frequency claim is now written as an encoded prior with "EdgeBet has no backtest. I have no measured number" stated in the body, and the approval piece's truthfulness claim is downgraded to a mitigation with a "where the guarantee stops" section. The writer also caught a mechanism error nobody had flagged: the approval wrapper is the chat surface only, while scheduled workflows drop write tools entirely.
- **Design.** Recomputed the WCAG relative luminance for four of the specced pairs by hand. #4D4D4D on white is 8.45:1, #1F3352 is 12.70:1, #6B4A2F is 7.94:1, #B8B8B8 on black is 10.59:1. All four matched the spec to two decimals, so the contrast table is real arithmetic rather than plausible-looking numbers.
- **Coding.** Independently confirmed the two claims with real downside. AGENTS.md is back to its original 11 lines with no injected block and no em dash, and `agentRules: false` is set in next.config.mjs. `git add -A --dry-run` stages nothing from context/, writing/, node_modules, .next, or out/, and `git check-ignore` confirms each individually.

## Decisions recorded and issued to coding

| # | Decision | Alternative rejected | Why |
|---|---|---|---|
| 1 | White paper, black ink, one full-bleed black band | Black base (the plan's earlier provisional note) | The approved brown and navy only work as ink on a light base. On black they must lighten into tan and pale blue, which is the beige outcome CLAUDE.md bans. Three long articles also read better light, especially at 200% zoom. Still overwhelmingly black and white. |
| 2 | Bold move is the method line SVG | Oversized hero name | The diagram answers "what connects the companies" in about two seconds, which is exactly what the H02 reader check asks. RESOURCES.md names the oversized name as its own example, making it the default move. |
| 3 | EdgeBet links to the real App Store listing | Plain text, or a guessed URL | Evan supplied the URL and the coordinator fetched it: it resolves to "Edgebet" by "Edgebet LLC", Sports category. |
| 4 | No LinkedIn row | Guessing a vanity slug | Evan declined LinkedIn for v1. No URL existed in any context file, and a wrong profile link is worse than two channels. |
| 5 | Omit article dates entirely | Rendering "September 2026" from the draft headers | The articles are not published. A publication date that precedes publication is a fabricated fact, small but real. Category still renders. |
| 6 | Retitle to "Draft anything, send nothing", slug `draft-anything-send-nothing` | Keeping "Your AI agents shouldn't be able to lie to you" | The old title claimed a truthfulness property the architecture does not deliver. The new title is the property that is actually enforced. |
| 7 | Keep a minimal `/writing/` index | Dropping it to hold the compact-launch line | Prevents a 404 on a truncated article URL and gives the three pieces a parent. Reuses existing copy, invents none. |
| 8 | Delete `content/articles/scaffold-route-check.md` | Leaving it | Coding flagged it as the one tracked file that could embarrass us if it shipped. |
| 9 | Leave root `index.html` and `style.css` in place | Deleting now | Nothing is being committed or deployed this session. They do not enter the export. This becomes a deploy-time task. |
| 10 | Add `app/icon.svg` | Leaving the `/favicon.ico` 404 | Real defect coding found; Lighthouse logs it as a console error on every page. |

## Items closed without re-asking Evan

- **"32 H100s to 4"**: the writer routed this back as needing Evan. It does not. Evan approved the resume metrics on 2026-09-10 in website-plan.md section 2, and per the CLAUDE.md source-of-truth hierarchy that dated decision supersedes main.md section 53's older verify-before-publication caution. AGENT-WORKFLOW.md forbids re-requesting already accepted preferences. Kept as written.
- **400+ medical facilities / 250K+ patients**: the writer cut these and called it a plan disagreement. Accepted as a valid reading, not an override. Section 2 approves the resume metrics for *selective* use, and declining the two highest-disclosure-risk numbers is selection. Recorded as available to reinstate if Evan asks.

## Evidence and checks

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| Design's contrast table is real arithmetic | Hand-recomputed WCAG luminance for 4 pairs | pass | A fabricated or estimated table would have missed on at least one pair. |
| AGENTS.md survived Next 16's auto-edit | `wc -l` -> 11; grep for em dash and injected block -> none | pass | Next 16's `next dev` appends a managed block on every start. Without `agentRules: false` it would regenerate. |
| No private file can be staged | `git add -A --dry-run`; `git check-ignore` on 7 paths | pass | Removing `context/*` or `writing/*` from .gitignore would expose the private voice brief and unapproved drafts in a public repo. |
| App Store URL resolves to Evan's app | WebFetch of the listing | pass | A 404 or a different developer name would have meant a wrong link shipping on the homepage. |
| Copy carries no invented metric | Read all 8 homepage blocks and context/claim-review.md | pass | Any user, revenue, download, or uptime number would fail CLAUDE.md's hard rule. |
| Rendered site matches the spec | not run | not run | C03/C04 had not returned when this was written. D02 and C05 cover it. |

## Ideas and alternatives

- Considered asking Evan to confirm the palette polarity before building. Rejected: he explicitly authorized routine decisions without stopping, the plan marked the black base "provisional", and stalling the build on a reversible CSS-token decision would have cost more than it saved. Flagged to him in the session summary instead, since it is the most visible single choice made on his behalf.
- The `/writing/` index is the one place launch scope grew. Kept it deliberately small so it cannot become a second content surface.

## Proposed decision-log update

Q2 (the fork): the palette polarity flip is a genuine two-way choice with a real cost, and it is a better Q2 answer than the stack change alone. Draft for Evan's review under Q1/Q2.

Q3: two candidate moments to log factually, both already recorded. Evan writes the final answer.

## Handoff

- Acceptance criteria met: copy revisions, visual spec, link targets, and article approach are all explicit. DECISIONS draft markers preserved.
- Open, and correctly still open: H01 byline approval, the 30x bug attribution, a real commercial anecdote per company, graduation timing, and whether the repo is renamed to `evanbaker315.github.io`.
- Next owner: coding (C03 + C04), then writer (W03), coding (C05), design (D02), then P03 candidate freeze.
- Checks to rerun after a change: none yet.
