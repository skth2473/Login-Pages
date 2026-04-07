"use client"

import { useState, useEffect, useRef } from "react"
import { GTALoginCard } from "@/components/gta-login-card"
import { WastedOverlay } from "@/components/wasted-overlay"
import { MissionPassedOverlay } from "@/components/mission-passed-overlay"

export default function GTALoginPage() {
  const [loginState, setLoginState] = useState<"idle" | "wasted" | "passed">("idle")
  const [showGlitch, setShowGlitch] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const successAudioRef = useRef<HTMLAudioElement | null>(null)

  const handleWrongPassword = () => {
    setShowGlitch(true)
    setLoginState("wasted")
    
    setTimeout(() => {
      setShowGlitch(false)
    }, 500)

    setTimeout(() => {
      setLoginState("idle")
    }, 3000)
  }

  const handleSuccess = () => {
    setLoginState("passed")
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Cinematic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/gta-city-bg.jpg')",
          filter: "blur(2px) brightness(0.6)",
        }}
      />

      {/* Ambient Fog/Smoke Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)",
          animation: "fogDrift 20s ease-in-out infinite",
        }}
      />

      {/* Film Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Police Siren Flash Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          animation: "sirenFlash 4s ease-in-out infinite",
        }}
      />

      {/* Scanline Effect */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02]"
      >
        <div 
          className="absolute w-full h-[2px] bg-white"
          style={{
            animation: "scanline 8s linear infinite",
          }}
        />
      </div>

      {/* Light Reflection Sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 h-full w-[200px] opacity-10"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            animation: "lightSweep 10s ease-in-out infinite",
          }}
        />
      </div>

      {/* Screen Glitch Effect on Wrong Password */}
      {showGlitch && (
        <div 
          className="absolute inset-0 z-40 pointer-events-none"
          style={{
            animation: "shake 0.5s ease-in-out",
          }}
        >
          <div className="absolute inset-0 bg-red-500/20" />
          <div 
            className="absolute inset-0"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.1) 2px, rgba(255,0,0,0.1) 4px)",
            }}
          />
        </div>
      )}

      {/* Main Login Card Container */}
      <div 
        className={`relative z-10 flex items-center justify-center min-h-screen px-4 ${
          showGlitch ? "animate-[shake_0.5s_ease-in-out]" : ""
        }`}
      >
        <GTALoginCard 
          onWrongPassword={handleWrongPassword}
          onSuccess={handleSuccess}
          disabled={loginState !== "idle"}
        />
      </div>

      {/* WASTED Overlay */}
      {loginState === "wasted" && <WastedOverlay />}

      {/* MISSION PASSED Overlay */}
      {loginState === "passed" && <MissionPassedOverlay />}
    </main>
  )
}
