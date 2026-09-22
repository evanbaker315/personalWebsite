# CLAUDE.md: Agent Rules for Evan Baker's Personal Website

This file is the operating contract for any agent working in this repo. The actual site plan and ideas live in `website-plan.md`. Builders read that file before content or design work. Audience reviewers follow AGENT-WORKFLOW.md's staged reading order: record their public first impression before reading the intended brand narrative or private context. Shared safety rules still apply.

## What this project is

A personal website for Evan Baker, built for CSCI 498E/598E Project 1 (see `README.md`), deployed to GitHub Pages. Two goals, in priority order:

1. **Hit the project requirements** in `README.md`: a live GitHub Pages site, a filled-in `DECISIONS.md`, a `verification/` folder with real proof, a submitted 3-5 minute video, and comments on three classmates' sites. Track all five deliverables through Canvas submission.
2. **Build a genuinely good personal website**: a founder home base, not a student portfolio, following the brand context in `context/main.md`.

If these ever conflict, requirement #1 wins. A working, verifiable, honest site beats a beautiful broken one.

**Current phase: preparation only (Evan, 2026-09-10).** Update rules, plans, and context. Do not implement the site, convert articles to HTML, start a design prototype, or deploy until Evan asks to begin building. The milestones below describe future work, not authorization to start it now.

## Agent team and task workflow

Evan requested three builders (coding, design, writer) and four simulated audience reviewers (investor, boss/employer, teacher, classmate). Role definitions live in `.claude/agents/`. Follow `AGENT-WORKFLOW.md`; use `todo.md` for operational task ownership, dependencies, and completion evidence. The main session coordinates; the boss agent is only an employer reviewer.

Every agent leaves a Markdown work/review report using `reports/TEMPLATE.md`, including ideas, checks actually run, limitations, and proposed decision notes. Report names are unique per task/role/round. Reviewers assess a finished stable candidate and write findings; builders perform accepted fixes. Simulated reviews never count as actual grades, employer approvals, investor decisions, or classmate participation.

While agents run in parallel, only the coordinator edits todo.md, website-plan.md, and DECISIONS.md. Workers propose updates in reports, and the coordinator integrates them as part of task completion. Assigned work needs non-overlapping file ownership. Current authorization covers team/workflow setup, not website implementation or deployment. Later phase authorization should be recorded and reused rather than repeatedly requested.

## Source-of-truth hierarchy

1. `README.md`: project requirements and grading reality. Non-negotiable.
2. `context/main.md`: primary brand context. Factual accuracy, privacy, and Evan's explicit voice and positioning constraints are firm. Suggested copy, alternative layouts, and example sections are guidance, not simultaneous requirements. Its current-direction note and Evan's latest decisions in `website-plan.md` supersede older suggestions.
3. `context/demarly-context.md`, `context/edgebet-mobile-context.md`, `context/edgebetBackend-context.md`, `context/nucli8-context.md`: venture-specific facts. Claims must trace to supported evidence in these files or a dated confirmation in `website-plan.md`. Respect whether evidence describes the mobile client, backend, planned work, or a live product; do not turn a component-specific statement into a product-wide claim.
4. `context/voice.md`: private brief on how Evan actually talks. Every sentence of site copy and every DECISIONS.md draft gets checked against it.
5. `RESOURCES.md`: design guidance. Apply its restraint and readability principles within Evan's explicit preferences, including the approved black/white palette with optional brown and navy accents.
6. `website-plan.md`: the concrete plan derived from all of the above, including the "Verified claims" section that records what Evan has personally confirmed. Update it when decisions change; it should always reflect reality.

## Credibility rules (hard constraints)

These come from `context/main.md` §16, §35, §36, §53 and the per-venture "Website-Safe Claims" sections. They are not suggestions.

