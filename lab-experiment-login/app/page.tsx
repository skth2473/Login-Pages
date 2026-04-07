"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { LabBackground } from "@/components/lab-background"
import { LoginTerminal } from "@/components/login-terminal"
import { FloatingFormulas } from "@/components/floating-formulas"
import { GlassCrackOverlay } from "@/components/glass-crack-overlay"
import { SuccessGlow } from "@/components/success-glow"
import { AmbientAudio } from "@/components/ambient-audio"

export default function LabLoginPage() {
  const [loginState, setLoginState] = useState<"idle" | "error" | "success">("idle")
  const [showCracks, setShowCracks] = useState(false)
  const [bubbleIntensity, setBubbleIntensity] = useState(0)

  const handleKeyPress = useCallback(() => {
    setBubbleIntensity((prev) => Math.min(prev + 0.3, 1))
    setTimeout(() => setBubbleIntensity((prev) => Math.max(prev - 0.1, 0)), 300)
  }, [])

  const handleLogin = (success: boolean) => {
    if (success) {
      setLoginState("success")
    } else {
      setLoginState("error")
      setShowCracks(true)
      setTimeout(() => {
        setShowCracks(false)
        setLoginState("idle")
      }, 3000)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f]">
      {/* Ambient Audio */}
      <AmbientAudio />

      {/* Animated Lab Background */}
      <LabBackground bubbleIntensity={bubbleIntensity} loginState={loginState} />

      {/* Floating Chemical Formulas */}
      <FloatingFormulas />

      {/* Main Login Terminal */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <LoginTerminal
          onKeyPress={handleKeyPress}
          onLogin={handleLogin}
          loginState={loginState}
        />
      </div>

      {/* Success Glow Effect */}
      {loginState === "success" && <SuccessGlow />}

      {/* Glass Crack Overlay for Error State */}
      {showCracks && <GlassCrackOverlay />}
    </div>
  )
}
