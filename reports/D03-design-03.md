# D03: Article-page exit ruling, design-07 reconciliation, and a spec amendment

- Role / assignee / run: design agent, D03, round 03
- Date: 2026-09-10
- Status: complete (a ruling plus a documentation amendment; no site code was changed)
- Scope: information-architecture ruling and specification amendment. Local build only, under the 2026-09-10 local-preview authorization. Nothing deployed, pushed, or committed. The site was treated as frozen: no file in `app/`, `components/`, `lib/` or `content/` was edited and no rebuild was run.
- Candidate revision and URL: candidate C1, static export served at http://localhost:4321/. Export manifest hash `4160a5a5516bf8caa281043465831407` per `reports/candidate.md`.
- Inputs actually inspected: `reports/review-disposition.md`; `reports/R04-classmate-01.md` in full; `reports/D02-design-02.md` (ruling 1 and finding design-07); `reports/design-spec.md` sections 2, 4, 5.5, 5.6 through 5.10, 8 and 9; `components/ArticleShell.tsx`, `components/ArticleShell.module.css`, `components/WritingList.tsx`, `components/WritingList.module.css`, `app/writing/[slug]/page.tsx`, `app/writing/[slug]/article.module.css`, `lib/articles.ts`, `app/globals.css`, `content/articles/*.md` frontmatter, `out/writing/the-30x-bug/index.html`. Rendered inspection of `/`, `/writing/the-30x-bug/` at 1440, 640 and 375 CSS px plus a 200% zoom condition, through headless Chrome 152 over CDP.
- Assigned write scope: `reports/D03-design-03.md` (new) and `reports/design-spec.md` sections 2 and 8 only.
- Files changed: `reports/D03-design-03.md` (created), `reports/design-spec.md` (sections 2 and 8 amended, described below). Scratch scripts and screenshots live outside the repo at `/Users/evanbaker/.claude/jobs/9fcd68ec/tmp/d03/`.

## Work and result

Two items, both closed. Nothing here is implemented; item 1 is an instruction for coding and item 2 is already applied to the file I own.

### Item 1: article pages get an exit. Ruling below.

**The ruling in short.** Article pages get one new block: an `<aside>` headed **More writing**, sitting after the article and before the site footer, listing the site's other articles by title with their brown category label, using the writing-list vocabulary already on the homepage and `/writing/` with the excerpt removed. **`/writing/` stays unlinked and design-07 stands unchanged.** No next/previous, no card grid, no thumbnails, no arrow glyph, no "view all" row.

**Why an exit is warranted at all.** I confirmed R04-03 on real renders rather than taking it on report. At both 1440 and 375, `/writing/the-30x-bug/` contains exactly two internal links and both are `href="/"`: the header word mark and the footer "Back to Evan Baker". The measured consequence is worse than "three sections down". On the homepage at 1440 the Writing section starts at y=3378 of a 5214px document, which is 65% of the way down; at 375 it starts at y=4770 of 6989, which is 5.9 phone screens of scrolling. The section nav in the hero lists `#building`, `#work` and `#contact` and does not list `#writing`, so the reader who lands at the top has no shortcut either. So the current exit costs a reader who just finished an article roughly six screens of scrolling on a phone, with no signpost. That is a real defect, not a taste call.

**Why the answer is direct links and not a link to `/writing/`.** There are three articles. From inside any one of them, "the other two" is the complete remainder of the site's writing. A link to the index would hand the reader a page whose first job is to list the article they just finished. At n=3 the index is the interstitial, not the destination. If the article count ever passes four, this ruling should be revisited and `/writing/` probably earns its link at that point; that condition is written into the instruction below.

**Why it is not next/previous.** `ARTICLE_SLUGS` in `lib/articles.ts` is documented as editorial order, not chronological, and all three articles have an empty `date` field. There is no sequence, so "previous" and "next" would be asserting an order that does not exist, and directional labels are the shortest path to the arrow glyph that spec section 9 rejects. Rejected.

**Why it is not a card grid or a thumbnail row.** Spec section 9 rejects identical rounded cards as page structure and there is no image asset for any article, so a thumbnail row would require inventing one. Not considered further.

