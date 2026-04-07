"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface LoginTerminalProps {
  onKeyPress: () => void
  onLogin: (success: boolean) => void
  loginState: "idle" | "error" | "success"
}

export function LoginTerminal({ onKeyPress, onLogin, loginState }: LoginTerminalProps) {
  const [subjectId, setSubjectId] = useState("")
  const [chemicalFormula, setChemicalFormula] = useState("")
  const [focusedField, setFocusedField] = useState<"subject" | "formula" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dataReadout, setDataReadout] = useState("AWAITING INPUT...")
  const formRef = useRef<HTMLFormElement>(null)

  // Animated data readout
  useEffect(() => {
    if (loginState === "idle") {
      const messages = [
        "AWAITING INPUT...",
        "SYSTEM READY",
        "MONITORING COMPOUNDS...",
        "STABILITY: NOMINAL",
      ]
      let index = 0
      const interval = setInterval(() => {
        setDataReadout(messages[index % messages.length])
        index++
      }, 3000)
      return () => clearInterval(interval)
    } else if (loginState === "error") {
      setDataReadout("⚠ REACTION FAILED - UNSTABLE COMPOUND ⚠")
    } else if (loginState === "success") {
      setDataReadout("✓ FORMULA ACCEPTED - ACCESS GRANTED")
    }
  }, [loginState])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Demo: "admin" + "H2SO4" = success, anything else = error
    const success = subjectId.toLowerCase() === "admin" && chemicalFormula === "H2SO4"
    onLogin(success)
    setIsSubmitting(false)
  }

  const handleKeyDown = () => {
    onKeyPress()
  }

  return (
    <div className="relative w-full max-w-lg">
      {/* Terminal Glass Panel */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500",
          loginState === "error"
            ? "border-red-500/50 bg-red-950/20 shadow-[0_0_60px_rgba(255,50,50,0.3)]"
            : loginState === "success"
            ? "border-emerald-500/50 bg-emerald-950/20 shadow-[0_0_60px_rgba(50,255,150,0.3)]"
            : "border-cyan-500/20 bg-slate-900/40 shadow-[0_0_40px_rgba(0,200,255,0.15)]"
        )}
      >
        {/* Glass Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

        {/* Terminal Header */}
        <div className="relative border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <MoleculeIcon className="h-5 w-5 text-cyan-400" />
            </div>
            <div className="font-mono text-xs text-cyan-400/70">
              LAB-TERMINAL v2.0
            </div>
          </div>

          {/* Periodic Table Elements */}
          <div className="mt-3 flex gap-2">
            <PeriodicElement symbol="He" number="2" />
            <PeriodicElement symbol="C" number="6" />
            <PeriodicElement symbol="N" number="7" />
            <PeriodicElement symbol="O" number="8" />
          </div>
        </div>

        {/* Data Readout */}
        <div className="border-b border-white/5 bg-black/30 px-6 py-3">
          <div
            className={cn(
              "font-mono text-sm transition-colors duration-300",
              loginState === "error"
                ? "text-red-400 animate-pulse"
                : loginState === "success"
                ? "text-emerald-400"
                : "text-cyan-400/70"
            )}
          >
            {dataReadout}
          </div>
        </div>

        {/* Login Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="relative p-6 space-y-6">
          {/* Subject ID Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan-300/80">
              <AtomIcon className="h-4 w-4" />
              Subject ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  "w-full rounded-lg border bg-black/40 px-4 py-3 font-mono text-cyan-100 placeholder:text-cyan-800 outline-none transition-all duration-300",
                  focusedField === "subject"
                    ? "border-cyan-400/60 shadow-[0_0_20px_rgba(0,200,255,0.2)]"
                    : "border-white/10"
                )}
                placeholder="Enter subject identifier..."
                autoComplete="off"
              />
              {focusedField === "subject" && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-1 animate-cursor bg-cyan-400" />
                </div>
              )}
            </div>
          </div>

          {/* Chemical Formula Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-300/80">
              <FlaskIcon className="h-4 w-4" />
              Chemical Formula
            </label>
            <div className="relative">
              <input
                type="password"
                value={chemicalFormula}
                onChange={(e) => setChemicalFormula(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocusedField("formula")}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  "w-full rounded-lg border bg-black/40 px-4 py-3 font-mono text-emerald-100 placeholder:text-emerald-900 outline-none transition-all duration-300",
                  focusedField === "formula"
                    ? "border-emerald-400/60 shadow-[0_0_20px_rgba(50,255,150,0.2)]"
                    : "border-white/10"
                )}
                placeholder="Enter compound password..."
                autoComplete="off"
              />
              {focusedField === "formula" && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-1 animate-cursor bg-emerald-400" />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || loginState === "success"}
            className={cn(
              "group relative w-full overflow-hidden rounded-lg py-4 font-mono text-sm font-semibold uppercase tracking-widest transition-all duration-300",
              loginState === "success"
                ? "bg-emerald-500/30 text-emerald-200 cursor-default"
                : isSubmitting
                ? "bg-cyan-500/20 text-cyan-300"
                : "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-200 hover:from-cyan-500/30 hover:to-emerald-500/30 hover:shadow-[0_0_30px_rgba(0,200,200,0.3)]"
            )}
          >
            {/* Button Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            <span className="relative flex items-center justify-center gap-3">
              {isSubmitting ? (
                <>
                  <LoadingSpinner />
                  Analyzing Compound...
                </>
              ) : loginState === "success" ? (
                <>
                  <CheckIcon className="h-5 w-5" />
                  Access Granted
                </>
              ) : (
                <>
                  <BeakerIcon className="h-5 w-5" />
                  Initiate Reaction
                </>
              )}
            </span>
          </button>

          {/* Hint Text */}
          <p className="text-center font-mono text-xs text-white/30">
            Hint: Subject &quot;admin&quot; + Formula &quot;H2SO4&quot;
          </p>
        </form>

        {/* Bottom Decoration */}
        <div className="border-t border-white/5 bg-black/20 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ChemicalBond />
              <ChemicalBond variant={2} />
            </div>
            <div className="font-mono text-[10px] text-white/20">
              HEISENBERG LABS™
            </div>
          </div>
        </div>
      </div>

      {/* Particle Effects around terminal */}
      <ParticleField loginState={loginState} />
    </div>
  )
}

