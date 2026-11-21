import { cn } from "@/lib/utils"

/*
 * Small illustrated school objects. Flat colour with a thin ink line.
 * Use sparingly: one or two per screen.
 */

type P = { className?: string }

export function Pencil({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 220" className={cn("w-[22px]", className)}>
      <rect x="8" y="30" width="24" height="150" rx="3" fill="var(--pencil)" stroke="var(--ink)" strokeWidth="2.5" />
      <path d="M14 30 L14 180 M26 30 L26 180" stroke="#d9a630" strokeWidth="2" />
      <rect x="8" y="10" width="24" height="22" rx="4" fill="#f2a7b8" stroke="var(--ink)" strokeWidth="2.5" />
      <rect x="8" y="28" width="24" height="8" fill="#c9c3cf" stroke="var(--ink)" strokeWidth="2.5" />
      <path d="M8 180 C 10 196, 16 214, 20 216 C 24 214, 30 196, 32 180 Z" fill="#f1dfc0" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M15.5 203 C 17 210, 19 215, 20 215.5 C 21 215, 23 210, 24.5 203 Z" fill="var(--ink)" />
    </svg>
  )
}

export function Ruler({ className }: P) {
  const ticks = Array.from({ length: 20 }, (_, i) => 20 + i * 20)
  return (
    <svg aria-hidden="true" viewBox="0 0 420 44" className={cn("w-[360px]", className)}>
      <rect x="1" y="1" width="418" height="42" rx="4" fill="#f6d77e" stroke="var(--ink)" strokeWidth="2.5" />
      {ticks.map((x, i) => (
        <path key={x} d={`M${x} 1 V${i % 5 === 3 ? 22 : i % 5 === 1 ? 16 : 10}`} stroke="var(--ink)" strokeWidth="2" />
      ))}
      <text x="76" y="36" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink)">5</text>
      <text x="194" y="36" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink)">10</text>
      <text x="314" y="36" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink)">15</text>
    </svg>
  )
}

export function PaperClip({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 90" className={cn("w-[22px]", className)} fill="none" stroke="#8a8394" strokeWidth="4" strokeLinecap="round">
      <path d="M28 20 V68 A 10 10 0 0 1 8 68 V14 A 6 6 0 0 1 20 14 V62" />
    </svg>
  )
}

export function Backpack({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 260" className={className} stroke="var(--ink)" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
      <path d="M80 40 C 80 14, 140 14, 140 40" fill="none" strokeWidth="6" stroke="#2a1a40" />
      <rect x="34" y="40" width="152" height="200" rx="34" fill="var(--lilac)" />
      <rect x="54" y="132" width="112" height="84" rx="14" fill="#c9b2ef" />
      <path d="M54 160 H166" />
      <rect x="102" y="150" width="16" height="20" rx="3" fill="var(--pencil)" />
      <path d="M70 70 C 90 60, 130 60, 150 70" fill="none" />
      <rect x="88" y="16" width="44" height="10" rx="5" fill="#2a1a40" />
      <path d="M186 110 C 204 116, 206 190, 186 200" fill="none" stroke="#2a1a40" strokeWidth="5" />
    </svg>
  )
}

export function Crayons({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 70" className={cn("w-[120px]", className)} stroke="var(--ink)" strokeWidth="2.4" strokeLinejoin="round">
      <path d="M6 12 H86 C 98 13, 105 16, 105 18 C 105 20, 98 23, 86 24 H6 Z" fill="var(--purple)" />
      <path d="M14 34 H94 C 106 35, 113 38, 113 40 C 113 42, 106 45, 94 46 H14 Z" fill="var(--pencil)" />
      <path d="M2 56 H82 C 94 57, 101 60, 101 62 C 101 64, 94 67, 82 68 H2 Z" fill="#e8846a" />
      <path d="M30 12 V24 M38 34 V46 M26 56 V68" stroke="rgb(23 17 31 / 0.5)" />
    </svg>
  )
}

/** Three crayons standing upright, tips up — for poking out of a top edge. */
export function CrayonsUp({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 76 130" className={cn("w-[76px]", className)} stroke="var(--ink)" strokeWidth="2.4" strokeLinejoin="round">
      <path d="M6 128 V36 C 8 24, 11 15, 14 15 C 17 15, 20 24, 22 36 V128 Z" fill="var(--purple)" />
      <path d="M30 128 V26 C 32 14, 35 5, 38 5 C 41 5, 44 14, 46 26 V128 Z" fill="var(--pencil)" />
      <path d="M54 128 V40 C 56 28, 59 19, 62 19 C 65 19, 68 28, 70 40 V128 Z" fill="#e8846a" />
      <path d="M6 52 H22 M30 42 H46 M54 56 H70" stroke="rgb(23 17 31 / 0.5)" />
    </svg>
  )
}

