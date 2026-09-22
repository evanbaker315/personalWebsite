# Agent entry point

Read `CLAUDE.md` for project rules, `AGENT-WORKFLOW.md` for collaboration, and `todo.md` for task ownership and dependencies. Builder agents also read `website-plan.md` and the relevant context listed in their role. Audience reviewers follow the staged reading order in the workflow so their first impression comes from the candidate site.

The seven role definitions live in `.claude/agents/`: coding, design, writer, investor, boss, teacher, and classmate. They are project-local Claude Code definitions. In another agent runner, the coordinator explicitly supplies the matching role file and shared rules as task instructions; do not assume that runner automatically registers these files.

Evan has authorized creating the agent team and workflow. Current work remains preparation only. Creating tasks does not authorize building or deploying the site. When Evan asks to start a phase, the coordinator records that instruction and starts its ready tasks without asking for the same authorization again.

The main session coordinates. The boss role is an employer reviewer, not the coordinator. Only the coordinator edits `todo.md`, `website-plan.md`, and `DECISIONS.md` while agents run. Agents request a task, work within its assigned files, and leave a Markdown report with work, evidence, ideas, and proposed decision-log updates. Reports follow `reports/TEMPLATE.md`.

Parallel work needs independent tasks and non-overlapping write scopes. Reviewers receive the same stable candidate and write separate reports. Keep private context private, do not invent results, and never write Evan's final DECISIONS.md Q3 answer. Assignment completion takes priority over portfolio polish.
