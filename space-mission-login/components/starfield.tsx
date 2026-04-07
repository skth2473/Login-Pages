"use client"

import { useEffect, useRef } from "react"

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let mouseX = 0
    let mouseY = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Track mouse for parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Create stars with different layers for parallax
    interface Star {
      x: number
      y: number
      z: number
      size: number
      brightness: number
      twinkleSpeed: number
      twinklePhase: number
    }

    const stars: Star[] = []
    const numStars = 400

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 3 + 0.5, // depth layer (0.5-3.5)
        size: Math.random() * 2 + 0.5,
        brightness: Math.random() * 0.5 + 0.5,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      })
    }

    // Create distant galaxies
    interface Galaxy {
      x: number
      y: number
      size: number
      rotation: number
      opacity: number
    }

    const galaxies: Galaxy[] = []
    for (let i = 0; i < 3; i++) {
      galaxies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        rotation: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.1 + 0.05
      })
    }

    // Light flares
    interface Flare {
      x: number
      y: number
      size: number
      opacity: number
      maxOpacity: number
      growing: boolean
    }

    const flares: Flare[] = []
    const createFlare = () => {
      if (flares.length < 2 && Math.random() < 0.002) {
        flares.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 0,
          opacity: 0,
          maxOpacity: Math.random() * 0.3 + 0.1,
          growing: true
        })
      }
    }

    let time = 0

    const animate = () => {
      time += 0.016
      ctx.fillStyle = "rgba(0, 0, 10, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw galaxies
      galaxies.forEach(galaxy => {
        const parallaxX = mouseX * 5
        const parallaxY = mouseY * 5
        const gx = galaxy.x + parallaxX
        const gy = galaxy.y + parallaxY

        const gradient = ctx.createRadialGradient(gx, gy, 0, gx, gy, galaxy.size)
        gradient.addColorStop(0, `rgba(100, 150, 255, ${galaxy.opacity})`)
        gradient.addColorStop(0.5, `rgba(80, 100, 200, ${galaxy.opacity * 0.5})`)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        
        ctx.beginPath()
        ctx.arc(gx, gy, galaxy.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw stars with parallax
      stars.forEach(star => {
        const parallaxX = mouseX * (10 / star.z)
        const parallaxY = mouseY * (10 / star.z)
        
        const sx = star.x + parallaxX
        const sy = star.y + parallaxY

        // Twinkle effect
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase) * 0.3 + 0.7
        const alpha = star.brightness * twinkle

        // Star glow
        const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.size * 3)
        gradient.addColorStop(0, `rgba(200, 220, 255, ${alpha})`)
        gradient.addColorStop(0.5, `rgba(150, 180, 255, ${alpha * 0.3})`)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.arc(sx, sy, star.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Star core
        ctx.beginPath()
        ctx.arc(sx, sy, star.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()
      })

      // Create and draw flares
      createFlare()
      flares.forEach((flare, index) => {
        if (flare.growing) {
          flare.size += 2
          flare.opacity += 0.01
          if (flare.opacity >= flare.maxOpacity) {
            flare.growing = false
          }
        } else {
          flare.opacity -= 0.005
          if (flare.opacity <= 0) {
            flares.splice(index, 1)
            return
          }
        }

        const gradient = ctx.createRadialGradient(
          flare.x, flare.y, 0,
          flare.x, flare.y, flare.size
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${flare.opacity})`)
        gradient.addColorStop(0.2, `rgba(200, 220, 255, ${flare.opacity * 0.5})`)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.arc(flare.x, flare.y, flare.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Lens flare streaks
        ctx.strokeStyle = `rgba(200, 220, 255, ${flare.opacity * 0.3})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(flare.x - flare.size * 2, flare.y)
        ctx.lineTo(flare.x + flare.size * 2, flare.y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(flare.x, flare.y - flare.size * 2)
        ctx.lineTo(flare.x, flare.y + flare.size * 2)
        ctx.stroke()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: "linear-gradient(to bottom, #000510, #000000)" }}
    />
  )
}