function PeriodicElement({ symbol, number }: { symbol: string; number: string }) {
  return (
    <div className="flex h-10 w-10 flex-col items-center justify-center rounded border border-white/10 bg-white/5 font-mono">
      <span className="text-[8px] text-white/40">{number}</span>
      <span className="text-sm font-bold text-cyan-300">{symbol}</span>
    </div>
  )
}

function ChemicalBond({ variant = 1 }: { variant?: number }) {
  return (
    <svg width="40" height="16" viewBox="0 0 40 16" className="text-white/20">
      {variant === 1 ? (
        <>
          <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
          <line x1="14" y1="8" x2="26" y2="8" stroke="currentColor" strokeWidth="1" />
          <circle cx="32" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
        </>
      ) : (
        <>
          <circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
          <line x1="13" y1="6" x2="27" y2="6" stroke="currentColor" strokeWidth="1" />
          <line x1="13" y1="10" x2="27" y2="10" stroke="currentColor" strokeWidth="1" />
          <circle cx="32" cy="8" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
        </>
      )}
    </svg>
  )
}

function ParticleField({ loginState }: { loginState: "idle" | "error" | "success" }) {
  if (loginState !== "success") return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            backgroundColor: `rgba(${50 + Math.random() * 50}, ${200 + Math.random() * 55}, ${150 + Math.random() * 50}, ${0.6 + Math.random() * 0.4})`,
            borderRadius: "50%",
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

function LoadingSpinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="30 70"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Icons
function MoleculeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="6" r="2" />
      <circle cx="20" cy="6" r="2" />
      <circle cx="4" cy="18" r="2" />
      <circle cx="20" cy="18" r="2" />
      <line x1="9.5" y1="10" x2="5.5" y2="7" />
      <line x1="14.5" y1="10" x2="18.5" y2="7" />
      <line x1="9.5" y1="14" x2="5.5" y2="17" />
      <line x1="14.5" y1="14" x2="18.5" y2="17" />
    </svg>
  )
}

function AtomIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  )
}

function FlaskIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 3h6v6l4 8H5l4-8V3z" />
      <line x1="9" y1="3" x2="15" y2="3" />
      <path d="M7 17h10" />
    </svg>
  )
}

function BeakerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 3v16a2 2 0 002 2h8a2 2 0 002-2V3" />
      <path d="M6 3h12" />
      <path d="M6 14h12" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
