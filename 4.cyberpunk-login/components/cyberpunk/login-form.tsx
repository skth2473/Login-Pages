"use client"

import { useState, useRef, useEffect } from "react"

interface LoginFormProps {
  onSubmit: (userId: string, accessKey: string) => void
  isError?: boolean
}

export function LoginForm({ onSubmit, isError = false }: LoginFormProps) {
  const [userId, setUserId] = useState("")
  const [accessKey, setAccessKey] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const userIdRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    userIdRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(userId, accessKey)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h1
          className={`font-sans text-2xl font-bold tracking-wider mb-2 ${
            isError
              ? "text-[var(--neon-red)] animate-red-pulse"
              : "text-[var(--neon-yellow)] animate-neon-pulse"
          }`}
        >
          {isError ? "ACCESS DENIED" : "ACCESS TERMINAL"}
        </h1>
        <p className="font-mono text-xs text-[var(--neon-cyan)]/70 tracking-widest">
          {isError ? "AUTHENTICATION FAILED" : "NEURAL INTERFACE v2.077"}
        </p>
      </div>

      {/* User ID Field */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 font-mono text-xs tracking-widest text-[var(--neon-yellow)]/80">
          <span className="text-[var(--neon-cyan)]">&gt;</span>
          USER ID
          {focusedField === "userId" && (
            <span className="text-[var(--neon-cyan)] animate-blink">_</span>
          )}
        </label>
        <div className="relative">
          <input
            ref={userIdRef}
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value.toUpperCase())}
            onFocus={() => setFocusedField("userId")}
            onBlur={() => setFocusedField(null)}
            className={`w-full bg-transparent border-2 px-4 py-3 font-mono text-sm tracking-wider outline-none transition-all duration-200 ${
              isError
                ? "border-[var(--neon-red)]/50 text-[var(--neon-red)] focus:border-[var(--neon-red)] focus:box-glow-red"
                : "border-[var(--neon-yellow)]/30 text-[var(--neon-yellow)] focus:border-[var(--neon-yellow)] focus:box-glow-yellow"
            }`}
            style={{
              clipPath:
                "polygon(0 5px, 5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px))",
            }}
            placeholder="ENTER_USER_ID"
            autoComplete="off"
          />
          {/* Cursor effect */}
          {focusedField === "userId" && (
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-5 bg-[var(--neon-yellow)] animate-type-cursor"
              style={{ boxShadow: "0 0 10px var(--neon-yellow)" }}
            />
          )}
        </div>
      </div>

      {/* Access Key Field */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 font-mono text-xs tracking-widest text-[var(--neon-yellow)]/80">
          <span className="text-[var(--neon-cyan)]">&gt;</span>
          ACCESS KEY
          {focusedField === "accessKey" && (
            <span className="text-[var(--neon-cyan)] animate-blink">_</span>
          )}
        </label>
        <div className="relative">
          <input
            type="password"
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
            onFocus={() => setFocusedField("accessKey")}
            onBlur={() => setFocusedField(null)}
            className={`w-full bg-transparent border-2 px-4 py-3 font-mono text-sm tracking-wider outline-none transition-all duration-200 ${
              isError
                ? "border-[var(--neon-red)]/50 text-[var(--neon-red)] focus:border-[var(--neon-red)] focus:box-glow-red"
                : "border-[var(--neon-yellow)]/30 text-[var(--neon-yellow)] focus:border-[var(--neon-yellow)] focus:box-glow-yellow"
            }`}
            style={{
              clipPath:
                "polygon(0 5px, 5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px))",
            }}
            placeholder="••••••••••••"
            autoComplete="off"
          />
          {/* Cursor effect */}
          {focusedField === "accessKey" && (
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-5 bg-[var(--neon-yellow)] animate-type-cursor"
              style={{ boxShadow: "0 0 10px var(--neon-yellow)" }}
            />
          )}
        </div>
      </div>

      {/* HUD Lines */}
      <div className="flex items-center gap-2 py-2">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/50 to-transparent" />
        <span className="font-mono text-[10px] text-[var(--neon-cyan)]/50 tracking-widest">
          SECURE_LINK
        </span>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/50 to-transparent" />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`relative w-full py-3 font-sans font-bold tracking-widest transition-all duration-200 overflow-hidden group ${
          isError
            ? "bg-[var(--neon-red)]/20 text-[var(--neon-red)] border border-[var(--neon-red)]/50 hover:bg-[var(--neon-red)]/30"
            : "bg-[var(--neon-yellow)]/20 text-[var(--neon-yellow)] border border-[var(--neon-yellow)]/50 hover:bg-[var(--neon-yellow)]/30"
        }`}
        style={{
          clipPath:
            "polygon(0 5px, 5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px))",
        }}
      >
        {/* Hover scan effect */}
        <div
          className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ${
            isError
              ? "bg-gradient-to-r from-transparent via-[var(--neon-red)]/20 to-transparent"
              : "bg-gradient-to-r from-transparent via-[var(--neon-yellow)]/20 to-transparent"
          }`}
        />
        <span className="relative z-10">
          {isError ? "RETRY_ACCESS" : "INITIALIZE_LINK"}
        </span>
      </button>

      {/* Status indicators */}
      <div className="flex justify-between items-center font-mono text-[10px] text-[var(--neon-cyan)]/50">
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              isError ? "bg-[var(--neon-red)] animate-blink" : "bg-[var(--neon-cyan)]"
            }`}
          />
          <span>{isError ? "CONNECTION_LOST" : "LINK_STABLE"}</span>
        </div>
        <span>LAT: 52.4820 | LON: -1.8908</span>
      </div>
    </form>
  )
}
