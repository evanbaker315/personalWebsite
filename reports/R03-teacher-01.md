# R03: Teacher review of candidate C1 against the actual assignment

**SIMULATED TEACHER REVIEW.** I am not the instructor. This is not a grade, not a score, not a prediction of one, and it uses no rubric beyond what `README.md` actually says. `README.md` states there is no rubric and no list of required features, so nothing below treats a site design or content choice as an assignment requirement.

- Role / assignee / run: teacher reviewer, R03, run 01
- Date: 2026-09-10
- Status: **needs-fixes**. Two of five deliverables exist in partial form. Three do not exist yet.
- Scope: simulated audience review, plus process-evidence review (this role receives README, DECISIONS, todo, and the reports directory)
- Candidate revision and URL: **C1**. Static export at `http://localhost:4321/`, git commit `77a110a` with the entire site uncommitted, per `reports/candidate.md`. **Live URL: none.**
- First impression: context-informed, not independent. I was given the process evidence on purpose, so nothing here should be read as a fresh-visitor reaction. R01, R02 and R04 own that.
- Inputs actually inspected: `README.md`, `DECISIONS.md`, `todo.md`, `reports/candidate.md`, `reports/TEMPLATE.md`, `reports/README.md`, `AGENT-WORKFLOW.md`, `CLAUDE.md`, `reports/C01-coding-01.md`, `reports/C05-coding-02.md`, `reports/F03-coding-03.md`, `.gitignore`, `package.json`, `next.config.mjs`, root `index.html`, and the generated files `out/index.html`, `out/writing/index.html`, `out/writing/draft-anything-send-nothing/index.html`. Directory listings for `verification/`, `.github/`, `*.html` and `.nojekyll`. Two live HTTP fetches (below).
- Assigned write scope: `reports/R03-teacher-01.md` only
- Files changed: `reports/R03-teacher-01.md` (created)

## How I read the pages

I did **not** use a browser. WebFetch refuses `localhost`, so I read the generated HTML in `out/` directly from disk. That is the same artifact the preview server on 4321 serves, and `reports/candidate.md` identifies it as the deployable artifact, so it is the right thing to read for content and structure. It is the wrong thing to read for anything visual. I ran **no** rendering, layout, contrast, keyboard, zoom or screenshot check, and I take D02's and C05's measured results as reported rather than reproducing them.

I did make two real network requests, because a live site is a deliverable and its absence is checkable:

| Request | Result |
|---|---|
| `https://evanbaker315.github.io/personalWebsite/` | **HTTP 404** |
| `https://evanbaker315.github.io/` | **HTTP 404** |

Both on 2026-09-10. That is an observation, not an inference. A 404 does not distinguish "Pages is off" from "repo is private" from "never deployed", but combined with `git status` (20 untracked paths, nothing but the template committed at `77a110a`) and the absence of `.github/workflows/`, the conclusion is not close: nothing has been deployed.

---

## The five deliverables

| # | Deliverable (README lines 14-18) | Status | Evidence I actually inspected | What would settle it |
|---|---|---|---|---|
| 1 | Live website on a public GitHub Pages URL | **not met** | Live fetch of both candidate URLs returned 404 on 2026-09-10. `reports/candidate.md`: "Live URL \| **none. Nothing is deployed.**" No `.github/workflows/` directory exists. `out/` is gitignored and the site source is uncommitted. | A public `https://evanbaker315.github.io/...` URL returning 200 with this site's content, fetched after a deploy, plus the three article URLs and `_next` assets returning 200. |
| 2 | `DECISIONS.md` decision log | **partially met** | `DECISIONS.md` read in full. Q1, Q2, Q4 carry `<!-- DRAFT - Evan: review/edit -->` markers. **Q3 and Q5 are still the template's "*Your answer here.*"** Q4 does not link `verification/` because it does not exist. | Five answered questions with the draft markers removed after Evan reviews them, Q3 in Evan's own words, Q5 naming a real limitation, Q4 linking a real `verification/` folder. |
| 3 | `verification/` with exactly three files | **not met** | Glob for `verification/**` returns **no files**. The directory does not exist. `reports/C01-coding-01.md` L-5 states plainly: "No `verification/` file was created." | `verification/screenshot.png` (live URL bar visible), `verification/fetch.txt` (response from the live URL), `verification/README.md` with the three required lines. Nothing else in the folder. |
| 4 | 3-5 minute video submitted on Canvas | **not met**, and Canvas state **cannot be verified from here** | No video file, script, or outline anywhere in the repo. `todo.md` H04 is unchecked and depends on C06, which is also unchecked. | Evan's own confirmation that a 3-5 minute recording covering tour, design choices and a real challenge is submitted in the Canvas P1 discussion. I have no Canvas access and no supplied Canvas evidence. |
| 5 | Comments on three classmates' sites in the Canvas discussion | **not met**, and Canvas state **cannot be verified from here** | Nothing in the repo. `todo.md` H05 unchecked. **The four simulated audience reviews R01-R04 are not this deliverable and were never presented as such**; `reports/candidate.md` says so explicitly. | Evan's own confirmation of three posted comments on three real classmates' sites, each with one specific thing that works and one thing he would try differently. |

