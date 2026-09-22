# Website Plan: evanbaker.github.io

The living plan for the site. `CLAUDE.md` holds the rules; this file holds the decisions, ideas, and current status. Update it as decisions are made.

**Status: LOCAL BUILD IN PROGRESS (2026-09-10).** The Next.js site is being implemented and tested on localhost. Nothing is deployed. The live GitHub Pages site, verification artifacts, video, classmate comments, and Canvas submission remain outstanding.

**Current scope (Evan, 2026-09-10): local build authorized.** This supersedes the earlier preparation-only instruction. Authorized: design, writing, dependency installation, implementation, local dev/static servers, agent reviews, and fixes. Not authorized: deploying, pushing, committing, changing remote Pages settings, contacting anyone, or Canvas submission. Revised copy may render provisionally in the LOCAL preview; Evan's byline approval (H01) is still a publication gate and stays open.

**Team setup added (2026-09-10):** coding, design, and writer are builder agents; investor, boss/employer, teacher, and classmate review a finished candidate. Definitions live in `.claude/agents/`. Read `AGENT-WORKFLOW.md` for handoffs, independent reviews, report requirements, and coordinator ownership of shared files. `todo.md` is the operational task board; this plan's milestones summarize it. All agents leave Markdown reports with work, evidence, ideas, and proposed decision notes. No website build or audience review has run as part of setup.

## Goals and review outcome (2026-09-10)

1. Finish the course project: public GitHub Pages site, decision log, real verification, 3-5 minute video, and three classmate comments, submitted as README/Canvas require. This goal takes priority.
2. Build a lasting founder home base for investors, experienced founders, collaborators, and technical peers. Show what Evan builds, how he thinks, and why someone might work with him.

The review found a coherent story, strong evidence discipline, useful voice samples, and writing that can demonstrate judgment. Keep Demarly and EdgeBet prominent, Nucli8 in Selected Work, and professional experience as supporting evidence. The main risk is scope expanding faster than implementation and editorial review. The local site remains the starter template; planning and drafts are progress, but not proof of a finished or verified site.

Accepted direction: shorten the homepage, launch with three reviewed articles, explain product usefulness before architecture, show commercial judgment, and check claims separately from voice. The milestone list covers both functional verification and whether unfamiliar readers understand the story.

---

## 1. The one story the site tells

**Product images authorized, 2026-09-22:** Evan supplied IMG_8969.PNG for EdgeBet and the September 22 9:31 AM screenshot for Demarly. Use these actual product captures in their company entries, replacing the small flow diagrams. Preserve their content and product colors, keep the site's own palette/type, and provide full-size access. IM01/IM02 track design and implementation. No generated mockups or new performance claims.

**Accepted image treatment:** Demarly uses the existing column width below its copy. EdgeBet uses a 288px-wide portrait alongside copy at desktop widths and stacks below copy on mobile. This is a local exception to the older one-column-only layout guidance, preserving the 680px overall column and existing typography. Captions describe the visible interface and link to the full-size original PNG. Image colors are actual product UI, not new site accent colors. Exact specification: reports/IM01-design-01.md.

**Content refinement authorized, 2026-09-22:** Evan accepted critique changes 1-3 for local implementation: replace the generic two-line identity pitch with a concrete introduction, separate company usefulness/product decisions from Selected Work engineering detail, and remove repeated technical/commercial framing and About recap. Existing visual identity stays in place. Product screenshots are a later handoff from Evan. CP01/CP02 in todo.md track copy and implementation.

**Content refinement complete, 2026-09-22:** Copy and metadata integrated; writer source-transfer audit, typecheck, lint, export, desktop/mobile inspection and article-link checks passed. Lighthouse homepage accessibility: 100. Static local preview: http://localhost:58254/. No deployment in this pass. Actual 200% browser zoom not run; coding checked 640px reflow instead.

> Evan is a technical founder who likes understanding complicated systems and turning them into software. Demarly applies that to AI and business workflows. EdgeBet applies it to probability and market data. Nucli8 applies it to optimization and cloud economics. Three different mathematical toolkits, one method: understand the system → model it → build the software → make it a business.

Every section must reinforce this. Anything that weakens it gets cut. (Source: `context/main.md` §39, `context/nucli8-context.md` §31.)

**Opening sentence (2026-09-22):** "I build software for running businesses and making sense of markets."
**Current-status line:** "Currently building Demarly and EdgeBet while finishing my degree at Colorado School of Mines."

Company copy leads with useful tasks and product decisions. Selected Work holds the technical mechanisms and links the Demarly ledger to "Never bill twice". About keeps Colorado, education and the production-cost observation without repeating each company's purpose. During this pass, the writer narrowed EdgeBet's conservative rerun to player props and corrected Nucli8's stated optimization objective to minimum instance count, as supported by project evidence. Existing professional-work factual questions remain open; its paragraph is unchanged.

**Target reader:** an investor or experienced founder giving the page 30-60 seconds, then engineers and collaborators digging one level deeper. Not recruiters. This is not a resume site.

**Desired emotional read:** "This person is early, but serious."

**Voice:** raw and plain, per `context/voice.md` (includes real writing samples; those samples are his MAX polish, so never write above them). Short sentences, concrete words, no academic polish, slang welcome where it lands naturally, **no em dashes anywhere**.

---

## 2. Verified claims (confirmed by Evan, 2026-09-10)

Facts Evan has personally confirmed, which unlocks them per the CLAUDE.md credibility rules:

