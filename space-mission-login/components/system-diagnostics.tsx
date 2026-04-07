"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface DiagnosticLine {
  text: string
  status?: string
  statusColor?: string
  delay: number
}

const diagnosticLines: DiagnosticLine[] = [
  { text: "INITIALIZING SYSTEM...", delay: 0 },
  { text: "Checking Oxygen Levels", status: "NOMINAL", statusColor: "text-emerald-400", delay: 800 },
  { text: "Fuel Status", status: "STABLE", statusColor: "text-emerald-400", delay: 1600 },
  { text: "Crew Status", status: "ACTIVE", statusColor: "text-cyan-400", delay: 2400 },
  { text: "Navigation Systems", status: "ONLINE", statusColor: "text-emerald-400", delay: 3200 },
  { text: "Communication Array", status: "LINKED", statusColor: "text-emerald-400", delay: 4000 },
  { text: "Hull Integrity", status: "100%", statusColor: "text-emerald-400", delay: 4800 },
  { text: "ALL SYSTEMS OPERATIONAL", delay: 5600 },
]

export function SystemDiagnostics({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [typingIndex, setTypingIndex] = useState<number | null>(null)
  const [typedChars, setTypedChars] = useState(0)

  useEffect(() => {
    diagnosticLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index])
        setTypingIndex(index)
        setTypedChars(0)
      }, line.delay)
    })

    // Complete after all lines
    setTimeout(onComplete, 7000)
  }, [onComplete])

  useEffect(() => {
    if (typingIndex === null) return
    
    const line = diagnosticLines[typingIndex]
    const fullText = line.status ? `${line.text}... ${line.status}` : line.text
    
    if (typedChars < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedChars(prev => prev + 1)
      }, 30)
      return () => clearTimeout(timeout)
    }
  }, [typingIndex, typedChars])

  return (
    <div className="w-[500px] max-w-[90vw] bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-lg p-6 font-mono">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-cyan-500/20">
        <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
        <span className="text-cyan-400 text-sm tracking-wider">SYSTEM DIAGNOSTICS</span>
      </div>

      <div className="space-y-2 min-h-[280px]">
        <AnimatePresence>
          {visibleLines.map((lineIndex) => {
            const line = diagnosticLines[lineIndex]
            const isTyping = typingIndex === lineIndex
            const fullText = line.status ? `${line.text}... ` : line.text
            const displayText = isTyping 
              ? fullText.slice(0, Math.min(typedChars, fullText.length))
              : fullText

            return (
              <motion.div
                key={lineIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <BlinkingCursor active={isTyping && typedChars < fullText.length + (line.status?.length || 0)} />
                  <span className="text-cyan-100/80">
                    {displayText}
                    {line.status && !isTyping && (
                      <span className={line.statusColor}>{line.status}</span>
                    )}
                    {line.status && isTyping && typedChars > fullText.length && (
                      <span className={line.statusColor}>
                        {line.status.slice(0, typedChars - fullText.length)}
                      </span>
                    )}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="mt-4 pt-4 border-t border-cyan-500/20">
        <div className="h-1 bg-cyan-900/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300"
            initial={{ width: "0%" }}
            animate={{ width: `${(visibleLines.length / diagnosticLines.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  )
}

function BlinkingCursor({ active }: { active: boolean }) {
  return (
    <span className={`inline-block w-2 h-2 rounded-sm ${active ? "bg-cyan-400 animate-pulse" : "bg-cyan-400/30"}`} />
  )
}
