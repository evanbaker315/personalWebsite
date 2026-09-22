# Design specification: evanbaker.github.io

Owner: design agent. Task D01, round 01. Date: 2026-09-10.
Implementation owner: coding agent (C03, C04). This file is a specification. Nothing here is built in the project yet.

Every value below was rendered and measured in a throwaway prototype before being written down. See `reports/D01-design-01.md` for what was actually inspected and what is specification only.

**Public-safe.** No private context, no unverified claims, no personal background. Copy shown in examples is layout filler owned by the writer agent, not approved text.

---

## 1. Direction and the one bold move

### Direction

Ink on paper, set by an engineer. The page is white with black type, generous vertical space, two typefaces doing all the work, and no boxes, cards, borders, shadows, or decoration anywhere. Restraint is the whole aesthetic. "Quietly expensive" here means the same thing it means in a well made book: the type is good, the spacing is deliberate, and nothing is asking for attention.

The reader is an investor or founder giving the page 30 to 60 seconds, then engineers reading three long articles. Both jobs want the same thing: high contrast, comfortable measure, clear hierarchy, no ornament.

### The one bold move: the method line

One full-bleed black band sits directly under the hero. It contains exactly one thing: a hand authored SVG **dimension line** with four stations, `system`, `model`, `software`, `business`, drawn in white hairlines, plus one caption line.

It is the only drawn element on the homepage and the only non-white surface on the site. It is styled after an engineering drawing's dimension line (a rule with taller end caps at the termini and shorter interior tick marks), not a flowchart. There are no boxes, no arrows, no numbered steps.

**Why this and not the oversized name.** Three reasons, in order:

1. **It answers the question the page is graded on.** `website-plan.md` milestone 4b and todo H02 put an unfamiliar reader in front of the page and ask "what connects the companies." A large name answers nothing. The method line answers it in about two seconds, above the fold on desktop.
2. **The page has no imagery.** There is no approved photo, no product screenshots, no logos. Without the diagram the homepage is 100% text and risks reading as unfinished rather than restrained. One drawn element carries that weight.
3. **The oversized name is the default answer.** `RESOURCES.md` rule 9 literally names "an oversized name" as its example of a bold move, which means it is the move any page would make. It is also the single most imitated developer portfolio gesture on the web.

**What the rejected alternative costs.** Losing the oversized name means the hero is quieter than most personal sites. That is accepted deliberately: h1 is set at a disciplined 3x body (56px) rather than a display size, so the black band is unambiguously the loudest thing on the page. Boldness in one place.

**Content dependency (writer, please read).** The method line replaces the optional connective sentence in `website-plan.md` section 4 ("Two different kinds of complexity ... Same approach: encode the system into software"). Do not also write that sentence as prose. If both exist, the diagram becomes decoration, and a decorative concept section is out of scope. The diagram needs one caption line instead. Constraints in section 5.2.

### Proposed decision that needs recording (coordinator)

`website-plan.md` section 5 currently says "black remains the provisional base from the earlier plan, with white for the main text." **This spec proposes the inverse: white base, black ink, with one black band.** This is inside Evan's approved palette (still mostly black and white) but it flips a recorded provisional note, so it should be confirmed rather than assumed.

The reasoning is technical, not taste:

- **The approved accents only work on a light base.** On white, a deep brown and a deep navy are real ink colors at 7.9:1 and 12.7:1. On black they must be lightened until brown becomes tan (the "beige everything" outcome CLAUDE.md bans) and navy becomes a generic light blue. Evan's own rule, "do not use dark navy or brown as small text on black," is a warning that a black base constrains the accents hard.
- **Three long articles are the depth of this site.** Long-form reading on a dark base is worse for most readers and worse at 200% zoom.
- **Every studied reference is light** (matthewbutterick.com, sive.rs, karpathy.ai, danluu.com).

The black band preserves the black-first impression at full strength while keeping the reading surface light.

---

## 2. Color

### Tokens

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#FFFFFF` | Page background. The only background on the site apart from the band. |
| `--ink` | `#000000` | Primary text: h1, h2, h3, body, link text at rest. True black, not a tinted near black. |
| `--ink-2` | `#4D4D4D` | **Non-classifying secondary text, and nothing else.** Selected Work source line, footer line, article blockquote. Used sparingly. See the exhaustive list in section 8. |
| `--navy` | `#1F3352` | **Interaction, and nothing else.** Link underline at rest, link text and underline on hover and active, focus ring. |
| `--brown` | `#6B4A2F` | **Classification and dating, and nothing else.** Company deck line, writing list date or category, article meta line, `::marker` on article lists. See the exhaustive list in section 8. |
| `--rule` | `#000000` | Rules. The method line and the article `<hr>`. Both 1px ink. There is no light grey rule token, on purpose (see section 9). |
| `--band` | `#000000` | The one black surface. |
| `--band-ink` | `#FFFFFF` | Text and strokes on the band. |
| `--band-ink-2` | `#B8B8B8` | The band's caption only. |
| `--surface-code` | `#F5F5F5` | Article `<pre>` block background only. Not used for inline code. |
| `--select-bg` | `#DDE3EE` | `::selection` background on paper (pale navy). |

