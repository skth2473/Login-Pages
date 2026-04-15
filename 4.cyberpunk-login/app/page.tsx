"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { CyberpunkBackground } from "@/components/cyberpunk/background"
import { HolographicPanel } from "@/components/cyberpunk/holographic-panel"
import { LoginForm } from "@/components/cyberpunk/login-form"
import { FaceScanHUD } from "@/components/cyberpunk/face-scan-hud"
import { InitializationScreen } from "@/components/cyberpunk/initialization-screen"
import { SuccessScreen } from "@/components/cyberpunk/success-screen"
import { ErrorOverlay } from "@/components/cyberpunk/error-overlay"
import { ParticleField } from "@/components/cyberpunk/particle-field"
import { DataStreams } from "@/components/cyberpunk/data-streams"
import { ScanlineOverlay } from "@/components/cyberpunk/scanline-overlay"

type LoginState = "initializing" | "idle" | "scanning" | "error" | "success"

export default function CyberpunkLogin() {
  const [loginState, setLoginState] = useState<LoginState>("initializing")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scanProgress, setScanProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse parallax effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setMousePosition({ x: x * 20, y: y * 20 })
    }
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  // Boot sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoginState("idle")
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  // Handle login attempt
  const handleLogin = (userId: string, accessKey: string) => {
    setLoginState("scanning")
    setScanProgress(0)

    // Simulate face scan
    const scanInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(scanInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    setTimeout(() => {
      clearInterval(scanInterval)
      // Simulate authentication (wrong password = "wrong", any other = success)
      if (accessKey.toLowerCase() === "wrong") {
        setLoginState("error")
        setTimeout(() => setLoginState("idle"), 3000)
      } else if (userId && accessKey) {
        setLoginState("success")
      } else {
        setLoginState("error")
        setTimeout(() => setLoginState("idle"), 3000)
      }
    }, 3000)
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[var(--cyber-dark)]"
    >
      {/* Background with parallax */}
      <div
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <CyberpunkBackground />
      </div>

      {/* Floating particles */}
      <ParticleField />

      {/* Data streams on sides */}
      <DataStreams />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        {loginState === "initializing" && <InitializationScreen />}

        {loginState !== "initializing" && loginState !== "success" && (
          <div
            className={`transition-all duration-500 ${
              loginState === "error" ? "animate-glitch-heavy" : ""
            }`}
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <HolographicPanel isError={loginState === "error"}>
              {loginState === "scanning" ? (
                <FaceScanHUD progress={scanProgress} />
              ) : (
                <LoginForm onSubmit={handleLogin} isError={loginState === "error"} />
              )}
            </HolographicPanel>
          </div>
        )}

        {loginState === "success" && <SuccessScreen />}
      </div>

      {/* Error overlay */}
      {loginState === "error" && <ErrorOverlay />}

      {/* Scanline overlay */}
      <ScanlineOverlay />

      {/* Noise overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 noise-overlay animate-noise" />

      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  )
}
