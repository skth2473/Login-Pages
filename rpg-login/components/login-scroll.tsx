"use client"

import { useState, useRef, useEffect } from "react"
import { Sword, Sparkles } from "lucide-react"

interface LoginScrollProps {
  onLogin: (username: string, password: string) => void
  loginState: "idle" | "error" | "success"
}

export function LoginScroll({ onLogin, loginState }: LoginScrollProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isUnrolled, setIsUnrolled] = useState(false)
  const [typingRunes, setTypingRunes] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsUnrolled(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (password.length > 0) {
      setTypingRunes(true)
      const timer = setTimeout(() => setTypingRunes(false), 200)
      return () => clearTimeout(timer)
    }
  }, [password])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(username, password)
  }

  return (
    <div className={`relative transition-all duration-1000 ${isUnrolled ? "scale-100 opacity-100" : "scale-y-0 opacity-0"}`}>
      {/* Parchment Scroll */}
      <div 
        className="relative w-[340px] md:w-[400px] p-8 md:p-10"
        style={{
          backgroundImage: "url('/images/parchment.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          boxShadow: "0 0 40px rgba(0,0,0,0.8), inset 0 0 60px rgba(139,69,19,0.3)",
        }}
      >
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-amber-900/60 to-transparent" />
        
        {/* Burnt Edges Effect */}
        <div className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.4), inset 0 0 60px rgba(139,69,19,0.2)",
          }}
        />

        {/* Title */}
        <h1 className="text-center font-serif text-2xl md:text-3xl text-amber-950 mb-6 tracking-wider"
          style={{ 
            textShadow: "1px 1px 2px rgba(139,69,19,0.3)",
            fontFamily: "var(--font-medieval), serif"
          }}
        >
          Enter The Realm
        </h1>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-800 to-amber-800" />
          <Sword className="w-5 h-5 text-amber-800 rotate-45" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent via-amber-800 to-amber-800" />
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div className="space-y-2">
            <label 
              htmlFor="username" 
              className="block text-amber-900 text-sm font-medium tracking-widest uppercase"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              Chosen Name
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-amber-100/50 border-2 border-amber-800/40 rounded text-amber-950 placeholder-amber-700/50 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all"
              style={{ 
                fontFamily: "var(--font-cinzel), serif",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)"
              }}
              placeholder="Enter thy name..."
              autoComplete="username"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="block text-amber-900 text-sm font-medium tracking-widest uppercase"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              Secret Sigil
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 bg-amber-100/50 border-2 border-amber-800/40 rounded text-amber-950 placeholder-amber-700/50 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all ${typingRunes ? "shadow-[0_0_15px_rgba(255,165,0,0.5)]" : ""}`}
                style={{ 
                  fontFamily: "var(--font-cinzel), serif",
                  boxShadow: typingRunes 
                    ? "inset 0 2px 4px rgba(0,0,0,0.1), 0 0 20px rgba(255,165,0,0.4)"
                    : "inset 0 2px 4px rgba(0,0,0,0.1)"
                }}
                placeholder="Speak the ancient words..."
                autoComplete="current-password"
              />
              {typingRunes && (
                <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500 animate-pulse" />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loginState === "success"}
            className={`w-full py-3 mt-4 relative overflow-hidden rounded border-2 transition-all duration-300 
              ${loginState === "success" 
                ? "bg-gradient-to-r from-amber-500 to-yellow-400 border-yellow-500 text-amber-950" 
                : loginState === "error"
                ? "bg-gradient-to-r from-red-800 to-red-900 border-red-700 text-red-200 animate-shake"
                : "bg-gradient-to-r from-amber-800 to-amber-900 border-amber-700 text-amber-100 hover:from-amber-700 hover:to-amber-800 hover:border-amber-500"
              }`}
            style={{ fontFamily: "var(--font-medieval), serif" }}
          >
            <span className="relative z-10 text-lg tracking-widest uppercase">
              {loginState === "success" ? "Access Granted" : loginState === "error" ? "Access Denied" : "Enter"}
            </span>
            
            {/* Button Shine Effect */}
            {loginState !== "error" && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shine" />
            )}
          </button>
        </form>

        {/* Status Messages */}
        {loginState === "error" && (
          <p className="text-center mt-4 text-red-800 font-medium animate-pulse tracking-wide"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            You Are Not Worthy
          </p>
        )}
        
        {loginState === "success" && (
          <p className="text-center mt-4 text-amber-700 font-medium animate-pulse tracking-wide"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            The Runes Have Accepted You
          </p>
        )}

        {/* Hint Text */}
        <p className="text-center mt-6 text-amber-800/60 text-xs"
          style={{ fontFamily: "var(--font-cinzel), serif" }}
        >
          Hint: hero / magic
        </p>
      </div>

      {/* Scroll Edges */}
      <div className="absolute -top-2 left-0 right-0 h-4 bg-gradient-to-b from-amber-950 via-amber-900 to-transparent rounded-t-full opacity-60" />
      <div className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-t from-amber-950 via-amber-900 to-transparent rounded-b-full opacity-60" />
    </div>
  )
}
