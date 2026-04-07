"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoginPanelProps {
  onLogin: (crewId: string, accessCode: string) => void
  loginState: "idle" | "error" | "success"
  showLaunchButton: boolean
  onLaunch: () => void
}

export function LoginPanel({ onLogin, loginState, showLaunchButton, onLaunch }: LoginPanelProps) {
  const [crewId, setCrewId] = useState("")
  const [accessCode, setAccessCode] = useState("")
  const [flickering, setFlickering] = useState(false)

  useEffect(() => {
    if (loginState === "error") {
      // Trigger flickering effect
      setFlickering(true)
      const intervals = [100, 200, 300, 500, 700]
      intervals.forEach(delay => {
        setTimeout(() => setFlickering(prev => !prev), delay)
      })
      setTimeout(() => setFlickering(false), 800)
    }
  }, [loginState])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(crewId, accessCode)
  }

  const borderColor = {
    idle: "border-cyan-500/40",
    error: "border-red-500/60",
    success: "border-emerald-500/60"
  }[loginState]

  const glowColor = {
    idle: "shadow-cyan-500/20",
    error: "shadow-red-500/40",
    success: "shadow-emerald-500/40"
  }[loginState]

  return (
    <motion.div
      className={`relative w-[420px] max-w-[90vw] transition-all duration-300 ${flickering ? "opacity-50" : "opacity-100"}`}
    >
      {/* Panel container */}
      <div className={`bg-black/70 backdrop-blur-xl border-2 ${borderColor} rounded-xl p-8 shadow-lg ${glowColor} transition-all duration-500`}>
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4"
            animate={{ 
              boxShadow: loginState === "success" 
                ? ["0 0 20px rgba(16, 185, 129, 0.3)", "0 0 40px rgba(16, 185, 129, 0.5)", "0 0 20px rgba(16, 185, 129, 0.3)"]
                : "none"
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className={`w-2 h-2 rounded-full ${
              loginState === "success" ? "bg-emerald-400" : 
              loginState === "error" ? "bg-red-400 animate-pulse" : 
              "bg-cyan-400"
            }`} />
            <span className="text-cyan-300 text-xs font-mono tracking-widest">
              {loginState === "success" ? "AUTHORIZED" : loginState === "error" ? "ACCESS DENIED" : "AWAITING CREDENTIALS"}
            </span>
          </motion.div>
          <h1 className="text-2xl font-bold text-white tracking-wider mb-1">CREW AUTHENTICATION</h1>
          <p className="text-cyan-400/60 text-sm font-mono">MISSION CONTROL SYSTEM v4.7.2</p>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {loginState === "error" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-center">
                <div className="text-red-400 font-mono text-sm tracking-wider animate-pulse">
                  ⚠ ACCESS DENIED – AUTHORIZATION REQUIRED ⚠
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success message */}
        <AnimatePresence>
          {loginState === "success" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-lg p-4 text-center">
                <motion.div 
                  className="text-emerald-400 font-mono text-lg tracking-wider font-bold"
                  animate={{ textShadow: ["0 0 10px #10b981", "0 0 20px #10b981", "0 0 10px #10b981"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🚀 LAUNCH AUTHORIZED 🚀
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        {!showLaunchButton && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Crew ID Field */}
            <div className="space-y-2">
              <label className="block text-cyan-400 text-xs font-mono tracking-widest">
                CREW ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={crewId}
                  onChange={(e) => setCrewId(e.target.value)}
                  className={`w-full bg-black/50 border ${
                    loginState === "error" ? "border-red-500/50" : "border-cyan-500/30"
                  } rounded-lg px-4 py-3 text-white font-mono tracking-wider placeholder:text-cyan-500/30 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all`}
                  placeholder="Enter crew identification"
                  disabled={loginState === "success"}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400/50 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Access Clearance Field */}
            <div className="space-y-2">
              <label className="block text-cyan-400 text-xs font-mono tracking-widest">
                ACCESS CLEARANCE
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className={`w-full bg-black/50 border ${
                    loginState === "error" ? "border-red-500/50" : "border-cyan-500/30"
                  } rounded-lg px-4 py-3 text-white font-mono tracking-wider placeholder:text-cyan-500/30 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all`}
                  placeholder="Enter access code"
                  disabled={loginState === "success"}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400/50 animate-pulse" />
                </div>
              </div>
              <p className="text-cyan-500/40 text-xs font-mono">Hint: use &quot;1234&quot; or &quot;launch&quot;</p>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loginState === "success"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-lg font-mono tracking-widest text-sm font-bold transition-all ${
                loginState === "success"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                  : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/30 hover:border-cyan-400"
              }`}
            >
              {loginState === "success" ? "ACCESS GRANTED" : "AUTHENTICATE"}
            </motion.button>
          </form>
        )}

        {/* Launch Button */}
        <AnimatePresence>
          {showLaunchButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.button
                onClick={onLaunch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(16, 185, 129, 0.4)",
                    "0 0 40px rgba(16, 185, 129, 0.6)",
                    "0 0 20px rgba(16, 185, 129, 0.4)"
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-full py-6 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-mono tracking-widest text-xl font-bold border-2 border-emerald-400/50 hover:from-emerald-500 hover:to-cyan-500 transition-all"
              >
                INITIATE LAUNCH
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-500/30 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-500/30 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-500/30 rounded-br-lg" />
      </div>
    </motion.div>
  )
}