### Contrast, computed

Ratios computed from WCAG relative luminance, not estimated. Thresholds: 4.5:1 normal text, 3:1 large text (24px+) and UI components.

| Foreground | Background | Where it is actually used | Ratio | Normal 4.5 | Large/UI 3.0 |
|---|---|---|---|---|---|
| `#000000` | `#FFFFFF` | h1, h2, h3, body, link text at rest | **21.00:1** | pass | pass |
| `#4D4D4D` | `#FFFFFF` | Selected Work source line, footer line, article blockquote | **8.45:1** | pass | pass |
| `#1F3352` | `#FFFFFF` | link text on hover/active, focus ring, link underline | **12.70:1** | pass | pass |
| `#6B4A2F` | `#FFFFFF` | company deck, writing list date or category, article meta, list markers | **7.94:1** | pass | pass |
| `#FFFFFF` | `#000000` | band: method line strokes and the four station words | **21.00:1** | pass | pass |
| `#B8B8B8` | `#000000` | band: caption line only | **10.59:1** | pass | pass |
| `#000000` | `#F5F5F5` | article `<pre>` code text | **19.26:1** | pass | pass |
| `#1F3352` | `#F5F5F5` | a link inside a `<pre>` block, if one ever appears | **11.65:1** | pass | pass |
| `#000000` | `#DDE3EE` | any selected text on paper | **16.30:1** | pass | pass |
| `#1F3352` | `#DDE3EE` | a selected link on paper | **9.86:1** | pass | pass |
| `#6B4A2F` | `#DDE3EE` | selected meta text on paper | **6.16:1** | pass | pass |
| `#000000` | `#FFFFFF` | band `::selection` (white bg, ink text) | **21.00:1** | pass | pass |

Every pair that ships passes 4.5:1. The lowest ratio anywhere on the site is 6.16:1.

### Required confirmations

- **No dark navy or dark brown small text sits on black, anywhere.** This is guaranteed structurally, not by inspection: `--navy` and `--brown` are permitted only on `--paper`. The band contains white and `#B8B8B8` and nothing else. Rule for implementation: **the accents never appear inside `.band`.**
- **No color-only affordances.** Links are distinguished by an underline at rest, not by color. Color change is a hover/focus reinforcement only.
- **No light grey rule token exists.** A `#CFCFCF` hairline on white computes to 1.56:1, which is not a meaningful boundary at any threshold. Rejected in favor of whitespace grouping.

---

## 3. Typography

### The two faces

| Role | Family | Why this one |
|---|---|---|
| Display: h1, h2, h3, article titles, blockquote | **Newsreader** (Google Fonts, variable 200 to 800, roman and italic) | A screen-drawn text serif with real character in its angular terminals and high stroke contrast. Set at weight 600 with tight tracking it reads blunt and serious, like a masthead, not like a fashion or luxury serif. It is not on the list of default AI-design faces. |
| Text: body, decks, meta, links, UI, SVG station words | **Public Sans** (Google Fonts, variable 100 to 900, roman and italic) | A civic grotesque (US Web Design System). Plain, high legibility, no branding baggage, no fashion signal. It is plain in the way the voice guidance asks the copy to be plain. Clearly distinct from a serif, satisfying the "two obviously different faces" rule. |
| Code only | System monospace stack | No third webfont. Used only for real code in articles. Never as a "technical" costume. |

Weight range actually used: Newsreader 600 only. Public Sans 400, 500, 600. That is a real weight extreme (400 against 600 plus a serif/sans jump), not a timid 400/600 sans-on-sans pairing.

### Stacks

```css
--font-display: var(--font-newsreader), Charter, 'Bitstream Charter',
                'Iowan Old Style', Georgia, 'Times New Roman', serif;
--font-text:    var(--font-public-sans), 'Helvetica Neue', Helvetica, Arial,
                system-ui, sans-serif;
--font-mono:    ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas,
                'Liberation Mono', monospace;
```

### Loading

Use **`next/font/google`**, not a `<link>` to fonts.googleapis.com. It self-hosts the files at build time, so the static export has no external font request, no CLS from a fallback swap, and no third-party dependency at runtime.

