# IM01: Actual product screenshots

- Role / assignee / run: design / screenshot_design / 01
- Date: 2026-09-22
- Status: complete
- Scope: preparation, exact implementation handoff
- Candidate: current local CompanyEntry and homepage source; no rendered candidate reviewed in this task
- Inputs actually inspected: CLAUDE.md, AGENT-WORKFLOW.md, todo.md, website-plan.md, design role, relevant main/voice context, RESOURCES.md, Impeccable skill, CompanyEntry component/CSS, global CSS, homepage copy, both supplied images through view_image.
- Assigned write scope and files changed: reports/IM01-design-01.md only

## Work and result

Replace the two company flow diagrams with the supplied screenshots. Keep the existing headings, deck lines, copy, external product links, type, palette, section gaps and 680px column. The actual product colors supply the new visual interest. Preserve every part of each image without filters, crops, frames, mockups, shadows, rounded containers or generated material.

Exact coding specification:

1. CompanyEntry gets an optional screenshot object with source, intrinsic dimensions, alt, caption and portrait flag. Remove its diagram usage for these two entries. Do not change the separate MethodLine component.
2. Below each existing heading and deck, add a content wrapper with 24px top margin. Its first child contains the existing prose and external product link, retaining the existing paragraph and link spacing. Its second child is a figure with zero default margin. Default layout is stacked, with 24px between prose/link and figure. This order lets mobile readers understand the product before seeing it.
3. Demarly stays stacked at every width. Figure and image fill the available 680px content column, shrinking with the viewport. Image is display:block, width:100%, height:auto, with its original aspect ratio. The entire landscape hierarchy stays visible.
4. EdgeBet alone uses two columns at min-width:768px: minmax(0,1fr) 288px with a 32px column gap and start alignment. This makes the prose column 360px when the page column is 680px. Put the copy on the left and the full portrait on the right. This is a local image/prose arrangement inside one company, not a second page column. At smaller widths stack in DOM order. The EdgeBet figure is width:100%, max-width:288px, left aligned at all widths. Preserve intrinsic aspect ratio with auto height, so the phone image is roughly 624px tall rather than the full-column height it would otherwise occupy. Do not reduce body type to make the columns fit.
5. Each figure has a caption 8px below its image, in --t-meta, --ink-2, line-height:1.5. Caption sentence followed by an ordinary underlined link on its own line: "View full-size Demarly screenshot" or "View full-size EdgeBet screenshot". Link directly to the unmodified public PNG in the same tab, using the existing ink/navy link and focus styles. The visible link is sufficient; the image itself does not need a redundant focus stop. Keep the full-size asset URL basePath-safe.
6. Copy original files byte-for-byte to readable public filenames such as public/images/demarly-agent-hierarchy.png and public/images/edgebet-market-comparison.png. Use explicit intrinsic dimensions and lazy loading. No image editing is necessary.

Exact text:

- Demarly alt: "Demarly agent hierarchy with a CEO above CMO and CFO leads, connected to specialist workers."
- Demarly caption: "The CEO, department leads, and specialist workers in Demarly."
- EdgeBet alt: "EdgeBet's Arbs screen comparing over and under prices from BetUS and BetOpenly for a baseball game."
- EdgeBet caption: "Comparing a sportsbook price with an exchange price in EdgeBet."

These describe visible interfaces without asserting profitability, live prices, customers or execution results. Leave the numbers inside the original image as supplied; do not repeat them as marketing claims.

## Evidence and checks

| Check | Evidence | Result | Limitation |
|---|---|---|---|
| Image identity | Direct inspection of IMG_8969.PNG and supplied Demarly PNG | EdgeBet is a portrait mobile interface; Demarly is a landscape organization view | No product behavior tested |
| Layout fit | Current 680px --w-page and 19px body type | 360px copy + 32px gap + 288px image fits exactly | Requires actual browser confirmation |
| Content truth | Image labels and current company prose | Captions and alt describe visible subject matter | Screenshot is not proof of financial results |
| Rendered page/accessibility | Not run | Pending coding | Specification is not visual verification |

## Findings

No implementation defects asserted. Demarly's small labels will be too small to inspect at mobile page width; the descriptive text and explicit full-size link are required. A full-column EdgeBet image would add excessive page length; the 288px cap and desktop side placement address that predictable issue.

## Ideas and alternatives

Rejected forcing equal image sizes because the actual aspect ratios serve different products. Rejected full-width EdgeBet because its tall format would dominate the company section. Rejected cropping Demarly to enlarge individual nodes because the user supplied the full hierarchy as the artifact. No wider page, screenshot cards or additional decoration needed.

## Proposed decision-log update

Q2 candidate: Use the actual product screens instead of the small process diagrams. Keep Demarly wide enough to show its hierarchy and place the bounded EdgeBet portrait beside its description on desktop. The tradeoff is that Demarly's labels need the full-size link on smaller screens. Coordinator records the implemented result only after verification.

## Handoff

- Acceptance criteria met: exact source mapping, layout, dimensions, responsive behavior, alt/caption, full-size behavior and restrained visual treatment specified.
- Missing input: none.
- Next owner: coding, IM02; coordinator approves this handoff through the existing task workflow.
- Required checks: desktop and 375px renders, actual 200% zoom or candidly labeled reflow proxy, no overflow, no crop/distortion, image links in static export and dev, keyboard focus, Lighthouse accessibility. Inspect all changed company content in one batched desktop/mobile pass; fix actual defects and confirm once.
