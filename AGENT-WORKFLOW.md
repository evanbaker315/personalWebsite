# Agent workflow

Status: team setup only. No site build or audience review has run. The two goals remain course completion first and a durable founder home base second.

## Team

| Role | Owns | Main handoff |
|---|---|---|
| coding | Next.js implementation, static article generation, technical checks, export/deploy verification | Working candidate and evidence to design and reviewers |
| design | Visual direction, layout specifications, responsive behavior, rendered visual/accessibility review | Concrete design specification and fixes to coding |
| writer | Homepage copy, three launch articles, claim/voice review, product and commercial explanations | Reviewed copy and claim record to coding |
| investor | Simulated VC and family-office assessment of the public site | Credibility, focus, commercial clarity, and contact findings |
| boss | Simulated employer assessment of the public site | Specific attribution, disclosure, and professional-judgment findings |
| teacher | Simulated instructor check against the actual assignment | Deliverable, decision-process, and verification gaps |
| classmate | Simulated newcomer reading the site | Comprehension, personality, usability, one strength and one change |

The main session is the coordinator. It does not need an eighth persona. It assigns work, resolves conflicting suggestions, integrates changes, and keeps the shared records accurate. Evan owns personal approvals, actual human deliverables, and final decisions.

## Where instructions live

- `CLAUDE.md`: project rules, privacy, voice, goals, and current phase.
- `website-plan.md`: accepted scope, verified claims, and design decisions.
- `.claude/agents/*.md`: seven reusable role definitions.
- `todo.md`: the operational task board. The milestone table in the plan is a summary, not a second independent tracker.
- `reports/TEMPLATE.md`: per-task report format; `reports/README.md` explains storage.
- `DECISIONS.md`: Evan's short assignment decision log, not a dump of every agent report.