### Reconciliation with design-07 (explicit, so the two records agree)

**design-07 stands. It is not amended, reversed, or narrowed by this ruling.** Its subject was the homepage: whether the homepage Writing section should carry a "view all writing" row pointing at `/writing/`. I rejected that because the homepage already lists all three articles in full, with excerpts, directly above where the row would sit, so the row would be a template gesture pointing at content the reader can already see. Nothing in R04 disturbs that reasoning. The reviewer said so itself, unprompted and before reading `reports/candidate.md`: it found `/writing/` orphaned, learned it was a recorded decision, and wrote that it was "not asking to reverse it" and that "the fix does not require it".

The two decisions are about different pages and different reader states:

| | Homepage (design-07) | Article page (this ruling) |
|---|---|---|
| Reader state | Has not read anything yet | Just finished an article |
| What is already on screen | All three articles, with excerpts | Nothing but the article and site chrome |
| What a link would offer | A page listing what is already visible | The only other writing on the site |
| Ruling | No link. Stands. | Two direct links. New. |

The one sentence that reconciles them: **the homepage does not need a pointer to the writing list because it *is* the writing list; an article page needs one because it contains no list at all.** Both decisions follow from the same principle, which is that a link must offer the reader something not already in front of them.

The consequence for `/writing/` is unchanged: it remains a deliberate URL-truncation fallback, reachable by typing the URL, linked from nowhere. This ruling does not make it more orphaned or less. I am content with that, and I am not reopening it.

### Item 2: the section 2 and section 8 documentation amendment, applied

D02 ruling 1 proposed the wording and said I owned it. The coordinator has recorded it in `website-plan.md`; I have now applied the same wording to `reports/design-spec.md` so the specification matches what shipped. Four edits in section 2 and one in section 8:

- Section 2 token table, `--ink-2`: role changed from "Secondary text. Footer line, article blockquote." to "**Non-classifying secondary text, and nothing else.** Selected Work source line, footer line, article blockquote."
- Section 2 token table, `--brown`: role changed from "**Annotation, and nothing else.**" to "**Classification and dating, and nothing else.**", and its list now reads "Company deck line, writing list date or category, article meta line, `::marker` on article lists."
- Section 2 contrast table: the two "where it is actually used" cells for `#4D4D4D` and `#6B4A2F` updated to match. **No hex value, ratio or pass verdict changed**, because no color changed. The ratios stand as computed in D01.
- Section 8 "Where the accents are allowed": brown and `--ink-2` now each get an exhaustive paragraph with the classification/non-classification distinction stated as the reason, plus the standing prohibition on a third annotation color. The preamble was corrected: it previously said "Anything not on this list is black, white, or `--ink-2`", which stopped being true once `--ink-2` itself became one of the listed roles.

One forward-looking addition, flagged because it documents something that does not exist yet: section 8's brown list now names the More writing block at the foot of an article as a place the writing-list brown meta line renders. That is a consequence of item 1 and it keeps the exhaustive list honest rather than making the implementation immediately violate it. **If the coordinator does not accept item 1, delete that clause from section 8.**

Section 5.9 (the article page layout block) is where the More writing element itself belongs in the specification, and 5.9 is outside my assigned write scope this round, so it is unchanged. The full element definition is in the instruction below and can be lifted into 5.9 verbatim when the coordinator has a write window for it.

## The exact instruction for coding

One bounded change. Everything below is measured or derived from existing tokens; no value outside the 8px scale appears.

**1. Where the element lives.**

In `app/writing/[slug]/page.tsx` only, as a sibling of `<article>` inside the `ArticleShell` children, after `</article>`. **Do not put it in `ArticleShell.tsx`.** The shell is shared with `/writing/` and the 404 page, where a list of "more writing" would be either a duplicate of the page or nonsense.

**2. Markup.**

```tsx
{others.length > 0 && (
  <aside className={styles.more} aria-labelledby="more-writing">
    <h2 id="more-writing">More writing</h2>
    <WritingList articles={others} headingLevel={3} showExcerpt={false} />
  </aside>
)}
```

