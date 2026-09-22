# IM03: Product screenshot integration

- Role / assignee / run: coordinator / main session / 01
- Date: 2026-09-22
- Status: partial
- Scope: implementation
- Candidate: local homepage, IM02
- Inputs inspected: both original images, current company source/CSS, IM01 design handoff, project rules and plan
- Write scope: todo.md, website-plan.md, DECISIONS.md, this report
- Files changed: those shared records

## Work and result

Recorded authorization and supplied image mapping. Design specified complete original screenshots and coding implemented their presentation. The Demarly hierarchy fills the current column; EdgeBet uses a bounded portrait beside copy on desktop and stacks on mobile. Both have descriptive alt, a caption and a full-size asset link. The original files remain untouched.

## Evidence and checks

| Check | Evidence | Result | Limitation |
|---|---|---|---|
| Product mapping | Coordinator viewed both original PNGs | pass | Image contents only, no product operation tested |
| Asset integrity | Original and public bytes compared independently | pass | EdgeBet 169886 bytes; Demarly 556654 bytes |
| Source scope | CompanyEntry, CSS and homepage inspected | pass | Existing copy and navigation retained; company diagrams replaced |
| Rendered checks | IM02 and design follow-up | pending | Awaiting stable captures |

## Findings

No source defects identified. Demarly text is small at page width, so full-size access is part of the design rather than a promise that every screenshot label is readable on mobile.

## Ideas and alternatives

Kept actual product colors rather than applying the site palette to the screenshots. Rejected equal-sized image containers, decorative device frames and cropping away the supplied context.

## Proposed decision-log update

Q1 draft records the choice of actual product screens over custom illustrations, with full-size access for detail. No Q3 answer written.

## Handoff

Implementation source reviewed. Final acceptance awaits coding evidence and rendered design inspection. No deployment performed.