```ts
// app/layout.tsx
import { Newsreader, Public_Sans } from 'next/font/google';

const newsreader = Newsreader({
  subsets: ['latin'], weight: ['600'], style: ['normal', 'italic'],
  display: 'swap', variable: '--font-newsreader',
});
const publicSans = Public_Sans({
  subsets: ['latin'], weight: ['400', '500', '600'],
  display: 'swap', variable: '--font-public-sans',
});
// <html lang="en" className={`${newsreader.variable} ${publicSans.variable}`}>
```

Request only the weights listed. Do not pull the full variable range.

### Scale

Root stays at the browser default 16px. Never set a root font-size in px; it breaks user text-size preferences.

| Role | Size | px at 375 / 640 / 1440 | Line height | Weight | Tracking | Family |
|---|---|---|---|---|---|---|
| h1 (homepage name) | `clamp(2.25rem, 1.2rem + 4.5vw, 3.5rem)` | 36 / 48 / **56** | 1.05 | 600 | -0.03em | display |
| h1 (article title) | `clamp(2rem, 1.4rem + 2.6vw, 2.75rem)` | 32 / 39 / **44** | 1.15 | 600 | -0.025em | display |
| h2 (section) | `clamp(1.5rem, 1.15rem + 1.5vw, 1.75rem)` | 24 / 28 / **28** | 1.2 | 600 | -0.02em | display |
| h3 (entry, article) | `clamp(1.25rem, 1.1rem + 0.6vw, 1.375rem)` | 20 / 21 / **22** | 1.3 | 600 | -0.01em | display |
| Lead (hero sentence) | `clamp(1.25rem, 1.075rem + 0.75vw, 1.4375rem)` | 20 / 22 / **23** | 1.45 | 400 | 0 | text |
| Tagline ("Engineer. Founder. Builder.") | `1.25rem` | 20 everywhere | 1.6 | 500 | +0.01em | text |
| Body | `1.1875rem` | **19** everywhere | 1.6 | 400 | 0 | text |
| UI / link rows / excerpts | `1.0625rem` | **17** everywhere | 1.5 | 400 | 0 | text |
| Meta / deck / dates | `0.9375rem` | **15** everywhere | 1.5 | 400 | +0.005em | text |
| Inline code | `0.92em` | relative | inherit | 400 | 0 | mono |

h1 at 56px against 19px body is **2.95x**, satisfying "roughly 3x."

### Hard implementation warning: whitespace inside `clamp()`

CSS math requires whitespace around `+` and `-`. `clamp(2.25rem,1.2rem+4.5vw,3.5rem)` is **invalid** and fails silently: the custom property still holds the string, but `font-size` becomes invalid at computed-value time and the element inherits its parent's size instead. In the prototype this collapsed h1, h2, h3 and the lead all to 19px with no console error and no visual "broken" signal, just a flat page.

Write every clamp with spaces: `clamp(2.25rem, 1.2rem + 4.5vw, 3.5rem)`.

**Acceptance check:** after implementing, assert in the browser that `getComputedStyle(document.querySelector('h1')).fontSize === '56px'` at a 1440px viewport. Do not accept "it looks fine."

### Measure and wrapping

- Body measure is capped at `65ch`, which the prototype measured at **66 characters per line** at desktop. Inside the craft target of 65 to 75.
- `text-wrap: balance` on h1, h2, h3 and the hero lead.
- `text-wrap: pretty` on the band caption and article paragraphs.
- Numerals are **proportional**, not tabular. `font-variant-numeric: tabular-nums` was tried on the writing list dates and article meta and rejected on visual evidence: it made "September 12, 2026" read gappy and airy, and the alignment benefit is invisible at three items.

---

## 4. Space and measure

### Scale (8px multiples only)

```css
--s1: 8px;  --s2: 16px; --s3: 24px; --s4: 32px;
--s5: 48px; --s6: 64px; --s7: 96px; --s8: 128px;
```

No value outside this scale appears anywhere, with two documented exceptions: focus ring offset (3px) and underline offset (0.18em), both optical adjustments rather than layout.

### Widths

| Token | Value | Applies to |
|---|---|---|
| `--w-page` | `680px` | The single content column. Everything sits in it: hero, band contents, sections, article prose. |
| prose cap | `max-width: 65ch` on `p` and `li` | Resolves to 680px in practice, so it never conflicts with the column. |

One column, centered, for the whole site. No sidebar, no sticky rail, no second column except the optional About photo grid.

### Gutters and section rhythm by breakpoint

| Viewport | Gutter | Section gap (`padding-top` on `<section>`) | Band `padding-block` |
|---|---|---|---|
| `< 480px` | **20px** | 64px | 48px |
| `480px to 767px` | 24px | 96px | 64px |
| `>= 768px` | 32px | 128px | 96px |