- `others` = `ARTICLE_SLUGS` order, every article except the current slug. Same order as the homepage list, so a reader sees the same sequence twice rather than a reshuffle.
- `<aside>`, not `<nav>`: this is related content, not a site navigation region. It maps to a `complementary` landmark, which is correct and which `aria-labelledby` names.
- Heading levels: article `h1` is the title, article prose uses `h2`, so the aside is `h2` and its items are `h3`. Sequential, no level skipped, still exactly one `h1`.
- Render nothing at all when `others` is empty. No "no other articles" message, no empty heading.

**3. The list component.**

Add one optional prop to `components/WritingList.tsx`: `showExcerpt?: boolean`, defaulting to `true`. When false, skip the `<p className={styles.excerpt}>` and render nothing else differently. **Do not fork the component and do not re-declare the title or meta type rules in a new module.** `WritingList.module.css` already carries the reasoning that the two hosts must not drift apart; a third host makes that more important, not less. The item is then exactly the homepage item with the excerpt removed: `h3` at `--t-h3` in the display face at 600, then 8px, then the brown `--t-meta` line, then 48px to the next item. All three articles currently have an empty `date`, so that brown line renders the category alone ("Engineering", "Data", "AI"), which is the same behavior the homepage already shows.

**4. Spacing, in one new CSS rule.**

In `app/writing/[slug]/article.module.css`:

```css
.more {
  margin-top: var(--s7);   /* 96px, at every width. See the note below. */
}

/* The list sits 32px under the h2, not the 48px the homepage uses, because
   there is no intro paragraph between them here. */
.more :global(ul) {
  margin-top: var(--s4);
}
```

If a `:global()` selector is unwelcome, add a `listGap` escape another way, but the rendered value must be 32px. Everything else comes from the existing tokens and needs no new rule: the site footer's own `padding-top: var(--s7)` already puts 96px between the last item and "Back to Evan Baker".

**The 96px is deliberately not compressed below 480px, which is an exception to the section-4 breakpoint table.** In-article prose `h2` gets 64px above it at every width. If the aside used 64px on mobile it would read as one more section *of* the article. It is not part of the article, so it needs a gap strictly larger than the largest in-article gap. 96px is the next step on the scale. I rendered both and 64px does read as belonging to the article; 96px reads as after it. Record it as a documented override in the same class as the two section-10 overrides already permitted.

**5. Wording.**

Heading: **More writing**. Exactly that, sentence case, no other candidate. It matches the homepage section named "Writing", it makes no claim about ordering, recency or relatedness, and it is the plainest available phrase. Do not use "Read next", "Related", "You might also like", "Continue reading", or "Keep reading". Item text is the article title exactly as it appears in frontmatter, nothing appended.

**6. What must not appear in this block.**

No excerpt. No reading time. No date (there are none). No rule, border, box, card or background. No link to `/writing/`. No arrow, chevron, bullet, or any glyph. No "view all". No hover lift. No count ("2 more articles").

**7. Rendered result to expect.**

At 1440 the block measures 232px tall including its heading, and the article document grows from 2290px to 2522px. At 375 it measures 222px and the document grows from 3426px to 3744px. Both article titles fit on one line at 375 (measured 218px and 254px in a 335px column), so no title wraps at any width I tested.

## Evidence and checks

All measurements are from headless Chrome 152 driven over CDP against the frozen static export at http://localhost:4321/. The candidate element was evaluated by injecting the proposed markup into a loaded page in the browser and screenshotting the result. **No repository file was edited to produce these renders and no rebuild was run**, which is why the numbers describe a proposal rather than a shipped state.

