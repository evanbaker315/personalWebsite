# M01: Restrained link and section motion

- Role / assignee / run: coding / motion-01
- Date: 2026-09-22
- Status: partial
- Scope: implementation
- Candidate revision and URL: working tree, local dev port 3100; coordinator validates export.
- Inputs actually inspected: CLAUDE.md, AGENT-WORKFLOW.md, website-plan.md, todo.md, coding role, report template, context/main.md current direction, RESOURCES.md, DECISIONS.md, existing app/components, Impeccable animate and craft-floor references. Coordinator supplied the skill context and current MDN observer/reduced-motion checks.
- Assigned write scope: globals/page, Section TSX/CSS, necessary link CSS, this report.
- Files changed: app/globals.css, app/page.tsx, components/Section.tsx, components/Section.module.css, components/Hero.module.css, components/Contact.module.css, components/CompanyEntry.module.css, reports/M01-coding-01.md.

## Work and result

Text links retain a permanent 1px navy underline. A 2px stroke draws left to right on hover or keyboard focus over 180ms with ease-out. Both strokes share their position so they cannot become two separate lines. The existing focus ring remains. Skip links, progress rail links, and image/SVG anchors are excluded. Forced-colors mode restores the native text underline. Mobile padded links position the stroke below their text, and screenshot caption links fit their text rather than drawing across the whole column.

Only Work and Writing opt into the section effect. The existing 16px, all-section reveal becomes 8px over 320ms without bounce or stagger. IntersectionObserver disconnects after the first entry, and threshold zero works for tall sections. Server markup is visible. Missing observer support, an initially visible section, or initial reduced-motion preference skips hiding. Live reduced-motion changes reveal remaining content immediately. Focus and hash targets bypass animation through CSS and event handlers.

Implementation is complete. Browser/build acceptance remains with the coordinator.

## Evidence and checks

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| TypeScript | npm run typecheck | pass | Invalid prop/event/observer types |
| Lint | npm run lint | pass | React effect or stylesheet-adjacent source errors |
| No library added | Existing dependency files unchanged | pass | A new runtime animation dependency |
| Visual, keyboard, reduced-motion, no-JS, export | Coordinator owns combined checks | not run by coding worker | Browser rendering and real interaction still require verification |

Typecheck and lint ran after the TSX changes; the final follow-up changed only CSS to consolidate underline strokes and bound caption width.

## Findings

The incumbent reveal was on every section and moved 16px. It also used a 10% intersection ratio that can defer tall content and did not explicitly show pending content when reduced motion was selected. Replaced those behaviors within this task. No additional findings in the inspected scope. Browser testing remains pending.

## Ideas and alternatives

Underline-only remains the smaller alternative. The accepted implementation limits the secondary reveal to two sections. The permanent underline retains discoverability without hover, while the additional thickness provides feedback. Background decoration allows wrapped inline link fragments to receive the stroke without changing their layout. The existing method rail stays intact.

## Proposed decision-log update

Q2: Use a 180ms navy underline draw plus selective 8px reveals for Work and Writing. Give up site-wide entrance effects in favor of restrained motion, preserve a static underline, and make reduced motion and direct navigation instant. Implementation uses existing CSS/IntersectionObserver with no library. Browser evidence should be added only after coordinator checks.

## Handoff

- Acceptance criteria met: code change, selective motion, fallback implementation, typecheck and lint.
- Unmet: coordinator production build and rendered verification.
- Blocker and missing input: none.
- Next owner: coordinator, inspect dev and static export at desktop/mobile/zoom and run accessibility/motion interactions.
- Recheck after changes: wrapped links, caption link underline width, focus/hash navigation, live preference changes, tall sections, no JavaScript and unavailable observer.
