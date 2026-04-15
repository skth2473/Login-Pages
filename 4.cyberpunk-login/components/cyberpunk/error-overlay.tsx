"use client"

import { useEffect, useState } from "react"

export function ErrorOverlay() {
  const [warningSymbols, setWarningSymbols] = useState<{ x: number; y: number; delay: number }[]>([])

  useEffect(() => {
    // Generate random warning symbols
    const symbols = Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5,
    }))
    setWarningSymbols(symbols)
  }, [])

  return (
    <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
      {/* Red overlay with flicker */}
      <div
        className="absolute inset-0 bg-[var(--neon-red)]/10 animate-flicker"
        style={{ mixBlendMode: "multiply" }}
      />

      {/* Glitch bars */}
      <div className="absolute inset-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 bg-[var(--neon-red)]/20"
            style={{
              top: `${Math.random() * 100}%`,
              height: `${2 + Math.random() * 8}px`,
              transform: `translateX(${Math.random() * 20 - 10}px)`,
              animation: `glitch-heavy 0.1s ease-in-out infinite`,
              animationDelay: `${Math.random() * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Warning text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <h2
            className="font-sans text-4xl md:text-6xl font-black tracking-widest text-[var(--neon-red)] animate-red-pulse"
            style={{
              textShadow: `
                0 0 10px var(--neon-red),
                0 0 20px var(--neon-red),
                0 0 40px var(--neon-red),
                0 0 80px var(--neon-red)
              `,
            }}
          >
            SYSTEM OVERLOAD
          </h2>
          
          {/* Glitch copies */}
          <h2
            className="absolute inset-0 font-sans text-4xl md:text-6xl font-black tracking-widest text-[var(--neon-cyan)] animate-glitch opacity-50"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              transform: "translate(-2px, 0)",
            }}
          >
            SYSTEM OVERLOAD
          </h2>
          <h2
            className="absolute inset-0 font-sans text-4xl md:text-6xl font-black tracking-widest text-[var(--neon-yellow)] animate-glitch opacity-50"
            style={{
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
              transform: "translate(2px, 0)",
              animationDelay: "0.05s",
            }}
          >
            SYSTEM OVERLOAD
          </h2>
        </div>
      </div>

      {/* Warning symbols scattered */}
      {warningSymbols.map((symbol, i) => (
        <div
          key={i}
          className="absolute animate-warning-flash"
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            animationDelay: `${symbol.delay}s`,
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--neon-red)"
            strokeWidth="2"
            style={{
              filter: "drop-shadow(0 0 10px var(--neon-red))",
            }}
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
      ))}

      {/* Border flash */}
      <div
        className="absolute inset-4 border-2 border-[var(--neon-red)] animate-red-pulse opacity-50"
        style={{
          clipPath:
            "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))",
        }}
      />

      {/* Error code */}
      <div className="absolute bottom-8 left-8 font-mono text-xs text-[var(--neon-red)] animate-blink">
        ERROR_CODE: 0x7F3_AUTH_FAIL
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-xs text-[var(--neon-red)] animate-blink">
        RETRY IN 3...2...1...
      </div>
    </div>
  )
}