Three of the five depend on a live site existing first. Deliverable 1 is therefore the schedule's whole critical path.

---

## Evidence and checks

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| A live Pages site exists | HTTP GET `https://evanbaker315.github.io/personalWebsite/` and `https://evanbaker315.github.io/`, 2026-09-10 | **fail**, both 404 | A 200 with this site's `<h1>Evan Baker</h1>` would have passed. Cannot distinguish 404-because-private from 404-because-never-deployed. |
| A deploy mechanism exists in the repo | Glob `.github/**` | **fail**, no files | A Pages Actions workflow would have shown here. README's default branch-root deploy cannot serve this site either, because `out/` is gitignored (`.gitignore` line 15). |
| `verification/` exists | Glob `verification/**` | **fail**, no files | Any of the three required files would have shown. |
| Site source is committed | `git status` at session start: 20 untracked paths, `M .gitignore`, `M DECISIONS.md`, one commit `77a110a` | **fail** | Nothing that produces the site is on GitHub yet. Not even the source, let alone the export. |
| The frozen candidate actually contains the F03 corrections it claims | Read `out/index.html` | **pass** | `"AI + business systems"` and `"Probability + market data"` both present with the `+` (FIX-003); zero `figcaption` elements and zero hits for the deleted caption sentence (FIX-005). A stale export would have shown "AI and business systems" and the caption. This is the one place I could independently confirm that the frozen artifact matches the report claiming to have changed it. |
| FIX-001 heading fix survives into the export | Grep `out/writing/index.html` | **pass**, `h1` then three `h2`, no `h3` | An `h1 -> h3` skip would have shown. |
| design-06 heading fix survives into the export | Grep `out/writing/draft-anything-send-nothing/index.html` | **pass**, `h1` then four `h2` | Bold paragraphs instead of `h2` would have shown. |
| No em dashes in the export | Grep `out/` for the em dash and en dash characters | **pass**, zero matches | A single one would have broken a hard project rule. |
| No draft markers, TODOs, unresolved tokens, GPA or lorem text in the export | Grep `out/**/*.html` | **pass**, zero matches | Any unresolved `{{token}}` would have shown. |
| Root `.nojekyll` preserved as README line 177 requires | Glob `.nojekyll` | **pass**, present at root, in `public/`, and in `out/` | Deleting it would strip `_next/` on Pages and produce the exact "successful deploy, broken page" failure README warns about. |
| `reports/candidate.md` manifest hashes | Not run | **not run** | I have no tool that computes md5. The three hashes in the candidate packet are unverified by me. I cross-checked the artifact by content instead, above. |
| Any visual, contrast, keyboard, zoom or Lighthouse result | Not run | **not run** | No browser. I read HTML from disk. D02 and C05 own these and I did not reproduce them. |
| Canvas state of anything | Not run | **not run** | No Canvas access, no supplied Canvas evidence. Per README line 169 Canvas is the system of record for the deadline; if Canvas and README disagree, Canvas wins and I would not know. |

---

## DECISIONS.md, question by question

Assessed only. I did not write, edit, extend, or suggest wording for any answer, and specifically not Q3.

**Q1 (what you set out to build, what changed).** Draft present, marked. It names a real change: eight homepage sections and ten article drafts narrowed to a compact homepage and three articles, with the other seven parked. It also names the palette polarity flip (base flipped to white paper, black ink) with a stated reason. It ends honestly: "Live verification is still pending, because nothing is deployed yet." The half the question asks for ("what is actually live now") is the half that cannot be true yet. Finish after deploy.

