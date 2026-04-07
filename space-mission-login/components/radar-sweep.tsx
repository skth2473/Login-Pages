"use client"

import { motion } from "framer-motion"

export function RadarSweep() {
  return (
    <div className="relative w-20 h-20">
      {/* Radar background */}
      <div className="absolute inset-0 rounded-full border border-cyan-500/30 bg-black/50">
        {/* Concentric circles */}
        <div className="absolute inset-2 rounded-full border border-cyan-500/20" />
        <div className="absolute inset-4 rounded-full border border-cyan-500/20" />
        <div className="absolute inset-6 rounded-full border border-cyan-500/20" />
        
        {/* Cross lines */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500/20" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-500/20" />
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400" />
        
        {/* Sweep line */}
        <motion.div
          className="absolute top-1/2 left-1/2 origin-left h-0.5 w-8 -translate-y-1/2"
          style={{
            background: "linear-gradient(90deg, rgba(34, 211, 238, 0.8), transparent)"
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Sweep trail/glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(34, 211, 238, 0.1) 30deg, transparent 60deg)"
          }}
        />
        
        {/* Blips */}
        <motion.div
          className="absolute top-3 right-4 w-1 h-1 rounded-full bg-cyan-400"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-5 left-3 w-1 h-1 rounded-full bg-emerald-400"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </div>
    </div>
  )
}