| Check or claim | Evidence / page / file | Result | What could have made it fail / limitation |
|---|---|---|---|
| R04-03 reproduced: every internal link on an article goes to `/` | `/writing/the-30x-bug/`, enumerated `a[href^="/"]` at 1440 and at 375 | **confirmed**, 2 links, both `/` ("Evan Baker", "Back to Evan Baker") | A third internal link anywhere on the page would have shown here. Checked on one article; the other two share `ArticleShell` and the same page component, and R04 independently reports the same on all three |
| Cost of the current exit, homepage at 1440 | measured section boundaries: building 739, work 1931, **writing 3378**, about 4129, contact 4736, document 5214 | Writing begins at 65% of the document | Section ids or order changing would invalidate this |
| Cost of the current exit, homepage at 375 | measured: **writing 4770**, document 6989, viewport 812 | 5.9 screens of scrolling from the top | |
| The hero nav does not point at Writing | `nav a` text at 1440: "What I'm building", "Selected work", "Contact" | **confirmed**, 3 of 5 sections | A fourth nav item would have shown |
| Article tail geometry today | measured at 1440: last prose element ends 2121, footer padding-top 96px, "Back to Evan Baker" at 2189, page ends 2290 | baseline recorded | |
| Proposed block, desktop render | `shots/v2-d-32-cat.png` at 1440, read as an image | pass | The block reads as a third thing between article and chrome; the h2 anchors it; nothing new appears in the page's visual vocabulary |
| Proposed block, mobile render at 375 | `shots/v2-m375-96.png`, read as an image | pass | Titles on one line, brown label legible, 96px break reads as leaving the article |
| Proposed block, 200% zoom | 640 CSS px viewport at deviceScaleFactor 2 (a 1280px window at 200%), `shots/v2-z200-32-cat.png` | pass | `scrollWidth` 640 = `clientWidth` 640, so no horizontal scroll. Hierarchy holds: h2 > title > brown label |
| No horizontal scroll introduced at 375 or 1440 | `scrollWidth` vs `clientWidth` with the block injected | pass, equal at both | A fixed width or an unwrapped long title would have failed |
| Title wrapping at 375 | measured link boxes: 218x20 and 254x20 in a 335px column | pass | A longer future title would wrap, which is acceptable; `text-wrap: balance` on `h3` already handles it |
| 96px vs 64px top gap at 375 | rendered both (`shots/v2-m375-32-cat.png` at 64px, `shots/v2-m375-96.png` at 96px), compared as images | 96px chosen | Judgment call, stated as such. 64px is not wrong, it just groups the block with the article |
| Brown category line vs titles alone | rendered both at 1440 (`shots/v2-d-32-cat.png`, `shots/v2-d-32-nocat.png`) | with the category | Titles alone float at 48px apart with nothing binding each pair; the 8px brown label restores the writing-list grouping and tells the reader the subject |
| Quiet 17px variant | rendered (`shots/tail-d-C.png`) | rejected | Reads as a footnote row, not as an offer, and abandons the writing-list vocabulary for a new one |
| Item is not a heading, alternative | considered, rejected in favor of reusing `WritingList` unchanged | n/a | Making the title a plain `<a>` would require re-declaring font-family, weight, size, leading and tracking to imitate an `h3`, which is exactly the drift `WritingList.module.css` was written to prevent |
| Tap targets in the new block at 375 | measured link boxes 20px tall, 104px between the two link tops | pass under WCAG 2.2 AA 2.5.8 | Under the 24px minimum in height, so it passes on the **spacing exception** (24px circles centered on each target do not intersect). Any future change that brings the items closer than 24px apart breaks that. The existing "Back to Evan Baker" link has the same 20px height and passes the same way |
| Focus ring on the new links | **not run on the injected element** | not run | The ring comes from the global `a:focus-visible` rule that D02 verified on every tab stop; injected DOM is not proof. Coding must re-run the tab-order check after implementing (see acceptance check 6) |
| Contrast of the new block | no new color; brown `#6B4A2F` on `#FFFFFF` = 7.94:1, ink on paper = 21:1, both already in the section 2 table | pass (cited, not re-derived) | |
| Band caption state | `document.querySelector('figcaption')` on `/` | **absent**, confirmed | Recorded for the observation below |
| Band geometry after the caption deletion | measured at 1440: band 471 to 739 (269px), svg 567 to 643 (77px) | 96px above and 96px below the diagram, symmetric | The caption's removal left no hole. This is a fact, not a fix |
| Lighthouse, screen reader, Safari, Firefox, real touch device | **not run** | not run | Out of scope for a ruling round, and the element does not exist yet |

## Findings (reviews or discovered defects)