**Q2 (a fork in the road).** Draft present, marked. Plain HTML/CSS versus Next.js, with the tradeoff stated as more setup and a build step. It is a real fork and the answer names what was given up. Two notes. First, the draft is written from the planning moment and closes with "This is the chosen approach, not a claim that it has already been implemented or tested" - that sentence is now out of date, since it has been implemented and locally tested, and it will read as under-confident once the site is live. Second, README line 83 explicitly warns that Next.js static export is one of the two most likely paths to burn three weeks on toolchain problems. Choosing it anyway is allowed ("you may use anything you want"), and the answer would be stronger for saying that the warning was read and taken.

**Q3 (where you overruled the agent).** **Empty.** README line 106: "please do not let the agent answer it for you." No agent will, and I am not going to draft it or hint at phrasing. What exists is the raw material: four dated entries under "Candidate moments for Q3", including one that is specific and self-incriminating in the useful way, where the coordinator quietly stopped delegating and started writing app code itself and Evan caught it mid-run. That is factual note-taking, not testimony, and it is correctly labeled as notes. Only Evan can turn it into an answer.

**Q4 (how you know it works).** Draft present, marked. This is the most interesting one to assess, because it half-passes on the hard criterion and fails on the easy one.

- The hard criterion is README lines 96-98: "what would have made this check fail? A check that could not have failed is not a check." The draft names the `clamp()` whitespace failure mode, describes why it is invisible (parses fine, no console error, heading silently inherits its parent size), and states the assertion made instead: computed `h1` font size of 56px at 1440 and 36px at 375. **That is a genuine falsifiable check and it clears the bar the question sets.** It is corroborated: `reports/F03-coding-03.md` contains a nearly identical case where `getComputedStyle` reported a flat 15px at every width and would have passed a broken build, and the check was rebuilt to measure rendered size instead.
- The easy criterion is README line 100: "Link to your `verification/` folder." **The draft cannot, because the folder does not exist.** The draft says so, in a TODO.
- The gap that matters is that every check in the current draft ran against a local export. README line 47 is the whole point of the assignment: "That claim is worth nothing until you look at the live URL yourself." A type-scale assertion on `localhost` is a good check about correctness and says nothing about deployment. The draft's own TODO identifies exactly this. See finding R03-07 for what closing it requires.

**Q5 (what is still wrong).** **Empty.** An agent may draft this one for Evan to approve; the material is abundant and already written down (open personal inputs, the unlinked `/writing/` index, the unproven deploy path, `serve` not behaving like GitHub Pages on trailing slashes and 404s).

The `<!-- AGENT NOTES -->` block at the bottom instructs its own deletion before submitting. That has to actually happen.

---

## Process evidence: is this real work or narrative?

README line 38: "You will be graded on your judgment and your process." So this section is not decoration.

**It reads as real work, and unusually so.** I went looking for claims without checks behind them and mostly did not find them. What convinced me, specifically:

1. **Checks are stated with their failure conditions, not just their outcomes.** Every evidence table in `C01`, `C05` and `F03` carries a "what could have made this fail" column that is filled in with a specific mechanism, not "if it were broken."
2. **Two checks were proven falsifiable by deliberately breaking them.** `FIX-001`: the fixed headings were demoted back to `h3` in the hydrated DOM and axe re-run, producing 1 `heading-order` violation, against 0 with the fix. `C01`: a temporary lint probe file with `any`, an `<img>` and an unused var was written to confirm the flat config was actually enforcing rules, then deleted. Both are the difference between a check and a ritual.
3. **A check was rejected as invalid on the record.** `design-05` states outright that `getComputedStyle` "reports 15px at every width and passes regardless, so it is not a valid check", and `F03` prints the invalid measurement alongside the valid one to show it would have passed the broken build. That is the exact habit README line 45 describes.
4. **The verification method itself got corrected mid-project.** `W03` ran its copy comparison in both directions and recorded that forward matching alone passed 42 of 45 blocks and would have missed the band caption entirely, because the caption was an addition rather than a modification.
5. **Failures and near-misses are recorded rather than smoothed over.** `W-20`: a parallel rebuild moved `out/` under a verifying agent twice, and F01 nearly compared its own change against a render of its own change. The cause is attributed to coordinator scheduling, not to the agent, and a binding rule was added. `C03`/`C04` are labeled in the task board as "**Performed by the coordinator, not coding (deviation recorded)**" instead of being quietly recorded as delegated.
6. **A blocker was resolved by deletion rather than by better phrasing.** `FIX-005`: an agent-written caption made a universal claim about Evan's own method that no source supported. The writer declined to draft a replacement on the explicit grounds that a different agent-written sentence would keep the defect behind better wording. The slot ships empty and its CSS rule is kept with a comment explaining who owns filling it. I confirmed the deletion in the export myself.
7. **Limitations are stated where they hurt.** C05 records that 4 Lighthouse contrast results are *incomplete* rather than *passed* because axe cannot resolve a background through an SVG node, and that Lighthouse ran under a Node version below its declared engine. C05 L-2 and L-3 state that `serve` is not GitHub Pages and that the basePath check proves the prefix is correct without proving Pages will serve it.

