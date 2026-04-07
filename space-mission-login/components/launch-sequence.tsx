"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LaunchSequenceProps {
  onShake: () => void
  onFlash: () => void
}

export function LaunchSequence({ onShake, onFlash }: LaunchSequenceProps) {
  const [phase, setPhase] = useState<"countdown" | "ignition" | "liftoff">("countdown")
  const [count, setCount] = useState(3)
  const [showFlames, setShowFlames] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Countdown sequence
    const countdownInterval = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          setPhase("ignition")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(countdownInterval)
  }, [])

  useEffect(() => {
    if (phase === "ignition") {
      setShowFlames(true)
      onShake()
      
      // Multiple shakes during ignition
      const shakeInterval = setInterval(onShake, 500)
      
      setTimeout(() => {
        setPhase("liftoff")
        clearInterval(shakeInterval)
      }, 3000)
    }
  }, [phase, onShake])

  useEffect(() => {
    if (phase === "liftoff") {
      onShake()
      setTimeout(onFlash, 1500)
    }
  }, [phase, onFlash, onShake])

  // Flame/smoke animation
  useEffect(() => {
    if (!showFlames || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 400
    canvas.height = 300

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      life: number
      maxLife: number
      type: "flame" | "smoke"
    }

    const particles: Particle[] = []

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create new particles
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: canvas.width / 2 + (Math.random() - 0.5) * 60,
          y: 50,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 8 + 4,
          size: Math.random() * 30 + 20,
          life: 0,
          maxLife: Math.random() * 40 + 30,
          type: Math.random() > 0.3 ? "flame" : "smoke"
        })
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life++
        p.size *= 1.02

        const alpha = 1 - p.life / p.maxLife

        if (p.type === "flame") {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
          gradient.addColorStop(0, `rgba(255, 255, 200, ${alpha})`)
          gradient.addColorStop(0.3, `rgba(255, 150, 50, ${alpha * 0.8})`)
          gradient.addColorStop(0.6, `rgba(255, 80, 20, ${alpha * 0.5})`)
          gradient.addColorStop(1, `rgba(150, 30, 0, 0)`)
          ctx.fillStyle = gradient
        } else {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
          gradient.addColorStop(0, `rgba(150, 150, 150, ${alpha * 0.5})`)
          gradient.addColorStop(1, `rgba(100, 100, 100, 0)`)
          ctx.fillStyle = gradient
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [showFlames])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        className="absolute inset-0 bg-black"
      />

      {/* Countdown display */}
      <AnimatePresence mode="wait">
        {phase === "countdown" && (
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 text-center"
          >
            <div className="text-[200px] font-bold text-white font-mono leading-none"
              style={{ textShadow: "0 0 60px rgba(34, 211, 238, 0.8)" }}
            >
              {count}
            </div>
            <div className="text-cyan-400 font-mono text-2xl tracking-widest mt-4">
              T-MINUS {count} SECOND{count !== 1 ? "S" : ""}
            </div>
          </motion.div>
        )}

        {phase === "ignition" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 text-center"
          >
            <motion.div 
              className="text-6xl md:text-8xl font-bold text-orange-500 font-mono"
              animate={{ 
                textShadow: [
                  "0 0 30px rgba(249, 115, 22, 0.8)",
                  "0 0 60px rgba(249, 115, 22, 1)",
                  "0 0 30px rgba(249, 115, 22, 0.8)"
                ]
              }}
              transition={{ duration: 0.2, repeat: Infinity }}
            >
              IGNITION
            </motion.div>
            <div className="text-orange-400 font-mono text-xl tracking-widest mt-4 animate-pulse">
              MAIN ENGINE START
            </div>
          </motion.div>
        )}

        {phase === "liftoff" && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center"
          >
            <motion.div 
              className="text-6xl md:text-8xl font-bold text-emerald-400 font-mono"
              animate={{ 
                y: [0, -20, 0],
                textShadow: [
                  "0 0 30px rgba(52, 211, 153, 0.8)",
                  "0 0 80px rgba(52, 211, 153, 1)",
                  "0 0 30px rgba(52, 211, 153, 0.8)"
                ]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              LIFTOFF!
            </motion.div>
            <div className="text-emerald-300 font-mono text-xl tracking-widest mt-4">
              WE HAVE LIFTOFF
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flame/smoke canvas */}
      {showFlames && (
        <canvas
          ref={canvasRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20"
          style={{ width: "400px", height: "300px" }}
        />
      )}

      {/* Light flare effects */}
      {showFlames && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 0.1, repeat: Infinity }}
        >
          <div 
            className="w-full h-full"
            style={{
              background: "radial-gradient(ellipse at center bottom, rgba(255, 150, 50, 0.4), transparent 70%)"
            }}
          />
        </motion.div>
      )}
    </div>
  )
}
