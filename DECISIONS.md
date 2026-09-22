# Decision log

Your methods section. About one page total.

Answer these as you go, not the night before it is due.
Specifics beat polish - a short honest answer is worth more than a long vague one.

Delete these instructions when you are done, or leave them. It does not matter.

---

## 1. What did you set out to build, and what changed?

What you wanted at the start, and what is actually live now.
Name one thing you dropped or added along the way, and why.

<!-- DRAFT - Evan: review/edit. Written at project start (2026-09-10); the "what changed"
half gets updated as the build actually happens. -->

I set out to build a site that shows what I am building and how I think about things. My first goal was to
hit the course requirments, and secondly to build a website people can go to if they want to learn more about me. 
I intentionally kept the design of the website bland, as the goal of it is to quickly allow potential collaborators
or investors on my projects to get information quickly, and know that I am someone who takes function, operations,
and engineering seriosly. Some things that changed along the way were that I added the little scroll animation to the right
side of the screen to make the site a bit more interesting.  

I want a site that shows what I build and how I think. The course requirements come
first. After that, I want a founder home base I can keep using. Demarly and EdgeBet
lead, with Nucli8 and professional work adding evidence. The thread is understanding
complicated systems and turning them into useful software and businesses.

The plan grew to eight homepage sections and ten article drafts before the site was
built. After review, I narrowed the first version to a compact homepage and three
articles. The other seven stay in the backlog. The thesis and current-status content
can fit into the intro, company descriptions, and About without repeating everything.
Each company also needs a clear explanation of who it helps and a real product
decision, not just architecture details.

I chose mostly black and white, with small brown and navy accents if they fit. In the
build the base flipped: white paper, black ink, and one full-bleed black band holding
a four-station line reading system, model, software, business. That band is the only
non-white surface on the site and the only drawn element. The reason was practical.
Deep brown and deep navy are real ink colors on white. On black they have to lighten
into tan and pale blue, which is the beige look I did not want, and three long
articles read better on a light page anyway.

<!-- DRAFT - Evan: review/edit. Product image direction accepted 2026-09-22. -->

I added screenshots from Demarly and EdgeBet so people can see the products. They
replace the little pipeline diagrams. The site keeps its black and white base, but
the screenshots keep their actual colors. I chose real product screens over custom
illustrations because they show what I built. Full-size links let people inspect
the details without making every image huge on the homepage.

The site now runs locally: a compact homepage plus three articles. Live verification
is still pending, because nothing is deployed yet.

<!-- DRAFT - Evan: review/edit. Content direction accepted 2026-09-22. -->

I also cut back the repeated explanations. The company sections explain what people
can use and a product decision I made. Selected Work holds the engineering detail,
and the articles go deeper. The alternative was keeping every explanation on the
homepage, but the same ledger and pricing stories kept showing up twice. I chose
to make the opening more specific and give each section a different job.

I also asked for separate coding, design, and writing agents, followed by investor,
employer, teacher, and classmate review agents. Each leaves a Markdown report. One
coordinator keeps the task list and decision log in sync. The builders have run. The
four audience reviewers have not yet, and their reviews are simulations either way.

---

## 2. A fork in the road

Name one real choice where you could have gone two ways.
Plain HTML or a framework. One page or several. Your own CSS or someone's template.
What goes on the front page and what does not.

Say which you picked, what the alternative was, and what you gave up by not taking it.

"There was no alternative" is not an answer. Find the fork.

<!-- DRAFT - Evan: review/edit. Planning decision, 2026-09-10. -->

I initially picked plain HTML and CSS. I then changed the plan to Next.js. The
implementation plan uses the App Router, TypeScript, shared layouts, and statically
generated article pages. GitHub Pages is still the deployment target, so the site
will export static files instead of requiring a running application server.

The tradeoff is more setup: dependencies, a build, and checks that the exported
pages work as well as the development server. Shared components and article layouts
should make the site easier to extend. This is the chosen approach, not a claim
that it has already been implemented or tested.

For the agent workflow, I separated building from audience review. The alternative
was one agent doing the work and judging it from every angle. Separate reviewers
should expose different gaps, but add coordination and report-reading work. Their
reviews are simulations. They do not replace a real reader or the class deliverables.

<!-- DRAFT - Evan: review/edit. Motion choice, 2026-09-22. -->

I added a quick navy underline on link hover and a small reveal on Selected Work
and Writing. The alternative was just the underline. I kept the reveal to two
sections so the whole page does not animate. Reduced motion shows everything
instantly. That adds a little code and checking, but keeps the content easy to reach.

---

## 3. Where you overruled the agent

One time Claude suggested, wrote, or claimed something and you did not take it.

What did it do? How did you notice? What did you do instead?

If it genuinely never happened, say so plainly, and then say what you would have had to
check in order to notice. Being honest here costs you far less than a story you cannot
defend when you record your video.

*Your answer here.*

I overruled the agent in a couple of places. Firstly, I overruled it on the colors. At first I wanted a black and white website with brown and navy accents. However, the 

