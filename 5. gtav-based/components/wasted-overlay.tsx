"use client"

import { useEffect, useState } from "react"

export function WastedOverlay() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Slight delay for dramatic effect
    const timer = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, rgba(50, 0, 0, 0.7), rgba(20, 0, 0, 0.9))",
      }}
    >
      {/* Distortion lines */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.05) 2px, rgba(255,0,0,0.05) 4px)",
        }}
      />

      {/* Red flash overlay */}
      <div 
        className="absolute inset-0 bg-red-600/30"
        style={{
          animation: "pulse 0.5s ease-out",
        }}
      />

      {/* WASTED Text */}
      {show && (
        <div className="relative text-center">
          {/* Glitch layer 1 */}
          <h1 
            className="absolute text-7xl sm:text-9xl font-bold tracking-[0.2em] font-sans"
            style={{
              color: "rgba(255, 0, 0, 0.5)",
              transform: "translate(-4px, 0)",
              animation: "textGlitch 0.3s ease-in-out infinite",
            }}
          >
            WASTED
          </h1>

          {/* Glitch layer 2 */}
          <h1 
            className="absolute text-7xl sm:text-9xl font-bold tracking-[0.2em] font-sans"
            style={{
              color: "rgba(255, 100, 100, 0.5)",
              transform: "translate(4px, 0)",
              animation: "textGlitch 0.3s ease-in-out infinite reverse",
            }}
          >
            WASTED
          </h1>

          {/* Main text */}
          <h1 
            className="relative text-7xl sm:text-9xl font-bold tracking-[0.2em] font-sans"
            style={{
              color: "#ff2020",
              textShadow: `
                0 0 20px rgba(255, 0, 0, 0.8),
                0 0 40px rgba(255, 0, 0, 0.6),
                0 0 60px rgba(255, 0, 0, 0.4),
                2px 2px 0 rgba(0, 0, 0, 0.8),
                -2px -2px 0 rgba(0, 0, 0, 0.8)
              `,
              animation: "wastedAppear 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
            }}
          >
            WASTED
          </h1>

          {/* Subtitle */}
          <p 
            className="mt-4 text-xl sm:text-2xl tracking-[0.3em] font-mono"
            style={{
              color: "rgba(255, 100, 100, 0.8)",
              textShadow: "0 0 10px rgba(255, 0, 0, 0.5)",
              animation: "fadeIn 0.5s ease-out 0.3s backwards",
            }}
          >
            ACCESS DENIED
          </p>
        </div>
      )}

      {/* Screen grain effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
