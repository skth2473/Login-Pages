"use client"

import { useState, useEffect, useCallback } from "react"
import { FireEmbers } from "@/components/fire-embers"
import { Torch } from "@/components/torch"
import { LoginScroll } from "@/components/login-scroll"
import { RuneSymbols } from "@/components/rune-symbols"
import { FogLayer } from "@/components/fog-layer"

export default function MedievalLogin() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loginState, setLoginState] = useState<"idle" | "error" | "success">("idle")

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = useCallback((username: string, password: string) => {
    // Demo: "hero" / "magic" for success, anything else for error
    if (username.toLowerCase() === "hero" && password === "magic") {
      setLoginState("success")
    } else {
      setLoginState("error")
      setTimeout(() => setLoginState("idle"), 1500)
    }
  }, [])

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background Stone Chamber */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/stone-chamber.jpg')" }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Animated Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* Fog Layer */}
      <FogLayer />

      {/* Rune Symbols on walls */}
      <RuneSymbols isActive={loginState === "success"} />

      {/* Torches */}
      <Torch position="left" />
      <Torch position="right" />

      {/* Fire Embers */}
      <FireEmbers />

      {/* Main Content */}
      <div className={`relative z-10 flex min-h-screen items-center justify-center p-4 transition-all duration-1000 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        <LoginScroll 
          onLogin={handleLogin} 
          loginState={loginState}
        />
      </div>

      {/* Success Golden Overlay */}
      {loginState === "success" && (
        <div className="absolute inset-0 z-20 pointer-events-none animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-amber-500/10" />
        </div>
      )}

      {/* Error Screen Shake */}
      {loginState === "error" && (
        <div className="absolute inset-0 z-30 pointer-events-none animate-shake" />
      )}
    </main>
  )
}
