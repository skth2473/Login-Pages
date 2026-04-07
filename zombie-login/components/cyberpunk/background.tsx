"use client"

import { useEffect, useRef } from "react"

export function CyberpunkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // City buildings data
    const buildings: { x: number; width: number; height: number; windows: { x: number; y: number; lit: boolean }[] }[] = []
    const numBuildings = 40

    for (let i = 0; i < numBuildings; i++) {
      const width = 30 + Math.random() * 80
      const height = 100 + Math.random() * 400
      const x = (i / numBuildings) * canvas.width * 1.5 - canvas.width * 0.25
      const windows: { x: number; y: number; lit: boolean }[] = []
      
      for (let wy = 20; wy < height - 20; wy += 15) {
        for (let wx = 5; wx < width - 5; wx += 12) {
          windows.push({ x: wx, y: wy, lit: Math.random() > 0.4 })
        }
      }
      
      buildings.push({ x, width, height, windows })
    }

    // Flying vehicles
    const vehicles: { x: number; y: number; speed: number; size: number; color: string }[] = []
    for (let i = 0; i < 15; i++) {
      vehicles.push({
        x: Math.random() * canvas.width,
        y: 100 + Math.random() * 300,
        speed: 1 + Math.random() * 3,
        size: 2 + Math.random() * 4,
        color: Math.random() > 0.5 ? "#ff2a6d" : "#05d9e8",
      })
    }

    // Light streaks
    const streaks: { x: number; y: number; length: number; speed: number; opacity: number }[] = []
    for (let i = 0; i < 20; i++) {
      streaks.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 50 + Math.random() * 150,
        speed: 5 + Math.random() * 10,
        opacity: 0.3 + Math.random() * 0.5,
      })
    }

    // Holographic billboards
    const billboards = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, width: 120, height: 80 },
      { x: canvas.width * 0.7, y: canvas.height * 0.25, width: 150, height: 100 },
      { x: canvas.width * 0.85, y: canvas.height * 0.4, width: 100, height: 70 },
    ]

    let frame = 0

    const animate = () => {
      frame++
      ctx.fillStyle = "#050508"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Gradient sky
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#1a0a20")
      gradient.addColorStop(0.5, "#0a0515")
      gradient.addColorStop(1, "#050508")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Stars
      ctx.fillStyle = "#ffffff"
      for (let i = 0; i < 100; i++) {
        const x = (i * 137.5 + frame * 0.01) % canvas.width
        const y = (i * 73.3) % (canvas.height * 0.5)
        const size = Math.sin(frame * 0.02 + i) * 0.5 + 1
        ctx.globalAlpha = 0.3 + Math.sin(frame * 0.05 + i) * 0.2
        ctx.fillRect(x, y, size, size)
      }
      ctx.globalAlpha = 1

      // Draw buildings
      buildings.forEach((building) => {
        const baseY = canvas.height - building.height

        // Building body
        const buildingGradient = ctx.createLinearGradient(
          building.x,
          baseY,
          building.x,
          canvas.height
        )
        buildingGradient.addColorStop(0, "#1a1a2e")
        buildingGradient.addColorStop(1, "#0a0a15")
        ctx.fillStyle = buildingGradient
        ctx.fillRect(building.x, baseY, building.width, building.height)

        // Building outline glow
        ctx.strokeStyle = "rgba(5, 217, 232, 0.3)"
        ctx.lineWidth = 1
        ctx.strokeRect(building.x, baseY, building.width, building.height)

        // Windows
        building.windows.forEach((win) => {
          if (win.lit) {
            const flicker = Math.random() > 0.99
            const intensity = flicker ? 0.3 : 0.7 + Math.sin(frame * 0.1 + win.x + win.y) * 0.2
            ctx.fillStyle = `rgba(240, 255, 0, ${intensity})`
            ctx.fillRect(building.x + win.x, baseY + win.y, 6, 8)
            
            // Window glow
            ctx.fillStyle = `rgba(240, 255, 0, ${intensity * 0.3})`
            ctx.fillRect(building.x + win.x - 1, baseY + win.y - 1, 8, 10)
          } else {
            ctx.fillStyle = "rgba(20, 20, 40, 0.8)"
            ctx.fillRect(building.x + win.x, baseY + win.y, 6, 8)
          }
        })
      })

      // Holographic billboards
      billboards.forEach((bb, i) => {
        const hue = (frame * 2 + i * 120) % 360
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.1)`
        ctx.fillRect(bb.x, bb.y, bb.width, bb.height)
        
        ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 0.5)`
        ctx.lineWidth = 2
        ctx.strokeRect(bb.x, bb.y, bb.width, bb.height)

        // Scan line effect on billboard
        const scanY = (frame * 3 + i * 50) % bb.height
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.3)`
        ctx.fillRect(bb.x, bb.y + scanY, bb.width, 2)

        // Text simulation
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.6)`
        for (let j = 0; j < 3; j++) {
          ctx.fillRect(bb.x + 10, bb.y + 15 + j * 20, bb.width - 20, 8)
        }
      })

      // Flying vehicles with trails
      vehicles.forEach((v) => {
        // Trail
        ctx.beginPath()
        ctx.moveTo(v.x - 30, v.y)
        ctx.lineTo(v.x, v.y)
        const trailGradient = ctx.createLinearGradient(v.x - 30, v.y, v.x, v.y)
        trailGradient.addColorStop(0, "transparent")
        trailGradient.addColorStop(1, v.color)
        ctx.strokeStyle = trailGradient
        ctx.lineWidth = v.size * 0.5
        ctx.stroke()

        // Vehicle body
        ctx.fillStyle = v.color
        ctx.shadowColor = v.color
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.ellipse(v.x, v.y, v.size * 2, v.size, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Update position
        v.x += v.speed
        if (v.x > canvas.width + 50) {
          v.x = -50
          v.y = 100 + Math.random() * 300
        }
      })

      // Light streaks
      streaks.forEach((s) => {
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - s.length, s.y + s.length * 0.5)
        const streakGradient = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.length,
          s.y + s.length * 0.5
        )
        streakGradient.addColorStop(0, `rgba(240, 255, 0, ${s.opacity})`)
        streakGradient.addColorStop(1, "transparent")
        ctx.strokeStyle = streakGradient
        ctx.lineWidth = 1
        ctx.stroke()

        // Update
        s.x += s.speed
        s.y += s.speed * 0.3
        if (s.x > canvas.width + s.length || s.y > canvas.height) {
          s.x = Math.random() * canvas.width * 0.5
          s.y = -50
        }
      })

      // Ground reflection
      const reflectionGradient = ctx.createLinearGradient(
        0,
        canvas.height - 100,
        0,
        canvas.height
      )
      reflectionGradient.addColorStop(0, "transparent")
      reflectionGradient.addColorStop(1, "rgba(5, 217, 232, 0.1)")
      ctx.fillStyle = reflectionGradient
      ctx.fillRect(0, canvas.height - 100, canvas.width, 100)

      // Horizontal neon lines
      ctx.strokeStyle = "rgba(240, 255, 0, 0.2)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, canvas.height - 50)
      ctx.lineTo(canvas.width, canvas.height - 50)
      ctx.stroke()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ filter: "blur(1px)" }}
    />
  )
}