- **Demarly is live at demarly.ai.** The site may say so and link it.
- **EdgeBet is on the App Store.** The site may say so.
- **Nucli8 is NOT live.** Present it as built, never as launched or serving customers.
- **Public contact email: evanbaker315@gmail.com.** Approved for the site.
- **EdgeBet App Store listing (Evan, 2026-09-10): https://apps.apple.com/us/app/edgebet/id6759763418.** Supplied by Evan and verified by the coordinator the same day: the listing resolves and shows "Edgebet" by "Edgebet LLC" in the Sports category. Approved for linking from the EdgeBet entry.
- **No LinkedIn link in v1 (Evan, 2026-09-10).** Evan declined it. Contact ships with email and GitHub only. Do not add a LinkedIn row back without a new instruction.
- **Resume metrics are approved for use** (the Appendix A numbers in `context/main.md` §42-53: Cloud303, Tyler Technologies, etc.). Use them selectively per main.md §47: interpretation over bullet dumps, and the homepage stays founder-first. Still no employer-internal architecture detail beyond what the context files frame as public-appropriate.

This list confirms only the claims named above. Other verification gates remain open, including the Apple rejection reasons and order, any new product-decision anecdotes, and external statistics or generalizations used in writing. Claim corrections and byline review are still pending. Check current public links during the later build/deploy phase; no live-site verification was performed in this planning review.

**Pending product change to watch (Evan, 2026-09-21): Demarly is dropping the always-on human approval gate.** Direction is decided but nothing is built yet: approvals will default to on, with an opt-out that lets agent writes execute immediately with no queue at all. Until this actually ships, do not put "agents can draft anything and send nothing" or any other absolute always-approved framing on the site as a current fact, and do not claim the opt-out itself as a feature either, since `context/demarly-context.md` section 12's "definitely supported" approval-queue claim describes what's live today, not what stays true once this lands. This is why the Demarly flagship story moved to the credit-ledger idempotency piece (`never-bill-twice.md`); see the decision log.

---

## 3. Architecture decision

**One page, plus depth where it earns it.**

- `app/page.tsx` (homepage route `/`): intro → companies → selected evidence → three writing links → short about/contact. Optimized for the 60-second investor skim. The thesis lives in the intro or About; current status lives with the companies and bio.
- **Three `writing/` pages in v1.** Ten Markdown drafts exist; only three selected and reviewed pieces are launch scope. Each homepage link has a title, publication date, and one-line excerpt.
- Optional (phase 2, only if content justifies it): individual pages per venture (`demarly.html`, `edgebet.html`, `nucli8.html`) for the reader who digs deeper.

**Why one page first:** the deadline is fixed (Sep 22), the grading values judgment and verification over feature count, and a single tight page tells the "one method" story better than thin multi-page navigation. Multi-page can grow later without breaking the URL.

**Stack changed by Evan, 2026-09-10: Next.js with the App Router, TypeScript, and CSS/CSS Modules.** This supersedes the earlier plain-HTML and no-build-step decision. README permits any framework; its course deliverables remain binding. The current task updates documentation only. Implementation starts when Evan gives the coordinator the build prompt.

### Next.js implementation plan

- Use a current stable Next.js release compatible with the installed Node runtime. Record versions, npm scripts, and a lockfile during implementation. Keep dependencies small; no backend, CMS, database, or component kit is required.
- Organize the homepage in `app/page.tsx`, shared layout in `app/layout.tsx`, reusable UI in `components/`, CSS in app/component files, and public assets in `public/`. Keep components static/server-rendered by default; client components only where interaction earns them.
- Public article sources live in tracked `content/articles/*.md`. Transfer only the three reviewed texts from ignored `writing/*.md`; never load private context or glob all drafts into the app. Render `/writing/[slug]/` with a shared article layout and explicit static parameters for the three selected slugs. The public article source becomes canonical after the review handoff. No hand-maintained generated HTML.
- For a local preview authorized by Evan, provisional copy may be rendered without final publication approval. Record that status in reports, keep private/editorial notes out of the rendered page, and leave byline approval unchecked until actually received. Production publication still requires approval.
- Configure `output: 'export'` and `trailingSlash: true`. `npm run build` must produce `out/`. Avoid request-time server features, Server Actions, and default server image optimization. Use ordinary images or export-compatible unoptimized images with explicit dimensions.
- Use Next links and a deliberate build-time `basePath` for the confirmed deployment URL. Apply the prefix consistently to public assets. Root-only paths and a guessed repository prefix are both unacceptable; the old blanket relative-path rule is replaced by correct Next.js routing and asset handling.
- Local development: `npm run dev` (normally localhost:3000). Also serve `out/` with a static server after the production build and test deep links directly. Do not use the root starter HTML or `next start` to validate the exported site.
- Eventual GitHub Pages deployment: a GitHub Actions build uploads/deploys `out/`, with Pages using GitHub Actions rather than serving the source branch root. Preserve the existing .nojekyll file and ensure the export includes one via `public/.nojekyll`. Publish only the export artifact. Do not deploy the source tree or private drafts.
- Add ignores for dependencies, build output, and environment secrets during implementation without weakening `context/*` or `writing/*`. A build must work from tracked public inputs without private local context.
- Verify type checking, configured lint checks, successful production export, direct article navigation, assets, mobile/zoom, accessibility, and console errors. Check export behavior separately from the development server.

