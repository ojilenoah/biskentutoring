"use client"

import React, { useState, useEffect, useRef } from 'react'

export default function CursorTracker() {
  // Remove arrow-following animation (distracting). Render a subtle decorative grid instead.
  return (
    <div className="flex items-center justify-center w-full h-full bg-transparent">
      <div className="w-full h-full flex items-center justify-center">
        <div className="grid grid-cols-6 gap-2 opacity-30 w-3/4 h-3/4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="bg-gray-200/40 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  )
}
