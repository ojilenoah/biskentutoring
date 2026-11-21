"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"

/**
 * Motion for the school objects that peek out of edges.
 *
 * - Entrance: when the item scrolls into view it springs out from behind its
 *   edge (`from` is where it starts, e.g. { y: 70 } = hidden below a top edge).
 * - Drift: while the page scrolls, the item moves a few pixels along `axis`,
 *   in and out of its edge. Driven by motion values, so React never re-renders.
 *
 * Put positioning classes on `className`; keep rotate/translate classes on
 * the child so they don't fight framer-motion's transform.
 */
export function Drift({
  children,
  className,
  style,
  axis = "y",
  distance = 10,
  from,
  spin,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  axis?: "x" | "y"
  distance?: number
  from?: { x?: number; y?: number; rotate?: number }
  /** Degrees the item turns either way as the page scrolls past it. */
  spin?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  // Watch the outer box: the inner one starts hidden behind its edge, so an
  // observer on it would never see it enter.
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const drift = useSpring(raw, { stiffness: 120, damping: 24, mass: 0.4 })
  const rawSpin = useTransform(scrollYProgress, [0, 1], [-(spin ?? 0), spin ?? 0])
  const turn = useSpring(rawSpin, { stiffness: 120, damping: 24, mass: 0.4 })

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ ...style, [axis]: reduce ? 0 : drift, rotate: reduce || !spin ? 0 : turn }}
    >
      <motion.div
        initial={reduce || !from ? false : { opacity: 0, ...from }}
        animate={inView || reduce || !from ? { opacity: 1, x: 0, y: 0, rotate: 0 } : undefined}
        transition={{ type: "spring", stiffness: 110, damping: 16, mass: 0.8 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
