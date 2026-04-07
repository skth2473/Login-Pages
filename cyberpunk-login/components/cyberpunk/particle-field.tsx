"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
}

export function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate initial particles
    const colors = ["var(--neon-yellow)", "var(--neon-cyan)", "var(--neon-pink)"]
    const initialParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      speed: 0.5 + Math.random() * 1.5,
      opacity: 0.3 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles(initialParticles)

    // Animate particles
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          y: p.y - p.speed * 0.1,
          x: p.x + Math.sin(Date.now() * 0.001 + p.id) * 0.05,
          ...(p.y < -5 ? { y: 105, x: Math.random() * 100 } : {}),
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-5 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transition: "top 0.05s linear, left 0.05s linear",
          }}
        />
      ))}

      {/* Light streaks */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`streak-${i}`}
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-[var(--neon-cyan)]/50 to-transparent"
          style={{
            left: `${15 + i * 20}%`,
            top: 0,
            height: "100%",
            opacity: 0.2,
            animation: `float-particle ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </div>
  )
}
