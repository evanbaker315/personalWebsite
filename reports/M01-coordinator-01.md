# M01: Motion implementation acceptance

- Role / assignee / run: Coordinator / main session / 01
- Date: 2026-09-22
- Status: complete
- Scope: implementation and technical review
- Candidate: local working tree; http://localhost:3100 and static export at http://localhost:4321
- Inputs inspected: project rules, motion plan, coding role, Impeccable animate and craft-floor references, changed components and styles, coding report
- Assigned write scope: shared plan, board, decision log, this report; coding agent owned application edits
- Files changed: website-plan.md, todo.md, DECISIONS.md, this report; application files listed in reports/M01-coding-01.md

## Work and result

Accepted the coding agent's 180ms navy underline draw, with a persistent 1px cue, and once-only 8px reveals on Work and Writing. Other sections stay immediate. Reduced motion, focus, and hash navigation bypass the reveal. No animation dependency added. Recorded Evan's implementation authorization and updated the motion plan and draft Q2 paragraph without changing Q3.

## Evidence and checks

| Check | Evidence | Result | Limitation |
|---|---|---|---|
| Typecheck and lint | Coding report | pass | Local code checks |
| Production export | npm run build | pass | No deployment performed |
| Motion and navigation | /tmp/motion-check.cjs against dev and static at 1440, 375, 640px | pass | Chrome; 640px checks reflow equivalent to a 1280px viewport at 200%, not browser zoom itself |
| Underline timing and color | Computed transition 0.18s, navy rgb(31, 51, 82), hover stroke 100% 2px | pass | Static screenshots alone do not establish timing |
| Reveal behavior | Initial pending Work/Writing translateY 8px; visible after scroll, focus and direct hash | pass | Selected sections only |
| Reduced motion and script fallbacks | Live preference change, initial reduce, no JavaScript, missing IntersectionObserver | pass | Automated browser emulation |
| High contrast | forced-colors emulation retains native underline | pass | Chrome emulation |
| Accessibility | axe: 0 violations in all six page/width combinations; Lighthouse accessibility 100 | pass | Automated audits do not replace all manual accessibility review |
| Visual inspection | /tmp/motion-nav.png, /tmp/motion-4321-1440.png, /tmp/motion-4321-375.png | pass | Reviewed nav and revealed Writing layout; no claim of a full-site redesign review |
| Overflow and runtime errors | Same six browser combinations | pass | No horizontal overflow or page errors |
| Impeccable detector | Changed UI files | pass | 0 findings |

## Findings

No remaining findings in the changed scope. Existing unrelated edits in README.md and DECISIONS.md were preserved.

## Ideas and alternatives

Underline only remains the simpler alternative. Two opt-in sections keep the added motion limited. The existing method rail keeps its established behavior and palette.

## Decision-log update

Added a marked Q2 draft describing the selected motion, underline-only alternative, and extra accessibility handling. Evan retains final wording approval.

## Handoff

- Acceptance criteria met: requested motion implemented and locally verified.
- Blocker: none.
- Preview: http://localhost:3100; restart with npm run dev. Static preview: http://localhost:4321; restart with npm run preview after npm run build.
- Deployment and unrelated course deliverables remain outside this task.

Documentation consulted: [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion). Context7 was unavailable in this session; MDN was used directly.
