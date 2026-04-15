"use client"

import { useEffect, useState } from "react"

const bootMessages = [
  "INITIALIZING NEURAL LINK...",
  "LOADING CORTEX DRIVERS...",
  "ESTABLISHING SECURE CONNECTION...",
  "AUTHENTICATING HARDWARE...",
  "CALIBRATING BIOMETRIC SENSORS...",
  "SYSTEM READY",
]

export function InitializationScreen() {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (currentLine >= bootMessages.length) return

    const message = bootMessages[currentLine]
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex <= message.length) {
        setDisplayedText(message.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        
        // Random glitch effect
        if (Math.random() > 0.5) {
          setGlitchActive(true)
          setTimeout(() => setGlitchActive(false), 100)
        }

        setTimeout(() => {
          setCurrentLine((prev) => prev + 1)
          setDisplayedText("")
        }, 400)
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [currentLine])

  return (
    <div
      className={`relative max-w-lg w-full p-8 ${glitchActive ? "animate-glitch" : ""}`}
    >
      {/* Main container */}
      <div
        className="relative p-6 bg-[var(--cyber-dark)]/80 border border-[var(--neon-yellow)]/30 backdrop-blur-sm"
        style={{
          clipPath:
            "polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))",
          boxShadow: "0 0 30px rgba(240, 255, 0, 0.1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--neon-yellow)]/20">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-[var(--neon-red)]" />
            <div className="w-3 h-3 rounded-full bg-[var(--neon-yellow)]" />
            <div className="w-3 h-3 rounded-full bg-[var(--neon-cyan)]" />
          </div>
          <span className="font-mono text-xs tracking-widest text-[var(--neon-yellow)]/70">
            SYSTEM_BOOT_v2.077
          </span>
        </div>

        {/* Boot messages */}
        <div className="space-y-2 font-mono text-sm">
          {bootMessages.slice(0, currentLine).map((msg, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[var(--neon-cyan)]">&gt;</span>
              <span className="text-[var(--neon-yellow)]">{msg}</span>
              <span className="text-[var(--neon-cyan)]/50 text-xs ml-auto">
                [OK]
              </span>
            </div>
          ))}

          {/* Current typing line */}
          {currentLine < bootMessages.length && (
            <div className="flex items-center gap-2">
              <span className="text-[var(--neon-cyan)]">&gt;</span>
              <span className="text-[var(--neon-yellow)]">
                {displayedText}
                <span
                  className={`inline-block w-2 h-4 ml-1 bg-[var(--neon-yellow)] ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ boxShadow: "0 0 5px var(--neon-yellow)" }}
                />
              </span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-6 pt-4 border-t border-[var(--neon-yellow)]/20">
          <div className="flex justify-between font-mono text-xs text-[var(--neon-cyan)]/50 mb-2">
            <span>LOADING NEURAL INTERFACE</span>
            <span>
              {Math.min(Math.round((currentLine / bootMessages.length) * 100), 100)}%
            </span>
          </div>
          <div className="h-1 bg-[var(--cyber-darker)] border border-[var(--neon-yellow)]/20">
            <div
              className="h-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-yellow)] transition-all duration-300"
              style={{
                width: `${(currentLine / bootMessages.length) * 100}%`,
                boxShadow: "0 0 10px var(--neon-yellow)",
              }}
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-1 bg-[var(--neon-cyan)]/20"
              style={{
                opacity: i < currentLine ? 1 : 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner brackets */}
      <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-[var(--neon-yellow)]" />
      <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-[var(--neon-yellow)]" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-[var(--neon-yellow)]" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-[var(--neon-yellow)]" />
    </div>
  )
}