At 375px this gives a 335px content width. At 768px the column reaches its 680px cap (680 + 64 gutters = 744, so the column is fluid from 744px down).

### Local rhythm

- Section `<h2>` gets the full section gap above and **32px** below. More space above a heading than below it, always.
- Company entries (`#building`): **64px** between entries. Two companies need real separation.
- Selected work and writing entries: **48px** between entries.
- Inside an entry: h3 to deck **8px**, deck to first paragraph **24px**, paragraph to paragraph **16px**, last paragraph to link **24px**.
- Hero: h1 to tagline **16px**, tagline to lead **32px**, lead to action row **48px**. Name and tagline group as identity; the lead separates as a claim.
- Hero block padding: **96px** top and bottom at desktop, **64px** below 480px.
- Footer: **96px** above, **48px** below.
- Band caption sits **32px** under the diagram.

---

## 5. Layout, block by block

Order on the homepage: hero, band, What I'm building, Selected work, Writing, About, Contact, footer.

### 5.1 Hero

```
Evan Baker                                   h1, display 600, 56px, tracking -0.03em
Engineer. Founder. Builder.                  text 500, 20px
I build software, systems, and
technology-driven businesses.                lead, text 400, 23px, max-width 40ch, balanced
What I'm building   Selected work   Contact  17px links, flex row, 48px gap
```

All left aligned to the column. No photo, no logos, no buttons. The three actions are same-page anchors rendered as ordinary links with the standard underline, never as pills or buttons. They are the site's only navigation; there is no nav bar.

**Copy dependency:** the lead is capped at `40ch` and balanced, which produced a clean two-line break on the plan's placeholder sentence. If the writer's final sentence is materially longer than about 60 characters, recheck the break at 1440px and at 375px.

### 5.2 The band and the method line

Full-bleed black. The band element itself spans the viewport and carries only vertical padding; an inner `.wrap` supplies the horizontal gutter, so the diagram aligns exactly with the h1 above it and the h2 below it.

Do **not** use `width: 100vw` with a negative margin. It causes a horizontal scrollbar when a vertical scrollbar is present. Instead make `<main>` full width and constrain each child's inner wrapper.

Contents, in order: the SVG, then a `<figcaption>` 32px below in `--band-ink-2` at 15px.

**Caption constraint for the writer:** one sentence, at most about 90 characters, so it fits on a single line inside 680px at 15px. The placeholder used during layout testing was "Every company here runs the same line. What changes is the math in the middle." (76 characters). Longer than roughly 90 characters and it wraps to two lines, which visibly unbalances the band.

#### Desktop SVG (used at `>= 640px`)

```html
<svg class="method method-h" viewBox="0 0 640 72" role="img"
     aria-label="A four stage line: system, model, software, business.">
  <g stroke="currentColor" stroke-width="1" shape-rendering="crispEdges">
    <line x1="0.5"   y1="24.5" x2="639.5" y2="24.5"/>
    <line x1="0.5"   y1="10.5" x2="0.5"   y2="38.5"/>
    <line x1="213.5" y1="24.5" x2="213.5" y2="38.5"/>
    <line x1="426.5" y1="24.5" x2="426.5" y2="38.5"/>
    <line x1="639.5" y1="10.5" x2="639.5" y2="38.5"/>
  </g>
  <text x="0"     y="60" text-anchor="start">system</text>
  <text x="213.5" y="60" text-anchor="middle">model</text>
  <text x="426.5" y="60" text-anchor="middle">software</text>
  <text x="640"   y="60" text-anchor="end">business</text>
</svg>
```

The two outer strokes run above and below the rule (end caps at the termini); the two interior strokes drop below only. That distinction is the information: `system` and `business` are the endpoints, `model` and `software` are the transformations between them.

#### Mobile SVG (used at `< 640px`)

```html
<svg class="method method-v" viewBox="0 0 335 208" role="img"
     aria-label="A four stage line: system, model, software, business.">
  <g stroke="currentColor" stroke-width="1" shape-rendering="crispEdges">
    <line x1="8.5" y1="8.5"   x2="8.5"  y2="199.5"/>
    <line x1="0.5" y1="8.5"   x2="16.5" y2="8.5"/>
    <line x1="8.5" y1="72.5"  x2="20.5" y2="72.5"/>
    <line x1="8.5" y1="136.5" x2="20.5" y2="136.5"/>
    <line x1="0.5" y1="199.5" x2="16.5" y2="199.5"/>
  </g>
  <text x="34" y="14">system</text>
  <text x="34" y="78">model</text>
  <text x="34" y="142">software</text>
  <text x="34" y="206">business</text>
</svg>
```

