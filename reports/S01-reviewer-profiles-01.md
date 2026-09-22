# S01: Audience reviewer definitions

- Role / assignee / run: preparation assistant, reviewer-profiles subagent, 01
- Date: 2026-09-10
- Status: complete
- Scope: preparation
- Candidate revision and URL, if applicable: not applicable; no website reviewed
- Inputs actually inspected: `CLAUDE.md`, `README.md`, `DECISIONS.md`, the coordinator's assignment, the four created definitions, and `reports/TEMPLATE.md`
- Assigned write scope: four audience reviewer definitions; this setup report
- Files changed: `.claude/agents/investor.md`, `.claude/agents/boss.md`, `.claude/agents/teacher.md`, `.claude/agents/classmate.md`, and this report

## Work and result

Created four project-local reviewer definitions with the requested names and tools. Each requires a stable candidate, evidence-backed findings, clear access limits, and a report at its assigned path. They hand off fixes to the coordinator instead of editing shared tracking or the website.

Investor, employer, and classmate roles record independent public first impressions. Teacher review uses the assignment and actual submission evidence. All perspectives are explicitly simulated. This setup task performed no audience review, implementation, or deployment.

## Evidence and checks

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| All four files exist and their frontmatter names match | Python assertions against `.claude/agents/{investor,boss,teacher,classmate}.md` | pass | Missing file or mismatched `name` value |
| No em dashes in definitions | Python character check of all four definitions | pass | An em dash anywhere in their contents |
| Definitions remain concise | Counted 36, 37, 37, and 38 lines respectively | pass | Exceeding the assigned approximate 60-line size |
| Agent runtime and website behavior | No agents invoked on a site | not run | File checks do not establish runtime discovery or actual review quality |

## Findings (reviews or discovered defects)

No findings in the inspected setup scope. No website pages were inspected.

## Ideas and alternatives

The public first-pass approach should help reveal unclear positioning without filling gaps from private context. Keep those initial impressions separate from later factual clarification. The coordinator was alerted that shared session-start rules need to permit this review order; those shared files were outside this subtask's write scope.

## Proposed decision-log update

No new decision. These definitions implement the agent roles Evan requested.

## Handoff

- Acceptance criteria met or unmet: four definitions created with requested scope, tools, reporting boundaries, and audience distinctions.
- Blocker and missing input, if any: none for setup; actual reviews require a finished candidate and assigned review packet.
- Next owner and task recommendation: coordinator integrates the definitions with the workflow, shared rules, and task board.
- Checks or reviews that must be rerun after a change: check frontmatter and project style after editing definitions; verify runtime availability when agents are first invoked. Actual audience reviews remain future tasks.
