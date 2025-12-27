"use client"

import React, { useState, useEffect } from 'react'

export default function MathPillGame() {
  const [currentEquation, setCurrentEquation] = useState(0)
  const [animatingNumber, setAnimatingNumber] = useState<number | null>(null)
  const [shake, setShake] = useState(false)
  const [usedNumbers, setUsedNumbers] = useState<number[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)

  const equations = [
    { left: '55', operator: '+', answer: '26', correctValue: -29 },
    { left: '12', operator: '×', answer: '48', correctValue: 4 },
    { left: '100', operator: '÷', answer: '25', correctValue: 4 },
  ]

  const numbers = [-29, 15, -10, 4]
  const current = equations[currentEquation]
  const availableNumbers = numbers.filter((n) => !usedNumbers.includes(n))

  useEffect(() => {
    if (availableNumbers.length === 0) return
    const timer = setTimeout(() => {
      const randomNum = availableNumbers[Math.floor(Math.random() * availableNumbers.length)]
      tryNumber(randomNum)
    }, 1600)
    return () => clearTimeout(timer)
  }, [currentEquation, usedNumbers])

  const tryNumber = (num: number) => {
    setAnimatingNumber(num)
    setUsedNumbers((prev) => [...prev, num])

    setTimeout(() => {
      if (num === current.correctValue) {
        setFeedback('correct')
        setTimeout(() => {
          setAnimatingNumber(null)
          setFeedback(null)
          setUsedNumbers([])
          setCurrentEquation((prev) => (prev + 1) % equations.length)
        }, 900)
      } else {
        setFeedback('wrong')
        setShake(true)
        setTimeout(() => {
          setShake(false)
          setAnimatingNumber(null)
          setFeedback(null)
        }, 900)
      }
    }, 700)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-transparent p-4">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="px-6 py-3 rounded-full border-2 bg-white font-mono text-xl font-bold">{current.left}</div>
        <div className="font-mono text-xl font-bold">{current.operator}</div>
        <div className={`relative px-6 py-3 rounded-full border-2 font-mono text-xl font-bold ${shake ? 'animate-shake' : ''} ${feedback === 'correct' ? 'border-green-500 bg-green-100 text-green-700' : feedback === 'wrong' ? 'border-red-500 bg-red-100 text-red-700' : 'border-blue-500 bg-blue-50'}`}>
          {animatingNumber !== null ? animatingNumber : '?'}
        </div>
        <div className="font-mono text-xl font-bold">=</div>
        <div className="px-6 py-3 rounded-full border-2 bg-white font-mono text-xl font-bold">{current.answer}</div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-xl">
        {numbers.map((num, idx) => (
          <div key={idx} className={`px-4 py-2 rounded-full border-2 bg-gray-50 font-mono text-base ${usedNumbers.includes(num) ? 'opacity-30' : 'opacity-100'}`}>{num > 0 ? `+${num}` : num}</div>
        ))}
      </div>

      {feedback && <div className={`mt-4 text-2xl font-bold ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>{feedback === 'correct' ? 'RIGHT ✓' : 'WRONG ✗'}</div>}
    </div>
  )
}