- **Never invent or extrapolate metrics.** No revenue, user counts, customers, conversion, uptime, or traction numbers appear anywhere in the repos, so they appear nowhere on the site.
- **"Definitely supported" claims** from the venture context files may be used as written.
- **"Verify before publishing" claims** may be used only after Evan confirms them; confirmed items are recorded in `website-plan.md` under "Verified claims" with a date. Anything not on that list stays off the site, or gets the narrower non-numeric framing the context files provide.
- **"Do not claim" lists** in each context file are absolute.
- Never describe planned, feature-flagged, or design-doc work as shipped. Nucli8's line-distribution model, EdgeBet's "BetGPT" and parlay optimizer, Demarly's CI/CD phases: all planned, all labeled as such or omitted.
- Do not call Nucli8 "AI-powered" (it isn't). Do not present EdgeBet as a picks/gambling product or imply user profitability. Do not call Evan a "serial entrepreneur."
- When uncertain, make the claim narrower. Prefer a technically specific claim over an impressive uncertain number.
- Voice review and claim review are separate. Check the reasoning, assumptions, and evidence even when a sentence sounds like Evan. An implemented approval gate does not prove a model cannot make false claims. Label mathematical assumptions, qualify broad generalizations, and verify external claims before publication. Pending article-specific fixes live in `website-plan.md` and `context/content-brief.md`.

## Privacy rules (hard constraints)

The repo is public and its full git history is public.

- **Never commit anything from `context/`.** It is gitignored (`context/*` in `.gitignore`); never weaken or remove that entry, and never copy raw resume detail, employer-internal architecture, client info, or unverified numbers from context files into committed files.
- **`context/voice.md` contains sensitive personal background.** It shapes tone only. None of its backstory ever appears in any committed file or on the site, in any form, including hints or "overcame adversity" framing.
- Never publish: phone number, home/street address, GPA, employer-internal details, API keys, or credentials of any kind. Check every file before committing.
- Contact on the site is limited to channels Evan has approved in `website-plan.md`.
- No photos of other people; no personal photos unless Evan supplies them and approves their use.
- If Evan asks to add something that would leak private info, flag it before committing.

## Writing voice

From `context/main.md` §21-22 and §38, calibrated by `context/voice.md` (which includes real writing samples). The short version: Evan's voice is raw and plain, Denver not prep school. He is a college-educated founder with corporate engineering experience, but he talks straight. Short declarative sentences. Concrete over grand. Technical when useful, never jargon-heavy. Understated confidence: the site provides evidence and lets the visitor conclude Evan is impressive; it never says so itself.

- **No em dashes. Ever. Anywhere.** Not in site copy, not in DECISIONS.md, not in any file written for this project. Use periods, commas, colons, or parentheses instead. This is a hard rule from Evan.
- **Gen Z and street slang is welcome on the site.** "Cooked," "maxing," casual hedges like "kinda": these are Evan's real words. Use them where they land naturally; don't force them, and don't sand them off either.
- **The samples in `context/voice.md` are his MAX polish.** He talks less polished in real life. If copy reads more formal than those samples, it's wrong; rewrite it down, never up.
- No academic or essay polish: no "moreover," "furthermore," "it is worth noting," "endeavor," "myriad," "whilst," or sentences with stacked subordinate clauses.
- Banned words on the site: revolutionary, cutting-edge, game-changing, transformative, next-generation, visionary, thought leader, serial entrepreneur, passionate about disrupting.
- The read-aloud test from `context/voice.md`: if a sentence sounds like a scholarship essay or a LinkedIn post, rewrite it. Evan's own patterns: lead with the claim, named frameworks and numbered lists, casual parentheticals, sentences starting with And/But/So, specific numbers, honest about downsides.

Technical sections follow the hierarchy: **Problem → System → Technical challenge → Result.** Technology names support the story; they are never the story. No tech-logo walls, no giant employer logos.

Company introductions answer: who it serves, what they can do, Evan's contribution, and where to see it. Follow with one useful technical proof point. Keep line counts and inventories of endpoints or agents off the homepage. Include one supported product or commercial decision per company without inventing customer feedback, traction, or results. Professional work must state Evan's contribution to team-built systems.

The first version has a compact homepage and three reviewed articles. Ten existing drafts are an editorial backlog, not ten launch requirements. Fold the thesis into the intro/About and current status into company/About copy. Do not add sections that repeat the same identity claims.

## Design rules

- Follow the readability and restraint guidance at the top of `RESOURCES.md` (65ch line length, 18-20px body at 1.6, at most 2 typefaces, real type scale with roughly 3x h1, 8px spacing scale, whitespace over boxes, 4.5:1 body-text contrast, one bold move, check mobile and 200% zoom). Its one-accent suggestion yields to Evan's palette decision below.
- **Palette approved by Evan, 2026-09-10: mostly black and white, with optional restrained brown and navy accents.** Black and white carry the page. Brown adds a little warmth; navy adds depth. Neither becomes a large competing theme or a separate venture brand. Exact shades and placement remain for the later design pass. Use readable black/white text on dark accents, and verify actual contrast before implementation is called done. Do not use dark navy or brown as small text on black.
- Visual feeling: **technical, understated, grounded, quietly premium.** Let typography, space, and real work carry the personality. Avoid: neon AI gradients, glowing blobs, glassmorphism, fake terminals, floating framework logos, crypto/casino aesthetics, or a generic luxury-brochure treatment.
- The chosen direction, palette, and type choices are recorded in `website-plan.md`. Don't re-litigate them ad hoc; if a change is warranted, update the plan file with the reasoning.
- Accessibility is required, not optional: semantic HTML (`header/nav/main/footer`, sequential headings), alt text on every image, visible focus states, 4.5:1 contrast. Run a Lighthouse accessibility pass before calling any page done.

## Use the installed plugins and skills

- **`impeccable:impeccable` skill**: invoke for any design, redesign, polish, critique, accessibility, responsive, or visual-quality work on the site. This is the default path for UI work, not an option.
- **`frontend-design:frontend-design` skill**: invoke when establishing or reshaping the visual direction (palette, typography, signature element) so the site doesn't read as generic AI output.
- **context7 MCP** (`mcp__plugin_context7_context7__resolve-library-id` / `query-docs`): use to check current docs before relying on memory for any library, tool, or platform behavior (GitHub Pages/Jekyll quirks, CSS features, font loading, etc.).
- Close the loop visually (per `RESOURCES.md`): after meaningful visual changes, run `npm run dev`, screenshot, critique, and fix. Also inspect a static server serving the production `out/` export. Don't declare design work done from code alone. Also check 375px width and 200% zoom.

## Build and deploy rules

- **Next.js App Router + TypeScript + CSS/CSS Modules**, selected by Evan on 2026-09-10. This supersedes the plain-HTML/no-build-step choice. Follow website-plan.md's Next.js implementation plan. Keep README's course requirements; its framework recommendation and branch-root deploy instructions are replaced by this approved approach.
- Use `output: 'export'`, explicit static article routes, and `trailingSlash: true`. No runtime backend or default server image optimization. Build with `npm run build`; the deployable artifact is `out/`.
- Keep ignored `writing/*.md` as private drafting material. Public, reviewed article sources go in tracked `content/articles/*.md` and render through a shared route/layout. Do not import context or all drafts. Local provisional copy is allowed when Evan authorizes a preview; it does not count as publication/byline approval.
- Replace the blanket relative-path rule with Next-aware navigation and correctly prefixed public assets. Confirm the actual repo/URL before selecting build-time `basePath`; check direct article URLs and assets in the export as well as dev mode.
- Preserve root `.nojekyll` and include `public/.nojekyll` in the later build so the export contains it. Add dependency/build/env ignores while preserving existing private-context and draft ignores.
- Deploy the exported artifact through GitHub Pages Actions when authorized, not the raw source branch root. Do not switch hosting away from required GitHub Pages just because Next.js is used. Keep deployment pending during local-preview work.
- Define dev, build, typecheck, and appropriate lint scripts using current tool documentation. Validate production export with a static server, not `next start`. Leave a working local preview URL and restart command at handoff.
- Commit messages: plain, descriptive, no secrets. Never force-push over history without asking.
- **Never trust a "deployed successfully" claim.** After a push intended for production, the deploy isn't done until the live URL has been fetched (`curl`) and shows the new content. Remember GitHub Pages caches up to about 10 minutes.

## DECISIONS.md workflow

Fill `DECISIONS.md` as work happens, not at the end. With parallel agents, workers report proposed entries and the coordinator performs the shared-file edits:

- When a real decision is made (stack choice, page structure, what goes on the homepage, a design direction chosen over alternatives), draft or update the relevant answer in `DECISIONS.md` immediately, in specific and honest terms: what was chosen, what the alternative was, what was given up.
- **Question 3 (overruling the agent) must be in Evan's own words.** Never write its final answer. Instead, maintain a running "Candidate moments for Q3" list at the bottom of `DECISIONS.md` (clearly marked as notes for Evan): each time Evan rejects, corrects, or overrides an agent suggestion, log one line covering what the agent did, how Evan noticed, and what happened instead. Evan writes the final answer from those notes.
- Drafts for Q1, Q2, Q4, Q5 should read as Evan's voice (per `context/voice.md`, no em dashes) and be marked `<!-- DRAFT - Evan: review/edit -->` until he approves them.
- Q4's answer must reference the `verification/` folder and name a check that could actually have failed.

## verification/ requirements

Before submission, `verification/` must contain exactly:
- `screenshot.png`: the **live** site in a browser with the URL bar visible (not localhost).
- `fetch.txt`: output of fetching the live URL (e.g., `curl -i https://<username>.github.io`).
- `README.md`: three lines: URL checked, timestamp, and a specific "what would have made this fail" sentence (e.g., "It would have 404'd if index.html were in a subfolder"). Specific and falsifiable.

The screenshot must be taken by Evan or verified against the real live URL; never fabricate verification artifacts.

Also run a separate 60-second comprehension check with someone unfamiliar with Evan's work. Ask what he builds, what connects the companies, and why they might contact him. Record actual answers and revise unclear copy. This checks positioning; it does not replace live-site verification or add files to the assignment's exactly-three-file `verification/` folder.

## Session habits

- Start of builder/coordinator session: read `website-plan.md`, `AGENT-WORKFLOW.md`, and `todo.md`; skim `DECISIONS.md` for open drafts. Audience reviewers use the independent first-pass procedure instead of reading the plan first.
- End of any session that made decisions or shipped changes: leave a report. Coordinator updates `todo.md`, `website-plan.md` status, and `DECISIONS.md` from actual work and evidence.
- Prefer small, verifiable steps: change → local preview → screenshot check → commit.
