# Review candidate C1

Frozen by the coordinator on 2026-09-10 for tasks R01 to R04.

## Identity

| Field | Value |
|---|---|
| Candidate ID | **C1** |
| Local URL (static export, the artifact that would deploy) | http://localhost:4321/ |
| Local URL (dev server, for comparison only) | http://localhost:3100/ |
| Live URL | **none. Nothing is deployed.** |
| Git commit | `77a110a` with 20 uncommitted paths. Nothing in this candidate is committed. |
| Source manifest hash (app, components, lib, content) | `137dbb18d8810cbcf1e7029b5e8e2cbd` |
| Export manifest hash (out/) | `4160a5a5516bf8caa281043465831407` |
| `out/index.html` md5 | `374597ccaa64fe4dd07189066a5e0826` |

The export was built once at 17:14 with the dev server stopped, and every check since has run against that one build. **The site is frozen for the duration of the review round.** No agent rebuilds, edits app code, or touches content while R01 to R04 are open. This rule exists because a rebuild moved the artifact underneath a verifying agent twice earlier in the session (finding W-20).

## Pages in scope

Exactly five routes. Nothing else exists.

1. `/` homepage: hero, black band with the method line, What I'm building (Demarly, EdgeBet), Selected work (4 entries), Writing (3 links), About, Contact, footer
2. `/writing/` index. **Deliberately unlinked** from the rest of the site; it exists so a truncated article URL lands on a real page instead of a 404 (recorded decision, design-07)
3. `/writing/the-30x-bug/`
4. `/writing/distrust-your-best-results/`
5. `/writing/draft-anything-send-nothing/`

Plus a 404 page and `/icon.svg`.

## Evidence already gathered

| Report | What it covers |
|---|---|
| reports/C03-C04-coordinator-01.md | The implementation, and five copy/design conflicts resolved during it |
| reports/W03-writer-02.md | Copy and claim review of the rendered pages |
| reports/C05-coding-02.md | Technical checks: Lighthouse, keyboard, zoom, console, basePath, external links, privacy |
| reports/D02-design-02.md | Rendered visual review at desktop, 640, mobile and 200% zoom |
| reports/F01-writer-03.md | Article heading-semantics fix |
| reports/F03-coding-03.md | Correction pass and its addendum, including the re-measured Lighthouse run |
| reports/design-spec.md | The specification the build was measured against |

Screenshots: /Users/evanbaker/.claude/jobs/9fcd68ec/tmp/shots and .../tmp/d02

Headline results, all measured rather than asserted: Lighthouse accessibility **100 on all four page types with zero failed audits**, re-measured after the final correction pass. axe-core 0 violations across 8 page/width combinations. No horizontal scroll and no element outside the viewport at 375, 640 or 1440. Zero navy or brown resolving anywhere inside the black band. Zero em dashes, draft markers or unresolved tokens in the export. `git add -A --dry-run` stages nothing from `context/`, `writing/`, `node_modules`, `.next` or `out/`.

## Known limitations, stated so reviewers do not report them as discoveries

1. **Nothing is deployed.** There is no live URL, no `verification/` folder, no video, no classmate comments, and no Canvas submission. These are real outstanding deliverables, not oversights to rediscover. Only the teacher reviewer should assess them, and only as pending.
2. **Evan's byline approval (H01) is open.** All three articles render provisionally under an explicit local-preview authorization. Nothing in this candidate is approved for publication.
3. **No publication dates render anywhere**, because the articles are not published. This is deliberate. A date that precedes publication would be a fabricated fact.
4. **No photo.** The About block is built to work without one and there is no empty container in the DOM.
5. **Four inputs are genuinely open and only Evan can close them:** the band caption (the slot under the diagram is currently empty on purpose, after an agent-written sentence was removed for making an unsupported claim), the 30x bug personal attribution, a real commercial anecdote for either company, and graduation timing.
6. **The repository is not renamed.** A GitHub Pages project site needs `basePath: /personalWebsite`, which has been built and verified but not deployed.

## Scope of review

Reviewers read the candidate-facing pages and may follow the public links on them. Investor, boss and classmate receive **only** the URL and their own role brief: no private context, no brand narrative, no other reviewer's findings, and no explanation of what the site is trying to say. That is the point. If the page fails to communicate something, the report should record that failure rather than have it supplied. Teacher additionally receives README.md, DECISIONS.md, todo.md and the reports directory.

Every review is a **simulated perspective**. No reviewer promises funding, employer clearance, a grade, or counts as the real unfamiliar-reader check (H02) or as real classmate comments (H05).

Findings use stable IDs and include page, quote or observed behavior, observation versus inference, severity, why it matters, a proposed builder owner, and a check that would show it resolved. Missing evidence is an unknown, not proof of wrongdoing. Do not generate findings to fill a quota.
