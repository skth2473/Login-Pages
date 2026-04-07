"use client"

import { ReactNode, useEffect, useState } from "react"

interface HolographicPanelProps {
  children: ReactNode
  isError?: boolean
}

export function HolographicPanel({ children, isError = false }: HolographicPanelProps) {
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setGlitchOffset({
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 5,
        })
        setTimeout(() => setGlitchOffset({ x: 0, y: 0 }), 50)
      }
    }, 100)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className="relative">
      {/* Glitch layers */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
          background: isError
            ? "linear-gradient(135deg, rgba(255, 42, 109, 0.1), transparent)"
            : "linear-gradient(135deg, rgba(5, 217, 232, 0.1), transparent)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translate(${-glitchOffset.x}px, ${-glitchOffset.y}px)`,
          background: isError
            ? "linear-gradient(225deg, rgba(255, 42, 109, 0.1), transparent)"
            : "linear-gradient(225deg, rgba(240, 255, 0, 0.1), transparent)",
        }}
      />

      {/* Main panel */}
      <div
        className={`relative w-[400px] max-w-[90vw] backdrop-blur-md transition-all duration-300 ${
          isError ? "box-glow-red" : "box-glow-yellow"
        }`}
        style={{
          background: isError
            ? "linear-gradient(135deg, rgba(255, 42, 109, 0.05), rgba(10, 10, 15, 0.95))"
            : "linear-gradient(135deg, rgba(240, 255, 0, 0.05), rgba(10, 10, 15, 0.95))",
          border: isError ? "1px solid rgba(255, 42, 109, 0.5)" : "1px solid rgba(240, 255, 0, 0.3)",
          clipPath: "polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))",
        }}
      >
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-6 h-6">
          <div
            className={`absolute top-0 left-0 w-full h-[2px] ${isError ? "bg-[var(--neon-red)]" : "bg-[var(--neon-yellow)]"}`}
            style={{ boxShadow: isError ? "0 0 10px var(--neon-red)" : "0 0 10px var(--neon-yellow)" }}
          />
          <div
            className={`absolute top-0 left-0 w-[2px] h-full ${isError ? "bg-[var(--neon-red)]" : "bg-[var(--neon-yellow)]"}`}
            style={{ boxShadow: isError ? "0 0 10px var(--neon-red)" : "0 0 10px var(--neon-yellow)" }}
          />
        </div>
        <div className="absolute top-0 right-0 w-6 h-6">
          <div
            className={`absolute top-0 right-0 w-full h-[2px] ${isError ? "bg-[var(--neon-red)]" : "bg-[var(--neon-yellow)]"}`}
            style={{ boxShadow: isError ? "0 0 10px var(--neon-red)" : "0 0 10px var(--neon-yellow)" }}
          />
          <div
            className={`absolute top-0 right-0 w-[2px] h-full ${isError ? "bg-[var(--neon-red)]" : "bg-[var(--neon-yellow)]"}`}
            style={{ boxShadow: isError ? "0 0 10px var(--neon-red)" : "0 0 10px var(--neon-yellow)" }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-6 h-6">
          <div
            className={`absolute bottom-0 left-0 w-full h-[2px] ${isError ? "bg-[var(--neon-red)]" : "bg-[var(--neon-yellow)]"}`}
            style={{ boxShadow: isError ? "0 0 10px var(--neon-red)" : "0 0 10px var(--neon-yellow)" }}
          />
          <div
            className={`absolute bottom-0 left-0 w-[2px] h-full ${isError ? "bg-[var(--neon-red)]" : "bg-[var(--neon-yellow)]"}`}
            style={{ boxShadow: isError ? "0 0 10px var(--neon-red)" : "0 0 10px var(--neon-yellow)" }}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-6 h-6">
          <div
            className={`absolute bottom-0 right-0 w-full h-[2px] ${isError ? "bg-[var(--neon-red)]" : "bg-[var(--neon-yellow)]"}`}
            style={{ boxShadow: isError ? "0 0 10px var(--neon-red)" : "0 0 10px var(--neon-yellow)" }}
          />
          <div
            className={`absolute bottom-0 right-0 w-[2px] h-full ${isError ? "bg-[var(--neon-red)]" : "bg-[var(--neon-yellow)]"}`}
            style={{ boxShadow: isError ? "0 0 10px var(--neon-red)" : "0 0 10px var(--neon-yellow)" }}
          />
        </div>

        {/* Header bar */}
        <div
          className={`flex items-center justify-between px-4 py-2 ${
            isError ? "bg-[var(--neon-red)]/10" : "bg-[var(--neon-yellow)]/10"
          }`}
          style={{
            borderBottom: isError
              ? "1px solid rgba(255, 42, 109, 0.3)"
              : "1px solid rgba(240, 255, 0, 0.3)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${isError ? "bg-[var(--neon-red)]" : "bg-[var(--neon-yellow)]"} animate-blink`}
            />
            <span
              className={`font-mono text-xs tracking-widest ${
                isError ? "text-[var(--neon-red)]" : "text-[var(--neon-yellow)]"
              }`}
            >
              {isError ? "ERROR" : "NEURAL_LINK"}
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 border border-[var(--neon-cyan)]/50" />
            <div className="w-2 h-2 border border-[var(--neon-cyan)]/50" />
            <div className="w-2 h-2 bg-[var(--neon-red)]/50" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Footer bar */}
        <div
          className="flex items-center justify-between px-4 py-2 font-mono text-[10px] tracking-wider text-[var(--neon-cyan)]/60"
          style={{
            borderTop: isError
              ? "1px solid rgba(255, 42, 109, 0.3)"
              : "1px solid rgba(240, 255, 0, 0.3)",
          }}
        >
          <span>ARASAKA_CORP</span>
          <span>{isError ? "ERR:0x7F3" : "v2.0.77"}</span>
        </div>

        {/* Scanning line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute left-0 right-0 h-[2px] animate-scanline ${
              isError ? "bg-[var(--neon-red)]/30" : "bg-[var(--neon-cyan)]/30"
            }`}
            style={{
              boxShadow: isError
                ? "0 0 10px var(--neon-red)"
                : "0 0 10px var(--neon-cyan)",
            }}
          />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none grid-overlay opacity-30" />
      </div>
    </div>
  )
}