---

## 4. How you know it works

What check did you run, and what did it tell you?

Then the real question: **what would have made this check fail?**
A check that could not have failed is not a check.

Link to your `verification/` folder.

<!-- DRAFT - Evan: review/edit. The live half of this answer does not exist yet. The
     verification/ folder gets filled after the first real deploy, and this draft has to
     be finished then. What is written below is real and already ran. -->

The check that earned its place is boring to describe and would have been invisible
without it. The type scale is set with CSS `clamp()`. If you write `clamp(2.25rem,1.2rem+4.5vw,3.5rem)`
without spaces around the `+`, it parses fine, throws no console error, and then fails
silently later: the heading just inherits its parent's size. The page does not look
broken. It looks flat. So instead of eyeballing it, I opened the exported site in a
headless browser and asserted the computed font size of the h1: 56px at a 1440px window,
36px at 375px. It passed.

That check could have failed, and a nearly identical one nearly did somewhere else. The
same run also asserts that no element sits outside the viewport at three widths, and that
no navy or brown ever resolves inside the black band, which is the rule that keeps dark
accent text off a black background.

TODO after deploy: link `verification/` and add the live-URL fetch, which is the check
that proves the thing is actually up rather than just correct on my machine.

---

## 5. What is still wrong

One thing on your own site that is not right, not finished, or that you do not
fully understand.

What would you do next, and how would you find out?

*Your answer here.*

---

<!-- AGENT NOTES, not part of the submitted log. Per CLAUDE.md, the agent logs one line
here each time Evan rejects, corrects, or overrides an agent suggestion. Evan writes the
final Question 3 answer himself from these notes, then deletes this section. -->

## Candidate moments for Q3 (notes for Evan, delete before submitting)

- 2026-09-10: The agent's first drafts (plan, decision log) were written in a polished,
  em-dash-heavy style that didn't sound like me. I caught it reading the drafts and told
  it: no em dashes anywhere, and the voice is plain and direct, not prep school. The
  agent rewrote its own files and added the rule to CLAUDE.md so it sticks.
- 2026-09-10: Evan replaced the tentative amber/blue palette with mostly black and
  white plus optional brown and navy accents, and explicitly kept the work in the
  preparation phase. The agent recorded those constraints instead of starting the site.
- 2026-09-10: Evan corrected the planned stack from plain HTML/CSS to Next.js. The agent updated the plan and workflow to use a static export for GitHub Pages. This records the actual correction; Evan decides whether to use it in his own Q3 answer.
- 2026-09-10: The agent was told to run this build through the coding, design, and writer
  agents. Partway through the implementation it had quietly stopped delegating and was
  writing all the app code itself as the coordinator, which is the one role that is not
  supposed to touch app files. Evan noticed while it was working and called it out. The
  agent recorded the deviation in its report instead of glossing over it, and handed the
  remaining review and check tasks (W03, C05, D02) to the actual agents.
- 2026-09-17: The build shipped a full-bleed black band (MethodLine) right under the hero,
  with a four-station diagram (system/model/software/business) and a scroll-position
  marker, defended at length in code comments as a deliberate non-sticky choice. Evan
  actually scrolled the live local build and found it broken in practice: the band
  disappears after the hero so you never see the marker move, and its four stations don't
  correspond to anything on the actual page. He asked for it to become a small, persistent
  header instead. The agent replaced it with a 48px sticky bar pinned to the top of the
  viewport, whose five stops are the site's real sections (Building, Work, Writing, About,
  Contact) as working links that light up once you've scrolled into that section.
- 2026-09-17 (same session, second pass): the agent had only offered "sticky top bar" or
  "small fixed corner badge" as the two options, and Evan picked the top bar. After seeing
  it live, he said neither was actually what he wanted: he asked for a fixed vertical rail
  on the side instead of a bar across the top, and for the dots to light up and un-light
  live as he scrolled past a section in either direction, instead of staying lit forever
  once reached. The agent's option set had missed both of those. Rebuilt as a small fixed
  black capsule on the right edge with five dots, tracked from live scroll position instead
  of a one-way ratchet.
- 2026-09-21: An earlier session had built the whole Demarly pitch, the homepage's
  technical-bet paragraph, a Selected Work entry, and one of the three launch articles,
  around one absolute claim: agents can draft anything and send nothing, full stop. Evan
  read it and flagged two problems at once: it read weak, and it was about to become
  false, since Demarly is dropping the always-on approval requirement in favor of an
  opt-out that lets agents send without review. The agent hadn't been told about that
  product change and couldn't have known. Instead of patching the old claim to hedge
  around a feature that doesn't exist yet, it went back to the Demarly repo notes, picked
  a different real mechanism that had nothing to do with approvals (the prepaid credit
  ledger staying correct under concurrent writes and duplicate Stripe webhooks), and
  replaced the homepage copy, the diagram, the Selected Work entry, and the article with
  it, retiring the old approval-gate article until the new toggle actually ships.
