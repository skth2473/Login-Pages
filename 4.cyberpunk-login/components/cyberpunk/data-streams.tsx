"use client"

import { useEffect, useState, useMemo } from "react"

export function DataStreams() {
  const [offset, setOffset] = useState(0)

  // Generate random data characters
  const generateDataColumn = useMemo(() => {
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    return () =>
      Array.from({ length: 50 }, () => chars[Math.floor(Math.random() * chars.length)]).join("\n")
  }, [])

  const [columns] = useState(() =>
    Array.from({ length: 8 }, () => ({
      data: generateDataColumn(),
      speed: 0.5 + Math.random() * 1,
      opacity: 0.1 + Math.random() * 0.2,
    }))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 1)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Left data stream */}
      <div className="fixed left-0 top-0 bottom-0 w-24 overflow-hidden pointer-events-none z-5">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyber-dark)] to-transparent z-10" />
        {columns.slice(0, 4).map((col, i) => (
          <div
            key={i}
            className="absolute font-mono text-xs leading-tight text-[var(--neon-cyan)] whitespace-pre"
            style={{
              left: `${i * 20}px`,
              top: 0,
              opacity: col.opacity,
              transform: `translateY(${-offset * col.speed}px)`,
              textShadow: "0 0 5px var(--neon-cyan)",
            }}
          >
            {col.data}
            {"\n"}
            {col.data}
          </div>
        ))}
      </div>

      {/* Right data stream */}
      <div className="fixed right-0 top-0 bottom-0 w-24 overflow-hidden pointer-events-none z-5">
        <div className="absolute inset-0 bg-gradient-to-l from-[var(--cyber-dark)] to-transparent z-10" />
        {columns.slice(4).map((col, i) => (
          <div
            key={i}
            className="absolute font-mono text-xs leading-tight text-[var(--neon-yellow)] whitespace-pre"
            style={{
              right: `${i * 20}px`,
              top: 0,
              opacity: col.opacity,
              transform: `translateY(${-offset * col.speed}px)`,
              textShadow: "0 0 5px var(--neon-yellow)",
            }}
          >
            {col.data}
            {"\n"}
            {col.data}
          </div>
        ))}
      </div>

      {/* Top scanning bar */}
      <div className="fixed top-0 left-0 right-0 h-16 overflow-hidden pointer-events-none z-5">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--cyber-dark)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--neon-cyan)]/20" />
        
        {/* Moving scan bar */}
        <div
          className="absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/10 to-transparent"
          style={{
            left: `${(offset * 2) % 200 - 50}%`,
          }}
        />
      </div>

      {/* Bottom HUD bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 overflow-hidden pointer-events-none z-5">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--cyber-dark)] to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--neon-yellow)]/20" />
        
        {/* Grid lines */}
        <div className="absolute inset-0 flex justify-between px-8 items-center">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="w-[1px] h-4 bg-[var(--neon-yellow)]/30"
            />
          ))}
        </div>
      </div>
    </>
  )
}
