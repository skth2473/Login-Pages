"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface DataPanelsProps {
  loginState: "idle" | "error" | "success"
}

export function DataPanels({ loginState }: DataPanelsProps) {
  return (
    <>
      {/* Left panel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed left-4 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div className={`space-y-4 transition-all duration-500 ${
          loginState === "error" ? "opacity-50" : ""
        }`}>
          <WaveformPanel />
          <OxygenGauge loginState={loginState} />
          <TemperaturePanel />
        </div>
      </motion.div>

      {/* Right panel */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed right-4 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div className={`space-y-4 transition-all duration-500 ${
          loginState === "error" ? "opacity-50" : ""
        }`}>
          <PowerLevelPanel loginState={loginState} />
          <TelemetryPanel />
          <SignalStrengthPanel />
        </div>
      </motion.div>
    </>
  )
}

function WaveformPanel() {
  const [points, setPoints] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => {
        const newPoints = [...prev, Math.sin(Date.now() / 200) * 20 + Math.random() * 10]
        return newPoints.slice(-30)
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-40 h-24 bg-black/60 backdrop-blur border border-cyan-500/30 rounded-lg p-3">
      <div className="text-cyan-400 text-xs font-mono mb-2 tracking-wider">VITALS</div>
      <svg className="w-full h-12" viewBox="0 0 120 40">
        <polyline
          fill="none"
          stroke="rgba(34, 211, 238, 0.8)"
          strokeWidth="1.5"
          points={points.map((p, i) => `${i * 4},${20 + p}`).join(" ")}
        />
      </svg>
    </div>
  )
}

function OxygenGauge({ loginState }: { loginState: string }) {
  const level = loginState === "success" ? 98 : 95

  return (
    <div className="w-40 h-24 bg-black/60 backdrop-blur border border-cyan-500/30 rounded-lg p-3">
      <div className="text-cyan-400 text-xs font-mono mb-2 tracking-wider">O₂ LEVELS</div>
      <div className="relative h-8 bg-cyan-900/30 rounded-full overflow-hidden">
        <motion.div
          className={`absolute left-0 top-0 h-full rounded-full ${
            loginState === "success" ? "bg-emerald-500" : "bg-cyan-500"
          }`}
          initial={{ width: "0%" }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.5, delay: 1 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-xs font-mono font-bold">{level}%</span>
        </div>
      </div>
    </div>
  )
}

function TemperaturePanel() {
  const [temp, setTemp] = useState(21.4)

  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(prev => prev + (Math.random() - 0.5) * 0.2)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-40 h-20 bg-black/60 backdrop-blur border border-cyan-500/30 rounded-lg p-3">
      <div className="text-cyan-400 text-xs font-mono mb-1 tracking-wider">CABIN TEMP</div>
      <div className="text-white text-2xl font-mono tabular-nums">
        {temp.toFixed(1)}°C
      </div>
    </div>
  )
}

function PowerLevelPanel({ loginState }: { loginState: string }) {
  const bars = 8
  const activeBars = loginState === "success" ? 8 : 6

  return (
    <div className="w-40 h-24 bg-black/60 backdrop-blur border border-cyan-500/30 rounded-lg p-3">
      <div className="text-cyan-400 text-xs font-mono mb-2 tracking-wider">POWER</div>
      <div className="flex gap-1 h-10 items-end">
        {Array.from({ length: bars }).map((_, i) => (
          <motion.div
            key={i}
            className={`flex-1 rounded-sm ${
              i < activeBars
                ? loginState === "success"
                  ? "bg-emerald-500"
                  : "bg-cyan-500"
                : "bg-cyan-900/30"
            }`}
            initial={{ height: 0 }}
            animate={{ height: `${(i + 1) * 12}%` }}
            transition={{ delay: 1 + i * 0.1 }}
          />
        ))}
      </div>
    </div>
  )
}

function TelemetryPanel() {
  const [data, setData] = useState({ lat: 0, lon: 0, alt: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        lat: 28.5 + Math.random() * 0.001,
        lon: -80.6 + Math.random() * 0.001,
        alt: 408 + Math.random() * 0.5
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-40 h-28 bg-black/60 backdrop-blur border border-cyan-500/30 rounded-lg p-3">
      <div className="text-cyan-400 text-xs font-mono mb-2 tracking-wider">TELEMETRY</div>
      <div className="space-y-1 text-xs font-mono">
        <div className="flex justify-between">
          <span className="text-cyan-400/60">LAT</span>
          <span className="text-white tabular-nums">{data.lat.toFixed(4)}°</span>
        </div>
        <div className="flex justify-between">
          <span className="text-cyan-400/60">LON</span>
          <span className="text-white tabular-nums">{data.lon.toFixed(4)}°</span>
        </div>
        <div className="flex justify-between">
          <span className="text-cyan-400/60">ALT</span>
          <span className="text-white tabular-nums">{data.alt.toFixed(1)} km</span>
        </div>
      </div>
    </div>
  )
}

function SignalStrengthPanel() {
  const [strength, setStrength] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStrength(prev => {
        const change = (Math.random() - 0.5) * 10
        return Math.max(70, Math.min(100, prev + change))
      })
    }, 500)
    setStrength(85)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-40 h-20 bg-black/60 backdrop-blur border border-cyan-500/30 rounded-lg p-3">
      <div className="text-cyan-400 text-xs font-mono mb-1 tracking-wider">SIGNAL</div>
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((bar) => (
            <div
              key={bar}
              className={`w-2 rounded-sm transition-all ${
                strength > bar * 15 + 15 ? "bg-emerald-500" : "bg-cyan-900/30"
              }`}
              style={{ height: `${bar * 6}px` }}
            />
          ))}
        </div>
        <span className="text-white text-lg font-mono tabular-nums">{Math.round(strength)}%</span>
      </div>
    </div>
  )
}
