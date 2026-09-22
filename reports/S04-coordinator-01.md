# S04: Next.js planning update

- Role / assignee / run: coordinator, main session, 01
- Date: 2026-09-10
- Status: complete
- Scope: preparation
- Candidate revision and URL: none; documentation update only
- Files changed: website-plan.md, CLAUDE.md, AGENT-WORKFLOW.md, todo.md, DECISIONS.md, .claude/agents/coding.md, .claude/agents/writer.md, context/main.md, coordinator-prompt.md, and this report

## Work and result

Recorded Evan's choice of Next.js. Replaced active plain-HTML/no-build rules with an App Router, TypeScript, shared CSS/components, and static-export plan. GitHub Pages remains the course target, with a later Actions deployment of out/ instead of branch-root source serving. Historical decision-log entries remain historical and are superseded by the new dated decision.

Changed the article approach to tracked public content/articles/ sources, generated routes, and a shared layout. Private writing/ and context/ remain excluded from application builds. Added dev and production-export verification, deployment-path handling, and clear local-preview versus publication approval boundaries. Saved the full coordinator build prompt in coordinator-prompt.md.

## Evidence and checks

| Check | Evidence | Result | Limitation / failure condition |
|---|---|---|---|
| Platform approach | Official Next.js static-export/basePath docs and GitHub Pages custom-workflow docs, linked in website-plan.md | reviewed | Implementation must verify installed versions and actual repository configuration |
| Active-rule consistency | Search across plan, rules, workflow, board, and builder definitions | pass | Active no-build/plain-HTML or manual article-HTML instructions would conflict with the new plan |
| Documentation structure | Direct text checks and git diff --check | pass | Duplicate task IDs, new em dashes, or whitespace-only lines would fail checks |
| Preserve current source | index.html, style.css, README.md, RESOURCES.md compared against HEAD | pass | No site code or original assignment/resource changes |
| Private inputs | git check-ignore for context/main.md and an article draft | pass | Existing ignore protections remain intact |
| Build/runtime | No package.json or app scaffold created | not run | No installation, local server, production build, deployment, or audience review performed |

## Ideas and alternatives

Shared components and article layouts justify the additional build setup. Static export preserves the Pages requirement without a backend. Public article sources avoid depending on ignored local drafts during CI. A local provisional-copy path prevents publication gates from blocking a preview while retaining honest approval status.

## Proposed decision-log update

Updated Q2 draft with the stack change and tradeoff. Added a factual candidate note about Evan correcting the stack; Evan retains ownership of his final Q3 answer. Neither document claims implementation has happened.

## Handoff

S04 is complete as documentation. The next coordinator can execute coordinator-prompt.md when Evan supplies it as the build instruction. Next.js setup, actual design/copy work, local runtime checks, export validation, and all publication/submission tasks remain pending.