| ID | Location / quote / behavior | Observation or inference | Severity | Why it matters | Builder owner | Suggested fix and acceptance check |
|---|---|---|---|---|---|---|
| design-11 | `/writing/<slug>/`. Two internal links, both `href="/"`. Homepage `#writing` begins at y=3378 of 5214 at 1440 and y=4770 of 6989 at 375, and is not in the hero nav. | Observation (measured), confirming R04-03 | important | A reader who finishes an article has no path to the other two and pays about six phone screens of scrolling to find them. | coding | Implement the More writing block exactly as specified above. **Accept when:** from any one of the three article pages, both other articles are reachable in one click, with no intermediate page. |
| design-12 | Homepage hero `<nav aria-label="Page sections">` lists 3 links for 5 sections; `#writing` and `#about` are absent. | Observation | suggestion | This is the second half of R04-03's pain and it is design-owned, so I am ruling rather than leaving it implied. R04-01 raised it separately. | coding, only if the coordinator accepts | **My ruling: leave the nav at three items.** It is a shortcut to the three things a visitor came for, not a table of contents, and adding "Writing" to it would be design-07 through a side door: a hero link pointing at a section the reader will scroll past anyway. Adding "About" is more defensible but it makes a five-item row that wraps awkwardly at 375, where the nav is already a stacked column. Once design-11 ships, the article dead end is fixed at the point where it actually hurts, and the nav question loses most of its force. **Accept when:** the nav is unchanged and this ruling is recorded, so R04-01 reads as decided rather than ignored. |
| design-13 | Homepage band. `figcaption` is absent (confirmed in the DOM). The four station words render at 15px/17px weight 500, the same size as the hero nav links 260px above them. | Observation. **Recorded for Evan as a visual data point, not as a fix, and no agent should act on it.** | not rated | The reviewer said the method line did not decode on a 60-second skim. The words-only question is Evan's and is routed to him. My contribution is the part only a rendered pass can see: within the page's own type scale the diagram's words carry no more weight than navigation. Everything making the band prominent is the black field, not the type. Visually the form reads as an axis or a scale of four stages, with no direction, no causation and no actor, so a reader is being asked to infer the claim entirely from the words' order. That is a lot to ask of four nouns at 15px. | none. Evan. | **No agent fix.** Two purely visual options exist if Evan decides the band should carry more, offered as information only: set the four words larger so they read as a statement rather than as labels, or accept that the band is atmosphere and let the About sentence carry the thesis. Choosing between them requires knowing what the line is supposed to assert, which is exactly the thing no agent may write. |

Nothing else was inspected this round, so nothing else is claimed. This was not a review round and it is not a re-review of C1.

## Ideas and alternatives

Alternatives I considered and rejected, with the reason, so they do not come back without new evidence:

- **Link `/writing/` from the article footer instead of listing the articles.** Cheapest possible change: one extra link in `ArticleShell`, zero new components, and it would finally give the orphan route a purpose. Rejected because it costs the reader two clicks where the whole complaint is friction, and because at three articles the index's first item is the piece they just finished. **Revisit if the article count passes four**, at which point this becomes the better answer and `/writing/` probably earns a homepage link too, which would be a genuine design-07 amendment on genuine new evidence.
- **Next / previous pair.** Rejected: no real ordering exists (empty dates, editorial slug order), and directional labels pull toward the arrow glyph section 9 bans.
- **Put the links in the existing footer row next to "Back to Evan Baker".** Rejected: it mixes registers. The footer is chrome and is identical on every article, `/writing/` and the 404. Article titles are content and differ per page.
- **Titles at 17px regular, no heading, as a quiet postscript.** Rendered it (`shots/tail-d-C.png`). Rejected: reads as a footnote row and introduces a fourth link treatment the site does not otherwise have.
- **Include the excerpt.** Rejected: each excerpt already renders on the homepage and on `/writing/`; adding it to every article foot would put each one on the page up to five times across the site, and it triples the height of the block for a reader who has already demonstrated intent.
- **An `<hr>` between the article and the block.** Tempting, because spec 5.9 does define an `hr` (96px, 1px ink, left aligned) for a genuine topic break, and this is one. Rejected: in prose the `hr` is content authored in the Markdown; here it would be a presentational divider, and the site's stated rule is whitespace over rules. The 96px gap does the same job with nothing added.
- **Optional, backlog, not a requirement:** if `/writing/` ever gets more than four items, revisit both this block and design-07 together in one pass rather than separately. Noting it so a future round does not treat them as independent.

