"use client"

import { useEffect, useState } from "react"

const welcomeText = "WELCOME BACK, USER_01"

export function SuccessScreen() {
  const [displayedText, setDisplayedText] = useState("")
  const [showContent, setShowContent] = useState(false)
  const [pulseActive, setPulseActive] = useState(true)

  useEffect(() => {
    // Type out welcome message
    let charIndex = 0
    const typeInterval = setInterval(() => {
      if (charIndex <= welcomeText.length) {
        setDisplayedText(welcomeText.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setShowContent(true)
          setPulseActive(false)
        }, 500)
      }
    }, 80)

    return () => clearInterval(typeInterval)
  }, [])

  return (
    <div
      className={`relative max-w-lg w-full ${
        pulseActive ? "animate-success-pulse" : ""
      }`}
    >
      {/* Yellow glow effect */}
      <div
        className="absolute inset-0 blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, var(--neon-yellow), transparent 70%)",
        }}
      />

      {/* Main container */}
      <div
        className="relative p-8 bg-[var(--cyber-dark)]/90 border border-[var(--neon-yellow)] backdrop-blur-sm box-glow-yellow"
        style={{
          clipPath:
            "polygon(0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))",
        }}
      >
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-[var(--neon-yellow)] animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-[var(--neon-cyan)]">
              ACCESS GRANTED
            </span>
            <div className="w-3 h-3 rounded-full bg-[var(--neon-yellow)] animate-pulse" />
          </div>

          {/* Welcome text with terminal effect */}
          <h1
            className="font-sans text-2xl md:text-3xl font-bold tracking-wider text-[var(--neon-yellow)] text-glow-yellow"
          >
            {displayedText}
            <span className="inline-block w-3 h-6 ml-1 bg-[var(--neon-yellow)] animate-blink" />
          </h1>
        </div>

        {/* HUD Content */}
        <div
          className={`space-y-4 transition-all duration-500 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Status indicators */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border border-[var(--neon-cyan)]/30 bg-[var(--neon-cyan)]/5">
              <div className="font-mono text-[10px] text-[var(--neon-cyan)]/70 mb-1">
                NEURAL STATUS
              </div>
              <div className="font-sans text-sm text-[var(--neon-yellow)]">
                SYNCHRONIZED
              </div>
              <div className="mt-2 h-1 bg-[var(--cyber-darker)]">
                <div
                  className="h-full w-full bg-[var(--neon-cyan)]"
                  style={{ boxShadow: "0 0 5px var(--neon-cyan)" }}
                />
              </div>
            </div>

            <div className="p-3 border border-[var(--neon-cyan)]/30 bg-[var(--neon-cyan)]/5">
              <div className="font-mono text-[10px] text-[var(--neon-cyan)]/70 mb-1">
                SECURITY LEVEL
              </div>
              <div className="font-sans text-sm text-[var(--neon-yellow)]">
                ALPHA-7
              </div>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-1 bg-[var(--neon-yellow)]"
                    style={{ boxShadow: "0 0 5px var(--neon-yellow)" }}
                  />
                ))}
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-1 bg-[var(--neon-cyan)]/20"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* System info */}
          <div className="p-3 border border-[var(--neon-yellow)]/30 bg-[var(--neon-yellow)]/5 font-mono text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-[var(--neon-cyan)]/70">LAST_ACCESS:</span>
              <span className="text-[var(--neon-yellow)]">2077.12.31 // 23:59:59</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--neon-cyan)]/70">LOCATION:</span>
              <span className="text-[var(--neon-yellow)]">NIGHT_CITY // SECTOR_7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--neon-cyan)]/70">IMPLANTS:</span>
              <span className="text-[var(--neon-yellow)]">KIROSHI_OPTICS // MANTIS_BLADES</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 py-2 font-mono text-xs tracking-wider text-[var(--neon-yellow)] border border-[var(--neon-yellow)]/50 bg-[var(--neon-yellow)]/10 hover:bg-[var(--neon-yellow)]/20 transition-colors"
              style={{
                clipPath:
                  "polygon(0 3px, 3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px))",
              }}
            >
              ENTER_SYSTEM
            </button>
            <button
              className="flex-1 py-2 font-mono text-xs tracking-wider text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/50 bg-[var(--neon-cyan)]/10 hover:bg-[var(--neon-cyan)]/20 transition-colors"
              style={{
                clipPath:
                  "polygon(0 3px, 3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px))",
              }}
            >
              VIEW_PROFILE
            </button>
          </div>
        </div>

        {/* Decorative scanning line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute left-0 right-0 h-[2px] bg-[var(--neon-yellow)]/30 animate-scanline"
            style={{ boxShadow: "0 0 10px var(--neon-yellow)" }}
          />
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2 border-[var(--neon-yellow)]" />
      <div className="absolute -top-1 -right-1 w-6 h-6 border-r-2 border-t-2 border-[var(--neon-yellow)]" />
      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-2 border-b-2 border-[var(--neon-yellow)]" />
      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 border-[var(--neon-yellow)]" />
    </div>
  )
}