The line rotates to a vertical spine with the labels to its right. Labels use the alphabetic baseline offset by +6 from each station rather than `dominant-baseline`, which avoids cross-browser baseline differences.

#### Diagram CSS

```css
.method       { display:block; width:100%; height:auto; font-family: var(--font-text); }
.method text  { font-size:15px; font-weight:500; letter-spacing:0.01em; fill: var(--band-ink); }
.method-h     { max-width:680px; }
.method-v     { display:none; max-width:400px; }
.method-v text{ font-size:17px; }
@media (max-width:639px) { .method-h { display:none } .method-v { display:block } }
```

Both SVGs live in the DOM; `display: none` removes the inactive one from the accessibility tree, so the label is announced exactly once. `role="img"` plus `aria-label` means a screen reader reads the sentence and skips the individual `<text>` nodes. The `<text>` elements remain real, selectable, zoomable text visually.

Accents are forbidden inside the band. White strokes, white words, `#B8B8B8` caption.

### 5.3 Company entries (What I'm building)

Two entries, Demarly then EdgeBet.

```
Demarly                     h3, display 600, 22px, ink
AI and business systems     deck, text 400, 15px, BROWN            (8px below h3)
[paragraph, 40 to 60 words] body, 19px, ink                        (24px below deck)
[technical proof point]     body, 19px, ink                        (16px below)
demarly.ai                  link, 17px, ink + navy underline       (24px below)
```

The deck is a descriptor placed **below** the heading, not an eyebrow above it. Setting it in brown at 15px is what makes the h3 read as a heading; at body size and body color the two lines merged visually in the first render.

**Copy note for the writer:** do not use the `Demarly · AI + Business Systems` middle-dot construction from `website-plan.md` section 4. A metadata string joined with middle dots is a generic template tell. Split it into the title line and the deck line as above.

The "where to see it" link is an ordinary link in ink with the navy underline. Brown is never used for a link, and a link is never placed inside a brown line.

### 5.4 Selected work

Up to four entries. Each is `h3` plus one paragraph of 40 to 60 words. No deck, no link, no numbering: these are parallel pieces of evidence, not a sequence, so numbered markers would encode information that is not there. 48px between entries.

Same h3 treatment as the company entries, deliberately. The distinction between the two sections comes from the deck and link that only company entries carry.

### 5.5 Writing

Section `h2`, then a one-line intro paragraph, then a `<ul>` at 48px below.

```
The 30x bug                  h3 > a, display 600, 22px, ink + navy underline
September 12, 2026           meta, 15px, BROWN                     (8px below)
[one-line excerpt]           17px, ink                             (16px below)
```

48px between items. No category on the homepage list (it appears on the article page). No reading time. No separators or rules between items; whitespace does the grouping.

### 5.6 About

**The state that ships is: no photo.** There is no approved photo, so the About block renders as `h2` plus two or three paragraphs in the normal column, with 24px between paragraphs. Nothing indicates a photo was ever planned. There is no empty box, no grey placeholder rectangle, no reserved gap.

Implement the photo as an optional value, not an empty slot:

```tsx
const photo: { src: string; alt: string; width: number; height: number } | null = null;
// render the two-column grid only when photo !== null
```

When Evan later supplies one, the same block becomes a grid at `>= 768px`:

- `grid-template-columns: 200px 1fr; gap: 40px;` with the image first.
- Image 200x250 (4:5), `object-fit: cover`, no border radius, no border, no shadow.
- Below 768px the image stacks above the prose at 160x200, left aligned.
- Real alt text describing Evan. Never `alt=""` on a portrait.
- Explicit `width` and `height` attributes, and an unoptimized image, because the export has no image optimizer.

### 5.7 Contact

`h2`, one sentence, then a link row 32px below: the email address written out as its own label (`evanbaker315@gmail.com`, `mailto:` href), then GitHub. (Superseded 2026-09-10: LinkedIn is dropped for v1 per Evan, so the row is two links.) 48px gap, wrapping. Below 480px the row becomes a column with 8px gaps and 8px block padding on each link so tap targets clear roughly 43px.

No icons. An icon set here would be a logo wall and there is no icon system anywhere else on the site. No `target="_blank"`. External links get `rel="noopener"`.

**Resolved 2026-09-10:** Evan declined LinkedIn for v1. The link is omitted; no placeholder, no dead href. EdgeBet links to https://apps.apple.com/us/app/edgebet/id6759763418.

### 5.8 Footer

96px above, 48px below. One line at 15px in `--ink-2`, left aligned in the column: name, year, and the honest "Built with Claude Code" note. No rule above it, no columns, no social row (Contact already carries the links).

### 5.9 Article page (`/writing/<slug>/`)

Same column, same tokens, same two faces.

