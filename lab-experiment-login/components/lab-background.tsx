"use client"

import { useEffect, useRef } from "react"

interface LabBackgroundProps {
  bubbleIntensity: number
  loginState: "idle" | "error" | "success"
}

export function LabBackground({ bubbleIntensity, loginState }: LabBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark Lab Environment */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d1117] to-[#0a0a0f]" />

      {/* Ambient Light Effects */}
      <div className="absolute inset-0">
        <div
          className={`absolute left-1/4 top-1/3 h-96 w-96 rounded-full blur-[120px] transition-all duration-1000 ${
            loginState === "success"
              ? "bg-emerald-500/30"
              : loginState === "error"
              ? "bg-red-500/20"
              : "bg-cyan-500/10"
          }`}
        />
        <div
          className={`absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full blur-[120px] transition-all duration-1000 ${
            loginState === "success"
              ? "bg-teal-500/30"
              : loginState === "error"
              ? "bg-orange-500/20"
              : "bg-emerald-500/10"
          }`}
        />
      </div>

      {/* Lab Equipment Silhouettes */}
      <LabEquipment bubbleIntensity={bubbleIntensity} loginState={loginState} />

      {/* Vapor/Smoke Effect */}
      <VaporEffect />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 200, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 200, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  )
}

function LabEquipment({
  bubbleIntensity,
  loginState,
}: {
  bubbleIntensity: number
  loginState: "idle" | "error" | "success"
}) {
  return (
    <>
      {/* Left Flask */}
      <div className="absolute bottom-20 left-[10%] w-32 md:w-40">
        <Flask
          color={loginState === "error" ? "#ff4444" : "#00ffaa"}
          bubbleIntensity={bubbleIntensity}
          delay={0}
        />
      </div>

      {/* Center Beaker */}
      <div className="absolute bottom-16 left-1/2 w-28 -translate-x-1/2 md:w-36">
        <Beaker
          color={loginState === "error" ? "#ff6644" : "#00ddff"}
          bubbleIntensity={bubbleIntensity}
          delay={0.5}
        />
      </div>

      {/* Right Test Tubes */}
      <div className="absolute bottom-20 right-[10%] flex gap-3">
        <TestTube
          color={loginState === "error" ? "#ff3366" : "#44ffaa"}
          bubbleIntensity={bubbleIntensity}
          delay={0.2}
        />
        <TestTube
          color={loginState === "error" ? "#ff6633" : "#00ccff"}
          bubbleIntensity={bubbleIntensity}
          delay={0.7}
        />
        <TestTube
          color={loginState === "error" ? "#ff4455" : "#66ffcc"}
          bubbleIntensity={bubbleIntensity}
          delay={0.4}
        />
      </div>

      {/* Additional atmospheric flasks */}
      <div className="absolute bottom-32 left-[25%] w-20 opacity-60">
        <Flask
          color={loginState === "error" ? "#ff5555" : "#33ffbb"}
          bubbleIntensity={bubbleIntensity * 0.5}
          delay={1}
        />
      </div>
      <div className="absolute bottom-28 right-[25%] w-24 opacity-50">
        <Beaker
          color={loginState === "error" ? "#ff4422" : "#22eeff"}
          bubbleIntensity={bubbleIntensity * 0.5}
          delay={1.2}
        />
      </div>
    </>
  )
}

