# Coordinator prompt: complete Next.js local preview

Copy the prompt below into the building coordinator's session.

```text
Build the first complete version of my website with Next.js so I can preview it on localhost. Carry this session through design, writing, implementation, testing, agent review, and necessary fixes.

This explicitly authorizes moving beyond preparation into the LOCAL BUILD: installing necessary project dependencies, editing application/configuration files, revising copy, running local servers, and using the seven agents. Make reasonable decisions within my recorded preferences without stopping for routine confirmations. Respect any actual environment permission requirements.

Read AGENTS.md, CLAUDE.md, AGENT-WORKFLOW.md, website-plan.md, todo.md, DECISIONS.md, README.md, the relevant context, and the agent definitions. The latest Next.js decision supersedes the earlier plain-HTML/no-build plan. Update phase authorization in the shared records before assigning tasks.

You coordinate. Use coding, design, and writer to build, then investor, boss, teacher, and classmate to review. Run independent work in parallel within available capacity. Keep file ownership separate and shared tracker/plan/decision-log edits serialized through you. Every agent must leave a Markdown report with its work, checks, ideas, limitations, and handoff.

Goals and scope:
- Course completion comes first; the site is a lasting founder home base showing what I build and how I think.
- Compact homepage: intro, Demarly and EdgeBet, selected technical evidence, three writing links, short About/Contact.
- Three complete articles: the 30x bug, distrust your best results, and the approval architecture piece after its claims are corrected.
- Mostly black and white, with optional restrained brown and navy accents. Grounded, direct, technical, understated. Use typography, space, and actual content to give it personality.
- Preserve my plain voice. No fabricated metrics, private background, filler, fake screenshots, or exposed placeholders. Build a complete About layout without a photo if none is approved.

Technical requirements:
- Next.js App Router, TypeScript, CSS/CSS Modules, reusable components, and minimal dependencies. Use a current stable release compatible with the Node environment and record versions/lockfile.
- Configure output: 'export' and trailingSlash: true. GitHub Pages remains the future deployment target. No runtime backend, Server Actions, or server-dependent image optimization.
- Keep private context/ and writing/ drafts ignored. Transfer only the selected, reviewed article text into tracked content/articles/; statically generate /writing/[slug]/ with explicit parameters and a shared layout. Do not import private directories into the app or export raw notes.
- Use correct Next navigation and asset paths. Determine the eventual Pages basePath from actual repository/URL facts; do not guess from the local folder name. Unknown deployment configuration may remain pending without blocking root-path localhost work.
- Preserve .nojekyll and include public/.nojekyll for the export. Add appropriate dependency/build/environment ignores without weakening private-file protections.
- Provide dev, build, typecheck, and appropriate lint scripts. The production build must generate out/. Validate it with a static server as well as the Next development server; do not use next start for the export.

Execution:
1. Have writer prepare real homepage copy and correct the three articles against the claim-review notes. Have design establish a concrete specification with the required design skills. Coding prepares the Next.js setup and checks, then implements from the coordinated handoffs.
2. Resolve routine choices yourself. Omit or narrow unsupported claims. Do not invent personal anecdotes to fill gaps. Keep optional ideas in the backlog.
3. Build all pages and working links. Inspect actual desktop/mobile renders, direct article URLs, keyboard navigation, 375px width, 200% zoom, contrast, metadata, console errors, and accessibility. Run typecheck, lint, and the production export. Fix observed failures and recheck them.
4. Freeze a candidate and run all four audience reviewers independently. Record actual access limitations. Triage their evidence-backed findings, make necessary corrections, and rerun affected checks. Missing live deployment or human submission evidence is expected for a local preview and must not trigger deployment or block local delivery.
5. Update todo.md, website-plan.md, DECISIONS.md drafts, and reports from actual work. Only mark completed tasks complete.

Approval boundaries:
- I authorize revised copy to be rendered locally as provisional. My final byline approval is a PUBLICATION gate, not a blocker for this local build. Record pending approval in reports, not as editorial clutter inside the preview. Do not falsely complete H01.
- Do not deploy, push, commit, change remote Pages settings, contact anyone, or submit to Canvas in this session.
- Never write my final DECISIONS.md Q3 answer or invent my video, real reader check, classmate comments, live verification, or submission evidence.

Finish with a working local server left running if supported. Give me the exact localhost URL, the restart command, a short summary of completed pages/checks, and remaining review items. Keep deployment and publication tasks pending. Start now and continue until the local preview is complete or a specific external blocker prevents further progress.
```