**Where the process evidence is thinner:**

- The reports are long. Detail is not the same as judgment, and a reader could reasonably ask whether 617 lines of design spec was the right amount of effort for a one-page site with three articles. I am not calling that a defect; I am noting that the volume is not itself evidence.
- `reports/candidate.md`'s three manifest hashes are unverifiable with my tools, so the freeze is attested rather than proven to me. I checked the artifact by content instead and it matched.
- All of it certifies a local artifact. **Every claim in every report is about a site that does not exist on the internet.** That is not dishonest anywhere I looked, it is stated repeatedly and clearly, but it means the strongest part of the process record is currently attached to the deliverable that is not delivered.

---

## Findings

Severity here means: **blocker** = the assignment cannot be handed in without it; **important** = it will damage a deliverable or block one that is on the critical path; **suggestion** = optional.

| ID | Location / quote / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| R03-01 | Live GETs of `https://evanbaker315.github.io/personalWebsite/` and `https://evanbaker315.github.io/` both returned **404** on 2026-09-10. `reports/candidate.md`: "Live URL \| none." No `.github/workflows/`. `git status`: 20 untracked paths at `77a110a`. | observation | Deliverable 1 of 5, and deliverables 3, 4 and 5 all depend on it. README line 63 asked for this on day one; it is day 8 of 20. | coding, with **Evan action required** for repo settings | Commit the source, add a Pages Actions workflow, enable Pages, deploy. Accept when the public URL returns 200 with `<h1>Evan Baker</h1>`, all three `/writing/<slug>/` URLs return 200, and `_next` assets return 200, verified by `curl` **and** in a browser. |
| R03-02 | Glob `verification/**` returns no files. `reports/C01-coding-01.md` L-5: "No `verification/` file was created." | observation | Deliverable 3 of 5. README lines 110-117 specify exactly three files. | coding, with **Evan action required** for the screenshot | After deploy, create exactly `screenshot.png`, `fetch.txt`, `README.md`. Accept when the folder contains those three and nothing else, the screenshot shows the live URL in the browser's URL bar (README line 127: a `localhost` screenshot "proves your laptop works, and that is not the claim you are making"), `fetch.txt` is the response from the live URL, and `README.md` has the three lines. |
| R03-03 | `DECISIONS.md` Q3 is the unedited template: "*Your answer here.*" | observation | Deliverable 2. README line 105: "That question is the heart of this project, and it only works in your own words." | **Evan only** | Evan writes it from the four dated candidate moments. **No agent may draft, outline, or suggest phrasing.** Accept when the answer is Evan's, names what the agent did, how he noticed, and what happened instead. |
| R03-04 | `DECISIONS.md` Q5 is the unedited template: "*Your answer here.*" | observation | Deliverable 2. It is one of the five questions the log ships with. | coordinator may draft, **Evan approves** | Draft from real known limitations, then Evan edits. Accept when Q5 names one specific thing that is not right or not understood, plus what he would do next and how he would find out. |
| R03-05 | No video, script or outline in the repo. `todo.md` H04 unchecked, dependent on C06. | observation for the repo; Canvas state **cannot be verified from here** | Deliverable 4 of 5, worth 50 of the discussion's 200 points per README line 20. README line 148: "the one deliverable an agent cannot make for you." | **Evan only**; writer may prepare a factual outline of what is on the site | Record after the site is live, covering the three required items: live tour, design choices including what was rejected, and a real challenge. Accept when Evan confirms a 3-5 minute recording is submitted on Canvas. A script is not a submission. |
| R03-06 | Nothing in the repo. `todo.md` H05 unchecked. | observation for the repo; Canvas state **cannot be verified from here** | Deliverable 5 of 5, worth 50 points per README line 20. | **Evan only** | Evan visits three classmates' sites and comments on each with one specific thing that works and one thing he would try differently, starting with sites that have no comments yet (README line 160). **R01-R04 are simulations and are not this.** Accept when Evan confirms three posted comments. |
| R03-07 | `DECISIONS.md` Q4: "TODO after deploy: link `verification/` and add the live-URL fetch." Every check named in the draft ran against the local export. | observation | README line 100 requires the link. README line 47: an agent's deploy claim "is worth nothing until you look at the live URL yourself." The clamp check is a genuinely good falsifiable check and it is about correctness, not about deployment. | coordinator drafts, **Evan approves** | After C06 and C07, add the `verification/` link and a live-site failure condition that is specific and could actually have failed. Accept when Q4 links the folder, names a check that ran against the public URL, and states a concrete failure mode. Two candidates already sit in the evidence: `.nojekyll` missing would have stripped `_next/` and served an unstyled wall of text; a wrong `basePath` would have returned 200 on the root page with every asset 404ing. Evan picks and writes; I am not writing it. |
| R03-08 | `git status`: one commit `77a110a`, everything else untracked, including `app/`, `components/`, `content/`, `package.json`. | observation | Nothing that makes the site exists on GitHub. This blocks R03-01, which blocks three more deliverables. Also: README line 167 warns that a secret deleted in a later commit is still readable, so the **first** commit of `reports/`, `todo.md` and `AGENTS.md` is the one that has to be clean. | coding / coordinator | Audit then commit. Accept when `git add -A --dry-run` stages nothing from `context/`, `writing/`, `node_modules`, `.next` or `out/` (C05 reports 67 paths staged and none private, which needs re-running at commit time, not accepted from a report), and when `reports/` has been read for anything unsafe in a public repo. |
| R03-09 | No `.github/workflows/`. `.gitignore` line 15 ignores `out/`. Repo is `evanbaker315/personalWebsite`, not `evanbaker315.github.io` (`reports/C01-coding-01.md`). | observation | README lines 69-74 call the non-root repo name "the single most common way this project breaks." The two deploy paths need different build commands, and neither exists yet. README's own branch-root instructions **cannot work here**, because the deployable artifact is generated and gitignored. | coding, **Evan decides the repo name** | Decide: rename to `evanbaker315.github.io` (then `npm run build`, empty basePath, site at the root) or keep `personalWebsite` (then `npm run build:pages`, basePath `/personalWebsite`). Then write the Actions workflow with `NEXT_PUBLIC_BASE_PATH` matching. Accept per R03-01. If renamed, C05 L-3 requires the basePath sweep be redone with the empty prefix. |
| R03-10 | `reports/candidate.md`: "**Evan's byline approval (H01) is open.** All three articles render provisionally." `todo.md` H01 unchecked. | observation | Deploying publishes three articles under Evan's name that he has not approved. This gates R03-01 rather than following it. | **Evan only**, coordinated by writer | Evan reads the three article texts and the homepage copy and gives dated approval per piece. Accept when H01 records a dated approval for each of the three, or when an unapproved piece is pulled from launch. |
| R03-11 | `reports/candidate.md`: "Four inputs are genuinely open and only Evan can close them": the band caption slot, the 30x bug personal attribution, a real commercial anecdote, and graduation timing. | observation | These are factual and personal. An agent filling any of them invents a fact. The empty caption slot already cost one blocker (FIX-005). | **Evan only** | Evan answers each or confirms it ships as-is. Accept when each of the four has a recorded disposition. Note the site currently reads fine without the caption; leaving it empty is a legitimate answer. |
| R03-12 | Root `index.html` contains `<h1>Hello, world.</h1>` and is the only page currently committed. `reports/C01-coding-01.md` recommends keeping it as a fallback until Actions is proven. | observation | Keeping it is sound while the deploy is unproven. The risk is the endgame: if Pages is switched on from branch root, or if the Actions deploy fails silently, the live URL serves the template and a `curl` returns 200. A 200 is not the check. | coding | Delete root `index.html` and `style.css` in the same commit that lands the real site, after the Actions deploy is verified. Accept when the live URL's `<h1>` is `Evan Baker` and the string "Hello, world" returns zero hits on the live site. |
| R03-13 | `todo.md`: `FIX-006` (EdgeBet vs the App Store's "Edgebet App"), `design-09` / `F03-01` (44px tap targets, inline-flex ruling awaiting design's recheck), `F03-02` (live 404 behavior, deferred to deployment) are open. | observation | None is an assignment requirement. `F03-02` is the only one that must be done live, and it is correctly parked at C06. | writer, design, coding | Close or record as deliberate. Accept when each has a disposition. `F03-02` accepts when a nonexistent URL on the live site returns the styled 404 with working asset paths. |
| R03-14 | `DECISIONS.md` bottom block: "AGENT NOTES, not part of the submitted log... Evan writes the final Question 3 answer himself from these notes, then deletes this section." | observation | The log is a handed-in deliverable. The block instructs its own removal and currently sits below the answers. | coordinator, after H03 | Delete the block once Q3 is written. Accept when `DECISIONS.md` contains five answers, no `<!-- DRAFT -->` markers, and no agent-notes section. |
| R03-15 | README line 83 warns Next.js static export is one of the two most likely paths to burn the three weeks on toolchain problems. The stack was chosen anyway. | observation, with inference about the consequence | Not a rule violation: README line 82 permits any stack that reaches a live Pages URL. But the warning is about exactly the step that has not happened. All the toolchain risk in this project is concentrated in the single remaining unproven step. | none, informational | Nothing to fix. It raises the priority of R03-01 rather than creating separate work. |
| R03-16 | `CLAUDE.md` requires a 60-second comprehension check with an unfamiliar reader (`todo.md` H02). `README.md` does not. | observation | Worth stating so it is not mistaken for an assignment item, and so it is not mistaken for something an agent did. It is a self-imposed quality gate. **R04 does not satisfy it**; `reports/candidate.md` says so. | **Evan only** | Optional as far as the assignment goes. If run, record the real person's actual answers. |

