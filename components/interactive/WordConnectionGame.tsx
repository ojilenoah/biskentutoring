"use client"

import React, { useState, useEffect, useRef } from 'react'

export default function WordConnectionGame() {
  const [currentRelation, setCurrentRelation] = useState(0)
  const [connections, setConnections] = useState<any[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const topButtonsRef = useRef<Array<HTMLButtonElement | null>>([])
  const bottomButtonRef = useRef<HTMLButtonElement | null>(null)

  const relationData = [
    { type: 'ANTONYM', words: ['hot', 'fast', 'big', 'happy', 'light', 'old', 'good'], matches: ['hot', 'fast', 'big'] },
    { type: 'SYNONYM', words: ['quick', 'rapid', 'slow', 'fast', 'swift', 'delayed', 'speedy'], matches: ['quick', 'rapid', 'fast', 'swift', 'speedy'] },
    { type: 'HOMOPHONE', words: ['write', 'sea', 'son', 'bear', 'flour', 'peace', 'knight'], matches: ['write', 'sea', 'son'] },
    { type: 'HOMONYM', words: ['bat', 'bank', 'bark', 'chair', 'table', 'watch', 'light'], matches: ['bat', 'bank', 'bark'] },
  ]

  const current = relationData[currentRelation]

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentRelation((prev) => (prev + 1) % relationData.length)
      setConnections([])
    }, 4200)

    return () => clearTimeout(timer)
  }, [currentRelation])

  useEffect(() => {
    const updateConnections = () => {
      if (bottomButtonRef.current && topButtonsRef.current.length > 0) {
        const bottomRect = bottomButtonRef.current.getBoundingClientRect()
        const svgElement = containerRef.current?.querySelector('svg')
        if (!svgElement) return

        const svgRect = svgElement.getBoundingClientRect()

        const matchPositions = current.matches
          .map((word) => {
            const wordIndex = current.words.indexOf(word)
            const topButton = topButtonsRef.current[wordIndex]
            if (!topButton) return null
            const topRect = topButton.getBoundingClientRect()
            return { word, x: topRect.left + topRect.width / 2 - svgRect.left, y: topRect.bottom - svgRect.top }
          })
          .filter(Boolean)

        const newConnections: any[] = []

        for (let i = 0; i < matchPositions.length; i++) {
          for (let j = i + 1; j < matchPositions.length; j++) {
            const dx = matchPositions[i].x - matchPositions[j].x
            const distance = Math.abs(dx)
            if (distance < 150) {
              newConnections.push({ type: 'peer', x1: matchPositions[i].x, y1: matchPositions[i].y, x2: matchPositions[j].x, y2: matchPositions[j].y, delay: i * 150 })
            }
          }
        }

        matchPositions.forEach((pos: any, idx: number) => {
          newConnections.push({ type: 'main', x1: pos.x, y1: pos.y, x2: bottomRect.left + bottomRect.width / 2 - svgRect.left, y2: bottomRect.top - svgRect.top, delay: idx * 150 + 300 })
        })

        setConnections(newConnections)
      }
    }

    const timer = setTimeout(updateConnections, 250)
    return () => clearTimeout(timer)
  }, [currentRelation, current])

  const createCurvedPath = (x1: number, y1: number, x2: number, y2: number) => {
    const midY = (y1 + y2) / 2
    const controlOffset = 60
    const control1Y = y1 + controlOffset
    const control2Y = y2 - controlOffset
    return `M ${x1} ${y1} C ${x1} ${control1Y}, ${x2} ${control2Y}, ${x2} ${y2}`
  }

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center bg-transparent">
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 10 }}>
        {connections.map((conn, idx) => (
          <path
            key={idx}
            d={createCurvedPath(conn.x1, conn.y1, conn.x2, conn.y2)}
            stroke={conn.type === 'peer' ? '#8b5cf6' : '#3b82f6'}
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            style={{ animation: `fadeIn 0.5s ease-in ${conn.delay}ms forwards`, opacity: 0 }}
          />
        ))}
      </svg>

      <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>

      <div className="relative z-20 w-full px-4">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {current.words.map((word, idx) => (
            <button
              key={idx}
              ref={(el) => (topButtonsRef.current[idx] = el)}
              className={`px-4 py-1 rounded-full border text-sm transition-all duration-300 ${current.matches.includes(word) ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 bg-white text-gray-700'}`}
            >
              {word}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button ref={bottomButtonRef} className="px-8 py-2 rounded-full border-2 border-black bg-white text-black font-bold">
            {current.type}
          </button>
        </div>
      </div>
    </div>
  )
}