```
<header>   Evan Baker            17px link, ink + navy underline, 48px from top
<main><article>
           The 30x bug           h1, display 600, 44px, tracking -0.025em, 64px below header
           September 12, 2026    Engineering
                                 meta row, 15px BROWN, flex, 24px gap, 24px below h1
           [prose]                                                    64px below meta
<footer>   Back to Evan Baker    17px link
```

The meta row uses a flex gap, not a middle dot or a spaced dash separator.

Prose rules:

| Element | Treatment |
|---|---|
| `p` | 19px / 1.6, `max-width: 65ch`, 24px below |
| `h2` | 28px display 600, **64px above, 16px below** |
| `h3` | 22px display 600, **48px above, 8px below** |
| bold lead-in | Public Sans 600, ink, inline at the start of a paragraph |
| `ol` / `ul` | `padding-left: 24px`, 8px between items, `::marker` in `--brown` |
| `blockquote` | indented 32px, Newsreader **italic** 19px, `--ink-2`, max-width 60ch. No left border, no quote glyph, no background. |
| inline `code` | mono at `0.92em`, ink, **no background and no padding**. A background box on inline code inserted a visible gap before the following comma in the first render, and a boxed inline element contradicts the no-boxes principle. The monospace face alone is unmistakable inside a grotesque paragraph. |
| `pre` | `--surface-code` background, 24px padding, 17px / 1.5, `overflow-x: auto` |
| `hr` | 1px `--ink`, **96px wide**, left aligned, 64px vertical margins. Used only for a genuine topic break. |
| links in prose | identical to site links: ink text, navy underline |

Numbered lists are legitimate here because article steps genuinely are sequences, and numbered lists are a documented pattern in Evan's own writing.

### 5.10 Writing index (`/writing/`), if it ships

Coding has scaffolded an `app/writing/page.tsx` route. `website-plan.md` does not require one for v1 (the homepage Writing section is the index), so treat it as optional. If it ships, it gets no new design vocabulary:

- Article-page chrome: the same `<header>` back link at 17px, the same column, the same footer.
- `h1` at the article-title scale (44px desktop) reading "Writing", then the one-line section intro at 19px.
- Then the exact writing list from section 5.5, unchanged: h3 link, brown date, 17px excerpt, 48px between items.
- No categories, no tag filters, no year headings, no card grid. Three items do not need navigation.

If it ships, add its "Writing" link somewhere reachable, otherwise it is an orphan route. The homepage `Writing` h2 is the natural place, but that is a copy and information-architecture decision for the coordinator, not a design change.

---

## 6. Responsive behavior

Named breakpoints, mobile first:

| Name | Query | |
|---|---|---|
| `sm` | `min-width: 480px` | gutters 24px, section gap 96px, band padding 64px |
| `md` | `min-width: 768px` | gutters 32px, section gap 128px, band padding 96px, About grid available |
| diagram | `min-width: 640px` | horizontal method line; below this, vertical |

There is no `lg` breakpoint. The column caps at 680px and simply centers in wider viewports; adding a wide-screen layout would mean adding a second column, which this design does not have.

### 375px specifically (verified in the prototype)

- Gutters **20px**, content width **335px**, page height 5678px, **no horizontal overflow and no element wider than the viewport** (audited programmatically across every DOM node).
- h1 **36px**, h2 24px, h3 20px, lead 20px, body stays **19px**, meta 15px. Body is never reduced below 19px.
- Measure is about 33 characters per line. Short, but that is what 375px gives at a readable body size, and the alternative is shrinking the type.
- The hero action row **stacks to a column** with 8px gaps plus 8px block padding per link, so tap targets are about 43px tall. Contact links do the same.
- The method line **switches to its vertical variant** (spine on the left, labels to the right).
- Company decks, writing dates, and article meta all stay on one line at 15px.
- Section gaps drop to 64px, band padding to 48px, hero padding to 64px.

### 200% zoom

Verified at a 640px effective viewport (a 1280px window at 200%). Layout lands in the `sm` band: gutters 24px, column 592px, h1 48px, no overflow, hierarchy intact, the horizontal diagram still legible, brown deck still readable. Because the root font-size is never set in px, browser text-size preferences also scale correctly.

---

## 7. Interaction states

The only motion on the site is a 120ms linear color and underline transition on links. Nothing else animates. No entrances, no scroll effects, no hover lifts.

