'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  opacity: number
  size: number
}

export function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const particleIdRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      // Create particle trail
      const newParticle: Particle = {
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        size: 4 + Math.random() * 4,
      }

      setParticles((prev) => {
        const updated = [newParticle, ...prev.slice(0, 19)]
        return updated.map((p, i) => ({
          ...p,
          opacity: 1 - i / 20,
          size: p.size * (1 - i / 20),
        }))
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed w-4 h-4 rounded-full pointer-events-none z-50"
        style={{
          left: mousePos.x - 8,
          top: mousePos.y - 8,
          boxShadow: `0 0 20px rgba(0, 240, 255, 0.8), 0 0 40px rgba(176, 38, 255, 0.4)`,
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.4), transparent)',
        }}
      />

      {/* Cursor trail particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed rounded-full pointer-events-none z-40"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity * 0.6,
            background: `radial-gradient(circle, rgba(0, 240, 255, ${particle.opacity}), transparent)`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(0, 240, 255, ${particle.opacity * 0.8})`,
          }}
        />
      ))}
    </>
  )
}