The role files use the project-local Markdown/frontmatter format in the [Claude Code subagent documentation](https://code.claude.com/docs/en/sub-agents). Ask the main session to use a role by name. Other runners can delegate the same instructions explicitly. These files define roles; they are not background services or an autonomous scheduler. No model is pinned.

## Start and claim protocol

1. The coordinator reads Evan's latest instructions, project rules, and `todo.md`. It records phase authorization before activating implementation or publication tasks. Workflow setup alone leaves future tasks unchecked.
2. A worker requests one ready task in its role. The coordinator checks dependencies and reserves the task by recording a unique assignee/run, `in progress`, and the exact file write scope. Only one active assignee per task. Workers do not race to edit the shared board.
3. The coordinator sends a task packet: ID, role, objective, acceptance criteria, input files, allowed write paths, expected report path, dependencies, current authorization, and relevant approved decisions. Include all necessary context explicitly for fresh agents.
4. The worker stays inside that scope. It reports a blocker or requests an expanded scope rather than silently taking another agent's files. Assignment reserves work; it is not a new user approval requirement.
5. The worker writes its report and returns its path, status, changed files, evidence, and next owner. Even blocked or partial work gets a report. Never check a task off merely because a report exists.
6. The coordinator inspects the artifact and acceptance evidence, integrates any proposed decision-log update, and checks the task only if complete. Record rework as a follow-up task with dependencies; do not erase the original evidence.

A local-preview authorization can activate provisional-copy handoffs and implementation without completing publication approval H01 or deployment tasks. Record the local-only scope and leave those human/publication checks pending. Their absence must not block an authorized local build.

Task states: pending, ready, in progress, blocked, complete. The checkbox is checked only for complete. An unchecked item can be in any other state. A blocked item names its missing dependency or input and what can proceed independently.

## File ownership and parallel work

- Coding owns Next.js app/components/config, dependency and build setup, CSS, public assets, article routing/loading, and technical verification outputs for its assigned task. It transfers reviewed text to tracked content/articles/; writer audits that public copy in a later assigned pass without concurrent edits.
- Design owns `reports/design-spec.md` and its assigned review reports. It requests implementation through coding rather than concurrently editing CSS. An explicitly reassigned file can change owners only after the previous writer stops.
- Writer owns `context/homepage-copy.md`, `context/claim-review.md`, and selected `writing/*.md` drafts. Context and Markdown drafts remain ignored; only approved public copy is transferred to the site later.
- Reviewers own only their assigned report files. They do not edit the site, author claims on Evan's behalf, contact anyone, or publish anything.
- Coordinator alone owns the board, plan, decision log, shared workflow changes, report disposition, and candidate packet during active parallel work.
- Each agent can write its unique report. No agent overwrites another report. Use `reports/<task-id>-<role>-<round>.md` with a fresh round number on reruns.

Run independent builder preparation in parallel when useful. Typography and content-length exploration can overlap writing; final layout depends on real copy. Coding starts its site implementation only after copy and design handoffs. Freeze site writes while reviewers inspect a candidate. Respect the runner's available capacity; with three worker slots, run three independent tasks and then the remaining reviewer. Do not require seven simultaneous agents or nested delegation.

## Build and review sequence

1. **Preparation:** coding establishes deploy-path facts and proposes checks; writer prepares copy, claims, and article corrections; design prepares the visual specification using the required skills. Keep the compact homepage, three launch articles, and mostly black/white palette with optional brown/navy accents. No expansion to the seven backlog articles.
2. **Reviewable handoffs:** writer identifies exact approved copy revisions and unresolved claims; design provides layout/type/palette rules with accessible pairings and no placeholder-dependent layout. Evan's byline approval is recorded for each launch article. Do not request approval again for already accepted preferences.
3. **Implementation:** coding builds the Next.js App Router site with TypeScript and static export. Reviewed article sources live in tracked content/articles/ and generate /writing/[slug]/ routes. Private writing/ and context/ remain ignored and are never build inputs. Follow website-plan.md for output export, basePath, images, local dev, and eventual Pages Actions deployment. Build output is generated, not hand-authored or committed.
4. **Technical and visual checks:** coding runs type/lint checks and a production export, then checks the static output as well as dev mode: navigation, basePath/asset paths, direct article URLs, content, keyboard behavior, mobile, zoom, console errors, and actual accessibility results. Design inspects desktop/mobile renders and requests concrete corrections. Failed checks produce tasks and targeted rechecks.
5. **Stable candidate:** coordinator prepares `reports/candidate.md` with candidate ID, local/live URL, exact included pages, source revision (commit plus dirty-file notes or file hashes), screenshots/evidence locations, known access limitations, and scope of review. If only screenshots or source are available, reviewers state that limit and do not invent browser interactions.
6. **Independent audience reviews:** investor, boss, and classmate first read only the candidate-facing material and linked public pages, plus shared safety rules. Do not give them private context, the intended brand narrative, or other reviewers' findings to supply what the page fails to communicate. A runner that inherits the full conversation must label the result context-informed; it cannot claim a blind first impression. Teacher also receives README, DECISIONS, verification, and actual submission evidence.
7. **Triage and fixes:** coordinator merges duplicate findings, assigns each accepted fix to coding/design/writer, records disposition and rationale, then reruns affected reviewers against the new candidate. Changed content invalidates only the relevant earlier findings/checks, not unrelated completed tasks.
8. **Publish and finish:** on deployment authorization, coding deploys and checks the actual URL. Teacher checks final evidence and remaining human deliverables. Evan records the video, writes Q3, performs the real reader check, comments on three real classmates' sites, and submits in Canvas. No agent impersonates these people or counts a simulation as a human deliverable.

## Audience review rules

Every audience report is labeled **simulated perspective**. Investor means separate VC and family-office lenses, not financial advice or an actual funding decision. Boss means a professional reader assessing the published evidence, not access to unknown employment agreements. Teacher does not invent a rubric or grade. Classmate does not replace a real peer or the human 60-second check.

First impressions should record what the reader actually understood: what Evan builds, what connects the companies, what seems supported, and whether a next action is clear. Only then analyze details. Review relevant linked articles, not just the hero. Investor may follow public company/store links to corroborate claims, recording exact URLs and access dates. No unrelated personal investigation or outreach.

Findings use stable IDs and include page/section, quote or observed behavior, observation versus inference, severity, reason, proposed builder owner, suggested fix, and a check that would show it is resolved. Missing evidence is an unknown, not proof of wrongdoing. Do not generate an issue just to satisfy a quota.

- **Blocker:** actual assignment failure, materially false/unsupported public claim, exposed private information, or a broken essential user path with cited evidence.
- **Important:** substantial confusion, attribution ambiguity, or usability/credibility issue with a concrete effect.
- **Suggestion:** preference or optional improvement. It must not quietly become launch scope.

Course requirements, honesty, and privacy take priority. Within them, preserve founder positioning and Evan's voice. A boss preference does not turn the site into a resume; an investor preference does not justify invented traction. Coordinator dispositions are accepted, rejected with reason, deferred, or needs Evan. Only factual/personal inputs or real unresolved choices go back to Evan.

Audience statuses: complete (review performed, no required fixes in the reviewed scope), needs-fixes, or blocked. A completed review task can report needs-fixes; site readiness waits on the resulting correction tasks. No reviewer promises funding, employer clearance, or a grade.

## Reports and decisions

Every agent records work performed, evidence/check results, ideas and rejected alternatives, uncertainties, and next steps in Markdown. State `not run` for checks not performed. Keep reports safe for this public repository. Sensitive context references can stay in ignored `context/claim-review.md`; do not paste personal background, employer internals, or speculative allegations into reports.

Workers propose a short decision note when there was a real choice: choice, alternative, tradeoff, evidence, and which DECISIONS question it fits. Coordinator updates the plan and drafts Q1/Q2/Q4/Q5 as appropriate, marked for Evan's review. Only Evan writes final Q3. Reports supplement the decision log and do not replace it. Record overruling moments as factual notes, never invented first-person testimony.

## Invocation examples

Setup-only: "Read AGENT-WORKFLOW.md and todo.md. Review the team setup and report gaps. Do not begin the site."

Start preparation: "Use writer, design, and coding for the ready preparation tasks in todo.md. Keep each in its assigned files and collect Markdown reports."

Start implementation: "Build the approved site using todo.md. Coordinate coding, design, and writer, then run the four audience reviewers on one stable candidate."

Resume: "Read todo.md and the latest reports. Continue authorized ready tasks; preserve completed work and report what remains."
