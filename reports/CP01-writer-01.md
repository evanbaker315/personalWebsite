# CP01: Homepage copy refinement

- Role / assignee / run: writer / copy_refinement / 01
- Date: 2026-09-22
- Status: complete
- Scope: preparation
- Candidate revision and URL, if applicable: current local source, no rendered review
- Inputs actually inspected: CLAUDE.md, AGENT-WORKFLOW.md, website-plan.md, todo.md task, DECISIONS.md opening, writer role, report template, current Hero/About/page source, WorkEntry component, private voice and relevant brand/venture evidence
- Assigned write scope: context/homepage-refinement.md and this report
- Files changed: context/homepage-refinement.md, reports/CP01-writer-01.md

## Work and result

Prepared exact replacement copy for the opening, company entries, technical evidence and About. The opening states what Evan builds. Company entries explain the products and retain the compute-markup and tools-versus-picks decisions. Technical mechanisms now sit in Selected Work without long duplicate company explanations. About retains location, education and the production-cost line while dropping the repeated venture summary.

The package includes an inline link to the existing Never bill twice article. Professional work stays verbatim, including team attribution. Article text is outside this task.

## Evidence and checks

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| Product ownership and useful tasks | Current page and project evidence | pass | No independent new product audit performed |
| Opinion retention | Copy package company paragraphs | pass | Integration still required |
| Technical claims | Venture evidence for ledger, consensus and optimization | pass | Checks source descriptions, not live product behavior |
| Privacy and voice | Copy package read against project rules | pass | Only public-safe existing facts used |
| Rendered layout and link | Not run | not run | Coding must check new text and article link in export |

## Findings (reviews or discovered defects)

| ID | Location / quote / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| CP01-01 | Existing Nucli8 copy says cheapest covering set | Observation: source objective minimizes instance count | important | Dollar-optimal claim exceeds evidence | coding | Integrate supplied fewest-real-instances wording and preserve unlaunched attribution |
| CP01-02 | Existing EdgeBet copy says extreme edges get re-scored | Observation: described rerun applies to player props | suggestion | Narrowing avoids implying every market is rerun | coding | Integrate unusually high player-prop edges wording |

## Ideas and alternatives

Kept concrete product choices in company entries and moved deeper technical detail to Selected Work. Keeping all original explanations would preserve detail but preserve the repetition the user asked to remove. Product screenshots remain a separate later input.

## Proposed decision-log update

Q2: Give each homepage layer a distinct purpose: company entries explain useful products and decisions; Selected Work explains mechanisms; articles hold the full stories. Cut repeated prose instead of expanding the homepage. This copy package records the choice; integration and rendered verification remain pending.

## Handoff

- Acceptance criteria met or unmet: exact replacement package complete; implementation pending CP02.
- Blocker and missing input, if any: no blocker for this copy pass. Existing article byline and professional attribution questions remain in their existing workflow.
- Next owner and task recommendation: coding CP02 integrates context/homepage-refinement.md.
- Checks or reviews that must be rerun after a change: rendered text, article link with basePath, responsive wrapping and project technical checks.

## CP02 source transfer audit

Inspected components/Hero.tsx, components/About.tsx, app/page.tsx and app/layout.tsx after integration. All replacement body text, deck text and metadata match the exact package, allowing JSX apostrophe escaping and source line wrapping. The hero uses the coordinator-approved lead/tagline hierarchy with the same wording. The Never bill twice text is an inline Next Link to the specified article path.

The entire Production AI infrastructure WorkEntry is byte-identical to /tmp/homepage-cp02-baseline/page.tsx, confirmed with a Python assertion. No private editorial instructions or source notes were transferred into the four inspected files, and an assertion found no em dashes. Existing company URLs, section headings, Nucli8 launch status and professional attribution remain intact. Source transfer passes. No rendered page or build output was inspected in this audit; those checks remain with coding.
