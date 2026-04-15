"use client"

import { useEffect, useState } from "react"

interface FaceScanHUDProps {
  progress: number
}

export function FaceScanHUD({ progress }: FaceScanHUDProps) {
  const [scanLines, setScanLines] = useState<number[]>([])
  const [dataPoints, setDataPoints] = useState<{ x: number; y: number; label: string }[]>([])

  useEffect(() => {
    // Generate random scan lines
    const lines = Array.from({ length: 20 }, () => Math.random() * 100)
    setScanLines(lines)

    // Generate random data points
    const points = [
      { x: 25, y: 30, label: "RETINA_L" },
      { x: 75, y: 30, label: "RETINA_R" },
      { x: 50, y: 45, label: "NEURAL_PT" },
      { x: 35, y: 60, label: "BIO_SIG_A" },
      { x: 65, y: 60, label: "BIO_SIG_B" },
      { x: 50, y: 75, label: "DNA_MATCH" },
    ]
    setDataPoints(points)
  }, [])

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-sans text-lg font-bold tracking-wider text-[var(--neon-cyan)] text-glow-cyan">
          BIOMETRIC SCAN
        </h2>
        <p className="font-mono text-xs text-[var(--neon-yellow)]/70 tracking-widest">
          INITIALIZING NEURAL INTERFACE...
        </p>
      </div>

      {/* Face scan visualization */}
      <div className="relative aspect-square max-w-[200px] mx-auto">
        {/* Circular frame */}
        <div
          className="absolute inset-0 rounded-full border-2 border-[var(--neon-cyan)]/50 animate-scan-rotate"
          style={{
            boxShadow:
              "0 0 20px var(--neon-cyan), inset 0 0 20px rgba(5, 217, 232, 0.1)",
          }}
        >
          {/* Rotating scan line */}
          <div
            className="absolute top-1/2 left-1/2 w-1/2 h-[2px] origin-left bg-gradient-to-r from-[var(--neon-cyan)] to-transparent"
            style={{
              boxShadow: "0 0 10px var(--neon-cyan)",
            }}
          />
        </div>

        {/* Inner circles */}
        <div className="absolute inset-4 rounded-full border border-[var(--neon-cyan)]/30" />
        <div className="absolute inset-8 rounded-full border border-[var(--neon-cyan)]/20" />
        <div className="absolute inset-12 rounded-full border border-[var(--neon-cyan)]/10" />

        {/* Silhouette face */}
        <div className="absolute inset-6 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full opacity-30"
            fill="none"
            stroke="var(--neon-yellow)"
            strokeWidth="0.5"
          >
            {/* Simplified face outline */}
            <ellipse cx="50" cy="45" rx="25" ry="30" />
            <ellipse cx="40" cy="40" rx="5" ry="3" />
            <ellipse cx="60" cy="40" rx="5" ry="3" />
            <path d="M 45 55 Q 50 60 55 55" />
            <path d="M 40 65 Q 50 72 60 65" />
          </svg>
        </div>

        {/* Scan lines moving across */}
        {scanLines.map((y, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-[1px] bg-[var(--neon-cyan)]/30 animate-scan-line"
            style={{
              top: `${y}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform: "translate(-50%, -50%)",
              opacity: progress > i * 15 ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <div className="relative">
              <div
                className="w-2 h-2 rounded-full bg-[var(--neon-yellow)]"
                style={{ boxShadow: "0 0 10px var(--neon-yellow)" }}
              />
              <div
                className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[8px] text-[var(--neon-yellow)] whitespace-nowrap"
                style={{ textShadow: "0 0 5px var(--neon-yellow)" }}
              >
                {point.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between font-mono text-xs text-[var(--neon-cyan)]/70">
          <span>ANALYZING...</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        <div className="relative h-2 bg-[var(--cyber-dark)] border border-[var(--neon-cyan)]/30 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-yellow)] transition-all duration-100"
            style={{
              width: `${Math.min(progress, 100)}%`,
              boxShadow: "0 0 10px var(--neon-cyan)",
            }}
          />
          {/* Progress segments */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 border-r border-[var(--cyber-dark)]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Status text */}
      <div className="space-y-1 font-mono text-[10px] text-[var(--neon-cyan)]/50">
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              progress > 25 ? "bg-[var(--neon-yellow)]" : "bg-[var(--neon-cyan)]/30"
            }`}
          />
          <span className={progress > 25 ? "text-[var(--neon-yellow)]" : ""}>
            RETINAL_SCAN: {progress > 25 ? "COMPLETE" : "IN_PROGRESS"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              progress > 50 ? "bg-[var(--neon-yellow)]" : "bg-[var(--neon-cyan)]/30"
            }`}
          />
          <span className={progress > 50 ? "text-[var(--neon-yellow)]" : ""}>
            NEURAL_PATTERN: {progress > 50 ? "MATCHED" : "ANALYZING"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              progress > 75 ? "bg-[var(--neon-yellow)]" : "bg-[var(--neon-cyan)]/30"
            }`}
          />
          <span className={progress > 75 ? "text-[var(--neon-yellow)]" : ""}>
            DNA_VERIFICATION: {progress > 75 ? "CONFIRMED" : "PENDING"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              progress >= 100 ? "bg-[var(--neon-yellow)]" : "bg-[var(--neon-cyan)]/30"
            }`}
          />
          <span className={progress >= 100 ? "text-[var(--neon-yellow)]" : ""}>
            ACCESS_GRANT: {progress >= 100 ? "AUTHORIZED" : "AWAITING"}
          </span>
        </div>
      </div>
    </div>
  )
}