```css
a {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: var(--navy);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.18em;
  text-decoration-skip-ink: auto;
  transition: color 120ms linear,
              text-decoration-color 120ms linear,
              text-decoration-thickness 120ms linear;
}
a:hover, a:active { color: var(--navy); text-decoration-thickness: 2px; }
a:focus-visible   { outline: 2px solid var(--navy); outline-offset: 3px; border-radius: 2px; }

.band a                { color: var(--band-ink); text-decoration-color: var(--band-ink); }
.band a:focus-visible  { outline-color: var(--band-ink); }

@media (prefers-reduced-motion: reduce) { * { transition-duration: 0ms !important; } }
```

- **Rest:** ink text with a 1px navy underline. The underline, not the color, is the affordance.
- **Hover and active:** text and underline go navy, underline thickens to 2px. Active is deliberately identical to hover; a third state here would be noise.
- **Focus:** a 2px navy ring at 3px offset with a 2px radius, verified visible against white at 12.7:1. Never `outline: none`.
- **Skip link:** required. Visually hidden, and on focus it pins to the top left of the viewport as a white box with 8px/16px padding and the same navy outline, targeting `#main`.

### Browser surfaces

These ship with browser defaults that belong to no design system, so they are themed:

```css
:root { color-scheme: light; }
::selection      { background: var(--select-bg); color: var(--ink); }
.band ::selection{ background: var(--band-ink);  color: var(--ink); }
```

Underline offset and thickness are set explicitly above rather than left to the browser.

---

## 8. Semantic structure and accent placement

### Homepage

```html
<a class="skip" href="#main">Skip to content</a>
<header>                                  <!-- banner -->
  <h1>Evan Baker</h1>
  <p>Engineer. Founder. Builder.</p>
  <p class="lead">...</p>
  <nav aria-label="Page sections"><ul><li><a href="#building">...</a></li>...</ul></nav>
</header>
<main id="main">
  <div class="band"><div class="wrap"><figure>...svg...<figcaption>...</figcaption></figure></div></div>
  <section id="building" aria-labelledby="h-building">
    <h2 id="h-building">What I'm building</h2>
    <article class="entry">...</article>   <!-- x2 -->
  </section>
  <section id="work"    aria-labelledby="h-work">   <h2 id="h-work">Selected work</h2> ... </section>
  <section id="writing" aria-labelledby="h-writing"><h2 id="h-writing">Writing</h2><ul>...</ul></section>
  <section id="about"   aria-labelledby="h-about">  <h2 id="h-about">About</h2> ... </section>
  <section id="contact" aria-labelledby="h-contact"><h2 id="h-contact">Contact</h2> ... </section>
</main>
<footer>...</footer>                      <!-- contentinfo -->
```

`<main>` is full width so the band can be full bleed; every child constrains itself with an inner wrapper.

### Article page

`<header>` with the back link, `<main id="main"><article>` with h1, meta, prose, and `<footer>` with the return link. Give the article page a body-level `<footer>` so it has a contentinfo landmark like the homepage.

### Verified in the prototype

- `lang="en"` present on both pages.
- Landmarks: one banner, one main, one nav (homepage), one contentinfo.
- Heading order sequential on both pages, h1 to h2 to h3, no level skipped, exactly one h1 per page.
- Zero images without `alt`, zero SVGs without a label or `aria-hidden`.

### Where the accents are allowed