/** Line drawing per subject family, drawn on mount. */
export function FamilyFigure({ slug, className }: P & { slug: string }) {
  const common = {
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  return (
    <svg viewBox="0 0 360 360" role="img" aria-label={`Line drawing for ${slug}`} className={className} {...common}>
      {slug === "maths" && (
        <>
          <path className="draw" fill="#f6d77e" d="M40 280 L320 280 L320 300 L40 300 Z M70 280 L70 290 M100 280 L100 294 M130 280 L130 290 M160 280 L160 294 M190 280 L190 290 M220 280 L220 294 M250 280 L250 290 M280 280 L280 294" />
          <path className="draw draw-2" fill="var(--lilac)" d="M80 240 A 100 100 0 0 1 280 240 Z M180 240 L180 228 M110 211 L118 218 M250 211 L242 218 M180 140 L180 152 M180 240 L246 168" />
          <path className="draw draw-3" d="M180 30 L180 46 M172 46 L188 46 L188 66 L172 66 Z M176 66 L120 230 M184 66 L236 220 M236 220 L232 236 M120 230 L114 236" />
        </>
      )}
      {slug === "sciences" && (
        <>
          <path className="draw" fill="var(--sage)" d="M140 60 H220 M150 60 V150 L90 280 C 84 294, 92 304, 108 304 H252 C 268 304, 276 294, 270 280 L210 150 V60" />
          <path className="draw draw-2" d="M110 240 H250" />
          <circle className="draw draw-3" cx="150" cy="268" r="9" />
          <circle className="draw draw-3" cx="196" cy="256" r="6" />
          <circle className="draw draw-3" cx="214" cy="280" r="11" />
        </>
      )}
      {slug === "languages" && (
        <>
          <path className="draw" fill="var(--sand)" d="M40 110 C 90 90, 150 96, 180 120 C 210 96, 270 90, 320 110 V290 C 270 270, 210 276, 180 300 C 150 276, 90 270, 40 290 Z" />
          <path className="draw draw-2" d="M180 120 V300 M70 140 C 100 132, 130 134, 156 146 M70 170 C 100 162, 130 164, 156 176 M204 146 C 230 134, 260 132, 290 140 M204 176 C 230 164, 260 162, 290 170" />
          <text className="rise rise-2" x="152" y="80" fill="var(--ink)" stroke="none" fontFamily="var(--font-sans)" fontSize="34" fontWeight="600">Aa</text>
        </>
      )}
      {slug === "exams" && (
        <>
          <path className="draw" fill="var(--card)" d="M90 50 H230 L270 90 V310 H90 Z M230 50 V90 H270" />
          <path className="draw draw-2" d="M120 130 H240 M120 160 H240 M120 190 H210 M120 240 L140 260 L180 214" />
          <circle className="draw draw-3" cx="270" cy="270" r="42" fill="var(--peach)" />
          <path className="draw draw-3" d="M270 244 V270 L288 282" />
        </>
      )}
      {slug === "creative" && (
        <>
          <path className="draw" fill="var(--lilac)" d="M90 260 C 60 200, 90 110, 180 100 C 270 92, 310 170, 280 220 C 262 250, 226 236, 214 258 C 202 282, 220 300, 190 306 C 150 314, 110 300, 90 260 Z" />
          <circle className="draw draw-2" cx="140" cy="170" r="14" fill="var(--pencil)" />
          <circle className="draw draw-2" cx="186" cy="146" r="14" fill="var(--peach)" />
          <circle className="draw draw-2" cx="234" cy="166" r="14" fill="var(--sage)" />
          <path className="draw draw-3" d="M280 60 V150 M280 60 L320 70 V130" />
          <ellipse className="draw draw-3" cx="268" cy="152" rx="14" ry="10" fill="var(--ink)" />
          <ellipse className="draw draw-3" cx="308" cy="132" rx="14" ry="10" fill="var(--ink)" />
        </>
      )}
    </svg>
  )
}

/** Hand-drawn loop scribbled around a word; draws itself on mount. */
export function ScribbleCircle({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 80" preserveAspectRatio="none" className={cn("pointer-events-none overflow-visible", className)} fill="none">
      <path
        className="draw draw-2"
        d="M30 14C70 2 168 0 204 22c22 14 4 40-46 48-56 9-132 4-148-20C-4 30 40 10 120 8"
        stroke="var(--ink)"
        strokeWidth="3.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