function Flask({
  color,
  bubbleIntensity,
  delay,
}: {
  color: string
  bubbleIntensity: number
  delay: number
}) {
  return (
    <div className="relative">
      {/* Flask SVG */}
      <svg viewBox="0 0 100 150" className="w-full drop-shadow-2xl">
        {/* Flask Body - Glass Effect */}
        <defs>
          <linearGradient id={`flask-glass-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>
          <linearGradient id={`liquid-${delay}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
          <filter id={`glow-${delay}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Flask Outline */}
        <path
          d="M35 10 L35 50 L10 130 Q8 145 25 145 L75 145 Q92 145 90 130 L65 50 L65 10 Z"
          fill={`url(#flask-glass-${delay})`}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />

        {/* Liquid */}
        <path
          d="M15 100 Q12 130 25 140 L75 140 Q88 130 85 100 Q70 95 50 100 Q30 105 15 100 Z"
          fill={`url(#liquid-${delay})`}
          filter={`url(#glow-${delay})`}
          className="animate-liquid"
          style={{ animationDelay: `${delay}s` }}
        />

        {/* Bubbles */}
        <g className="bubbles">
          {[...Array(5)].map((_, i) => (
            <circle
              key={i}
              cx={30 + Math.random() * 40}
              cy={120}
              r={2 + Math.random() * 3}
              fill={color}
              opacity={0.6 + bubbleIntensity * 0.4}
              className="animate-bubble"
              style={{
                animationDelay: `${delay + i * 0.3}s`,
                animationDuration: `${2 + Math.random()}s`,
              }}
            />
          ))}
        </g>

        {/* Glass Reflection */}
        <path
          d="M38 15 L38 48 L20 110"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Neck */}
        <rect
          x="35"
          y="5"
          width="30"
          height="8"
          rx="2"
          fill="rgba(255,255,255,0.1)"
          stroke="rgba(255,255,255,0.2)"
        />
      </svg>

      {/* Glow Effect */}
      <div
        className="absolute bottom-0 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full blur-2xl"
        style={{
          backgroundColor: color,
          opacity: 0.3 + bubbleIntensity * 0.3,
        }}
      />
    </div>
  )
}

function Beaker({
  color,
  bubbleIntensity,
  delay,
}: {
  color: string
  bubbleIntensity: number
  delay: number
}) {
  return (
    <div className="relative">
      <svg viewBox="0 0 80 120" className="w-full drop-shadow-2xl">
        <defs>
          <linearGradient id={`beaker-liquid-${delay}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.85" />
            <stop offset="100%" stopColor={color} stopOpacity="0.45" />
          </linearGradient>
          <filter id={`beaker-glow-${delay}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Beaker Body */}
        <path
          d="M10 10 L10 100 Q10 115 25 115 L55 115 Q70 115 70 100 L70 10 Z"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />

        {/* Liquid */}
        <path
          d="M12 50 L12 100 Q12 113 25 113 L55 113 Q68 113 68 100 L68 50 Q50 55 40 50 Q25 45 12 50 Z"
          fill={`url(#beaker-liquid-${delay})`}
          filter={`url(#beaker-glow-${delay})`}
          className="animate-liquid"
          style={{ animationDelay: `${delay}s` }}
        />

        {/* Measurement Lines */}
        {[30, 50, 70, 90].map((y, i) => (
          <line
            key={i}
            x1="12"
            y1={y}
            x2="20"
            y2={y}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
        ))}

        {/* Glass Reflection */}
        <line
          x1="15"
          y1="15"
          x2="15"
          y2="95"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Spout */}
        <path
          d="M70 10 L80 5"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />

        {/* Bubbles */}
        {[...Array(4)].map((_, i) => (
          <circle
            key={i}
            cx={25 + Math.random() * 30}
            cy={100}
            r={2 + Math.random() * 2}
            fill={color}
            opacity={0.5 + bubbleIntensity * 0.5}
            className="animate-bubble"
            style={{
              animationDelay: `${delay + i * 0.4}s`,
              animationDuration: `${2.5 + Math.random()}s`,
            }}
          />
        ))}
      </svg>

      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full blur-xl"
        style={{
          backgroundColor: color,
          opacity: 0.25 + bubbleIntensity * 0.25,
        }}
      />
    </div>
  )
}

function TestTube({
  color,
  bubbleIntensity,
  delay,
}: {
  color: string
  bubbleIntensity: number
  delay: number
}) {
  return (
    <div className="relative w-8">
      <svg viewBox="0 0 30 100" className="w-full drop-shadow-xl">
        <defs>
          <linearGradient id={`tube-liquid-${delay}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
          <filter id={`tube-glow-${delay}`}>
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Tube Body */}
        <path
          d="M5 5 L5 85 Q5 95 15 95 Q25 95 25 85 L25 5 Z"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />

        {/* Liquid */}
        <path
          d="M7 40 L7 85 Q7 93 15 93 Q23 93 23 85 L23 40 Q18 45 15 42 Q10 38 7 40 Z"
          fill={`url(#tube-liquid-${delay})`}
          filter={`url(#tube-glow-${delay})`}
          className="animate-liquid"
          style={{ animationDelay: `${delay}s` }}
        />

        {/* Rim */}
        <ellipse
          cx="15"
          cy="5"
          rx="10"
          ry="3"
          fill="rgba(255,255,255,0.1)"
          stroke="rgba(255,255,255,0.25)"
        />

        {/* Glass Reflection */}
        <line
          x1="8"
          y1="10"
          x2="8"
          y2="80"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
        />

        {/* Bubbles */}
        {[...Array(3)].map((_, i) => (
          <circle
            key={i}
            cx={12 + Math.random() * 6}
            cy={85}
            r={1 + Math.random() * 1.5}
            fill={color}
            opacity={0.6 + bubbleIntensity * 0.4}
            className="animate-bubble"
            style={{
              animationDelay: `${delay + i * 0.5}s`,
              animationDuration: `${1.5 + Math.random()}s`,
            }}
          />
        ))}
      </svg>

      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full blur-lg"
        style={{
          backgroundColor: color,
          opacity: 0.3 + bubbleIntensity * 0.3,
        }}
      />
    </div>
  )
}

function VaporEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-vapor"
          style={{
            left: `${10 + i * 12}%`,
            bottom: "10%",
            width: "60px",
            height: "120px",
            background: `radial-gradient(ellipse at center, rgba(100, 200, 255, 0.03) 0%, transparent 70%)`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}
