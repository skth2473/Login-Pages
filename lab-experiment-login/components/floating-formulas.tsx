"use client"

import { useEffect, useState } from "react"

const FORMULAS = [
  "C₆H₁₂O₆",
  "H₂SO₄",
  "NaCl",
  "CH₃COOH",
  "C₂H₅OH",
  "HNO₃",
  "NaOH",
  "KMnO₄",
  "CaCO₃",
  "H₂O₂",
  "NH₃",
  "CO₂",
  "C₁₀H₁₅N",
  "C₉H₁₃NO₃",
]

const ELEMENTS = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca"]

interface FloatingItem {
  id: number
  content: string
  x: number
  y: number
  duration: number
  delay: number
  opacity: number
  size: number
  type: "formula" | "element"
}

export function FloatingFormulas() {
  const [items, setItems] = useState<FloatingItem[]>([])

  useEffect(() => {
    const newItems: FloatingItem[] = []

    // Add formulas
    for (let i = 0; i < 12; i++) {
      newItems.push({
        id: i,
        content: FORMULAS[i % FORMULAS.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 10,
        opacity: 0.03 + Math.random() * 0.05,
        size: 12 + Math.random() * 8,
        type: "formula",
      })
    }

    // Add elements
    for (let i = 0; i < 8; i++) {
      newItems.push({
        id: 100 + i,
        content: ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 20 + Math.random() * 15,
        delay: Math.random() * 8,
        opacity: 0.04 + Math.random() * 0.04,
        size: 20 + Math.random() * 16,
        type: "element",
      })
    }

    setItems(newItems)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute font-mono animate-float-formula"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}px`,
            opacity: item.opacity,
            color: item.type === "formula" ? "#00ffcc" : "#66ccff",
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            textShadow: item.type === "formula" 
              ? "0 0 10px rgba(0, 255, 204, 0.3)"
              : "0 0 10px rgba(102, 204, 255, 0.3)",
          }}
        >
          {item.content}
        </div>
      ))}

      {/* Molecular Diagrams */}
      <MolecularDiagram x={15} y={20} delay={0} />
      <MolecularDiagram x={80} y={70} delay={2} variant={2} />
      <MolecularDiagram x={70} y={15} delay={4} variant={3} />
    </div>
  )
}

function MolecularDiagram({
  x,
  y,
  delay,
  variant = 1,
}: {
  x: number
  y: number
  delay: number
  variant?: number
}) {
  return (
    <svg
      className="absolute animate-float-slow"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}s`,
        opacity: 0.06,
      }}
      width="80"
      height="80"
      viewBox="0 0 80 80"
    >
      {variant === 1 && (
        // Benzene Ring
        <g stroke="#00ffcc" strokeWidth="1" fill="none">
          <polygon points="40,10 65,25 65,55 40,70 15,55 15,25" />
          <polygon points="40,18 58,30 58,50 40,62 22,50 22,30" />
          <circle cx="40" cy="10" r="4" fill="#00ffcc" opacity="0.5" />
          <circle cx="65" cy="25" r="4" fill="#00ffcc" opacity="0.5" />
          <circle cx="65" cy="55" r="4" fill="#00ffcc" opacity="0.5" />
          <circle cx="40" cy="70" r="4" fill="#00ffcc" opacity="0.5" />
          <circle cx="15" cy="55" r="4" fill="#00ffcc" opacity="0.5" />
          <circle cx="15" cy="25" r="4" fill="#00ffcc" opacity="0.5" />
        </g>
      )}
      {variant === 2 && (
        // Water Molecule
        <g stroke="#66ccff" strokeWidth="1.5" fill="none">
          <circle cx="40" cy="30" r="12" fill="#66ccff" opacity="0.3" />
          <circle cx="20" cy="55" r="8" fill="#66ccff" opacity="0.3" />
          <circle cx="60" cy="55" r="8" fill="#66ccff" opacity="0.3" />
          <line x1="32" y1="38" x2="24" y2="48" />
          <line x1="48" y1="38" x2="56" y2="48" />
          <text x="36" y="34" fontSize="10" fill="#66ccff">O</text>
          <text x="16" y="58" fontSize="8" fill="#66ccff">H</text>
          <text x="56" y="58" fontSize="8" fill="#66ccff">H</text>
        </g>
      )}
      {variant === 3 && (
        // Methane
        <g stroke="#44ffaa" strokeWidth="1" fill="none">
          <circle cx="40" cy="40" r="10" fill="#44ffaa" opacity="0.4" />
          <circle cx="40" cy="12" r="6" fill="#44ffaa" opacity="0.3" />
          <circle cx="40" cy="68" r="6" fill="#44ffaa" opacity="0.3" />
          <circle cx="12" cy="40" r="6" fill="#44ffaa" opacity="0.3" />
          <circle cx="68" cy="40" r="6" fill="#44ffaa" opacity="0.3" />
          <line x1="40" y1="30" x2="40" y2="18" />
          <line x1="40" y1="50" x2="40" y2="62" />
          <line x1="30" y1="40" x2="18" y2="40" />
          <line x1="50" y1="40" x2="62" y2="40" />
          <text x="36" y="44" fontSize="10" fill="#44ffaa">C</text>
        </g>
      )}
    </svg>
  )
}
