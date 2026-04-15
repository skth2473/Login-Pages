"use client"

import { useState, useEffect } from "react"
import { Lock, User, Eye, EyeOff, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface GTALoginCardProps {
  onWrongPassword: () => void
  onSuccess: () => void
  disabled?: boolean
}

export function GTALoginCard({ onWrongPassword, onSuccess, disabled }: GTALoginCardProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [focusedField, setFocusedField] = useState<"username" | "password" | null>(null)
  const [loadingText, setLoadingText] = useState("AUTHENTICATING...")

  // Hacking terminal sequence
  useEffect(() => {
    if (!isLoading) {
      setLoadingText("AUTHENTICATING...")
      return
    }

    const texts = [
      "[~] ESTABLISHING LINK...",
      "[~] SCANNING DATABASE...",
      "[~] BYPASSING FIREWALL...",
      "[~] DECRYPTING HASH...",
      "[~] VERIFYING TOKEN...",
      "[~] ELEVATING ACCESS...",
      "[~] AUTHENTICATING...",
    ]

    let i = 0
    setLoadingText(texts[0])
    const interval = setInterval(() => {
      i++
      if (i < texts.length) {
        setLoadingText(texts[i])
      } else {
        setLoadingText("[~] FINALIZING...")
      }
    }, 400)

    return () => clearInterval(interval)
  }, [isLoading])

  // Cursor flicker effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (disabled || isLoading) return

    setIsLoading(true)

    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Demo: "admin" + "password" = success, anything else = wasted
    if (username.toLowerCase() === "admin" && password === "password") {
      onSuccess()
    } else {
      onWrongPassword()
    }

    setIsLoading(false)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full max-w-md"
    >
      {/* Outer glow effect */}
      <div 
        className="absolute -inset-1 rounded-xl opacity-75"
        style={{
          background: "linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 128, 0.3), rgba(0, 255, 255, 0.3))",
          filter: "blur(20px)",
          animation: "neonPulse 3s ease-in-out infinite",
        }}
      />

      {/* Main Card */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="relative backdrop-blur-xl rounded-xl border overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(10, 10, 20, 0.85), rgba(20, 20, 40, 0.9))",
          borderColor: "rgba(0, 255, 255, 0.3)",
          boxShadow: `
            0 0 30px rgba(0, 255, 255, 0.2),
            inset 0 0 60px rgba(0, 255, 255, 0.05),
            0 25px 50px rgba(0, 0, 0, 0.5)
          `,
        }}
      >
        {/* Scanline overlay on card */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
          }}
        />

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative p-6 text-center border-b" style={{ borderColor: "rgba(0, 255, 255, 0.2)" }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-6 h-6 text-cyan-400" style={{ filter: "drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))" }} />
            <h1 
              className="text-2xl font-bold tracking-[0.3em] uppercase font-sans text-white"
              style={{
                textShadow: "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5)",
              }}
            >
              ACCESS
            </h1>
            <Zap className="w-6 h-6 text-cyan-400" style={{ filter: "drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))" }} />
          </div>
          <p className="text-sm text-cyan-300/70 tracking-widest uppercase font-mono">
            Identity Verification Required
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Username Field */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="space-y-2"
          >
            <label 
              className="text-xs tracking-[0.2em] uppercase font-mono flex items-center gap-2"
              style={{ color: "rgba(0, 255, 255, 0.7)" }}
            >
              <User className="w-4 h-4" />
              Enter Identity
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
                disabled={disabled || isLoading}
                className="w-full px-4 py-3 rounded-lg font-mono text-white placeholder:text-gray-500 transition-all duration-300 outline-none disabled:opacity-50"
                style={{
                  background: "rgba(0, 20, 30, 0.8)",
                  border: focusedField === "username" 
                    ? "1px solid rgba(0, 255, 255, 0.8)" 
                    : "1px solid rgba(0, 255, 255, 0.3)",
                  boxShadow: focusedField === "username"
                    ? "0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.1)"
                    : "inset 0 0 10px rgba(0, 0, 0, 0.3)",
                }}
                placeholder="OPERATIVE_ID"
              />
              {focusedField === "username" && (
                <span 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 font-mono"
                  style={{ opacity: cursorVisible ? 1 : 0 }}
                >
                  _
                </span>
              )}
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="space-y-2"
          >
            <label 
              className="text-xs tracking-[0.2em] uppercase font-mono flex items-center gap-2"
              style={{ color: "rgba(0, 255, 255, 0.7)" }}
            >
              <Lock className="w-4 h-4" />
              Access Code
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                disabled={disabled || isLoading}
                className="w-full px-4 py-3 pr-12 rounded-lg font-mono text-white placeholder:text-gray-500 transition-all duration-300 outline-none disabled:opacity-50"
                style={{
                  background: "rgba(0, 20, 30, 0.8)",
                  border: focusedField === "password" 
                    ? "1px solid rgba(0, 255, 255, 0.8)" 
                    : "1px solid rgba(0, 255, 255, 0.3)",
                  boxShadow: focusedField === "password"
                    ? "0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.1)"
                    : "inset 0 0 10px rgba(0, 0, 0, 0.3)",
                }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400/70 hover:text-cyan-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            whileHover={!(disabled || isLoading || !username || !password) ? { scale: 1.02 } : {}}
            whileTap={!(disabled || isLoading || !username || !password) ? { scale: 0.98 } : {}}
            type="submit"
            disabled={disabled || isLoading || !username || !password}
            className="relative w-full py-4 rounded-lg font-sans font-bold text-lg tracking-[0.2em] uppercase transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group"
            style={{
              background: "linear-gradient(135deg, rgba(0, 180, 180, 0.9), rgba(0, 120, 120, 0.9))",
              border: "1px solid rgba(0, 255, 255, 0.5)",
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
              color: "white",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
            }}
          >
            {/* Button glow on hover */}
            <span 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(0, 255, 255, 0.3), transparent, rgba(0, 255, 255, 0.3))",
              }}
            />
            
            {isLoading ? (
              <span className="flex items-center justify-center gap-2 overflow-hidden px-2">
                <span 
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full shrink-0"
                  style={{ animation: "spin 1s linear infinite" }}
                />
                <motion.span 
                  key={loadingText}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-mono text-sm sm:text-base tracking-widest truncate"
                >
                  {loadingText}
                </motion.span>
              </span>
            ) : (
              "INITIATE ACCESS"
            )}
          </motion.button>

          {/* Hint text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center text-xs text-cyan-300/50 font-mono"
          >
            Hint: admin / password
          </motion.p>
        </form>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="px-6 py-4 text-center border-t"
          style={{ 
            borderColor: "rgba(0, 255, 255, 0.2)",
            background: "rgba(0, 20, 30, 0.5)",
          }}
        >
          <p className="text-xs text-cyan-300/50 font-mono tracking-wider">
            ENCRYPTED CONNECTION ESTABLISHED
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400/70 font-mono">SECURE</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
