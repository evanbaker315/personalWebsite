import styles from './FlowDiagram.module.css'

/**
 * A small hand-authored step diagram: N labeled nodes connected by arrows,
 * one hairline stroke, no color beyond ink. It exists to answer one specific
 * critique finding (2026-09-17): the page has zero imagery despite three
 * systems that are literally describable as a short pipeline. This draws
 * only what the paragraph beside it already claims; it is not a second,
 * looser version of the copy.
 *
 * Fixed layout, not a generic chart component: three or four short labels in
 * a row, sized from their own text length so nothing overlaps or guesses at
 * a column width. If a company ever needs a fifth step or a branch, this
 * gets a real redesign rather than a config option bolted on.
 *
 * viewBox units equal real px (the svg's width/height attributes match the
 * viewBox exactly), the same convention the site's other hand-authored SVG
 * used, so shapeRendering="crispEdges" actually lands on pixel boundaries
 * instead of a guessed scale factor. CSS only ever scales it down from
 * there, never up (see FlowDiagram.module.css).
 */
const NODE_HEIGHT = 28
const GAP = 36
const CHAR_WIDTH = 6.2
const PADDING = 14

function nodeWidth(label: string) {
  return Math.round(Math.max(64, label.length * CHAR_WIDTH + PADDING * 2))
}

type Node = { step: string; x: number; width: number }

export default function FlowDiagram({
  steps,
  label,
}: {
  steps: string[]
  label: string
}) {
  const { nodes, cursor } = steps.reduce(
    (acc, step) => {
      const width = nodeWidth(step)
      acc.nodes.push({ step, x: acc.cursor, width })
      acc.cursor += width + GAP
      return acc
    },
    { nodes: [] as Node[], cursor: 0 },
  )
  const totalWidth = Math.max(0, cursor - GAP)
  const midY = NODE_HEIGHT / 2

  return (
    <svg
      className={styles.diagram}
      width={totalWidth}
      height={NODE_HEIGHT}
      viewBox={`0 0 ${totalWidth} ${NODE_HEIGHT}`}
      role="img"
      aria-label={label}
    >
      <g shapeRendering="crispEdges">
        {nodes.map((node, i) => {
          const next = nodes[i + 1]
          if (!next) return null
          const start = node.x + node.width
          const end = next.x
          return (
            <g key={`arrow-${node.step}`}>
              <line x1={start} y1={midY + 0.5} x2={end - 6} y2={midY + 0.5} stroke="var(--ink)" />
              <path
                d={`M ${end - 6} ${midY - 3} L ${end} ${midY + 0.5} L ${end - 6} ${midY + 4}`}
                fill="none"
                stroke="var(--ink)"
              />
            </g>
          )
        })}
        {nodes.map((node) => (
          <rect
            key={`box-${node.step}`}
            x={node.x + 0.5}
            y={0.5}
            width={node.width - 1}
            height={NODE_HEIGHT - 1}
            fill="none"
            stroke="var(--ink)"
          />
        ))}
      </g>
      {nodes.map((node) => (
        <text
          key={node.step}
          x={node.x + node.width / 2}
          y={midY + 4}
          textAnchor="middle"
          className={styles.label}
        >
          {node.step}
        </text>
      ))}
    </svg>
  )
}