## Proposed decision-log update

Two proposed entries for the coordinator. Both are design/IA decisions and belong under **Q2** (structure and what goes where); neither is Q1, Q4 or Q5, and there is no Q3 candidate note from this round because nothing of mine was overruled here.

**Q2, proposed:** Article pages get a "More writing" block listing the site's other articles by title, placed after the article and before the footer, reusing the homepage writing-list item with the excerpt removed. The alternative was a link to `/writing/`, which was rejected because with three articles the index would list the piece the reader just finished. What was given up: `/writing/` stays orphaned, and the block will need revisiting if the article count passes four.

**Q2, proposed (reconciliation, so the record is unambiguous):** design-07 stands unchanged. The homepage still carries no link to `/writing/`, because the homepage already lists every article in full. The article-page exit is a separate decision about a different page, made because an article page contains no list at all. Both follow the same rule: a link must offer something not already in front of the reader.

Also for the coordinator, not a decision: `reports/design-spec.md` sections 2 and 8 now match the brown / `--ink-2` wording already recorded in `website-plan.md`. Section 5.9 still does not describe the More writing block; the definition above can be lifted into it verbatim in a later write window.

## Handoff

- **Acceptance criteria met or unmet:** met. A ruling was issued with the element, wording, placement, tokens and responsive behavior specified; it was reconciled with design-07 explicitly; the spec amendment is applied; and the ruling rests on measurements and real renders rather than on a code read.
- **Blocker and missing input, if any:** no blocker for coding. One item stays with Evan and no agent may resolve it: the method line's meaning, per the disposition. design-13 is a visual observation for him, deliberately not a proposed fix.
- **Next owner and task recommendation:** **coding**, one bounded change: the More writing block per the instruction above, which touches `app/writing/[slug]/page.tsx`, `app/writing/[slug]/article.module.css` and one optional prop on `components/WritingList.tsx`. Nothing else. **Coordinator**, for the two Q2 entries and, when a write window exists, for folding the element definition into `design-spec.md` section 5.9. **No writer task** comes out of this round.
- **Acceptance checks coding can run after implementing:**
  1. From each of the three article pages, both other articles are reachable in one click. Enumerate `a[href^="/writing/"]` on each exported article and confirm exactly two, matching the other two slugs, on every page.
  2. The block appears on all three `/writing/<slug>/` pages and on **neither** `/writing/` nor `out/404.html`.
  3. Heading order on an article page is `h1`, then prose `h2`/`h3`, then `h2` "More writing", then two `h3`. Exactly one `h1`. No level skipped.
  4. Measured at 1440: 96px from the last prose element to the top of the aside, 32px from the h2 to the first item, 8px from each title to its brown label, 48px between items, 96px from the last item to "Back to Evan Baker". Same at 375, including the 96px top gap, which is **not** compressed to 64px.
  5. `scrollWidth === clientWidth` at 375, 640 and 1440, and at the 200% zoom condition (640 CSS px at deviceScaleFactor 2).
  6. Tab through an article page: the two new links take focus in document order after the article and before the footer link, and each shows the standard `rgb(31,51,82) 2px solid` ring at 3px offset. `outline: none` anywhere would fail this.
  7. No new color, no new font size, no new spacing value outside the 8px scale, and no `<hr>`, border, box, arrow or glyph introduced. Confirm the brown label is the same rule the homepage list already uses rather than a re-declaration.
- **Checks or reviews that must be rerun after the change:** the internal-link and navigation-path check; the article-page portion of the D02 rendered pass at 375, 1440 and 200% zoom; the keyboard and focus pass on an article page. The homepage is untouched by this change, so the homepage rhythm measurements from D02 do not need rerunning. R04 asked to re-run the classmate pass on a new candidate; that remains the coordinator's call, and it would need rendered access to be worth more than the last one.