Exhaustive for the three paper-side text colors that are not `--ink`: navy, brown, and `--ink-2`. Anything not named below is `--ink` on `--paper`. (`--band-ink-2` is the band's own token and is governed by section 5.2, not by this list.)

**Navy** may appear as: link underline at rest, link text and underline on hover and active, the focus ring. Nowhere else. Never as a background, a heading color, a border, or a fill.

**Brown** carries **classification and dating**, and nothing else. It may appear as: the company deck line; the writing list meta line (the date, or the category when a piece has no date yet) wherever that list renders, which is the homepage Writing section, `/writing/`, and the More writing block at the foot of an article page; the article meta line (date and category); and `::marker` on article ordered and unordered lists. Nowhere else. Never on a link, never on a heading, never as a background.

**`--ink-2`** carries **non-classifying secondary text**, and nothing else. It may appear as: the Selected Work source line, the site footer line, and the article blockquote. Nowhere else.

Both lists are exhaustive. The distinction is the point: brown says *what kind of thing this is or when it happened*, and is worth a reader's attention because it completes the heading above it. `--ink-2` says *where this came from*, and is genuinely skippable. A third annotation color may not be introduced without amending this section.

**Neither accent may appear inside `.band`.**

---

## 9. Explicitly out of scope

Considered and rejected. Do not add these back without new evidence and a plan update.

**Rejected on brief grounds (Evan already ruled, or CLAUDE.md bans):** dark base for the reading surface, cream or warm off-white paper, tinted near-black (`#0B0B0B`, `#111`) instead of true black, a terracotta or clay accent, neon gradients, glassmorphism, fake terminals, framework or employer logo walls, casino styling, luxury-brochure styling, a beige page.

**Rejected as generic template tells:** all-caps tracked-out eyebrow labels above headings; metadata joined with middle dots (`A · B · C`); label constructions that pair a word with a fragment across a spaced long dash; `01 / 02 / 03` section numbers on non-sequences; an arrow glyph appended to link text; monospace as a decorative "technical" signal outside real code; identical rounded cards with a soft grey shadow as the page structure; a hero metric block.

**Rejected as decoration this design does not need:** any card, panel, border, or box other than the article `<pre>`; light grey hairline rules (cannot reach 3:1, so they are decoration pretending to be structure); a sticky nav bar; a dark-mode toggle; scroll-triggered entrance animations; hover lift or shadow on anything; an icon set; Unicode glyphs or emoji standing in for icons; a decorative concept section built around the method line.

**Rejected specific attempts, on rendered evidence:**

- **Oversized name as the bold move.** Rejected in favor of the method line (section 1).
- **Tabular numerals** on dates. Made "September 12, 2026" read gappy; the alignment benefit is invisible at three items.
- **A background box on inline code.** Inserted a visible gap before adjacent punctuation and contradicted the no-boxes principle.
- **A grey `--rule` token.** `#CFCFCF` on white is 1.56:1.
- **A `56ch` cap on the band caption.** Forced a two-line wrap with a one-word orphan; removed so the caption sits on one line.
- **`width: 100vw` for the full-bleed band.** Causes horizontal scroll when a vertical scrollbar is present.

---

## 10. CSS organization (Next.js App Router, TypeScript, CSS Modules)

### Global stylesheet: `app/globals.css`

Imported once in `app/layout.tsx`. Contains only things that are genuinely global:

1. `:root` tokens: color, font stacks, type scale, spacing scale, layout widths, and the `--gutter` / `--section-gap` media-query overrides.
2. `color-scheme: light`.
3. A minimal reset: `box-sizing: border-box`, `margin: 0` on body, `-webkit-text-size-adjust: 100%`, `img { max-width: 100% }`.
4. Base element type: `body`, `h1`, `h2`, `h3`, `p`, `a` (including the full link state block), `::selection`, and the `prefers-reduced-motion` override.
5. The two shared utilities: `.wrap` (column plus gutters) and `.skip`.

That is all. No component styling, no layout, no section rules.

### CSS Modules, one per component

`components/Hero.module.css`, `MethodLine.module.css`, `CompanyEntry.module.css`, `WorkEntry.module.css`, `WritingList.module.css`, `About.module.css`, `Contact.module.css`, `SiteFooter.module.css`, `app/writing/[slug]/article.module.css`.

Each consumes tokens with `var(--...)` and never redefines a color, a font size, or a spacing value as a literal. If a component needs a value that is not a token, that is a signal the scale is wrong; fix the scale, do not add a one-off.

### Article prose

Article body HTML comes from Markdown, so its elements cannot carry module class names. Scope it with a single wrapper class from the article module and descendant selectors:

```css
/* article.module.css */
.prose p  { /* ... */ }
.prose h2 { /* ... */ }
```

This is the one place descendant selectors are correct. Everywhere else, style the element you own.

### Specificity discipline

Every rule in this spec is a single class or a single element selector. Do not write `.section .cta` style pairs that fight each other over padding. Section rhythm lives on one rule (`section { padding-top: var(--section-gap) }`) with exactly two documented overrides: `#building .entry + .entry` and `.band + section`.

### Components that need to be client components

None. Every component here is static and server-rendered. There is no state, no interaction beyond CSS hover and focus, and no event handler. Do not add `"use client"` anywhere.

---

## 11. Acceptance checks for the implementation

These are the checks that could actually fail. Coding should run them and report results, not intentions.

1. `getComputedStyle(document.querySelector('h1')).fontSize` is `56px` at a 1440px viewport and `36px` at 375px. Catches the silent `clamp()` whitespace failure.
2. Body measure is between 60 and 75 characters per line at 1440px.
3. No element's bounding box exceeds `document.documentElement.clientWidth` at 375px, 640px, and 1440px.
4. `document.documentElement.scrollWidth <= clientWidth` at all three widths (no horizontal scroll).
5. Tab order reaches the skip link first, and every link shows the navy ring at 3px offset.
6. Heading levels are sequential with exactly one h1 per page.
7. Every SVG has either `aria-label` or `aria-hidden="true"`. The inactive method-line variant is `display: none`, not `visibility: hidden` or `opacity: 0`.
8. No `--navy` or `--brown` value resolves inside `.band` (grep the module CSS).
9. Lighthouse accessibility pass on both page types.
10. The About section renders with no photo and no empty container in the DOM.
