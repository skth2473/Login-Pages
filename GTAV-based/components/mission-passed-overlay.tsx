"use client"

import { useEffect, useState } from "react"

export function MissionPassedOverlay() {
  const [show, setShow] = useState(false)
  const [showRewards, setShowRewards] = useState(false)
  const [cashAmount, setCashAmount] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setShow(true), 100)
    const timer2 = setTimeout(() => setShowRewards(true), 800)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  // Cash counting animation
  useEffect(() => {
    if (showRewards) {
      const targetAmount = 50000
      const duration = 1500
      const steps = 30
      const increment = targetAmount / steps
      let current = 0

      const interval = setInterval(() => {
        current += increment
        if (current >= targetAmount) {
          setCashAmount(targetAmount)
          clearInterval(interval)
        } else {
          setCashAmount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(interval)
    }
  }, [showRewards])

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        animation: "zoomIn 3s ease-out forwards",
      }}
    >
      {/* Green tint overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0, 50, 0, 0.7), rgba(0, 30, 0, 0.85))",
        }}
      />

      {/* Shine effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(100, 255, 100, 0.1) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      {show && (
        <div className="relative text-center z-10">
          {/* MISSION PASSED text */}
          <h1 
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[0.15em] font-sans"
            style={{
              color: "#90EE90",
              textShadow: `
                0 0 20px rgba(100, 255, 100, 0.8),
                0 0 40px rgba(100, 255, 100, 0.6),
                0 0 60px rgba(100, 255, 100, 0.4),
                3px 3px 0 rgba(0, 80, 0, 0.8),
                -1px -1px 0 rgba(200, 255, 200, 0.3)
              `,
              animation: "missionAppear 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
            }}
          >
            MISSION PASSED
          </h1>

          {/* Respect + text */}
          <p 
            className="mt-4 text-2xl sm:text-3xl tracking-[0.2em] font-mono"
            style={{
              color: "rgba(150, 255, 150, 0.9)",
              textShadow: "0 0 15px rgba(100, 255, 100, 0.6)",
              animation: "fadeIn 0.5s ease-out 0.4s backwards",
            }}
          >
            RESPECT +
          </p>

          {/* Rewards section */}
          {showRewards && (
            <div 
              className="mt-8 space-y-3"
              style={{
                animation: "cashCount 2s ease-out forwards",
              }}
            >
              {/* Cash reward */}
              <div 
                className="flex items-center justify-center gap-4 text-3xl sm:text-4xl font-bold font-sans"
                style={{
                  color: "#50C878",
                  textShadow: "0 0 10px rgba(80, 200, 120, 0.8)",
                }}
              >
                <span className="tracking-wider">$</span>
                <span className="tabular-nums tracking-wider">
                  {cashAmount.toLocaleString()}
                </span>
              </div>

              {/* Stat bonuses */}
              <div className="flex flex-col items-center gap-2 mt-6">
                <div 
                  className="flex items-center gap-3 text-lg font-mono"
                  style={{
                    color: "rgba(150, 255, 150, 0.7)",
                    animation: "fadeIn 0.3s ease-out 0.5s backwards",
                  }}
                >
                  <span className="text-green-300">HACKING</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-6 h-2 rounded-sm"
                        style={{
                          background: i < 4 ? "linear-gradient(90deg, #50C878, #90EE90)" : "rgba(100, 100, 100, 0.5)",
                          boxShadow: i < 4 ? "0 0 8px rgba(80, 200, 120, 0.6)" : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div 
                  className="flex items-center gap-3 text-lg font-mono"
                  style={{
                    color: "rgba(150, 255, 150, 0.7)",
                    animation: "fadeIn 0.3s ease-out 0.7s backwards",
                  }}
                >
                  <span className="text-green-300">STEALTH</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-6 h-2 rounded-sm"
                        style={{
                          background: i < 3 ? "linear-gradient(90deg, #50C878, #90EE90)" : "rgba(100, 100, 100, 0.5)",
                          boxShadow: i < 3 ? "0 0 8px rgba(80, 200, 120, 0.6)" : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <p 
          className="text-sm font-mono tracking-widest"
          style={{
            color: "rgba(150, 255, 150, 0.5)",
            animation: "fadeIn 0.5s ease-out 1.5s backwards",
          }}
        >
          ACCESS GRANTED
        </p>
      </div>

      {/* Screen grain effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
