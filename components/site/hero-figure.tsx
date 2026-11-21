"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const SCENES = ["Geometry", "Algebra", "Science", "English"] as const
const DURATION = 6000

/**
 * "Learning, drawn live": four line-art figures that draw themselves one after
 * another, straight on the hero surface. Cycles on its own; remounting each
 * scene (key) restarts its CSS draw animations.
 */
export function HeroFigure({ className }: { className?: string }) {
  const [scene, setScene] = useState(0)
  const [still, setStill] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setStill(true)
  }, [])

  useEffect(() => {
    if (still) return
    const t = setTimeout(() => setScene((s) => (s + 1) % SCENES.length), DURATION)
    return () => clearTimeout(t)
  }, [scene, still])

  return (
    <figure className={cn("relative flex flex-col items-center justify-center", className)}>
      <svg
        key={scene}
        viewBox="0 0 400 340"
        role="img"
        aria-label={`Line drawing: ${SCENES[scene]}`}
        className="w-[88%] max-w-[540px] overflow-visible"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {scene === 0 && (
          <g>
            <path className="draw" d="M120 250 L280 250 L120 130 Z" />
            <path className="draw draw-2" d="M120 250 L280 250 L280 290 L120 290 Z" stroke="var(--purple)" />
            <path className="draw draw-2" d="M120 250 L120 130 L60 130 L60 250 Z" stroke="var(--purple)" />
            <path className="draw draw-3" d="M120 130 L280 250 L370 130 L210 10 Z" stroke="var(--purple)" />
            <path className="draw" d="M120 236 L134 236 L134 250" />
            <g fill="var(--ink)" stroke="none" fontFamily="var(--font-mono)" fontSize="13">
              <text className="rise rise-1" x="186" y="275">a = 4</text>
              <text className="rise rise-1" x="66" y="196">b = 3</text>
              <text className="rise rise-2" x="205" y="176" fill="var(--purple)">c = 5</text>
            </g>
            <text className="rise rise-3" x="118" y="330" fill="var(--ink)" stroke="none" fontFamily="var(--font-sans)" fontSize="26" fontWeight="600">
              a² + b² = c²
            </text>
          </g>
        )}
        {scene === 1 && (
          <g fill="var(--ink)" stroke="none" fontFamily="var(--font-sans)" fontWeight="600">
            <text className="rise rise-1" x="90" y="110" fontSize="40">2x + 6 = 14</text>
            <text className="rise rise-2" x="90" y="180" fontSize="40">2x = 8</text>
            <text className="rise rise-2" x="250" y="178" fontSize="12" fontWeight="400" fontFamily="var(--font-mono)" fill="var(--ink-3)">− 6 both sides</text>
            <text className="rise rise-3" x="90" y="250" fontSize="40" fill="var(--purple)">x = 4</text>
            <text className="rise rise-3" x="250" y="248" fontSize="12" fontWeight="400" fontFamily="var(--font-mono)" fill="var(--ink-3)">÷ 2</text>
          </g>
        )}
        {scene === 2 && (
          <g>
            <circle className="draw" cx="200" cy="170" r="16" fill="var(--lilac)" />
            <g className="orbit">
              <ellipse className="draw draw-2" cx="200" cy="170" rx="130" ry="44" />
              <circle cx="330" cy="170" r="6" fill="var(--purple)" stroke="none" />
            </g>
            <g className="orbit orbit-rev">
              <ellipse className="draw draw-2" cx="200" cy="170" rx="130" ry="44" transform="rotate(60 200 170)" />
            </g>
            <g className="orbit">
              <ellipse className="draw draw-3" cx="200" cy="170" rx="130" ry="44" transform="rotate(-60 200 170)" />
              <circle cx="135" cy="57" r="6" fill="var(--purple)" stroke="none" />
            </g>
            <text className="rise rise-3" x="128" y="320" fill="var(--ink)" stroke="none" fontFamily="var(--font-mono)" fontSize="12">
              nucleus · electrons · orbits
            </text>
          </g>
        )}
        {scene === 3 && (
          <g>
            <text className="rise rise-1" x="188" y="52" fill="var(--purple)" stroke="none" fontFamily="var(--font-mono)" fontSize="15">S</text>
            <path className="draw" d="M194 60 L120 120 M200 60 L280 120" />
            <g fill="var(--ink)" stroke="none" fontFamily="var(--font-mono)" fontSize="14">
              <text className="rise rise-1" x="104" y="140">NP</text>
              <text className="rise rise-1" x="270" y="140">VP</text>
            </g>
            <path className="draw draw-2" d="M114 148 L80 220 M122 148 L150 220 M276 148 L240 220 M284 148 L330 220" />
            <g fill="var(--ink)" stroke="none" fontFamily="var(--font-sans)" fontSize="22" fontWeight="600">
              <text className="rise rise-2" x="56" y="245">The</text>
              <text className="rise rise-2" x="128" y="245">girl</text>
              <text className="rise rise-2" x="214" y="245">reads</text>
              <text className="rise rise-3" x="300" y="245" fill="var(--purple)">books</text>
            </g>
            <path className="draw draw-3" d="M50 262 L350 262" />
          </g>
        )}
      </svg>

    </figure>
  )
}
