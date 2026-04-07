"use client"

import { useEffect, useState } from "react"

interface Ember {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function FireEmbers() {
  const [embers, setEmbers] = useState<Ember[]>([])

  useEffect(() => {
    const newEmbers: Ember[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }))
    setEmbers(newEmbers)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute rounded-full animate-float-up"
          style={{
            left: `${ember.x}%`,
            bottom: `-${ember.y}%`,
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            background: `radial-gradient(circle, #ff6b35 0%, #ff8c42 50%, transparent 100%)`,
            boxShadow: `0 0 ${ember.size * 2}px #ff6b35, 0 0 ${ember.size * 4}px #ff4500`,
            animationDuration: `${ember.duration}s`,
            animationDelay: `${ember.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
