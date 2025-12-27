"use client"

import React, { useState, useEffect, useRef } from 'react'

export default function CursorTracker() {
  const [mousePos, setMousePos] = useState({ x: 200, y: 150 })
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const getRotation = (x: number, y: number) => {
    const dx = mousePos.x - x
    const dy = mousePos.y - y
    return Math.atan2(dy, dx) * (180 / Math.PI)
  }

  const arrows: any[] = []
  const rows = 5
  const cols = 8
  const containerWidth = 520
  const containerHeight = 340

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = (j + 1) * (containerWidth / (cols + 1))
      const y = (i + 1) * (containerHeight / (rows + 1))
      arrows.push({ x, y, id: `${i}-${j}` })
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full bg-transparent">
      <div ref={containerRef} className="relative" style={{ width: containerWidth, height: containerHeight }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(255,255,255,1) 100%)' }} />

        {arrows.map((arrow) => (
          <div
            key={arrow.id}
            className="absolute transition-transform duration-75 ease-out text-lg select-none"
            style={{ left: arrow.x, top: arrow.y, transform: `translate(-50%, -50%) rotate(${getRotation(arrow.x, arrow.y)}deg)` }}
          >
            →
          </div>
        ))}
      </div>
    </div>
  )
}