Platform references: [Next.js static export](https://nextjs.org/docs/app/guides/static-exports), [basePath](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath), and [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). These replace the template's plain-HTML deployment mechanics while preserving the required public Pages result.

---

## 4. Page structure (homepage route `/`)

### Hero
Sparse. Name, positioning line, one plain sentence, three quiet actions. Avoid repeating the same identity in several abstract sentences. The block below is a copy starting point, not approved final wording.

```
Evan Baker
Engineer. Founder. Builder.

I build software, systems, and technology-driven businesses.

[What I'm building]  [Selected work]  [Contact]
```

No tech logos. No photo in the hero.

### What I'm Building
Two concise company entries (Demarly, EdgeBet) presented as parts of the same founder story. Each answers: who it serves, what they can do, Evan's contribution, and where to see it. Add one technical proof point. Do not lead with code size, endpoint counts, or an agent inventory.

**Demarly · AI + Business Systems** (live at demarly.ai, link it)
Copy direction: founders and lean teams can coordinate business work through a team of AI agents. Evan built the product end to end. Technical proof: every LLM call is metered to the token and debited from a prepaid credit ledger that stays correct under concurrent writes and duplicate Stripe webhooks. Reserve orchestration and billing detail for Selected Work or writing.

**EdgeBet · Probability + Market Data** (on the App Store, may say so)
Copy direction: an iOS subscription app for people comparing sportsbook and exchange prices and evaluating bets or promotions with probability and pricing tools. Evan built the mobile app and backend. Technical proof: comparisons account for platform fees and an estimated fair price. Link the verified App Store listing in the build phase. Never promise profit or present it as a picks service.

**Commercial judgment:** include one supported product decision per company in its entry or related Selected Work item. Candidate topics are a workflow choice, subscription tradeoff, approval UX, or distribution lesson. Explain the constraint, choice, and consequence. Confirm any claimed customer feedback or personal anecdote with Evan; implemented billing alone does not prove market demand. No new traction metrics are needed.

Optional connective sentence between the entries, only if the intro has not already made the connection: *"Two different kinds of complexity, organizational workflows and market pricing. Same approach: encode the system into software."*

### Selected Work
Up to 4 compact entries, each answering: what problem existed, what Evan built, why it was technically interesting, what changed. Format: Problem → System → Challenge → Result. Aim for 40-60 words each; let the linked articles carry depth. Each entry must add evidence beyond the company introduction. State Evan's contribution to professional team-built systems explicitly.

1. **Demarly's idempotent credit ledger.** An append-only ledger debited by two independent processes (API and worker), granted by Stripe webhooks that can fire more than once, made safe by partial unique indexes and locking database functions rather than application-level checks. (Swapped 2026-09-21 for the prior approval-architecture pitch; see decision log.)
2. **EdgeBet's fair-pricing engine.** De-vigging, three-source weighted consensus, closed-form fee adjustment for Kalshi's quadratic contract fee, and the conservative re-scoring rule that distrusts its own most extreme outputs.
3. **Nucli8.** AWS Reserved Instance purchasing modeled as a coin-change dynamic-programming problem over AWS's normalized-unit algebra; a 4-step Convertible-RI exchange pipeline; regression forecasting with a deliberately conservative `min()` estimator; a checkpointed, kill-switched execution engine for irreversible purchases (execution disabled by default). Not live; present as built.
4. **Production AI infrastructure** (confirmed to include; resume metrics approved). The professional credibility layer: applied-AI document pipelines, distributed inference systems, and enterprise human-in-the-loop AI workflows, with the strongest Cloud303 and Tyler numbers used selectively (e.g., the 32 to 4 H100 inference redesign, systems serving 400+ medical facilities). Framed as "Evan has designed systems where cost, throughput, latency, reliability, and model quality all have to be optimized together," never as an employer bullet list.

### Writing
Ten pieces are drafted in `writing/*.md` (2026-09-10). Two are Evan's posts lightly cleaned; eight are agent-drafted. None are approved for publication merely because a draft exists.

**Launch selection: three articles**, all pending claim corrections and Evan's byline review:

1. `writing/the-30x-bug.md`: engineering judgment and a pre-launch billing error.
2. `writing/distrust-your-best-results.md`: skepticism built into a quantitative system.
3. `content/articles/never-bill-twice.md`: idempotent credit-ledger design under concurrent writes and duplicate Stripe webhooks. Written directly to `content/articles/` 2026-09-21, replacing `agents-that-cant-lie.md` / `draft-anything-send-nothing.md` (see decision log). Still pending Evan's byline review like the other two.

The other seven remain post-launch drafts. The EV piece can become a later flagship after its reasoning is tightened. This selection shows judgment across optimization, market data, and AI without making ten articles a deadline dependency.

Draft inventory (source notes identify the basis for review, not publication approval):

| Piece | File | Pillar | Source |
|---|---|---|---|
| Expected value changed how I bet. Then it changed how I build. | `writing/expected-value.md` | Probability | Flagship. EV framework, decision vs outcome quality, ruin/floor nuance (content brief idea #1) |
| Being cloud agnostic as a startup is one of the worst decisions you could make | `writing/cloud-agnostic.md` | Engineering | Evan's tweet, cleaned + short expansion |
| Four paths to not be cooked | `writing/four-paths.md` | Building | Evan's thread, cleaned |
| A 30% boost is not 30% better | `writing/a-30-percent-boost-is-not-30-percent-better.md` | Probability | EdgeBet boost math (repo-verified: d' = 1 + (d-1)(1+boost), +120 → +156) |
| Distrust your best results | `writing/distrust-your-best-results.md` | Data | EdgeBet extreme-EV conservative rerun (repo-verified) |
| The 30x bug | `writing/the-30x-bug.md` | Engineering | Nucli8 dimensional-analysis billing bug + audit (repo-verified) |
| Your AI agents shouldn't be able to lie to you | `writing/agents-that-cant-lie.md` | AI | Demarly approval wrapper, default-deny tools, history replay (repo-verified). **Retired from launch and backlog 2026-09-21**: Demarly is dropping the always-on approval gate this piece is built on in favor of an opt-out toggle (decided direction, not yet built). Replaced in launch scope by `never-bill-twice.md`. Do not revive this angle until the toggle actually ships and the claim can be rewritten to match it |
| 99% accurate can still be completely unusable | `writing/99-percent-accurate.md` | AI | Brief ideas #2 + #17 merged; math self-verifiable (0.95^10 ≈ 60%, 0.99^50 ≈ 60%) |
| Apple rejected my app three times. None of the rejections were about the code. | `writing/apple-rejected-my-app.md` | Building | Brief idea #3, Evan's real EdgeBet story. **BLOCKED on Evan verifying the three rejection reasons** (draft note in file) |
| With AI agents, cost stops being a constant | `writing/ai-cost-random-variable.md` | AI | Brief idea #15 + Demarly metering, per-agent budgets, skill/agent cost dial (repo-verified) |

Rules for these pages: venture claims trace to supported context evidence or dated confirmations; math is checked with its assumptions stated; external factual claims need verified sources. The companies support a lesson that is interesting to someone who will never use them. Evan reviews everything before publication since it carries his byline. The index shows title, actual publication date, and a one-line excerpt. Each selected piece will become a statically exported Next.js article route sharing the article layout and CSS during the later build phase.

**Required editorial review, before publication:**

- `never-bill-twice.md`: grounded entirely in demarly-context.md section 7.1 (the prepaid credit ledger). Recheck against the repo evidence once the toggle work lands, in case the metering/grant mechanics themselves change alongside the approval work.
- `expected-value.md`: expected value applies to one-shot decisions too. Repetition affects how realized outcomes relate to expectation. Keep the ruin/downside discussion and qualify the claim that outcomes tell us almost nothing about decisions.
- `ai-cost-random-variable.md`: remove the unsupported claim that nobody prices with distributions; qualify the constant-cost description of conventional APIs. Verify or narrow the 3-5x cost multiplier and distinguish implemented metering/budgets from measured distribution analysis.
- `99-percent-accurate.md`: keep assumptions explicit when moving from the digit example to agent workflows. Reconsider "always worse" and avoid implying human approval catches every error.
- `cloud-agnostic.md`: retain Evan's opinion while qualifying certainty that price increases cannot happen. Explain the near-term portability tradeoff without treating a prediction as a proven fact.
- `the-30x-bug.md`: state early that the bug was found before launch and before anyone was billed. Check personal attribution with Evan; keep the dimensional explanation precise.
- `distrust-your-best-results.md`: separate the implemented conservative rule from unmeasured claims about how often apparent edges are data errors.
- `apple-rejected-my-app.md`: remains blocked on Evan confirming the rejection reasons and order.

Keep the direct voice. Accuracy review is separate from voice review. Record approval per selected piece before conversion; this preparation pass records corrections rather than rewriting or approving the articles.

Section intro line (from main.md): "I write about engineering, AI, probability, and what I learn building companies."

**Article backlog** (from the brand-agent brief, condensed in `context/content-brief.md`; write post-v1, always rewritten from scratch in Evan's voice):

- Your AI agent isn't just software, it's an insider (security mental model: employee, not chatbot)
- The smartest model is often the wrong model (model routing as economics; ties to Demarly's 55-model registry)
- The real AI moat isn't the model (if swapping models kills your advantage, you didn't own much)
- Stop adding AI to broken workflows (automating a bad abstraction doesn't make it good)
- The expensive part of an agent is making it reliable (generation vs verification economics)
- An email is no longer just data (indirect prompt injection, kept defensive)
- AI agents need kill switches (blast radius; can pull from Nucli8's real safeguard stack)
- Shadow agents (what can an agent reach indirectly; distinguish lecture concepts from documented incidents)
- AI memory is a new secrets problem (making AI reliably forget)
- "AI saved us 10 hours" tells me nothing (input metrics vs outcomes)
- If AI copies your best employee, they get more valuable (who generates tomorrow's expertise)
- "Human in the loop" is too vague (attach oversight to risk; may fold into the agents-that-cant-lie piece instead)
- AI is an amplifier (umbrella essay, write last so it can link the others)
- BLOCKED until stats verified: the 88%-adoption piece (#9) and the experience-curve study piece (#12)

### About / Contact (includes the thesis)
Use a short version of the thesis in the intro or About, once. It does not need its own section. Source wording to condense:
> "I like complicated systems. My work usually starts with understanding how something works: an organization, a market, a dataset, a workflow. Then I ask how much of that complexity can be encoded into software. That's the thread connecting the companies I build, the engineering I do, and the things I write about."

Short bio (main.md §29 founder-oriented variant): engineer and founder based in Colorado; studies Computer Science + Data Science at the Colorado School of Mines; currently building Demarly and EdgeBet. One line on professional experience ("Alongside building companies, I've worked professionally across software engineering and applied AI"). Education visible but secondary. No GPA, no coursework. **Personal background stays off the site entirely** (see `context/voice.md`).

**Photo placeholder:** build the About layout with a reserved image slot (proper aspect ratio, alt text stub, layout that works with or without it). Evan will supply a photo later; ship v1 without one if it isn't ready.

**Current status:** keep building status in the company entries and education in the bio. Keep their component/content source easy to update. No separate Currently section in v1 and no duplicate list of what the page already says.

### Contact / Work With Me
> "Building, investing, or working on something interesting? I'd like to hear about it."

Links: email (evanbaker315@gmail.com, approved) and GitHub (evanbaker315). No LinkedIn (Evan declined it, 2026-09-10). No begging, no "INVEST" section.

### Footer
Minimal: name, year, maybe "Built with Claude Code" (course-appropriate, honest). No resume link in v1 (Evan's call).

---

## 5. Visual direction

**Feeling:** technical + understated + quietly premium. "Quietly expensive, not startup flashy."

Evan's palette decision (2026-09-10) is fixed at the color-family level. Exact shades, typography, composition, and signature element will be reviewed through the design skills in a later phase. Recording these constraints does not start a design prototype.

- **Palette:** mostly black and white. Brown and navy are optional, restrained accents. Black/white must dominate the first impression and reading experience. Brown contributes warmth; navy contributes depth. Neither becomes a large theme, and the ventures share one palette. This supersedes the earlier amber/precision-blue proposal and the generic one-accent suggestion.
- **Use of accents:** small intentional details or limited surfaces, with consistent roles. Do not force both accents into every section. Keep body text and essential controls clearly legible in black/white. Dark brown or navy must not become low-contrast text on black; choose readable foreground/background pairs and check them during design. Exact hex values are not locked or contrast-verified yet.
- **Fit with Evan's voice:** grounded, direct, understated. Strong type and space should carry the identity. Avoid a glossy luxury-brochure feel, ornamental serif flourishes, decorative gradients, or using brown so heavily that the page becomes beige. Preserve the technical character without fake terminal styling.
- **Typography:** two faces max from Google Fonts or a Modern Font Stacks system stack. Direction: a characterful display or serif for the name and headings against a quiet sans or high-quality system stack for body. Weight extremes (e.g., 300 vs 700+), h1 roughly 3x body, body 18-20px at 1.6 line-height, `max-width: 65ch`.
- **Spacing:** 8px scale only.
- **The one bold move (signature element):** the oversized name in the hero, OR a single quiet systems-diagram motif: one hand-authored SVG line diagram (system → model → software → business) used once. Pick exactly one during the design pass; everything else stays disciplined.
- **Motion direction (Evan, 2026-09-22; local implementation subsequently authorized):** typography and space carry the personality. Keep one restrained interaction treatment rather than a suite of effects: a subtle link/nav hover underline drawing left-to-right in navy or brown over roughly 150-200ms, with no bounce, plus a gentle 8px fade-up as selected section content scrolls into view. Navy fits the existing interaction accent role; brown remains an option for later design review rather than an automatic change to the annotation-only rule. Use reveals sparingly so they feel intentional and technical without competing with the content. CSS transitions and IntersectionObserver are the proposed approach; no animation library is needed. With `prefers-reduced-motion`, show content and interaction feedback instantly with no motion. Preserve visible keyboard focus and keep content readable if JavaScript is unavailable. Tradeoff: even subtle scroll reveals add accessibility handling and can become decoration if repeated site-wide. Hover underline alone is the safer, more minimal alternative. Evan subsequently asked to implement this note. The local implementation uses a 180ms navy underline draw over a persistent 1px link cue and a once-only 8px, 320ms reveal on Selected Work and Writing. Other sections remain immediate. Reduced motion, focus, and section-link navigation reveal content instantly; server output remains visible without JavaScript. The existing method-line navigation is preserved. Evidence: reports/M01-coordinator-01.md. Deployment is outside this change.
- **Imagery:** the About photo slot only for v1. Product screenshots and diagrams belong on phase-2 venture pages, and only from Evan's own products with his sign-off.
- Grouping by whitespace, not cards and borders, wherever possible.
- Light/dark: **RESOLVED 2026-09-10 during the design pass. The base is white paper with black ink, plus exactly one full-bleed black band under the hero.** This supersedes the earlier provisional black-base note. Evan approved the color families, not a polarity, and the page is still overwhelmingly black and white. Reasoning, from `reports/design-spec.md` section 1: the approved brown and navy accents only work as real ink on a light base (7.94:1 and 12.70:1 on white), and forcing them onto black requires lightening brown into tan and navy into a generic pale blue, which lands in exactly the beige outcome CLAUDE.md bans. The site's depth is three long articles, and long-form reading is worse on a dark base and worse at 200% zoom. The black band preserves the black-first impression at full strength while keeping the reading surface light. No theme toggle in v1.
- **The one bold move is decided: the method line.** A hand-authored SVG dimension line (four stations: system, model, software, business) in white hairlines on the single black band, with one caption. The oversized name was rejected: it answers nothing for the 60-second reader, the page has no other imagery, and `RESOURCES.md` names it as its own example, making it the default any page would produce. The diagram replaces the optional connective sentence in section 4; writing both would turn the signature element into decoration.
- **Exact shades are now locked and contrast-verified** in `reports/design-spec.md` section 2. Paper `#FFFFFF`, ink `#000000`, secondary `#4D4D4D`, navy `#1F3352` (interaction only), brown `#6B4A2F` (annotation only), band ink `#FFFFFF` and `#B8B8B8`. Accents are structurally barred from the black band. Lowest shipping ratio is 6.16:1. Typefaces: Newsreader (display) and Public Sans (text), self-hosted through `next/font/google`.
- **The method line is now a fixed side rail with live bidirectional progress, not a one-time band (Evan, 2026-09-17, supersedes the two bullets above about the band and signature element).** Evan scrolled the local build and found two problems with the original full-bleed band: it scrolled out of view right after the hero so its "animation" was invisible for the rest of the page, and its four abstract stations (system/model/software/business) didn't correspond to any real section. First pass: a 48px sticky top bar. Evan tried that and asked for two more changes: a fixed vertical rail on the side instead of a bar across the top, and dots that light up and un-light live as you scroll past a section in either direction, instead of staying lit permanently once reached. `components/MethodLine.tsx` is now a small black capsule (`position: fixed`, vertically centered on the right edge, same `--band`/`--band-ink`/`--band-ink-2` tokens as the original full-bleed band, so the site's one non-white surface survives in miniature) holding five dots for the site's real sections in real order (Building, Work, Writing, About, Contact), each a real anchor link, recomputed every scroll tick from live element position rather than a one-way "once reached, stays reached" ratchet. Accent-barred-from-band rule is unchanged. Not yet re-verified: milestone 4's Lighthouse/axe/contrast pass predates all of this and needs a fresh pass, and the rail's footprint (dot + padding, positioned `right: 8px`) hasn't been checked against the 20px mobile gutter at 375px width for possible overlap with right-aligned text.

- **"Boring" pass (Evan, 2026-09-17), driven by an `/impeccable critique` run (dual-agent: LLM design review + `impeccable detect` + DOM evidence; snapshot in `.impeccable/critique/2026-09-17T19-11-35Z__app-page-tsx.md`).** Detector scan was clean (0 findings across all `.tsx` files) but the LLM review found the page's nine content blocks (2 companies, 4 work samples, 3 articles) all sharing one visual grammar at one type scale, so nothing signals what matters most, plus a type scale honored only at h1 and abandoned below the fold, plus zero imagery despite three literally-diagrammable systems. Evan approved the full priority list plus a mobile fix for the rail. Changes made:
  - `--t-h2` widened from `clamp(1.5rem,1.15rem+1.5vw,1.75rem)` to `clamp(1.875rem,1.4rem+2.2vw,2.75rem)`, `--t-h3` from `clamp(1.25rem,1.1rem+0.6vw,1.375rem)` to `clamp(1.375rem,1.2rem+0.8vw,1.625rem)` (`app/globals.css`).
  - `CompanyEntry`'s heading gets its own `.name` size step past ordinary h3 (`clamp(1.625rem,1.3rem+1.2vw,2.125rem)`), so the two companies read as the flagship tier and `WorkEntry`/`WritingList` items stay at the shared h3 size, one clear "most important" tier instead of nine peers.
  - New `components/FlowDiagram.tsx`: a small hand-authored SVG step diagram (nodes + arrows, one hairline ink stroke, no new color), drawing only what each company's existing prose already claims. Demarly: Agent drafts -> Approval queue -> You send. EdgeBet: Multiple venues -> Strip margin & fees -> Fair price. **Checked against `craft-floor.md`'s bans first**: no gradient, no glow, no emoji-as-icon, not a kicker/eyebrow, not a numbered sequence.
  - Brown strengthened where it was already licensed rather than given a new role: `CompanyEntry`'s deck line and `WritingList`'s category tag are now uppercase, tracked, and weight 600 instead of small plain text. Note: all three articles still ship `date: ""`, so brown's "dating" half stays unexercised on the live site regardless of this fix.
  - `lib/sections.ts` is the new single source for the five section id/label pairs; `Hero.tsx` and `MethodLine.tsx` both read from it instead of keeping their own separately-typed copies, closing a real label mismatch ("What I'm building" in Hero vs "Building" in the rail for the same anchor).
  - `MethodLine`'s rail gets a `@media (max-width: 639px)` variant: below that width it becomes a full-width bar fixed to the *bottom* of the viewport instead of a vertical capsule on the right edge, because the vertical rail's footprint didn't fit the 20px mobile gutter without risking overlap with right-aligned body text (flagged by the critique, unverified visually at the time). `SiteFooter` gets matching bottom padding on mobile so the fixed bar doesn't sit over the last line of the footer.
  - Also fixed in passing: `SiteFooter`'s year was hardcoded `2026`; now `new Date().getFullYear()`, resolved at each static build.
  - **`impeccable detect` re-run clean (0 findings) after all of the above.** Typecheck and lint clean. **Not yet visually verified**: the Chrome browser extension was not connected for either the critique or this implementation pass, so nothing above has been seen rendered, only read from source, the served DOM, and `curl`. The diagram's SVG sizing, the mobile bottom-bar layout at real widths, and the widened type scale at 375px/200% zoom all need an actual look before this is called done, per CLAUDE.md's "don't declare design work done from code alone."
- **`/writing/` is deliberately unlinked (coordinator, 2026-09-10, closing design-07).** Nothing on the site points to it. It exists so a reader who truncates an article URL lands on a real page instead of a 404. Design recommended against linking it and specifically against a "view all" row: the homepage already lists all three pieces in full, so a link pointing at the same three items is the template gesture the spec rejects. Revisit only when the article count outgrows the homepage list.
- **Accent roles, amended after the D02 rendered review.** Brown is "classification and dating" (company decks, article and list categories, dates, article list markers). `--ink-2` is "non-classifying secondary text" (the Selected Work attribution lines, the footer). Both lists stay exhaustive and neither accent may appear inside the black band. This wording replaces the narrower enumeration in `reports/design-spec.md` sections 2 and 8.

Studied references: brittanychiang.com (structure discipline), karpathy.ai (zero-framework credibility), matthewbutterick.com (typography as the design), sive.rs (constraint).

---

## 6. Content rules quick-reference

- All venture claims from the "Definitely supported" lists in `context/*-context.md`, plus the Verified claims section above. Numbers only from the verified-metrics tables or the approved resume metrics.
- No revenue, users, or traction anywhere.
- EdgeBet framed as applied probability + engineering, with honest descriptions of sportsbook use and no picks or profit promises. Use the shared black/white palette and optional brown/navy accents, nothing casino-like.
- Nucli8 framed as optimization + infrastructure economics; never "AI-powered"; never described as live.
- Voice: Evan's, per `context/voice.md`. Plain, direct, Denver not prep school. Short declarative sentences; evidence over adjectives; banned-words list in CLAUDE.md.
- **No em dashes anywhere.** Site copy, DECISIONS.md, everything.

---

## 7. Milestones

Use `todo.md` to claim and complete individual tasks. Coordinator keeps this summary aligned with inspected completion evidence; agents do not independently update two trackers.

| # | Milestone | Detail | Status |
|---|-----------|--------|--------|
| Prep | Rules and scope | Record accepted review, three-article scope, and black/white palette with optional brown/navy accents | Documented; superseded by the local-build authorization |
| 0 | Deploy pipeline proven | Confirm actual repo/URL and basePath, export with Next.js, deploy out/ through Pages Actions when authorized, verify live URL | ☐ (deployment pending) |
| 1 | Words before design | Review compact homepage copy, one supported commercial decision per company, and the three launch articles with Evan | Copy and article corrections done (W01/W02); Evan's byline approval H01 still open |
| 2 | Design direction | Use `frontend-design` + `impeccable`; refine approved color families into checked shades, type, composition, and one signature element | Done. `reports/design-spec.md`: locked shades with computed contrast, Newsreader + Public Sans, the method line as the one bold move |
| 3 | Build Next.js homepage | App Router + TypeScript + shared CSS/components; local rendered checks; complete About layout with or without a photo | Built (C03). Ten components over one token file. About renders with no photo and no empty container. D02 review in progress |
| 3b | Build writing routes | Transfer selected text into tracked public article sources; statically generate three routes with shared layout and homepage links | Built (C04). Three routes plus a `/writing/` index. Text renders PROVISIONALLY; H01 publication approval still pending |
| 4 | Quality passes | Type/lint checks, production export and static preview, direct article URLs/assets, mobile 375px, 200% zoom, Lighthouse accessibility, contrast, keyboard focus | Done (C05) against the pre-2026-09-17 band. Lighthouse accessibility 100 on all four page types, axe-core 0 violations across 8 page/width combinations, keyboard pass, 200% zoom clean, zero console errors, basePath export verified under /personalWebsite/, external links 200. Caveat recorded: 4 contrast results are incomplete rather than passed because axe cannot see through an SVG node; computed by hand at 21:1. **Needs a fresh pass**: MethodLine was rewritten 2026-09-17 into a sticky nav bar with 5 real links; typecheck and lint are clean and the markup was spot-checked by hand, but Lighthouse/axe/keyboard/200%-zoom have not been re-run against it |
| 4b | 60-second reader check | Someone unfamiliar with Evan reads the homepage, then explains what he builds, what connects the companies, and why they might contact him; record answers and revise unclear copy | ☐ |
| 5 | Deploy + verify | Push, curl live URL, screenshot with URL bar, populate `verification/` | ☐ |
| 6 | DECISIONS.md finalized | All drafts reviewed by Evan; Q3 written by Evan from the candidate-moments log | ☐ |
| 7 | Video | Evan records 3-5 minutes covering the live tour, choices, and a real challenge; confirm duration and playback | ☐ |
| 8 | Classmate comments | Evan visits three classmates' sites and leaves one specific strength and one suggested change on each in Canvas | ☐ |
| 9 | Final submission | Confirm the site, decision log, three verification files, video, and three comments are submitted as README/Canvas require | ☐ |
| 10 | Stretch work | Venture detail pages or more reviewed articles only after required launch and submission work is complete | ☐ |

Deadline: **Tuesday, September 22, 2026** (Canvas is system of record). Milestones 0-10 are future work and do not override the preparation-only instruction. The reader check supplements technical verification; notes belong in the decision log or plan, leaving `verification/` with exactly its three required files. Do not claim any check, recording, comment, or submission happened until there is actual evidence.

---

## 8. Open questions for Evan

1. **Review the three launch articles** after claim corrections. All need your byline sign-off. The other seven are backlog and do not hold up v1.
2. **Commercial evidence**: confirm one concrete product or business decision per company, including your role and any claimed consequence. Do not invent an anecdote to fill this slot.
3. **Photo**: send the About photo whenever it's ready; the slot will be waiting.
4. **Apple rejections piece (backlog)**: confirm the three rejection reasons and their order against your real App Store Connect history before later publication. It does not block launch.

(Resolved 2026-09-10: contact email, live-status claims, Nucli8 placement, no resume link in v1, resume metrics approved, Writing in v1 with three selected articles from ten drafts, and mostly black/white with optional brown/navy accents. Approval of the plan is not approval of the article text.)

---

## 9. Decision log (site-level, running)

- 2026-09-10: Plan created. Stack: plain HTML/CSS. Architecture: single page first. Nucli8 positioned in Selected Work rather than as a third company card.
- 2026-09-10: Evan confirmed: Demarly live, EdgeBet on App Store, Nucli8 not live, email public, resume metrics approved, no resume link v1, photo later (slot reserved).
- 2026-09-10: Voice locked: raw and plain per `context/voice.md` (private file). Hard rule: no em dashes anywhere. Personal background never appears as site content.
- 2026-09-10: Voice expanded with real writing samples (teaching piece, two tweets). Samples are max polish; site copy never gets more formal than them. Gen Z and street slang approved for the site.
- 2026-09-10: Writing section moved from stretch goal into v1. Six pieces drafted in `writing/`: Evan's two posts plus four agent-drafted pieces grounded in repo-verified venture facts (boost math, EdgeBet's conservative rerun, Nucli8's 30x dimensional bug, Demarly's approval architecture). Pending Evan's review before build.
- 2026-09-10: Content backlog added from Evan's brand-agent brief (condensed into `context/content-brief.md`). Four more pieces drafted for v1 (EV flagship, Apple rejections, 99%-accuracy compounding, cost as a random variable), bringing v1 to ten. Remaining ideas listed as backlog; two blocked on statistic verification.
- 2026-09-10: After project review, Evan asked to incorporate the recommendations. Supersedes the earlier six/ten-article launch scope: compact homepage and three reviewed articles first; the remaining drafts are backlog. Added product usefulness, commercial decision evidence, independent claim review, and a 60-second comprehension check. Added explicit video, peer-comment, and submission milestones.
- 2026-09-10: Evan chose mostly black and white with optional brown and navy accents, fitting his grounded, understated voice. Earlier amber/precision-blue suggestions are retired. Exact shades and composition remain pending.
- 2026-09-10: Evan explicitly limited work to rules, files, and context. No site implementation or article conversion yet. Recorded Markdown-to-HTML as a later authoring task, preserving deployment without a build step.
- 2026-09-10: Evan requested three builder roles and four audience-review roles, an agent workflow, a checkbox task board, and Markdown work/idea reports. Created the reusable roles, AGENT-WORKFLOW.md, AGENTS.md, todo.md, and report templates. The main session coordinates task claims and shared documentation; reviewers give independent simulated feedback on a stable candidate and route fixes to builders. Team setup does not start site implementation. The existing writing/* ignore rule is now an explicit publication-path task so approved article HTML is not accidentally excluded.
- 2026-09-10: Evan selected Next.js. Supersedes all earlier plain-HTML, manual article-HTML, no-build-step, and source-branch-root deployment decisions. Planned App Router/TypeScript with static export and tracked public article sources; GitHub Pages remains required. Updated coordinator workflow/tasks and local-preview prompt. No application code or dependencies created in this planning update.
- 2026-09-10: The site was implemented and now runs locally. Homepage, `/writing/` index, and three article routes export as static HTML. Ten components, each with its own CSS module, all reading tokens from one `app/globals.css`. Fonts self-hosted through `next/font/google`, so the export makes no third-party request. Article text was transferred by script rather than retyped, with assertions that no draft note and no em dash survive. Measured in headless Chrome against the static export, not estimated: h1 56/48/36px, body 19px, 70-character measure at 1440, no horizontal scroll at 375/640/1440, and zero navy or brown resolving anywhere inside the black band. Evidence: `reports/C03-C04-coordinator-01.md`. Process note recorded there: the coordinator built this directly instead of dispatching the coding agent, Evan caught it, and W03, C05 and D02 went to their proper agents.
- 2026-09-10: Builder review round closed on the local candidate. W03 verified the article bodies are byte-identical to the reviewed drafts and found one publication blocker, the coordinator-written band caption, which now goes to Evan rather than to another agent. C05 returned Lighthouse accessibility 100 and axe 0 violations on every page type, verified the /personalWebsite/ basePath export, and fixed a heading-level skip on /writing/ plus the skip link's off-canvas box. Both fixes were re-verified independently by the coordinator. Evidence: reports/W03-writer-02.md, reports/C05-coding-02.md.
- 2026-09-10: Four audience reviews ran against frozen candidate C1 and were triaged in `reports/review-disposition.md`. Nothing was rejected outright. Four blind reviewers converged on one root cause from four directions, that an article page carried no ownership context and no way out, so it was fixed as one pass: the two articles that needed it now name their owner, and article pages carry a "More writing" aside listing the other two pieces. `/writing/` stays deliberately unlinked and the hero nav stays at three items. Three reviewers converged on the `32 H100s to 4` sentence and disagreed about it, which identified a factual gap rather than a wording problem and went to Evan. Recorded limitation: three of four reviewers could not fetch localhost and read the export with no CSS, so this round is a content, claim and structure review and is not audience sign-off on the rendered design. Evidence: reports/R01-investor-01.md, R02-boss-01.md, R03-teacher-01.md, R04-classmate-01.md, F01b-writer-04.md, D03-design-03.md, F03b-coding-04.md.
- 2026-09-21: Evan flagged the Demarly approval-gate story (homepage technical bet, the Selected Work entry, and the third launch article) as weak writing, and separately told the coordinator Demarly is dropping the always-on approval requirement: approvals will default to on but agents will get an opt-out that executes writes immediately with no queue, decided but not yet built. That makes "agents can draft anything and send nothing" a claim with a shelf life, not an architectural property to lead with. Rather than patch the old claim around an unshipped toggle, swapped the whole Demarly flagship story to a different, unrelated mechanism that's fully accurate today: the prepaid credit ledger's idempotency under concurrent debits (API + worker) and duplicate Stripe webhooks, from `context/demarly-context.md` section 7.1. Replaced the homepage diagram and technical-bet paragraph, replaced the "Approval architecture for AI agents" Selected Work entry with "A ledger that can't count twice," and replaced `content/articles/draft-anything-send-nothing.md` with a new article, `never-bill-twice.md`, written directly into tracked `content/articles/` rather than through the usual `writing/` draft step since it's a fresh piece, not a revision of an existing one. `writing/agents-that-cant-lie.md` is retired from both launch and backlog until the approval toggle actually ships and the claim can be rewritten to match reality. Typecheck, lint, and `npm run build` all pass with the new article route. Byline approval (H01) is still open for all three launch pieces, this one included. Added a standing note under Verified Claims so a future session doesn't reintroduce the absolute approval-gate framing before the toggle ships.
