"use client"

import { useEffect, useState } from "react"

export function GlassCrackOverlay() {
  const [isVisible, setIsVisible] = useState(false)
  const [showFlash, setShowFlash] = useState(true)

  useEffect(() => {
    // Flash effect
    setTimeout(() => setShowFlash(false), 150)
    // Cracks appear
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Flash Effect */}
      {showFlash && (
        <div className="absolute inset-0 bg-red-500/30 animate-flash" />
      )}

      {/* Explosion Particles */}
      <ExplosionParticles />

      {/* Glass Cracks SVG */}
      <svg
        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="crack-glow">
            <feGaussianBlur stdDeviation="0.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main crack pattern */}
        <g stroke="rgba(255,255,255,0.4)" strokeWidth="0.15" fill="none" filter="url(#crack-glow)">
          {/* Central impact point */}
          <path d="M50,50 L45,35 L42,20 L38,5" className="animate-crack-draw" />
          <path d="M50,50 L55,38 L62,25 L70,10" className="animate-crack-draw" style={{ animationDelay: "0.05s" }} />
          <path d="M50,50 L65,48 L80,42 L95,38" className="animate-crack-draw" style={{ animationDelay: "0.1s" }} />
          <path d="M50,50 L62,58 L78,65 L92,72" className="animate-crack-draw" style={{ animationDelay: "0.15s" }} />
          <path d="M50,50 L52,65 L55,80 L58,95" className="animate-crack-draw" style={{ animationDelay: "0.2s" }} />
          <path d="M50,50 L38,62 L25,75 L12,88" className="animate-crack-draw" style={{ animationDelay: "0.25s" }} />
          <path d="M50,50 L35,52 L20,55 L5,58" className="animate-crack-draw" style={{ animationDelay: "0.3s" }} />
          <path d="M50,50 L38,42 L22,35 L8,28" className="animate-crack-draw" style={{ animationDelay: "0.35s" }} />

          {/* Secondary cracks */}
          <path d="M45,35 L35,32 L25,28" className="animate-crack-draw" style={{ animationDelay: "0.4s" }} />
          <path d="M55,38 L58,32 L65,30" className="animate-crack-draw" style={{ animationDelay: "0.45s" }} />
          <path d="M65,48 L72,52 L80,58" className="animate-crack-draw" style={{ animationDelay: "0.5s" }} />
          <path d="M62,58 L68,62 L75,58" className="animate-crack-draw" style={{ animationDelay: "0.55s" }} />
          <path d="M52,65 L45,72 L38,78" className="animate-crack-draw" style={{ animationDelay: "0.6s" }} />
          <path d="M38,62 L32,68 L25,65" className="animate-crack-draw" style={{ animationDelay: "0.65s" }} />
          <path d="M35,52 L28,58 L20,62" className="animate-crack-draw" style={{ animationDelay: "0.7s" }} />
          <path d="M38,42 L32,38 L25,42" className="animate-crack-draw" style={{ animationDelay: "0.75s" }} />

          {/* Tertiary details */}
          <path d="M42,20 L48,18 L52,22" className="animate-crack-draw" style={{ animationDelay: "0.8s" }} />
          <path d="M80,42 L85,48 L82,55" className="animate-crack-draw" style={{ animationDelay: "0.85s" }} />
          <path d="M25,75 L18,72 L15,78" className="animate-crack-draw" style={{ animationDelay: "0.9s" }} />
        </g>

        {/* Impact rings */}
        <circle
          cx="50"
          cy="50"
          r="5"
          fill="none"
          stroke="rgba(255,100,100,0.3)"
          strokeWidth="0.2"
          className="animate-crack-ring"
        />
        <circle
          cx="50"
          cy="50"
          r="12"
          fill="none"
          stroke="rgba(255,100,100,0.2)"
          strokeWidth="0.15"
          className="animate-crack-ring"
          style={{ animationDelay: "0.1s" }}
        />
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="rgba(255,100,100,0.1)"
          strokeWidth="0.1"
          className="animate-crack-ring"
          style={{ animationDelay: "0.2s" }}
        />
      </svg>

      {/* Error Alert Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-alert-pulse">
          <div className="bg-red-950/80 backdrop-blur-sm border border-red-500/50 rounded-lg px-8 py-4">
            <p className="font-mono text-lg font-bold text-red-400 tracking-wider animate-glitch">
              ⚠ REACTION FAILED ⚠
            </p>
            <p className="font-mono text-sm text-red-300/70 mt-1 text-center">
              UNSTABLE COMPOUND DETECTED
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExplosionParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => {
        const angle = (i / 30) * Math.PI * 2
        const distance = 100 + Math.random() * 200
        const size = 3 + Math.random() * 8
        const duration = 0.5 + Math.random() * 0.5

        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full animate-explode"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: `rgba(${255}, ${50 + Math.random() * 100}, ${50}, ${0.8})`,
              boxShadow: `0 0 ${size * 2}px rgba(255, 100, 50, 0.5)`,
              "--explode-x": `${Math.cos(angle) * distance}px`,
              "--explode-y": `${Math.sin(angle) * distance}px`,
              animationDuration: `${duration}s`,
            } as React.CSSProperties}
          />
        )
      })}

      {/* Smoke particles */}
      {[...Array(15)].map((_, i) => {
        const angle = (i / 15) * Math.PI * 2
        const distance = 50 + Math.random() * 100

        return (
          <div
            key={`smoke-${i}`}
            className="absolute left-1/2 top-1/2 rounded-full animate-smoke"
            style={{
              width: "30px",
              height: "30px",
              background: "radial-gradient(circle, rgba(100,100,100,0.4) 0%, transparent 70%)",
              "--smoke-x": `${Math.cos(angle) * distance}px`,
              "--smoke-y": `${Math.sin(angle) * distance - 50}px`,
              animationDelay: `${i * 0.03}s`,
            } as React.CSSProperties}
          />
        )
      })}
    </div>
  )
}