No findings about site content, structure, section choice or visual design appear above, on purpose. README lines 28-32 and 41-42 state there are no required sections, no required framework, no required page count, no required look and no rubric. Judging the site against an invented standard is the thing this role must not do. R01, R02 and R04 assess the site as readers; that is a different question from whether the assignment is satisfied.

---

## Timeline

README line 9 gives a due date of **Tuesday, September 22, 2026**. Today is **2026-09-10**, which is 12 days out. README line 169: **Canvas is the system of record for the deadline.** I have no Canvas access and no supplied Canvas evidence, so **if Canvas says something different, Canvas wins and I would not know it.** Late work loses 20% and nothing is accepted more than one week late (README line 168).

Ordering matters here because three of the five deliverables sit downstream of the deploy, and several steps only Evan can perform.

**Blocked on Evan personally, and worth starting now because they gate agent work:**

1. **Repo name decision** (R03-09). One sentence, and it determines the build command. Everything deploy-related waits on it.
2. **H01 byline approval** for the homepage copy and three articles (R03-10). Publishing without it publishes unapproved writing under his name.
3. **The four open factual inputs** (R03-11). Any of them can be answered "ships as is."

**Then, agent work, in order:**

4. Audit and commit the source (R03-08).
5. Write the Pages Actions workflow, enable Pages, deploy (R03-09, R03-01).
6. Verify the live URL by `curl` **and** in a browser. README line 176: Pages caches up to 10 minutes, so an unchanged browser view right after a push is not evidence of failure. Check all three article URLs, the assets, and the 404 (F03-02).
7. Delete the template `index.html` and `style.css` (R03-12), redeploy, re-verify.
8. Build `verification/` (R03-02). The screenshot needs a human with a real browser window showing the URL bar.
9. Draft Q5, and update Q1, Q2 and Q4 from what actually happened (R03-04, R03-07).

