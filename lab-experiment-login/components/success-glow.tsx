"use client"

import { useEffect, useState } from "react"

export function SuccessGlow() {
  const [intensity, setIntensity] = useState(0)

  useEffect(() => {
    // Animate glow intensity
    const timeout = setTimeout(() => setIntensity(1), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Radial glow from center */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: intensity,
          background: `
            radial-gradient(ellipse at 50% 50%, 
              rgba(16, 185, 129, 0.15) 0%, 
              rgba(6, 182, 212, 0.1) 30%, 
              transparent 70%
            )
          `,
        }}
      />

      {/* Edge glow */}
      <div
        className="absolute inset-0 transition-opacity duration-1500"
        style={{
          opacity: intensity * 0.5,
          boxShadow: "inset 0 0 100px rgba(16, 185, 129, 0.3)",
        }}
      />

      {/* Success shimmer particles */}
      <ShimmerParticles />

      {/* Scanning line effect */}
      <div
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-scan-line"
        style={{ top: "0" }}
      />
    </div>
  )
}

function ShimmerParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(40)].map((_, i) => {
        const startX = Math.random() * 100
        const startY = 100 + Math.random() * 20
        const endY = -20 - Math.random() * 30
        const duration = 3 + Math.random() * 4
        const size = 2 + Math.random() * 4
        const delay = Math.random() * 2

        return (
          <div
            key={i}
            className="absolute rounded-full animate-shimmer-rise"
            style={{
              left: `${startX}%`,
              bottom: `${-startY}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#06b6d4" : "#34d399",
              boxShadow: `0 0 ${size * 3}px ${i % 3 === 0 ? "#10b981" : "#06b6d4"}`,
              "--rise-distance": `${Math.abs(endY - startY)}vh`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            } as React.CSSProperties}
          />
        )
      })}

      {/* Hexagonal particles */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`hex-${i}`}
          className="absolute animate-float-hex"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-emerald-400/30">
            <polygon
              points="10,1 18,5 18,15 10,19 2,15 2,5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
