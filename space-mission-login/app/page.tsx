"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Starfield } from "@/components/starfield"
import { SystemDiagnostics } from "@/components/system-diagnostics"
import { LoginPanel } from "@/components/login-panel"
import { RadarSweep } from "@/components/radar-sweep"
import { DataPanels } from "@/components/data-panels"
import { LaunchSequence } from "@/components/launch-sequence"
import { FloatingParticles } from "@/components/floating-particles"

export default function SpaceMissionLogin() {
  const [diagnosticsComplete, setDiagnosticsComplete] = useState(false)
  const [loginState, setLoginState] = useState<"idle" | "error" | "success">("idle")
  const [showLaunchButton, setShowLaunchButton] = useState(false)
  const [launchInitiated, setLaunchInitiated] = useState(false)
  const [screenShake, setScreenShake] = useState(false)
  const [whiteFlash, setWhiteFlash] = useState(false)

  const handleLogin = useCallback((crewId: string, accessCode: string) => {
    if (accessCode === "1234" || accessCode === "launch") {
      setLoginState("success")
      setTimeout(() => setShowLaunchButton(true), 2000)
    } else {
      setLoginState("error")
      setTimeout(() => setLoginState("idle"), 3000)
    }
  }, [])

  const handleLaunch = useCallback(() => {
    setLaunchInitiated(true)
  }, [])

  const triggerShake = useCallback(() => {
    setScreenShake(true)
    setTimeout(() => setScreenShake(false), 500)
  }, [])

  const triggerWhiteFlash = useCallback(() => {
    setWhiteFlash(true)
  }, [])

  return (
    <div 
      className={`relative min-h-screen bg-black overflow-hidden ${screenShake ? "animate-shake" : ""}`}
    >
      {/* White flash overlay */}
      <AnimatePresence>
        {whiteFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-white z-[100]"
          />
        )}
      </AnimatePresence>

      {/* Starfield background */}
      <Starfield />
      
      {/* Floating particles */}
      <FloatingParticles />

      {/* Main interface container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 left-4 right-4 flex justify-between items-start"
        >
          <div className="text-cyan-400 font-mono text-xs tracking-wider">
            <div className="opacity-60">MISSION CONTROL</div>
            <div className="text-cyan-300">ARTEMIS-VII</div>
          </div>
          <RadarSweep />
          <div className="text-cyan-400 font-mono text-xs tracking-wider text-right">
            <div className="opacity-60">STATION TIME</div>
            <StationTime />
          </div>
        </motion.div>

        {/* Data panels */}
        <DataPanels loginState={loginState} />

        {/* Main content */}
        <div className="relative">
          {/* System diagnostics on first load */}
          {!diagnosticsComplete && (
            <SystemDiagnostics onComplete={() => setDiagnosticsComplete(true)} />
          )}

          {/* Login panel after diagnostics */}
          <AnimatePresence>
            {diagnosticsComplete && !launchInitiated && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <LoginPanel 
                  onLogin={handleLogin} 
                  loginState={loginState}
                  showLaunchButton={showLaunchButton}
                  onLaunch={handleLaunch}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Launch sequence */}
          <AnimatePresence>
            {launchInitiated && (
              <LaunchSequence 
                onShake={triggerShake} 
                onFlash={triggerWhiteFlash}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Footer status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 left-4 right-4 flex justify-between items-center"
        >
          <StatusIndicator label="COMM LINK" status="active" />
          <StatusIndicator label="LIFE SUPPORT" status="active" />
          <StatusIndicator label="PROPULSION" status={loginState === "success" ? "active" : "standby"} />
          <StatusIndicator label="NAVIGATION" status="active" />
        </motion.div>
      </div>

      {/* Ambient glow effects */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
        loginState === "success" ? "opacity-30" : "opacity-0"
      }`}>
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent" />
      </div>

      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
        loginState === "error" ? "opacity-30" : "opacity-0"
      }`}>
        <div className="absolute inset-0 bg-gradient-radial from-red-500/30 via-transparent to-transparent animate-pulse" />
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-10px) translateY(-5px); }
          20% { transform: translateX(10px) translateY(5px); }
          30% { transform: translateX(-10px) translateY(-5px); }
          40% { transform: translateX(10px) translateY(5px); }
          50% { transform: translateX(-5px) translateY(-2px); }
          60% { transform: translateX(5px) translateY(2px); }
          70% { transform: translateX(-5px) translateY(-2px); }
          80% { transform: translateX(5px) translateY(2px); }
          90% { transform: translateX(-2px) translateY(-1px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}

function StationTime() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toISOString().slice(11, 19))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return <div className="text-cyan-300 tabular-nums">{time} UTC</div>
}

function StatusIndicator({ label, status }: { label: string; status: "active" | "standby" | "error" }) {
  const colors = {
    active: "bg-emerald-500",
    standby: "bg-amber-500",
    error: "bg-red-500"
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${colors[status]} ${status === "active" ? "animate-pulse" : ""}`} />
      <span className="text-cyan-400/70 font-mono text-xs tracking-wider">{label}</span>
    </div>
  )
}