**Then, blocked on Evan personally again:**

10. **Write Q3** (R03-03). Can be written any time; the notes are already there.
11. **Approve or edit all five answers**, then delete the agent-notes block (R03-14).
12. **Record the 3-5 minute video** (R03-05). Requires the live URL, so it cannot start before step 6.
13. **Comment on three classmates' sites** (R03-06). This one depends on other people posting, not on this repo. It is the item most likely to get squeezed at the end, and README line 160 asks him to start with the sites that have no comments yet, which is easier early than late.
14. **Submit all five in Canvas.**

The concentration risk is steps 12 through 14: three of the five deliverables are human-only, two of them cannot start until the deploy is verified, and one of them depends on classmates having posted. Twelve days is comfortable for that sequence and is not comfortable if the deploy slips a week.

---

## Ideas and alternatives

Optional, not requirements. None of these is an assignment gap and none should become launch scope.

- **Deploy before the site is perfect.** README line 65: "The deploy is also the step with the most ways to go wrong, so it is the one you want behind you while there is still plenty of time." An early deploy of the current export, even with H01 open, would prove the pipeline and de-risk the whole tail. The counter-argument is real and I think it holds: publishing unapproved articles under Evan's byline is worse than an unproven pipeline. A middle path is deploying the homepage with the three article routes removed, verifying Pages end to end, then adding the articles once H01 lands. That trades one extra deploy cycle for retiring the riskiest unknown 12 days early.
- **The repo-name decision has a second-order effect.** Renaming to `evanbaker315.github.io` gets the root URL README recommends and the resume-friendly address, and makes `basePath` empty, which is one fewer thing to get wrong. Keeping `personalWebsite` is already proven locally at all 24 internal URLs. Both work. The rename is slightly safer and costs a re-run of the basePath check with the empty prefix.
- **The video has unusually good raw material.** The coordinator-stopped-delegating moment, the `clamp()` check, the invalid `getComputedStyle` criterion, and the deleted caption are all concrete stories about judgment rather than about CSS, which is what README line 144 asks for. That is an observation about what exists, not a script, and Evan should tell whichever of them is actually true to his experience.
- **Q2 is currently under-claimed.** It ends by saying the Next.js choice is not a claim of having been implemented or tested. It has since been implemented and tested. Updating it is not adding a requirement, it is making the answer accurate.

