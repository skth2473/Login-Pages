"use client"

import { useEffect, useState } from "react"

interface RuneSymbolsProps {
  isActive: boolean
}

const RUNES = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛈ", "ᛇ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛞ", "ᛟ"]

export function RuneSymbols({ isActive }: RuneSymbolsProps) {
  const [runes, setRunes] = useState<Array<{ id: number; x: number; y: number; rune: string; size: number }>>([])

  useEffect(() => {
    const newRunes = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rune: RUNES[Math.floor(Math.random() * RUNES.length)],
      size: Math.random() * 24 + 20,
    }))
    setRunes(newRunes)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {runes.map((rune) => (
        <div
          key={rune.id}
          className={`absolute transition-all duration-1000 ${
            isActive 
              ? "opacity-100 text-amber-400 animate-pulse" 
              : "opacity-20 text-stone-600"
          }`}
          style={{
            left: `${rune.x}%`,
            top: `${rune.y}%`,
            fontSize: `${rune.size}px`,
            textShadow: isActive 
              ? "0 0 20px #fbbf24, 0 0 40px #f59e0b, 0 0 60px #d97706"
              : "none",
            transform: `rotate(${Math.random() * 30 - 15}deg)`,
          }}
        >
          {rune.rune}
        </div>
      ))}
    </div>
  )
}