## Proposed decision-log update

No new decision from this review. This is a review, and it deliberately produced no draft text for any DECISIONS answer.

Two existing drafts need a factual update by the coordinator once the live site exists, and both are already flagged in the drafts themselves: **Q1**'s "what is actually live now" half, and **Q4**'s `verification/` link plus a live-URL check. **Q3 stays untouched by every agent.** Q5 is unwritten and may be drafted by the coordinator for Evan to edit.

For Q3, factual note only, not testimony and not phrasing: the four candidate moments in `DECISIONS.md` are dated and specific, and the 2026-09-10 delegation entry has the structure the question asks for. That is an observation about the notes, not a suggestion about what Evan should say.

## Handoff

- **Acceptance criteria met:** each of the five deliverables is classified with the evidence I actually inspected; the missing live and submission items are marked pending rather than assumed; no grade, score, or rubric was invented; no DECISIONS answer was written or ghostwritten.
- **Status: needs-fixes.** Two of five deliverables partially exist. Three do not exist. The site itself, as a local artifact, is in good shape and well evidenced; the assignment is not close to done.
- **Could not verify:** anything on Canvas (no access, no supplied evidence, deadline authority unknown to me); anything visual, since I read HTML from disk and used no browser; the candidate manifest hashes, since I have no md5 tool; whether the GitHub repo is public and whether Pages is enabled, since a 404 does not distinguish those cases.
- **Blocked on Evan personally:** Q3 (R03-03), the video (R03-05), three real classmate comments (R03-06), H01 byline approval (R03-10), the four factual inputs (R03-11), the repo-name decision (R03-09), and final approval of every draft answer. An agent can prepare materials for some of these. **No agent can supply Evan's Q3, his recorded voice, or his actual participation in the class discussion.**
- **Next owner:** coordinator, for P04 triage alongside R01, R02 and R04. R03-01 and the R03-09 repo decision should be raised with Evan before the other three reviews are triaged, because they gate three deliverables and one of them needs a one-sentence answer from him.
- **Rerun after change:** R06 rechecks the final package after C06, C07, P06 and H03-H05. This report's deliverable table is accurate as of 2026-09-10 and expires the moment anything is deployed.
